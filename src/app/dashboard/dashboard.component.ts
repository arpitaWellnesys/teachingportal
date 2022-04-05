import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cookieValue : any;
  responce : any;
  data : any;
  constructor(private cookieService:CookieService , private router : Router ,private service : ApiServiceService,private toast: ToastService) { }

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('token');
    if(this.cookieValue == ""){
      this.router.navigate(['/login']);
    }else{
      this.service.userDetails().subscribe(res=>{
        console.log(res);
        this.responce = JSON.parse(JSON.stringify(res));
        const options = { opacity: 1 };
        if(this.responce.success){
          this.data = this.responce.data;
          // if(this.data.profile_status == 0){
          //   this.router.navigate(['/profile']);
          // }
        }else{ 
            // this.toast.error(this.responce.message, '', options);
            // this.router.navigate(['/login']);
        }
      });
    }
    
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  
}
