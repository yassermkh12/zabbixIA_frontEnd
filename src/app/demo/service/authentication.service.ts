import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';
import { AuthenticationRequest } from '../models/authentication-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private API = "http://localhost:8080/api/auth/"

  constructor(private http : HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.API + 'register', registerRequest)
      .pipe(
        catchError(
          (error:HttpErrorResponse) =>{

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.API + 'authenticate', authenticationRequest)
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
