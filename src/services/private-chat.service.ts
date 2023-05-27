import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { ChatMessage } from 'src/models/message';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class PrivateChatService {

  constructor(private route: ActivatedRoute,private http:HttpClient,) {}

    url = environment.urlPrivateChatServices;

    stompClient!:Stomp.Client
    privateStompClient!:Stomp.Client

    connectToAll(){
      var socket = new SockJS(this.url+"/ws")

       this.stompClient=Stomp.over(socket);

       this.stompClient.connect({},(frame:any) => {
      console.log(frame);
      this.stompClient.subscribe("/all/messages",  (result:any) =>{
        console.log("result body: "+result)
        this.chatMessages.push(result.body)
      });
    })
    }
  
  connect(){
    var socket=new SockJS(this.url+"/ws")

     this.privateStompClient=Stomp.over(socket);

     this.privateStompClient.connect({},(frame:any) => {
      console.log(frame);
      this.privateStompClient.subscribe("/user/specific",  (result:any) =>{
        console.log("result body: "+result)
        this.chatMessages.push(result.body)
      });
    })

  }

  chatMessages:ChatMessage[]=[];

   sendMessageToAll(message:ChatMessage) {
     this.stompClient.send("/app/application", {}, JSON.stringify(message));
     this.chatMessages.push(message)
  }

  sendPrivateMessage(message:ChatMessage) {
    this.stompClient.send("/app/private", {}, JSON.stringify(message))
 }
}
