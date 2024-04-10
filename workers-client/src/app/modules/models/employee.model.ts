import { Role } from './role.model';

export enum Gender {
  male,
  female,
}

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  isActive: boolean;
  dateSartingWork: Date;
  dateOfBirth: Date;
  gender: Gender;
  roles: Role[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    idNumber: string,
    isActive: boolean,
    dateSartingWork: Date,
    dateOfBirth: Date,
    gender: Gender,
    roles: Role[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.isActive = isActive;
    this.dateSartingWork = dateSartingWork;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.roles = roles;
  }
}
