import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperationSecurityService {

  private API = "http://localhost:8080/api/recuperation-security/"

  constructor(private http: HttpClient) {
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation-security/forgotPassword/${email}`)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {
            console.error("An error occurred:", error.headers);

          // Vérifie si l'erreur a un corps, sinon retourne un message d'erreur par défaut
          const errorMessage = error.error?.message || 'An unknown error occurred. Please try again later.';
          
          // Affiche le message d'erreur dans la console
          console.error("Error message:", errorMessage);

          return throwError(() => new Error(errorMessage)); // Retourne l'erreur avec un message explicite
          }
        )
      )
  }

  verifyCode(email: string, code: number): Observable<void> {
    return this.http.get<void>(this.API + 'verify-code/' + email + '/' + code)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }

  resetPassword(email: string, password: string): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/api/recuperation-security/update-password-by-email/${email}/${password}`)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => {

            console.log("error", error);
            return throwError(error.error);
          }
        )
      )
  }
}
