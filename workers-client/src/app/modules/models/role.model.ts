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
     id:number;
     name:Name
     isAdministrative:boolean;
     startDate:Data

    constructor(id: number, name: Name, isAdministrative: boolean, startDate:Date) {
        this.id = id;
        this.name = name;
        this.isAdministrative = isAdministrative;
        this.startDate=startDate;
    }
}
