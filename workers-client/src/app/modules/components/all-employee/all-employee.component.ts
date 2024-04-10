import {
  AfterViewInit,
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Employee, Gender } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css'],
})
export class AllEmployeeComponent implements OnInit {
  employees: Employee[] | undefined;
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'date',
    'actions',
  ];
  searchText: string = '';

  constructor(
    private _employeeService: EmployeeService,
    private router: Router,
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this._employeeService.getEmployeeFromServer().subscribe((data) => {
      this.employees = data.filter((employee) => employee.isActive);
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteEmployee(id: number): void {
    //sweet alert
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Deleted in successfully',
    }).then(() => {
      this._employeeService.deleteEmployeeToServer(id).subscribe(() => {
        this.getEmployees();
      });
    });
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['/editEmployee'], { state: { employee } });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
