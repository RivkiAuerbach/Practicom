import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _http: HttpClient) {}

  //server
  getRolesFromServer(): Observable<Role[]> {
    return this._http.get<Role[]>('api/Role');
  }

  //server
  updateRoleToServer(id: number, role: Role): Observable<Role> {
    return this._http
      .put<Role>(`https://localhost:7191/api/Role/${id}`, role)
      .pipe(
        tap((updatedRole) =>
          console.log('Role updated successfully:', updatedRole),
        ),
      );
  }

  //server
  addRoleToServer(role: Role): Observable<Role> {
    return this._http.post<Role>('/api/Role/', role);
  }

  //server
  deleteRoleToServer(id: number): Observable<boolean> {
    return this._http.delete<boolean>(`https://localhost:7191/api/Role/${id}`);
  }
}
