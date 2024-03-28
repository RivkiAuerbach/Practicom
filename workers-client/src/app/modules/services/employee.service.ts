import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
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
    return this._http.get<Employee[]>("api/Emlpyee");
  }

//server
  updateEmployee(employee: Employee): Observable<Employee> {
  
  const url = `/api/Emlpyee?id=${employee.id}`;

  
  return this._http.put<Employee>(url, employee).pipe(
    tap(updatedCourse => console.log('Employee updated successfully:', updatedCourse))
  );
}

//server
  addEmployeeToServer(employee: Employee): Observable<Employee> {
  
  return this._http.post<Employee>("/api/Emlpyee/", employee);
}

//server
  deleteEmployeeToServer(id : Number): Observable<boolean> {
    return this._http.delete<boolean>("/api/Emlpyee/" + id)
  }

}