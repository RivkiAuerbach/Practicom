import { Data } from '@angular/router';
export enum Name {
  fullStack,
  chips,
  hardware,
  verfication,
  embedded,
  electronics,
  teamLeader,
  projectManager,
  productManager,
}

export class Role {
  id: number;
  name: Name;
  isAdministrative: boolean;
  startDate: Data;
  employeeId: number;

  constructor(
    id: number,
    name: Name,
    isAdministrative: boolean,
    startDate: Date,
    employeeId: number,
  ) {
    this.id = id;
    this.name = name;
    this.isAdministrative = isAdministrative;
    this.startDate = startDate;
    this.employeeId = employeeId;
  }
}
