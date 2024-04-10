import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Employee, Gender } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  idInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _roleService: RoleService,
    private router: Router,
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      idNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      dateSartingWork: ['', Validators.required],
      dateOfBirth: [
        '',
        [
          Validators.required,
          (control: FormControl) => {
            const age = this.calculateAge(new Date(control.value));
            return age >= 18 ? null : { underAge: true };
          },
        ],
      ],
      gender: ['', Validators.required],
    });
  }

  addEmployee() {
    const employeePostModel: any = {
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      idNumber: this.employeeForm.value.idNumber,
      dateSartingWork: this.employeeForm.value.dateSartingWork,
      dateOfBirth: this.employeeForm.value.dateOfBirth,
      gender: Number(Gender[this.employeeForm.value.gender]),
    };
    if (this.employeeForm.valid) {
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
        title: 'You Added in successfully',
      }).then(() => {
        this._employeeService
          .addEmployeeToServer(employeePostModel)
          .subscribe((data) => {
            if (data) {
              this.router.navigate(['/allEmployee']);
            }
          });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid input/missing input',
      });
    }
  }

  addRoles() {
    const employeePostModel: any = {
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      idNumber: this.employeeForm.value.idNumber,
      dateSartingWork: this.employeeForm.value.dateSartingWork,
      dateOfBirth: this.employeeForm.value.dateOfBirth,
      gender: Number(Gender[this.employeeForm.value.gender]),
    };

    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.getRawValue();
      this._employeeService
        .addEmployeeToServer(employeePostModel)
        .subscribe((data) => {
          if (data) {
            employee.id = data.id;
            this.router.navigate(['/editEmployee'], { state: { employee } });
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid input/missing input',
      });
    }
  }

  cancelAddEmployee() {
    this.router.navigate(['/allEmployee']);
  }

  //בדיקה שגיל העובד מעל 18
  calculateAge(birthday: Date) {
    const ageDiffMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
