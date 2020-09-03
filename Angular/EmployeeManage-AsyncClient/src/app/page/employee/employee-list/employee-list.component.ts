import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of, Subject} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {Employee} from '../model/employee';
import {DepartmentService} from '../services/department.service';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDetailModalComponent} from '../employee-detail-modal/employee-detail-modal.component';
import {EmployeeAddModalComponent} from '../employee-add-modal/employee-add-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  pageTitle = 'Employee List';
  private errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  departments$ = this.departmentService.departments$
    .pipe(
      catchError( err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );
  selectedDepartment$ = this.employeeService.departmentSelectedAction$;

  // selectedDepartment$ = combineLatest([
  //   this.employeeService.departmentSelectedAction$,
  //   this.departments$
  // ]).pipe(
  //   map(([selectedNumber, departments]) => {
  //     if (selectedNumber === 0) { return `Display all`; }
  //     else { return departments.find(x => x.id === selectedNumber).name; }
  //   }));

  employees$ = this.employeeService.employeesSelected$
    .pipe(
      catchError( err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelectedDepartment(departmentId: number): void {
    this.employeeService.selectedDepartment(departmentId);
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(EmployeeAddModalComponent);
  }

  openDetailModal(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDetailModalComponent, {
      data: employee
    });
  }
}
