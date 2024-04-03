import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent  implements OnInit {
  // role:Role=new Role(0,0,false,new Date(),0);
  // showVaccinationDetails: boolean = false;
  // toggleVaccinationDetails() {
  //   this.showVaccinationDetails = !this.showVaccinationDetails;
    
  // }
  
  // addRole()
  // {
  //   const rolePostModel: any = {
  //   name:this.role.name,
  //   isAdministrative: this.role.isAdministrative,
  //   startDate: this.role.startDate,
  //   employeeId:this.employee.id
  
  //   };
  // console.log(rolePostModel)
    
  //     this._roleService.addRoleToServer(rolePostModel).subscribe(data => {
  //       if (data) {
  //         this.clearRoleFields();
  //       }
  //     });
  
  // }
  
  // clearRoleFields() {
   
  //     this.role.name=0;
  //     this.role.isAdministrative = false;
  //     this.role.startDate = new Date();
    
  // }

  employee: Employee = new Employee(0, '', '', '', false, new Date(), new Date(), 0, []);

  constructor(private _employeeService: EmployeeService,private router: Router) { }

  ngOnInit(): void {
    this.employee = history.state.employee; 
  }

  editEmployee()

  {  const employeePostModel: any = {
    firstName: this.employee.firstName,
    lastName: this.employee.lastName,
    idNumber: this.employee.idNumber,
    dateStartingWork: this.employee.dateSartingWork,
    dateOfBirth: this.employee.dateOfBirth,
    gender: this.employee.gender,

  };
  console.log(employeePostModel)
 { if (!this.idInvalid ){
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
  title: "You Edited in successfully"
}).then(() => {
  console.log(this.employee.id)
  this._employeeService.updateEmployeeToServer(this.employee.id, employeePostModel).subscribe(data => {
    if (data) {
      this.router.navigate(['/allEmployee']);
    }
  });
});
}}

  }

   //בדיקות תקינות לקלטים:

idInvalid: boolean = false;
validateId(): void {
  // בדיקת אורך תעודת הזהות - חייבת להיות בדיוק 9 תווים ולהכיל רק מספרים
  if (this.employee&&this.employee.idNumber && /^[0-9]{9}$/.test(this.employee.idNumber)) {
    this.idInvalid = false;
  } else {
    this.idInvalid = true;
  }
}
}
