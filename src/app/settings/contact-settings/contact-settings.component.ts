import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-settings',
  templateUrl: './contact-settings.component.html',
  styles: [
  ]
})
export class ContactSettingsComponent implements OnInit {

  emailPattern=environment.emailPattern;
  url1=environment.urlUserServices
  url2=environment.urlUpdateAuthentificationService2

  phoneNumber!:string
  phone:any
  dialCode:String="+216"
  validPhone:boolean=false
  user!:User
  token:any

  email:any
  password:any


  constructor(private http:HttpClient, private router:Router,private location:Location) { }

  ngOnInit(): void {
    this.token=localStorage.getItem("token")
    this.user=JSON.parse(localStorage.getItem("user")!)
    console.log(this.user.phoneNumber.trim())
    this.phoneNumber=this.user.phoneNumber.toString()
    this.email=this.user.email
    
  }

  hasError(event:any){
    console.log(event)
    if(!event){
      this.validPhone=true
    }else{
      this.validPhone=false
    }
  }
  
  onCountryChange(event: any) {
    console.log('New country selected:', event);
    //this.country=event.name;
    this.dialCode="+"+event.dialCode;
     
  }


  changePhone(){
    //this.phone=this.dialCode+" "+this.phoneNumber

    if(this.phoneNumber==JSON.parse(localStorage.getItem("user")!).phoneNumber){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a new Phone',
      })
      return;
    }

    if(this.phoneNumber.startsWith("+")){
      this.phoneNumber=this.phoneNumber.substring(this.dialCode.length)
    }
    
    
    var phoneWithoutd=this.phoneNumber.split(" ").join("")
    console.log(phoneWithoutd)
    //phoneWithoutd.replace(" ","")
    console.log(parseInt(phoneWithoutd).toString().length==phoneWithoutd.length)
    if(this.validPhone || parseInt(phoneWithoutd).toString().length!=phoneWithoutd.length){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid Phone Number',
      })
      return;
    }
    this.sendRequestChangePhone()
  }

  sendRequestChangePhone(){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    var sendPhone=this.dialCode+" "+this.phoneNumber
    var url=this.url1+"/update-phone"+"?phone="+sendPhone

    this.http.post<User>(url, null, { headers }).subscribe(
      (response) => {
        if(response==null){
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong',
          })
        }else{
          
          console.log('User profile updated:', response);
          localStorage.setItem("user",JSON.stringify(response));
          this.showSuccesDialogue('Your Phone Number has been changed')
          this.location.back()
        }
        
      },
      (error) => {
        // Handle errors from the server or the HTTP request
        console.error('Error updating user profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    );


  }

  changeEmail(){
    if(this.email==this.user.email){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a new Email',
      })
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Updating email will update your login Credentials!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update Email!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendRequestChangeEmail()
      }
    })

  }

  sendRequestChangeEmail(){
    var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;
var location=this.location
var router=this.router
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
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
        title: 'Your Email has been Updated Succefully',
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

xhr.open("POST", this.url2+"/email?newEmail="+this.email+"&password="+this.password);
xhr.setRequestHeader("Authorization", "Bearer "+this.token)

xhr.send();
  }


  showSuccesDialogue(message:string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    })
  }

}
