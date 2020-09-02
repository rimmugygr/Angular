import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, EMPTY, Observable, throwError} from 'rxjs';
import {Employee} from '../model/employee';
import {catchError, map, tap} from 'rxjs/operators';
import {DepartmentService} from './department.service';

const EMPLOYEE_URL_API = `http://localhost:8080/employees`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$ = this.http.get<Employee[]>(EMPLOYEE_URL_API)
    .pipe(
      tap(data => console.log(`Products: `, JSON.stringify(data))),
      catchError(this.handleError)
    );

  employeesWithDepartment$ = combineLatest([
    this.employees$,
    this.departmentService.departments$
  ]).pipe(
    map(([employees, department]) =>
      employees.map(
        employee => ({
          ... employee,
          address: employee.city + ' ' + employee.street,
          department: department.find(d => employee.departmentId === d.id).name,
          searchKey: [employee.firstName, employee.lastName]
        }) as Employee)
    ),
    tap(data => console.log(`Products with category: `, JSON.stringify(data)))
  );


  constructor(private http: HttpClient,
              private departmentService: DepartmentService) { }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
