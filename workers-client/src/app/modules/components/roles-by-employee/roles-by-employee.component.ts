import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Name, Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { Employee } from '../../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-roles-by-employee',
  templateUrl: './roles-by-employee.component.html',
  styleUrl: './roles-by-employee.component.css',
})
export class RolesByEmployeeComponent implements OnInit {
  @Input()
  employee: Employee;
  roles: Role[];
  role: Role = new Role(0, Name.chips, false, new Date(), 0);
  displayedColumns: string[] = [
    'position',
    'name',
    'date',
    'IsAdministrative',
    'actions',
  ];
  dataSource: MatTableDataSource<Role>;
  constructor(
    private _roleService: RoleService,
    public dialog: MatDialog,
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getRoles();
  }

  getRoles(): void {
    this._roleService.getRolesFromServer().subscribe((data) => {
      this.roles = data.filter((role) => role.employeeId == this.employee.id);
      this.dataSource = new MatTableDataSource<Role>(this.roles);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteRole(id: number) {
    this._roleService.deleteRoleToServer(id).subscribe(() => {
      this.getRoles();
    });
  }

  getNameByNumber(num: number): string | undefined {
    const nameKeys = Object.keys(Name);
    const stringNameKeys = nameKeys.filter((key) => isNaN(Number(key)));
    const index = num - 1;

    if (index >= 0 && index < stringNameKeys.length) {
      return stringNameKeys[index];
    } else {
      return undefined;
    }
  }

  openDialog(role: Role, flag: Boolean): void {
    this.role.startDate.toString().substring(0, 10);
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '250px',
      data: { employee: this.employee, role: role, flag: flag },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getRoles();
    });
  }
}
