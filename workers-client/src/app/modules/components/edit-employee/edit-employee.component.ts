import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Gender } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.employee = history.state.employee;
    this.initializeForm();
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      idNumber: [
        this.employee.idNumber,
        [Validators.required, Validators.pattern(/^\d{9}$/)],
      ],
      dateSartingWork: [
        this.employee.dateSartingWork.toString().substring(0, 10),
        Validators.required,
      ],
      dateOfBirth: [
        this.employee.dateOfBirth.toString().substring(0, 10),
        [
          Validators.required,
          (control: FormControl) => {
            const age = this.calculateAge(new Date(control.value));
            return age >= 18 ? null : { underAge: true };
          },
        ],
      ],
      gender: [[this.employee.gender], Validators.required],
    });
  }

  editEmployee() {
    const employeePostModel: any = {
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      idNumber: this.employeeForm.value.idNumber,
      dateSartingWork: this.employeeForm.value.dateSartingWork,
      dateOfBirth: this.employeeForm.value.dateOfBirth,
      gender: Number(this.employeeForm.value.gender),
    };
    if (this.employeeForm.valid) {
      //sweet alert
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
        title: 'You Edited in successfully',
      }).then(() => {
        this._employeeService
          .updateEmployeeToServer(this.employee.id, employeePostModel)
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

  //בדיקה שגיל העובד מעל 18
  calculateAge(birthday: Date) {
    const ageDiffMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
