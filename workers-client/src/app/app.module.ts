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
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { RolesByEmployeeComponent } from './modules/components/roles-by-employee/roles-by-employee.component';
import { AddRoleComponent } from './modules/components/add-role/add-role.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './modules/components/login/login.component';
import { LogoutComponent } from './modules/components/logout/logout.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    EditEmployeeComponent,
    AllEmployeeComponent,
    AddEmployeeComponent,
    NavbarComponent,
    RolesByEmployeeComponent,
    AddRoleComponent,
    LoginComponent,
    LogoutComponent,
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
      { path: '', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'allEmployee', component: AllEmployeeComponent },
      { path: 'editEmployee', component: EditEmployeeComponent },
      { path: 'allEmployee', component: AllEmployeeComponent },
      { path: 'addEmployee', component: AddEmployeeComponent },
      { path: 'rolesByEmployee', component: RolesByEmployeeComponent },
      { path: 'addRole', component: AddRoleComponent },
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  providers: [
    // provideClientHydration()
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
