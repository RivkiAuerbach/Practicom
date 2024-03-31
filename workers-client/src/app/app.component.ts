import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Employee } from './modules/models/employee.model';
import { EmployeeService } from './modules/services/employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workers-client';
  employees:Employee[];

  constructor(private _employeeService:EmployeeService){
    
    this._employeeService.getEmployeeFromServer().subscribe(data => {
      this.employees = data;
    });
  }

  exportToExcel(): void {
    if (this.employees) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employees);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'employees');}
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
