import { Component, Inject, numberAttribute } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { Role, Name } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  role: Role;
  constructor(private _roleService: RoleService, @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, role: Role, flag: Boolean }) {
    this.role = data.role;
  }

  addRole() {
    const rolePostModel: any = {
      name: Number(Name[this.role.name!]),
      isAdministrative: this.role.isAdministrative,
      startDate: this.role.startDate,
      employeeId: this.data.employee.id
    }
   if(!this.dateInvalid&&!this.nameInvalid)
    { 
       if (this.data.flag == true)
      {
        this._roleService.addRoleToServer(rolePostModel).subscribe(data => {
        });
      }
      else 
      {
        this._roleService.updateRoleToServer(this.role.id, rolePostModel).subscribe(data => {
        });

      }
    }
    // this.clearFields();
  }

  dateInvalid: boolean = false;
  validateDate(): void {
  if (this.role.startDate<=this.data.employee.dateSartingWork) {
    this.dateInvalid = true;
  } else {
    this.dateInvalid = false;
  }
}

nameInvalid: boolean = false;
validateName(): void {
  console.log(this.data.employee.roles);
  console.log(this.role.name)
  for (const role of this.data.employee.roles) 
    {
      if (this.role.name==role.name) {
        this.nameInvalid = true;
        return;
      }
    }
    this.nameInvalid = false;
}

// clearFields(): void {
//   this.role.name =0; 
//   this.role.isAdministrative = false; 
//   this.role.startDate = new Date(); 
// }


}

