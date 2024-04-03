import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role,Name } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent  {

  role:Role=new Role(0,0,false,new Date(),0);
  constructor(private _roleService:RoleService,@Inject(MAT_DIALOG_DATA) public data: any) {}

  addRole() {
    const rolePostModel:any={
      name: this.role.name === Name.Secretary ? 0 :
      this.role.name === Name.programmer ? 1 :
      this.role.name === Name.doctor ? 2 :
      this.role.name === Name.kindergartner ? 3 :
      this.role.name === Name.salesperson ? 4 :
      this.role.name === Name.accountant ? 5 : 6,
      
     isAdministrative:this.role.isAdministrative,
     startDate:this.role.startDate,
     employeeId:this.data.employee.id
    }
    console.log(rolePostModel)
    this._roleService.addRoleToServer(rolePostModel).subscribe(data => {
   });
   }

}
