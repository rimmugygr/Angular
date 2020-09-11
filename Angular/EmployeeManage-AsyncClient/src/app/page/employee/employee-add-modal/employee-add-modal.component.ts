import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../model/employee';
import {EmployeeService} from '../services/employee.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, debounceTime} from 'rxjs/operators';
import {emailMatcher} from '../../../shared/shared/validator/emailMatcher';
import {Task} from '../model/task';
import {EMPTY} from 'rxjs';
import {DepartmentService} from '../services/department.service';


@Component({
  selector: 'app-employee-add-modal',
  templateUrl: './employee-add-modal.component.html',
  styleUrls: ['./employee-add-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAddModalComponent implements OnInit {

  newEmployee: Employee;
  newTasks: Task[];

  employeeForm: FormGroup;
  emailMessage = '';

  departments$ = this.departmentService.departments$
    .pipe(
      catchError( err => {
        // this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeAddModalComponent>,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher}),
      departmentId: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      tasks: this.fb.array([this.buildTask()])
    });

    const emailControl = this.employeeForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.newEmployee = {
      ... this.employeeForm.value,
      email: this.employeeForm.value.emailGroup.email
    } as Employee;
    this.newTasks = this.employeeForm.value.tasks as Task[];
    this.employeeService.addEmployeeWithTasks(this.newEmployee, this.newTasks);
    this.dialogRef.close();
  }


setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  buildTask(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      progress: ['0', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  addTask(): void {
    this.tasks.push(this.buildTask());
  }

  get tasks(): FormArray {
    return this.employeeForm.get('tasks') as FormArray;
  }


  deleteTask(index: number): void {
    this.tasks.removeAt(index);
    this.tasks.markAsDirty();
  }
}
