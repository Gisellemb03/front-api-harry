import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { harryApi } from './harryApi';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private goals = new BehaviorSubject<any>(['La meta inicial', 'Otra meta :P']);
  goal=  this.goals.asObservable();


  constructor(private http: HttpClient) { }

  changeGoal(goal:any){
    this.goals.next(goal)
  }

  apiURL = 'http://34.125.7.41:8118/api';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
    }

    getGoals(): Observable<harryApi> {
      return this.http.get<harryApi>(this.apiURL + '/users', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    } 

    newGoal(payload:any): Observable<harryApi> {
      return this.http.post<harryApi>(this.apiURL + '/users', JSON.stringify(payload), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    handleError(error:any) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }



}
