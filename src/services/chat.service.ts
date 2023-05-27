import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatMessage } from 'src/models/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private urlChatServices=environment.urlChatServices
  private urlWebSocket=environment.urlChatWebSocket
  
  webSocket!:WebSocket
  chatMessages:ChatMessage[]=[];

  constructor(private http:HttpClient) {
    this.webSocket=new WebSocket(this.urlWebSocket)
  }


  public openWebSocket(){
    this.webSocket.onopen= (event)=>{
      console.log("open: ",event)
    }

    this.webSocket.onmessage= (event)=>{
      console.log("message: ",event)
      const chatMessageDto= JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto)
    }
    this.webSocket.onclose= (event)=>{
      console.log("close: ",event)
    }
  }

  public sendMessage(chatMessages: ChatMessage){
    console.log("message2 :"+chatMessages)
    this.chatMessages.push(chatMessages)
    this.webSocket.send(JSON.stringify(chatMessages))
  }

  public closeWebSocket(){
    this.webSocket.close()
  }

  public saveMessage(idReceiver:any, message:ChatMessage){
    var url=this.urlChatServices+"/saveMessage?idReceiver="+idReceiver
    var token=localStorage.getItem("token")!
    /*var data = JSON.stringify({
      "messageValue": "IMAGE",
      "title": title,
      "audiance": "PUBLIC",
      "text": "",
      "urlMedia": urlMedia
    });*/

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,message, {headers} );
  }
  
  
  public getAllMessages(idUser:any){
    var url=this.urlChatServices+"/getMessages?idUser1="+idUser
    var token=localStorage.getItem("token")!

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    
    return this.http.post<any>(url ,"", {headers} );
  }

  public getAllChats(){
    var url=this.urlChatServices+"/getChats"
    var token=localStorage.getItem("token")!

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    
    return this.http.post<any>(url ,"", {headers} );
  }
  
}
