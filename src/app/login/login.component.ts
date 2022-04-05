import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, FormArray } from '@angular/forms';
import { ApiServiceService  } from '../api-service.service';
import {Router} from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';
import { CookieService } from 'ngx-cookie-service';
import { GoogleLoginProvider, SocialAuthService, SocialLoginModule } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;
  responce = {
    success : 0, 
    message : '',
    data : []
  };  
  data : any;
  cookieValue : any;
  constructor(
    private fb : FormBuilder, private service : ApiServiceService ,private router : Router , private toast: ToastService , private cookieservice : CookieService
    , private socialAuthService : SocialAuthService
  ) { 
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.cookieValue = this.cookieservice.get('token');
    if(this.cookieValue != ""){
      this.router.navigate(['/dashboard']);
    }
    console.log(this.cookieValue);
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        console.log(res);
        this.googleLogin(res);
      })
      // this.router.navigate(['/dashboard']);
  }

  googleLogin(data : any){
    const options = { opacity: 1 };
    if(data.email != ""){
      this.service.googleLogin(data).subscribe(res=>{
        this.responce = JSON.parse(JSON.stringify(res));
        const options = { opacity: 1 };
        if(this.responce.success){
          this.data = this.responce.data;
          console.log("Users Data------",this.data);
          this.cookieservice.set( 'token', this.data.access_token );
          this.cookieservice.set( 'user_data', this.data );
          this.toast.success(this.responce.message, '', options);
          if(this.data.user_type == 'admin'){
            this.router.navigate(['/teachers-list']);
          }else if(this.data.profile_status == 0 && this.data.user_type == 'teacher'){
            this.router.navigate(['/profile']);
          }else if(this.data.acc_verify == 0){
            this.router.navigate(['/']);
          }else {
            this.router.navigate(['/dashboard']);
          }
        }else{ 
          if(this.responce.success == 2){
            this.toast.error(this.responce.message, '', options);
            // this.router.navigate(['/verify-otp']);
          } else{
            this.toast.error(this.responce.message, '', options);
            this.loginForm.reset;
          }
        }
      });
    }else{
      this.toast.error("Invalid Login", '', options);
      this.loginForm.reset;
    }
  }


  get login(){
    return this.loginForm.controls;
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value).subscribe(res=>{
        this.responce = JSON.parse(JSON.stringify(res));
        const options = { opacity: 1 };
        if(this.responce.success){
          this.data = this.responce.data;
          console.log("Users Data------",this.data);
          this.cookieservice.set( 'token', this.data.access_token );
          this.cookieservice.set( 'user_data', JSON.stringify(this.data ));
          this.toast.success(this.responce.message, '', options);
          if(this.data.user.user_type == 'admin'){
            this.router.navigate(['/teachers-list']);
          }else if(this.data.user.profile_status == 0 && this.data.user.user_type == 'teacher'){
            this.router.navigate(['/profile']);
          }else if(this.data.user.acc_verify == 0){
            this.router.navigate(['/']);
          }else {
            this.router.navigate(['/dashboard']);
          }
        }else{ 
          if(this.responce.success == 2){
            this.toast.error(this.responce.message, '', options);
            // this.router.navigate(['/verify-otp']);
          } else{
            this.toast.error(this.responce.message, '', options);
            this.loginForm.reset;
          }
        }
      });
    }else{
      this.validateAllFields(this.loginForm); 
    }
  }

  validateAllFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);            
        if (control instanceof FormControl) {             
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
            this.validateAllFields(control);  
        }
    });
  }


 

}
