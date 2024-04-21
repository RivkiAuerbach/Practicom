import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Employee, Gender } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  employees: Employee[];

  constructor(private _employeeService: EmployeeService) {
    this._employeeService.getEmployeeFromServer().subscribe((data) => {
      this.employees = data;
    });
  }

  navigateToDetails(): boolean {
    //ניווט רק אם ביצע כניסה לאתר
    if (sessionStorage.getItem('ismanager') == 'true') {
      return true;
    } else {
      return false;
    }
  }

  //המרה לאקסל
  exportToExcel(): void {
    if (this.employees) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
        this.employees,
      );
      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'employees');
    }
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

  //התחברות לגימייל ושליחת מייל לבעל האתר
  handleEmailClick = () => {
    window.open(
      'https://mail.google.com/mail/?view=cm&to=rivki760.dev@gmail.com&su=Question/Comment&body=Dear Site Administrator',
    );
  };
}
