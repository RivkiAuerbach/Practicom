import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee,Gender } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent  implements OnInit {

  employee: Employee = new Employee(0, '', '', '', false, new Date(), new Date(),0, []);

  constructor(private _employeeService: EmployeeService,private router: Router) { }

  ngOnInit(): void {
    this.employee = history.state.employee;
  }

  editEmployee()
  { const employeePostModel: any = {
    firstName: this.employee.firstName,
    lastName: this.employee.lastName,
    idNumber: this.employee.idNumber,
    dateSartingWork: this.employee.dateSartingWork,
    dateOfBirth: this.employee.dateOfBirth,
    gender:Number(Gender[this.employee.gender!]),
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
  title: "You Edited in successfully"
}).then(() => {
  this._employeeService.updateEmployeeToServer(this.employee.id, employeePostModel).subscribe(data => {
    if (data) {
      this.router.navigate(['/allEmployee']);
    }
  });
});
}}

getGenderByNumber(num: number): string | undefined {
  const genderKeys = Object.keys(Gender);
  const stringGenderKeys = genderKeys.filter(key => isNaN(Number(key)));
  const index = num - 1;
  
  if (index >= 0 && index < stringGenderKeys.length) {
    return stringGenderKeys[index];
  } else {
    return undefined;
  }
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
