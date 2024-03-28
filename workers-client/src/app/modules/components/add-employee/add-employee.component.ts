import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employee: Employee | undefined;

constructor(private _employeeService:EmployeeService){}

  addEmployee() {
    if (this.employee)
    this._employeeService.addEmployeeToServer(this.employee).subscribe(data => {
      if (data) {
        alert("save success");
      }
    });
  }
}
