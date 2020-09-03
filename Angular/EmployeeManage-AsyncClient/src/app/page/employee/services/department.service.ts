import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Department} from '../model/department';

const DEPARTMENT_URL_API =  `http://localhost:8080/department`;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments$ = this.http.get<Department[]>(DEPARTMENT_URL_API)
    .pipe(
      tap(data => console.log(`Departments: `, JSON.stringify(data))),
      shareReplay(1),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );

  constructor(private http: HttpClient) { }
}
