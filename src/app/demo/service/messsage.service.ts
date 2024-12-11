import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Messsage } from '../models/messsage';

@Injectable({
  providedIn: 'root'
})
export class MesssageService {

  constructor(
    private http : HttpClient
  ) { }

  private API = "http://localhost:8080/api/message/"

  findByConversation(session: string): Observable<Array<Messsage>> {
    return this.http.get<Array<Messsage>>(this.API + 'by-conversation/' + session)
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    )
  }
}
