import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/models/notification';
import { User } from 'src/models/user';
import { NotificationService } from 'src/services/notification.service';
import { TimeWaiterService } from 'src/services/time-waiter.service';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  urlAuthServices=environment.urlLogoutService
  urlMedia=environment.urlMediaServices
  token:any;
  user!:User;
  id:any;
  profilePic:any;
  errorImage=environment.emptyProfilePic

  nbNotification:number=0

  stompClient!:any
    privateStompClient!:any
  constructor(private router:Router,private notificationService:NotificationService,private waiter:TimeWaiterService,
    private userServices:UserService) { }

   ngOnInit() {
    var token=localStorage.getItem("token");

    
    this.user=JSON.parse(localStorage.getItem("user")!)
    this.id=this.user.id
    
    this.getProfilePic();

    this.connectToNotificationWebSocket()

  }


  openNotification(){
    this.nbNotification=0
    this.getAllNotification()
  }

  allNotification:Notification[]=[]
  getAllNotification(){
    this.notificationService.getAllNotification(this.id).subscribe(data=>{
      this.allNotification=data
      console.log("all notif: "+this.allNotification)
    })
  }

getProfilePic(){
    if(this.user.profile_pic_url==null || this.user.profile_pic_url.toString().length==0){
      this.profilePic=environment.emptyProfilePic;
    }
    else{
      this.profilePic=this.user.profile_pic_url
    }
  }

  
  

  async logout(){

    this.userServices.changeUserStatut()
    await this.waiter.waitTwoSeconds(500)

    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    var router=this.router
    
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4 && this.status===200) {
        localStorage.clear();
        await Swal.fire({
          title: 'Logging Out',
          showConfirmButton: false,
          timer: 1000
        })
        window.location.reload()
      }
    });
    
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      //alert("Something Went Wrong! Try Again...");
      
    });
    
    xhr.open("POST", this.urlAuthServices+"/logout");
    xhr.setRequestHeader("Authorization", "Bearer "+this.token);
    
    xhr.send();
  }

     
  


  url = environment.urlNotificationServices;

    connectToNotificationWebSocket(){
      var socket = new SockJS(this.url+"/wsNotification")

       this.stompClient=Stomp.over(socket);

       this.stompClient.connect({},(frame:any) => {
      console.log("Notification web socket: "+frame);
      this.stompClient.subscribe("/all/notification",  async (result:any) =>{
        console.log("result body: "+result)
        await this.waiter.waitTwoSeconds(1000)
        //this.nbNotification+=1
        this.getAllNotification()
        
      });
    })
    }

  



}
