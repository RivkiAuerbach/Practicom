
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    EditEmployeeComponent,
   AllEmployeeComponent,
   AddEmployeeComponent,
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
      { path: '', redirectTo: 'allEmployee', pathMatch: 'full' },
      { path: 'editEmployee', component: EditEmployeeComponent },
      { path: 'allEmployee', component: AllEmployeeComponent },
      { path: 'addEmployee', component: AddEmployeeComponent },
    ]),
    BrowserAnimationsModule,
    MatTableModule ,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule, 
    MatIconButton,
    MatFormFieldModule,
    MatInputModule, 
       
  ],
  providers: [
    // provideClientHydration()
  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
