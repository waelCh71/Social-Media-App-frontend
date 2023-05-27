import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styles: [
  ]
})
export class PasswordUpdateComponent implements OnInit {

  url=environment.urlUpdateAuthentificationService2
  token:any

  currentPassword:any;
  newPassword:any;
  confirmNewPassword:any
  progressbar:number=0
  showProgressbar:boolean=false
  showPasswordShort:boolean=false
  passwordNotMatch:boolean=false

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem("token")
  }

  checkPasswordStrngth(){
    this.showPasswordShort=false;
    this.showProgressbar=false;
    this.progressbar=0
    if(this.newPassword.length==0){
      return;
    }
    if (this.newPassword.length<8){
      this.showPasswordShort=true;
      return;
    }else{
      
      if (this.newPassword.match(/[a-z]+/)) {
        this.progressbar += 25;
      }
      if (this.newPassword.match(/[A-Z]+/)) {
        this.progressbar += 25;
      }
      if (this.newPassword.match(/[0-9]+/)) {
        this.progressbar += 25;
      }
      if (this.newPassword.match(/[$@#&!]+/)) {
        this.progressbar += 25;
      }
      this.showProgressbar=true
      this.checkPasswordMatch()
    }
    

    console.log("hi")
  }

  checkPasswordMatch(){
    this.passwordNotMatch=false
    if(this.confirmNewPassword.length==0){

      return;
    }
    console.log(this.newPassword)
    console.log(this.confirmNewPassword)
    console.log(this.newPassword==this.confirmNewPassword)
    if(this.newPassword!=this.confirmNewPassword){
      this.passwordNotMatch=true
    }
  }

  changePassword(){
    if(this.passwordNotMatch){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Confirm your new Password',
      });
      return
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "Updating password will update your login Credentials!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update Password!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendChangePasswordRequest()
      }
    })

  }

  sendChangePasswordRequest(){
    
      var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;
  
  var router=this.router
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.response)
      if(this.status!=200){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.responseText,
        })
      }else{
        localStorage.removeItem("user")
        localStorage.setItem("token",this.responseText)
        router.navigateByUrl('/acceuil')
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Password has been Updated Succefully',
          showConfirmButton: false,
          timer: 2000
        })
        
      }
      
    }
  });
  
  xhr.addEventListener("error", function(e) {
    console.log("Error:", e);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
    })
  });
  
  xhr.open("POST", this.url+"/password?newPassword="+this.newPassword+"&oldPassword="+this.currentPassword);
  xhr.setRequestHeader("Authorization", "Bearer "+this.token)
  
  xhr.send();
  }


}
