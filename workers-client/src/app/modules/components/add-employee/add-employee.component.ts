import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee,Gender } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2'
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employee: Employee = new Employee(0, '', '', '', false, new Date(), new Date(), 0, []);
  role:Role=new Role(0,0,false,new Date(),0);
  showVaccinationDetails: boolean = false;
constructor(private _employeeService:EmployeeService,private _roleService:RoleService,private router: Router){}

  addEmployee() {
    const employeePostModel: any = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      idNumber: this.employee.idNumber,
      dateStartingWork: this.employee.dateSartingWork,
      dateOfBirth: this.employee.dateOfBirth,
      gender: this.employee.gender,
    };
    if (!this.idInvalid ){
   //sweet alert
   const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "You Added in successfully"
  }).then(() => {
    this._employeeService.addEmployeeToServer(employeePostModel).subscribe(data => {
      if (data) {
        this.router.navigate(['/allEmployee']);
      }
    });
  });
  }
  }


  //בדיקות תקינות לקלטים:

idInvalid: boolean = false;
validateId(): void {
  // בדיקת אורך תעודת הזהות - חייבת להיות בדיוק 9 תווים ולהכיל רק מספרים
  if (this.employee.idNumber && /^[0-9]{9}$/.test(this.employee.idNumber)) {
    this.idInvalid = false;
  } else {
    this.idInvalid = true;
  }
}


toggleVaccinationDetails() {
  this.showVaccinationDetails = !this.showVaccinationDetails;
  
}

addRole()
{
  const rolePostModel: any = {
  name:this.role.name,
  isAdministrative: this.role.isAdministrative,
  startDate: this.role.startDate,
  employeeId:this.role.id

  };
console.log(rolePostModel)
  
    this._roleService.addRoleToServer(rolePostModel).subscribe(data => {
      if (data) {
        this.clearRoleFields();
      }
    });

}

clearRoleFields() {
 
    this.role.name=0;
    this.role.isAdministrative = false;
    this.role.startDate = new Date();
  
}
}



