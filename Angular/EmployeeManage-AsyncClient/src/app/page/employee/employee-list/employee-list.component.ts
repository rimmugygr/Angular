import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Employee} from '../model/employee';
import {DepartmentService} from '../services/department.service';


interface Pizza {
  id: string;
  name: string;
  price: number;
}





@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  pageTitle = 'Employee List';
  errorMessage = ``;
  departments$ = this.departmentService.departments$
    .pipe(
      catchError( err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  employees$: Observable<Employee[]> = this.employeeService.employeesWithDepartment$
    .pipe(
      catchError( err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );




  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService) { }

  ngOnInit(): void {
  }

  onSelected(value: any) {

  }

  onAdd() {

  }
}
