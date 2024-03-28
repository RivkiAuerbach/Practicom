import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
})
export class AllEmployeeComponent {
  employees:Employee[] | undefined
  constructor(private _employeeService:EmployeeService ,private router: Router){

    _employeeService.getEmployeeFromServer().subscribe(data => {
      this.employees = data;
    })
  }

  addEmployeeToList()
  {
    this.router.navigate(['/addEmployee']);
  }
}
