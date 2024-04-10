import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  //server
  getEmployeeFromServer(): Observable<Employee[]> {
    return this._http.get<Employee[]>('api/Emlpyee');
  }

  //server
  updateEmployeeToServer(id: number, employee: Employee): Observable<Employee> {
    return this._http
      .put<Employee>(`https://localhost:7191/api/Emlpyee/${id}`, employee)
      .pipe(
        tap((updatedEmployee) =>
          console.log('Employee updated successfully:', updatedEmployee),
        ),
      );
  }

  //server
  addEmployeeToServer(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>('/api/Emlpyee/', employee);
  }

  //server
  deleteEmployeeToServer(id: number): Observable<boolean> {
    return this._http.delete<boolean>(
      `https://localhost:7191/api/Emlpyee/${id}`,
    );
  }
}
