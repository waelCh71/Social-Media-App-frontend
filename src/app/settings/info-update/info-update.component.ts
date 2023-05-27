import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-update',
  templateUrl: './info-update.component.html',
  styles: [
  ]
})
export class InfoUpdateComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router,private location:Location) { }

  url=environment.urlUserServices

  token:any
  user!:User
  country:any;
  city:any
  dob:any
  bio:any


  minDate="1950-01-01";
  maxDate:any
  date1=new Date();
   currentYear=this.date1.getUTCFullYear();
   currentMounth=this.date1.getUTCMonth()+1;
   currentDay=this.date1.getUTCDate();
   finalMonth:any;
   finalDay:any;


  ngOnInit(): void {
    this.token=localStorage.getItem("token")
    this.user=JSON.parse(localStorage.getItem("user")!);
    this.country=this.user.country;
    this.city=this.user.city;
    this.dob=this.user.dob;
    this.bio=this.user.bio;

    //Setting Calender
    if(this.currentMounth<10){
      this.finalMonth="0"+this.currentMounth;
    }else{
      this.finalMonth=this.currentMounth;
    }
    if(this.currentDay<10){
      this.finalDay="0"+this.currentDay;
    }else{
      this.finalDay=this.currentDay;
    }
    this.maxDate=this.currentYear+"-"+this.finalMonth+"-"+this.finalDay;
  }

  changeInfo(){
    if(this.country==this.user.country && this.city==this.user.city && this.dob==this.user.dob 
      && this.bio==this.user.bio){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nothing to change',
      })
      return;
    }
    if(this.country.split(" ").join("").length==0 || this.city.split(" ").join("").length==0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid Information',
      })
      return;
    }

    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    
    var url=this.url+"/update-info"+"?newCountry="+this.country+"&newCity="+this.city+"&newDOB="+this.dob+"&newBio="+this.bio;
    
    this.http.post<User>(url, null, { headers }).subscribe(
      (response) => {
        
          
          console.log('User profile updated:', response);
          localStorage.setItem("user",JSON.stringify(response));
          this.showSuccesDialogue()
          this.location.back()
      
        
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

  showSuccesDialogue(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Acount Info has been updated',
      showConfirmButton: false,
      timer: 2000
    })
  }

}
