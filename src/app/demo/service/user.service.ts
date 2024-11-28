import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = "http://localhost:8080/api/user/"

  constructor(private http : HttpClient) { }

  findAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>( this.API +'users');
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.API + 'save-user', user);
  }

  // // delete(user: User) {
  // //   return  this.http.delete<number>(this.API + 'id/' + user.id);
  // // }
  //
  // // edit(user: User): Observable<User> {
  // //   return this.http.put<User>(this.API, user);
  // // }

  findById(id: number): Observable<User> {
    return this.http.get<User>(this.API + 'by-id/' + id);
  }

  findUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(this.API + 'find-by-email/' + email);
  }

  findUserByUsername(username : string | undefined): Observable<User>{
    return this.http.get<User>(this.API + 'by-user-name/'+ username);
  }

  updateUser(id : number, user: User): Observable<AuthenticationResponse>{
    return this.http.put<AuthenticationResponse>(this.API + 'update-user/' + id, user)
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
