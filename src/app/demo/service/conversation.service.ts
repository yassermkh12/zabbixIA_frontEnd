import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Conversation } from '../models/conversation';
import { Message } from 'primeng/api';
import { Messsage } from '../models/messsage';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private http : HttpClient
  ) { }
  private API = "http://localhost:8080/api/conversation/"

  getOrCreateConversation(message: Messsage, username: string, session: string, usernameId: string): Observable<Messsage> {
    return this.http.post<Messsage>(this.API + username +'/'+ session +'/'+ usernameId, message)
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    )
  }

  findByUsername(username: string): Observable<Array<Conversation>> {
    return this.http.get<Array<Conversation>>(this.API + 'by-username/' + username)
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    )
  }

  findBySession(session: string): Observable<Array<Conversation>> {
    return this.http.get<Array<Conversation>>(this.API + 'by-sessionId/' + session)
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
