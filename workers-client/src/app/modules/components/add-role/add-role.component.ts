import { Component, Inject, numberAttribute } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { Role,Name } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent  {

  role:Role;
  flag:boolean=false;
  constructor(private _roleService:RoleService,@Inject(MAT_DIALOG_DATA) public data: { employee: Employee,role:Role,flag:Boolean}) {
    this.role = data.role;
    console.log(this.data.flag)
    
  }

  addRole() {
    const rolePostModel:any={
     name:Number(Name[this.role.name!]),
     isAdministrative:this.role.isAdministrative,
     startDate:this.role.startDate,
     employeeId:this.data.employee.id
    }
    console.log(rolePostModel.isAdministrative)
    if(this.data.flag==true)
    {      
      this._roleService.addRoleToServer(rolePostModel).subscribe(data => {
        });
    }
   else{
    this._roleService.updateRoleToServer(this.role.id,rolePostModel).subscribe(data => {

    });
    }

   }

}

