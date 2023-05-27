import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [
  ]
})
export class SignUpComponent implements OnInit {

  emailPattern=environment.emailPattern;
  url1=environment.urlAuthentificationService;

  firstName:String="";
  lastName:String="";
  email:String="";
  phoneNumber:String="";
  country:String="";
  dob:String="";
  city:String="";
  gender:String="";
  password:String="";
  confirmPassword:String="";
  dialCode:String="+216"
  validPhone:boolean=false
  passwordNotMatch:boolean=false
  
  showPasswordShort:boolean=false;
  showProgressbar:boolean=false;
  progressbar:number=0



  minDate="1950-01-01";
  
  Date1:any
  date1=new Date();
   currentYear=this.date1.getUTCFullYear();
   currentMounth=this.date1.getUTCMonth()+1;
   currentDay=this.date1.getUTCDate();
   maxDate:any;
   finalMonth:any;
   finalDay:any;

   date2: any
    clock:any
    day:any
    hour:any
    minute:any
    second:any
    ampm:any
    dayArray=environment.dayArray;
  constructor(private router: Router, private alert:SweetAlertServicesService) { }

  ngOnInit(): void {

    //Creating clock
    setInterval(()=>{
      this.date2=new Date();
      this.updateClock(this.date2);
    },1000);
    this.day=this.dayArray[this.date1.getDay()];

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

  private updateClock(date:Date){

    this.hour= date.getHours() <10 ? "0"+date.getHours() : date.getHours()
    this.minute=date.getMinutes() <10 ? "0"+date.getMinutes() : date.getMinutes()
    this.second=date.getSeconds() <10 ? "0"+date.getSeconds() : date.getSeconds()
    this.clock=this.hour+":"+this.minute+":"+this.second;
  }

  hasError(event:any){
    console.log(event)
    if(!event){
      this.validPhone=true
      return
    }
    var phoneWithoutd=this.phoneNumber.split(" ").join("")
    
    if(parseInt(phoneWithoutd).toString().length!=phoneWithoutd.length){
      this.validPhone=true
    }
    else{
      this.validPhone=false
    }
  }
  
  
  onCountryChange(event: any) {
    console.log('New country selected:', event);
    //this.country=event.name;
    this.dialCode="+"+event.dialCode;

  }

  checkPasswordStrngth(){
    this.showPasswordShort=false;
    this.showProgressbar=false;
    this.progressbar=0
    if(this.password.length==0){
      return;
    }
    if (this.password.length<8){
      this.showPasswordShort=true;
      return;
    }else{
      
      if (this.password.match(/[a-z]+/)) {
        this.progressbar += 25;
      }
      if (this.password.match(/[A-Z]+/)) {
        this.progressbar += 25;
      }
      if (this.password.match(/[0-9]+/)) {
        this.progressbar += 25;
      }
      if (this.password.match(/[$@#&!]+/)) {
        this.progressbar += 25;
      }
      this.showProgressbar=true
      this.checkPasswordMatch()
    }
    

    console.log("hi")
  }
  

  checkPasswordMatch(){
    this.passwordNotMatch=false
    if(this.confirmPassword.length==0){
      return;
    }
    
    if(this.password!=this.confirmPassword){
      this.passwordNotMatch=true
    }
  }

  register(){
    if(this.country.split(" ").join("").length==0 || this.city.split(" ").join("").length==0 ||
      this.lastName.split(" ").join("").length==0 || this.firstName.split(" ").join("").length==0 ){
      this.alert.showErrorAlert('Please enter a valid Information')
      return;
    }
    
    if(this.password!=this.confirmPassword){
      this.alert.showErrorAlert('Please enter the same Password!')
      return;
    }
    var phoneWithoutd=this.phoneNumber.split(" ").join("")
    console.log(phoneWithoutd)
    
    if(this.validPhone || parseInt(phoneWithoutd).toString().length!=phoneWithoutd.length){
      this.alert.showErrorAlert('Please enter a valid Phone Number')
      return;
    }


    var data = JSON.stringify({
      "firstname": this.firstName,
      "lastname": this.lastName,
      "email": this.email,
      "password": this.password,
      "dob": this.dob,
      "country": this.country,
      "phoneNumber": this.dialCode+" "+this.phoneNumber,
      "city": this.city,
      "gender": this.gender
    });
    
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    var router=this.router;
    var alert=this.alert;
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        
        if(this.status!=200){
          alert.showErrorAlert('Something went wrong');
          return;
        }
        
        if(this.responseText.toString().startsWith('User') || this.responseText.toString().startsWith('Phone')){
          alert.showErrorAlert(this.responseText)
          return;
        }else{
          localStorage.setItem("token",this.responseText);
          
          await alert.loading('Logging In',1500)
          router.navigateByUrl("/acceuil");
          alert.showSuccessAlertWithTimer('Welcome To Vibe Hub',3000)
          
        }
        
      }
    });

    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert('Something went wrong');
    });
    
    xhr.open("POST", this.url1+"/register");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(data);

  }
  
}


