import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, combineLatest, EMPTY, from, merge, Observable, Subject, throwError} from 'rxjs';
import {Employee} from '../model/employee';
import {catchError, filter, map, mergeMap, scan, shareReplay, switchMap, tap, toArray} from 'rxjs/operators';
import {DepartmentService} from './department.service';
import {TaskService} from './task.service';
import {Task} from '../model/task';

const EMPLOYEE_URL_API = `http://localhost:8080/employees`;
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeAddSubject = new Subject<Employee>();
  employeeAddAction$ = this.employeeAddSubject.asObservable();

  private departmentSelectedSubject = new BehaviorSubject<string>(`All`);
  departmentSelectedAction$ = this.departmentSelectedSubject.asObservable();

  private employeeSelectedSubject = new BehaviorSubject<string>('0');
  employeeSelectedAction$ = this.employeeSelectedSubject.asObservable();

  employees$ = this.http.get<Employee[]>(EMPLOYEE_URL_API)
    .pipe(
      tap(data => console.log(`Products: `, JSON.stringify(data))),
      catchError(this.handleError)
    );

  employeesWithAdd$ = merge(
    this.employees$,
    this.employeeAddAction$
  ).pipe(
      scan(((acc: Employee[], value: Employee) => [...acc, value]))
    );

  employeesWithDepartment$ = combineLatest([
    this.employeesWithAdd$,
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
    tap(data => console.log(`Products with category: `, JSON.stringify(data))),
    shareReplay(1)
  );


  employeesSelected$: Observable<Employee[]> = combineLatest([
    this.employeesWithDepartment$,
    this.departmentSelectedAction$
  ])
    .pipe(
      map(([employees, departmentId]) =>
        employees.filter( employee =>
          departmentId !== `All`  ? employee.departmentId === departmentId : true
        )
      )
    );

  selectedEmployee$: Observable<Employee> = combineLatest([
    this.employeesSelected$,
    this.employeeSelectedAction$
  ])
    .pipe(
      map(([employees, selectedEmployeeId]) =>
        employees.find(employee => employee.id === selectedEmployeeId)),
      tap(employee => console.log('employee selected', JSON.stringify(employee))),
      shareReplay(1)
    );


  selectedEmployeeTasks$: Observable<Task[]> = this.selectedEmployee$
    .pipe(
      filter(selectedEmployee => Boolean(selectedEmployee)),
      switchMap(selectedEmployee =>
        from(selectedEmployee.taskIds)
          .pipe(
            mergeMap(taskId => this.taskService.getTaskById(taskId)),
            toArray(),
            tap(tasks => console.log('employee tasks', JSON.stringify(tasks))),
            shareReplay(1)
          )
      )
    );



  constructor(private http: HttpClient,
              private departmentService: DepartmentService,
              private taskService: TaskService) { }

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

  private addEmployee(employee: Employee): void {
    this.employeeAddSubject.next(employee);
  }

  selectedDepartment(departmentId: string): void {
    this.departmentSelectedSubject.next(departmentId);
  }

  selectedEmployee(employeeId: string): void {
    this.employeeSelectedSubject.next(employeeId);
  }

  private postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(EMPLOYEE_URL_API, employee, {headers});
  }

  addEmployeeWithTasks(newEmployee: Employee, newTasks: Task[]): void {
    let tasksIs: string[];
    this.taskService.postTasks(newTasks).subscribe(
      tasks => tasksIs = tasks.map(t => t.id),
      error => console.log(error),
      () => {
        newEmployee.taskIds = tasksIs;
        this.postEmployee(newEmployee).subscribe(
          employee => this.addEmployee(employee),
            error => console.log(error)
        );
      }
    );


  }
}
