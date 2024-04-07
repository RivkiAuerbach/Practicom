import { Component, Inject, numberAttribute } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { Role, Name } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  role: Role;
  dateInvalid: boolean = false;
  
  constructor(private snackBar: MatSnackBar, private _roleService: RoleService, @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, role: Role, flag: Boolean }) {
    this.role = data.role;

    this.role.startDate.toString().substring(0, 10);
    console.log(this.role.startDate +"rivki")
    console.log(this.role)
  }

  addRole() {
    const rolePostModel: any = {
      name: Number(Name[this.role.name!]),
      isAdministrative: this.role.isAdministrative,
      startDate: this.role.startDate,
      employeeId: this.data.employee.id
    }
   if(!this.dateInvalid)
    { 
       if (this.data.flag == true)
      {
        this._roleService.addRoleToServer(rolePostModel).subscribe(
          data => {
            // Request successful
          },
          error => {
            console.error('Error adding role:', error);
            this.snackBar.open('It is not possible to select an employee twice for the same position', 'Close');
          }
        );
      } else {
        this._roleService.updateRoleToServer(this.role.id, rolePostModel).subscribe(
          data => {
            // Request successful
          },
          error => {
            console.error('Error updating role:', error);
            this.snackBar.open('It is not possible to select an employee twice for the same position', 'Close');
          }
        );

      }
    }
    if(this.dateInvalid)
    this.snackBar.open('Date of entry into the position must be later than/equal to the date of entry into the job', 'Close');
  }

 
  validateDate(): void {
  if (this.role.startDate<=this.data.employee.dateSartingWork) {
    this.dateInvalid = true;
  } else {
    this.dateInvalid = false;
  }
}

}

