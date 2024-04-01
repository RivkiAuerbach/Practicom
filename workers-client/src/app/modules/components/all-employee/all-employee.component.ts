// import {Component} from '@angular/core';
// import { Router } from '@angular/router';
// import { Employee } from '../../models/employee.model';
// import { EmployeeService } from '../../services/employee.service';


// @Component({
//   selector: 'app-all-employee',
//   templateUrl: './all-employee.component.html',
//   styleUrl: './all-employee.component.css'
// })
// export class AllEmployeeComponent{
//   employees:Employee[] | undefined;

//   constructor(private _employeeService:EmployeeService ,private router: Router){

//     _employeeService.getEmployeeFromServer().subscribe(data => {
//       this.employees = data;
//     })
//   }
//   addEmployeeToList()
//   {
//     this.router.navigate(['/addEmployee']);
//   }
// }




import { AfterViewInit, Component, ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements AfterViewInit {
  employees: Employee[] | undefined;
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'firstname','lastname', 'date' ,'actions'];
  searchText: string = '';

  constructor(private _employeeService: EmployeeService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this._employeeService.getEmployeeFromServer().subscribe(data => {
      this.employees = data;
      this.employees = this.employees.filter(employee => employee.isActive ==true);
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
      this.dataSource.paginator = this.paginator;
    });
  }

  addEmployeeToList() {
    this.router.navigate(['/addEmployee']);
  }
 
  // deleteEmployee(emplo:Employee): void {

 deleteEmployee(employee: Employee): void {
    this._employeeService.deleteEmployeeToServer(employee.id!).subscribe({
      next: () => {
        this._employeeService.getEmployeeFromServer().subscribe(data => {
          this.employees = data;
          this.employees = this.employees.filter(employee => employee.isActive ==true);
        
        });
      }
    });
  }

    // console.log(emplo.id)
    // this._employeeService.deleteEmployeeToServer(emplo.id).subscribe(() => {
    //    if(this.employees)
    //    this.employees = this.employees.filter(employee => employee.id !== emplo.id);
    //    console.log('Employee deleted successfully');
    // }, error => {
    //   console.error('Error deleting employee:', error);
    // });

    // console.log(this.employees); 
  
  

  editEmployee()
  { 
    this.router.navigate(['/editEmployee']);
  }


  applyFilter() {
    const searchText = this.searchText.trim().toLowerCase();
    this.dataSource.filter = searchText;
  }
}


