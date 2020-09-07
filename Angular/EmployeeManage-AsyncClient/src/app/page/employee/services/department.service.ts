import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Department} from '../model/department';

const DEPARTMENT_URL_API =  `http://localhost:8080/departments`;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments$ = this.http.get<Department[]>(DEPARTMENT_URL_API)
    .pipe(
      tap(data => console.log(`Departments: `, JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
    );

  constructor(private http: HttpClient) { }

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
