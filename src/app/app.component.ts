import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  url1=environment.urlAuthentificationService;

  token:any;
  rememberMe:any;
  profilePic:any;
  showHeader:boolean=true;

  ngOnInit(): void {
    this.token=localStorage.getItem("token")
    this.rememberMe=localStorage.getItem("rememberMe")
    

    if((this.rememberMe=="false" || this.rememberMe==null) && this.token==null){
      this.router.navigateByUrl("/signIn")
    }
    else{
      if(this.rememberMe=="false" && this.token!=null){
        this.router.routerState
      }else{
        this.verifyTokenValidity()
      }
    }
    
    this.showNavBar()

  }
  title = 'PFA';


  verifyTokenValidity() {
    
    //var token=localStorage.getItem("token");
    var router=this.router
    this.token=localStorage.getItem("token")
var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;

xhr.addEventListener("readystatechange", async function() {
  if(this.readyState === 4) {
    if(this.status==400){
      localStorage.clear()
      await Swal.fire({  
        icon: 'error',
        title: "Your Session Has Expired",
        showConfirmButton: false,
        timer: 1000
      });
      router.navigateByUrl("/signIn")
      return;
    }
    if(this.status==403){
      alert("Request Forbidden")
    }
    localStorage.setItem("token",this.responseText);
    router.routerState
      
    console.log("router: "+router.routerState)
      //xhr.DONE
      
  
  }
    
    
  
});
xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert("Could Not Connect To Server!")
  router.navigateByUrl("/signIn")
});



xhr.open("POST", this.url1+"/checkToken");
xhr.setRequestHeader("Authorization", "Bearer "+this.token);

xhr.send();
  }


  showNavBar(){
    this.router.events.subscribe((val:any)=>{
      if(val instanceof NavigationEnd){
        if(val.url=='/signIn' || val.url=='/signUp'){
          this.showHeader=false
        }else{
          this.showHeader=true
        }
        if(!val.url.startsWith('/profile')){
          sessionStorage.removeItem("profilePost")
        }
      }
    })
  }
  

  
}



