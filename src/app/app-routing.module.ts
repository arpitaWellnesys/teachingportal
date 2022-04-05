import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {path : "" , redirectTo : '/login' , pathMatch : 'full'},
  {path : "login" , component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : "forget-password" , component : ForgetPasswordComponent },
  {path : "reset-password/:id" , component : ResetPasswordComponent },
  {path : "verify-otp/:id" , component :  OtpComponent},
  {path : "dashboard" , component : DashboardComponent},
  {path : "profile" , component : ProfileComponent},
  {path : "teachers-list" , component : TeacherComponent},
  {path : "calendar" , component : CalendarComponent}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
