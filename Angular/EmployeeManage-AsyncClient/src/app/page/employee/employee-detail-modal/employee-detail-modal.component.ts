import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Employee} from '../model/employee';
import {Observable} from 'rxjs';
import {Task} from '../model/task';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-employee-detail-modal',
  templateUrl: './employee-detail-modal.component.html',
  styleUrls: ['./employee-detail-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailModalComponent implements OnInit {
  tasks$: Observable<Task[]> = this.employeeServices.selectedEmployeeTasks$;
  // aaaa: Task[];

  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private employeeServices: EmployeeService) {}

  ngOnInit(): void {
    // console.log(`ereeeeee first`);
    // this.tasks$ = this.employeeServices.selectedEmployeeTasks$;
    // this.employeeServices.selectedEmployeeTasks$.subscribe(
    //   data => {
    //     this.aaaa = data as Task[];
    //     console.log(`eeeeeeeee`, JSON.stringify(this.aaaa));
    //     },
    //   () => console.log(`ereeeeee2`),
    //   () => console.log(`eeeeeeeeee3`)
    // );

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
