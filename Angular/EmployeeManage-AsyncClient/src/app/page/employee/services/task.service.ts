import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Task} from '../model/task';

const TASK_URL_API =  `http://localhost:8080/tasks`;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks$ = this.http.get<Task[]>(TASK_URL_API)
    .pipe(
      tap(data => console.log(`Tasks: `, JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
    );

  constructor(private http: HttpClient) { }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${TASK_URL_API}/${taskId}`);
  }

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
