import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styles: [
  ]
})
export class AuthentificationComponent implements OnInit {

  emailPattern=environment.emailPattern;
  url1=environment.urlAuthentificationService;

  date1=new Date()
  date2: any
    clock:any
    day:any
    hour:any
    minute:any
    second:any
    ampm:any
    dayArray=environment.dayArray;

  constructor(private http: HttpClient,private router: Router, private alert:SweetAlertServicesService) { }

  email: string="";
  password: string="";
  error:any;
  rememberMe:any=false;

  ngOnInit(): void {
    //Creating clock
    setInterval(()=>{
      this.date2=new Date();
      this.updateClock(this.date2);
    },1000);
    this.day=this.dayArray[this.date1.getDay()];
    
  }

  private updateClock(date:Date){

    this.hour= date.getHours() <10 ? "0"+date.getHours() : date.getHours()
    this.minute=date.getMinutes() <10 ? "0"+date.getMinutes() : date.getMinutes()
    this.second=date.getSeconds() <10 ? "0"+date.getSeconds() : date.getSeconds()
    this.clock=this.hour+":"+this.minute+":"+this.second;

  }


  authenticate(){
    var data = JSON.stringify({
      "email": this.email,
      "password": this.password
    });
    
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    var router = this.router;
    var rememberMe=this.rememberMe;
    var alert=this.alert
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status!=200){
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Verify your Credential',
          })
          return;
        }
        if(this.responseText.startsWith('User')){
          alert.showErrorAlert('User Not Found')
          
        }else{
          
          localStorage.setItem("token",this.responseText);
          localStorage.setItem("rememberMe",rememberMe);
          await Swal.fire({
            title: 'Logging In',
            showConfirmButton: false,
            timer: 1000
          })
          router.navigateByUrl("/acceuil");
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Welcome Back ',
            showConfirmButton: false,
            timer: 1000
          })

        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong',
      })
    });
    
    xhr.open("POST", this.url1+"/authenticate");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(data);
  }

}
