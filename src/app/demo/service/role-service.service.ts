import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  private API = "http://localhost:8080/api/Role/"

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>( this.API +'roles');
  }

  save(role: Role): Observable<Role> {
    return this.http.post<Role>(this.API + 'save-role', role);
  }

  findById(id: number): Observable<Role> {
    return this.http.get<Role>(this.API + 'by-id/' + id);
  }

  update(id: number, role: Role): Observable<Role>{
    return this.http.put<Role>(this.API + 'update-role/' + id, role)
  }

  delete(id: number) {
      return  this.http.delete<void>(this.API + 'delete-role/' + id);
    }
  }
