import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  cookieValue : any;
  requestHeader : any;
  header : any;
  requestOptions : any;
  api_url = "http://localhost:8081/";
  constructor(private http:HttpClient , private cookieService:CookieService) {
    this.cookieValue = this.cookieService.get('token');
    this.requestHeader = { headers: new HttpHeaders({'x-access-token': this.cookieValue})}
  }
  

  login(data:any){
    return this.http.post(this.api_url+"login",data).pipe(map(result=>result));
  }

  register(data:any){
    return this.http.post(this.api_url+"register",data).pipe(map(result=>result));
  }

  forgetPassword(data:any){
    return this.http.post(this.api_url+"forget-password",data).pipe(map(result=>result));
  }

  verifyOtp(data:any){
    return this.http.post(this.api_url+"verify-otp",data).pipe(map(result=>result));
  }

  resendOtp(data: any){
    return this.http.post(this.api_url+"resend-otp",data).pipe(map(result=>result));
  }

  googleLogin(data : any){
    return this.http.post(this.api_url+"google-login",data).pipe(map(result=>result));
  }

  resetPassword(data : any){
    return this.http.post(this.api_url+"reset-password",data).pipe(map(result=>result));
  }

  userDetails(){
    return this.http.get(this.api_url+"user-details",this.requestHeader ).pipe(map(result=>result));
  } 
  
  familarities(){
    return this.http.get(this.api_url+"familarities").pipe(map(result=>result));
  }

  profile(data:any){
    return this.http.post(this.api_url+"profile",data,this.requestHeader).pipe(map(result=>result));
  }

  teacherList(){
    return this.http.get(this.api_url+"teacher-list",this.requestHeader).pipe(map(result=>result));
  }

  verifyTeacher(id:String,status:Number){
    return this.http.get(this.api_url+"teacher-status/"+id+"/"+status,this.requestHeader).pipe(map(result=>result));
  }
}
