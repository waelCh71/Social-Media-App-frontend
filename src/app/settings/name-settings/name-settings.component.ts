import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-name-settings',
  templateUrl: './name-settings.component.html',
  styles: [
  ]
})
export class NameSettingsComponent implements OnInit {

  url1=environment.urlUserServices

  constructor(private http:HttpClient, private router:Router,private location:Location) { }

  token:any
  user!:User
  firstName:any
  lastName:any
  password:any

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user")!);
    this.token=localStorage.getItem("token");
    this.firstName=this.user.firstname
    this.lastName=this.user.lastname
  }

  changeName(){
    if(this.lastName.split(" ").join("").length==0 || this.firstName.split(" ").join("").length==0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid Information',
      })
      return;
    }
    if(this.lastName==this.user.lastname && this.firstName==this.user.firstname){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a new Name',
      }) 
    }else{

      var headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });

      
      var url=this.url1+"/update-name"+"?newFirstName="+this.firstName+"&newLastName="+this.lastName+"&password="+this.password;
      
      this.http.post<User>(url, null, { headers }).subscribe(
        (response) => {
          if(response==null){
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'verify your credential',
            })
          }else{
            
            console.log('User profile updated:', response);
            localStorage.setItem("user",JSON.stringify(response));
            this.showSuccesDialogue()
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
  }

  showSuccesDialogue(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your name has been changed',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
