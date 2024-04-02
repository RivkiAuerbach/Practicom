import { Data } from "@angular/router";
export enum Name {
    Secretary, 
    programmer, 
    doctor, 
    kindergartner, 
    salesperson, 
    accountant 
}

export class Role {
     id:number
     name:Name
     isAdministrative:boolean
     startDate:Data
     employeeId:number

    constructor(id: number, name: Name, isAdministrative: boolean, startDate:Date, employeeId:number) {
        this.id = id;
        this.name = name;
        this.isAdministrative = isAdministrative;
        this.startDate=startDate;
        this.employeeId=employeeId;
    }
}
