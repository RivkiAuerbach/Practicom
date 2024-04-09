
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Name, Role } from '../../models/role.model';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  snackBarOpen: boolean;
  roleForm: FormGroup;
  dateInvalid: boolean = false;
  role: Role;
  titles: string[] = ['fullStack', 'chips', 'hardware', 'verfication', 'embedded', 'electronics', 'teamLeader', 'projectManager', 'productManager'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private _roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, role: Role, flag: Boolean }) {
    this.snackBarOpen = false;
    this.role = data.role;
    this.roleForm = this.fb.group({
      startDate: [this.role.startDate.toString().substring(0, 10), Validators.required],
      name: [Name[this.role.name!], Validators.required],
      isAdministrative: [this.role.isAdministrative]
    });

  }

  addRole() {
    if (!this.dateInvalid) {
      const rolePostModel: any = {
        name: Number(Name[this.roleForm.value.name]),
        isAdministrative: this.roleForm.value.isAdministrative,
        startDate: this.roleForm.value.startDate,
        employeeId: this.data.employee.id
      };
      rolePostModel.isAdministrative = rolePostModel.isAdministrative == 'true' ? true : false

      if (this.data.flag) {
        this._roleService.addRoleToServer(rolePostModel).subscribe(
          data => {
            this.snackBarOpen = true;
          },
          error => {
            console.error('Error adding role:', error);
           
            this.snackBar.open('It is not possible to select an employee twice for the same position', 'Close');

          }
        );
      } else {
        this._roleService.updateRoleToServer(this.data.role.id, rolePostModel).subscribe(
          data => {
            this.snackBarOpen = true;
          },
          error => {
            console.log("rivki")
            console.error('Error updating role:', error);
            this.snackBar.open('It is not possible to select an employee twice for the same position', 'Close');

          }
        );
      }
    }

    if (this.dateInvalid)
      this.snackBar.open('Date of entry into the position must be later than/equal to the date of entry into the job', 'Close');
  }

  validateDate(): void {
    const startDate = new Date(this.roleForm.value.startDate);
    const employeeStartDate = new Date(this.data.employee.dateSartingWork);
    if (startDate <= employeeStartDate) {
      this.dateInvalid = true;
    } else {
      this.dateInvalid = false;
    }
  }
}





