
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditEmployeeComponent } from './modules/components/edit-employee/edit-employee.component';
import { AllEmployeeComponent } from './modules/components/all-employee/all-employee.component';
import { AddEmployeeComponent } from './modules/components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './modules/components/employee-details/employee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    EditEmployeeComponent,
   AllEmployeeComponent,
   AddEmployeeComponent,
   EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'editEmployee', component: EditEmployeeComponent },
      { path: 'allEmployee', component: AllEmployeeComponent },
      { path: 'addEmployee', component: AddEmployeeComponent },
      { path: 'employeeDetails', component: EmployeeDetailsComponent },
     
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    // provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
