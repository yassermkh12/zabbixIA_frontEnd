import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperationService {

  private API = "http://localhost:8080/api/recuperation/"

  constructor(private http : HttpClient) {
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation/forgotPassword/${email}`)
      .pipe(
        catchError(
          (error:HttpErrorResponse) =>{
            console.log("error", error.error);
            return throwError(error.error);
          }
        )
      )
  }

  verifyCode(email: string|null, code: number): Observable<void> {
    return this.http.get<void>(this.API + 'verify-code/'+ email +'/'+ code)
      .pipe(
        catchError(
          (error:HttpErrorResponse) =>{

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }

  resetPassword(email: string|null, password: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation/update-password-by-email/${email}/${password}`)
      .pipe(
        catchError(
          (error:HttpErrorResponse) =>{

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }
}
