import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/models/notification';
import { SweetAlertServicesService } from './sweet-alert-services.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private sweetAlert:SweetAlertServicesService,private http:HttpClient) { 
    this.connectToNotificationWebSocket()
  }

  stompClient!:any
    privateStompClient!:any

  urlNotificationServices=environment.urlNotificationServices

  public getAllNotification(idUser:any):Observable<Notification[]>{

    var url=this.urlNotificationServices+"/getAllNotification?idUser="+idUser
    
    //const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {} );
  }

  public saveNotification(userId:any,title:any,type:any,toUser:any){
    
    
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    // var token=localStorage.getItem("token")
    var sweetAlert=this.sweetAlert
    //var router=this.router
    var data = JSON.stringify({
      "userId": userId,
      "title": title,
      "type": type
    });

    var sendNotification= (notification:any)=>{
      this.sendNotification(notification)
    }
xhr.addEventListener("readystatechange", async function() {
  if(this.readyState == 4 ) {
    
      //alert.showSuccessAlertWithTimer(this.responseText,2000,'center')
      sendNotification(data);
  }
  
});

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  sweetAlert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", this.urlNotificationServices+"/saveNotification?toUser="+toUser);
//xhr.setRequestHeader("Authorization", "Bearer "+token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);
  }

  connectToNotificationWebSocket(){
    var socket = new SockJS(this.urlNotificationServices+"/wsNotification")

     this.stompClient=Stomp.over(socket);

     this.stompClient.connect({},(frame:any) => {
    console.log("Notification web socket: "+frame);
    this.stompClient.subscribe("/all/notification",  (result:any) =>{
      console.log("result body: "+result)
      
    });
  });
  }

  sendNotification(notification:any){
    this.stompClient.send("/app/application", {}, notification);
  }


}
