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

  getAllConversations(): Observable<any[]> {
    return this.http.get<any[]>(this.API+'all');
  }

  getConversationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/by-id/${id}`);
  }

  createConversation(username: string, sessionId: string, usernameId: string): Observable<any> {
    const url = `${this.API}create-conversation/${username}/${sessionId}/${usernameId}`;
    return this.http.post<any>(url, {})
    .pipe(
      catchError(
        (error:HttpErrorResponse) =>{
          console.log("error", error.error?.message);
          return throwError(() => new Error(error.error.message || "Erreur inconnue")); // Retourne un message d'erreur        
          }
      )
    )
  }

  getOrCreateConversation(message: Messsage, username: string, session: string, usernameId: string, messageType: string ): Observable<Messsage> {
    return this.http.post<Messsage>(this.API + username +'/'+ session +'/'+ usernameId + '/' + messageType, message)
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

  deleteConversation(id: number): Observable<any> {
    return this.http.delete(`${this.API}/delete/${id}`);
  }

  // test
  private apiUrl = 'http://127.0.0.1:5000/send_to_openai';  // L'URL de votre API Flask

  sendMessage(): Observable<any> {
    // Effectuer une requête POST avec un corps JSON contenant le message
    return this.http.post<any>(this.apiUrl, {});
  }
}
