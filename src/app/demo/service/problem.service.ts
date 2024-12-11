import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Problem } from '../models/problem';
import { EventIdRequest } from '../models/event-id-request';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(
    private http : HttpClient
  ) { }

  private API = "http://localhost:8080/api/zabbix/"

  getActiveEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.API+'active-events')
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    )
  }

  getCombinedHostData(): Observable<Map<string, any>[]> {
    return this.http.get<Map<string, any>[]>(this.API + 'combined-host-data')
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    )
  }

  getProblems(eventIdRequest: string): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.API+'get-problem/'+eventIdRequest)
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    );
  }

  getProblemsByHost(hostId: string): Observable<Problem[]>{
    return this.http.get<Problem[]>(this.API + 'get-problem-by-host/' + hostId)
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    );
  }
}
