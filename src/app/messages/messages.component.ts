import { AfterViewChecked, Component, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { ChatMessage } from 'src/models/message';
import { User } from 'src/models/user';
import { ChatService } from 'src/services/chat.service';
import { FriendshipService } from 'src/services/friendship.service';
import { PrivateChatService } from 'src/services/private-chat.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { TimeWaiterService } from 'src/services/time-waiter.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit ,OnDestroy, AfterViewChecked{

  @ViewChild('messagesContainer') messagesContainerRef!: ElementRef;

  constructor(private alert:SweetAlertServicesService,public chatServices:ChatService,private renderer: Renderer2,
    private friendshipServices: FriendshipService,public privateChatService:PrivateChatService,
    public privateChat:PrivateChatService,private waiter:TimeWaiterService) { }
  
  ngAfterViewChecked(): void {
    this.onNewMessageAdded();
  }
  ngOnDestroy(): void {
    //this.chatServices.closeWebSocket()
  }

  user!:User
  messageInput:string=""
  newMessage!:ChatMessage
  listChat!:User[]
  emptyProfilePic=environment.emptyProfilePic
  userToChat!:User
  allMessage!:ChatMessage[]

  url = environment.urlPrivateChatServices;

    stompClient:any
    privateStompClient:any

  ngOnInit(): void {


    this.user=JSON.parse(localStorage.getItem("user")!);
    //this.chatServices.openWebSocket();
    
    //this.connect()
    this.connectToAll()
    

    this.friendshipServices.friendsList(this.user.id).subscribe(data=>{
      
      console.log("list chat beefor friends: "+this.listChat)
      this.listChat=JSON.parse(JSON.stringify(data))

      this.userToChat=this.listChat[0]
      this.getAllMessages();
      
    });
    //this.onNewMessageAdded()

    //this.chatServices.connect("64420b72738c2e17c8038512")

    

  }

  ngAfterViewInit() {
    this.onNewMessageAdded();
  }

  async waiting(){
    console.log("a")
    //await this.waiter.waitTwoSeconds(2000)
    console.log("b")
  }

  connectToAll(){
    
    var socket = new SockJS(this.url+"/ws")

     this.stompClient=Stomp.over(socket);

     this.stompClient.connect({},(frame:any) => {
      console.log("frame: "+frame);
    this.stompClient.subscribe("/all/messages",  async (result: string) =>{
      console.log("result body: "+result)
      await this.waiter.waitTwoSeconds(1000)
      this.getAllMessages()
      //this.chatMessages.push(result.body)
    });
  })
  }

  connect(){
  var socket=new SockJS(this.url+"/ws")

   this.privateStompClient=Stomp.over(socket);

   this.privateStompClient.connect({},(frame:any) => {
    console.log("frame: "+frame);
    this.privateStompClient.subscribe("/user/specific",  (result:any) =>{
      console.log("result body: "+result)
      //this.chatMessages.push(result.body)
    });
  })

  }

  getAllMessages(){
    this.chatServices.getAllMessages(this.userToChat.id).subscribe(data=>{
      
      
      this.allMessage=JSON.parse(JSON.stringify(data))
      console.log(data)
    });
  }

  newMessageList:ChatMessage[]=[]
  sendMessageToAll() {
    if(this.messageInput==""){
      return;
    }
    
    this.newMessage=new ChatMessage(this.user.id,this.messageInput,this.userToChat.id)
    this.chatServices.saveMessage(this.userToChat.id,this.newMessage).subscribe();
    this.stompClient.send("/app/application", {}, JSON.stringify(this.newMessage));
    //this.newMessageList.push(this.newMessage)
    this.messageInput=""
 }

  onImageError(event:any){
    event.target.src = this.emptyProfilePic;
  }

  sendMessage(){

    if(this.messageInput==""){
      return;
    }

    this.newMessage=new ChatMessage(this.user.id,this.messageInput,this.userToChat.id)

    //this.chatServices.saveMessage(this.userToChat.id,this.newMessage).subscribe();
    
    //this.chatServices.sendMessage(this.newMessage);
    this.privateChat.sendMessageToAll(this.newMessage)
    //this.privateChat.sendPrivateMessage(this.newMessage)
    this.onNewMessageAdded()
    this.getAllMessages();
    this.messageInput=""
  }

  onNewMessageAdded() {
    // Get a reference to the container element
    const messagesContainer = this.messagesContainerRef.nativeElement;
    
    // Scroll to the bottom of the container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  navToChat(user:any){
    //this.chatServices.closeWebSocket()
    //this.chatServices.openWebSocket()
    console.log(user)
    this.userToChat=user
    this.getAllMessages()
  }

}
