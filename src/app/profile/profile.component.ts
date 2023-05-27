import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Comments } from 'src/models/comments';
import { ChatMessage } from 'src/models/message';
import { Posts } from 'src/models/posts';
import { Reactions } from 'src/models/reactions';
import { User } from 'src/models/user';
import { ChatService } from 'src/services/chat.service';
import { CommentService } from 'src/services/comment.service';
import { FriendshipService } from 'src/services/friendship.service';
import { NotificationService } from 'src/services/notification.service';
import { postServices } from 'src/services/posts.service';
import { PrivateChatService } from 'src/services/private-chat.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { TimeWaiterService } from 'src/services/time-waiter.service';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  id=this.route.snapshot.params['id']

  urlUserServices=environment.urlUserServices
  urlPostServices=environment.urlPostServices
  //urlAuthServices=environment.urlLogoutService
  profilePic:any
  coverPic:any
  file:any
  token:any
  user!:User
  myProfileOrNot:boolean=true;
  userOnline:boolean=true
  phoneTo:any
  coverNotFound:string="../../assets/images/emptyProfile.png";
  noImageAvailable=environment.noImageAvailable;
  allowedImageTypes=environment.allowedImageTypes;
  allowedVideoTypes=environment.allowedVideoTypes;

  friendshipButton:string="Follow"
  declineRequestButton:boolean=false
  isMouseOver:boolean=false
  isMouseOver2:boolean=false
  isMouseOver3:boolean=false

  blockButton:string="Block"
  
  showFileBool:boolean=false

  postValue:string="";
  postFile:any;
  audiance:any="FRIENDS"
  maxFilePostSize=environment.maxFilePostSize

  profilePosts:Posts[]=[]
  reactionColor='none'
  //isReactedByUser:boolean=false

  navNameUpdate:boolean=true

  currentUser=JSON.parse(localStorage.getItem("user")!);

  constructor(private router: Router,private route: ActivatedRoute,
     private storage:Storage,private alert:SweetAlertServicesService,private timeWaiter:TimeWaiterService,
     private postServices:postServices,private userService:UserService, private friendshipService:FriendshipService,
     private chatServices:ChatService,private commentsServices:CommentService,private privateChat:PrivateChatService,
     private notificationServices:NotificationService) { }

  async ngOnInit(): Promise<void> {

    //this.profilePic=(localStorage.getItem("profileImageUrl")==null)? null : localStorage.getItem("profileImageUrl")
        
    this.file={}
    this.token=localStorage.getItem("token");

    this.postFile={}
    this.showFileBool=false
    
    
    //console.log(this.postServices.getMyPosts())
    this.user=JSON.parse(localStorage.getItem("user")!);

    this.postServices.getMyPosts3(this.id).subscribe(data=>{
      //console.log("posts: "+  JSON.stringify(data))
      this.profilePosts=JSON.parse(JSON.stringify(data));
    });
    
    //TODO GET USER
    if (this.id==JSON.parse(localStorage.getItem("user")!).id){
      this.user=JSON.parse(localStorage.getItem("user")!);
      this.getProfilePic()
    this.getCoverPic()
    
    }
    else{
      this.myProfileOrNot=false
      this.getProfile();
      this.getProfilePic()
    this.getCoverPic();
    
    this.verifyFriendShipStatut()
    
    

    
    }
    
     
    this.userOnline= (this.user.userStatut=="ONLINE") ? true :false;
    this.phoneTo="tel:"+this.user.phoneNumber;
  }

  connectToAll(){
    
    this.privateChat.connectToAll()
  }

  getProfilePic(){
    if(this.user.profile_pic_url==null || this.user.profile_pic_url.toString().length==0){
      this.profilePic=environment.emptyProfilePic;
    }
    else{
      this.profilePic=this.user.profile_pic_url
    }
  }

  getCoverPic(){
    if(this.user.cover_pic_url==null || this.user.cover_pic_url.toString().length==0){
      this.coverPic=environment.emptyCoverPic;
    }
    else{
      this.coverPic=this.user.cover_pic_url
    }
  }

  setDefaultImage() {
    this.profilePic = this.noImageAvailable;
  }

  updateProfilePic(event:any){
    
    this.file=event.target.files[0];
    console.log(this.file.type);
    if (!this.allowedImageTypes.includes(this.file.type)) {
      this.alert.showErrorAlert("Only image files are allowed.")
      return;
    }

    Swal.fire({
      title: 'Do you want to add '+this.file.name+" as your Profile Picture",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.uploadProfileImage()
      }
    });
  }


  uploadProfileImage(){

    //this.storage.maxOperationRetryTime()
    const storageRef= ref(this.storage,this.user.id+"/profilePic/profile"+this.user.id );
    
    const uploadFile= uploadBytesResumable(storageRef,this.file);

    uploadFile.on('state_changed', 
  (snapshot) => {
    var progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    // Update SweetAlert progress bar
  
    Swal.fire({
      title: 'Uploading...',
      html: 'Uploading... ' + '<br>' +
        '<progress value="' + progress + '" max="100"></progress>',
      timerProgressBar: true,
      showCancelButton:true,
      cancelButtonColor: '#d33',
      showConfirmButton:false
    }).then((result)=>{
      if (!result.isConfirmed) {
        console.log("stooped")
        Swal.close()
        snapshot.task.cancel()
        window.location.reload()
      }
    })
    
    // Close SweetAlert when upload is complete
    
    
    console.log('Upload is ' + progress + '% done');
  },(error) => {
    // Handle unsuccessful uploads
    console.log(error)
    this.alert.showErrorAlert("Something went wrong!")
    window.location.reload()
  },() => {
    // Handle successful uploads on complete
    
    getDownloadURL(uploadFile.snapshot.ref).then(async (downloadURL) => {
      
      //this.profilePic=downloadURL
      this.saveProfileCoverUrl(downloadURL,"/update-profilePic")
      
    });
    
  });
  
  }

  updateCoverPic(event:any){
    
    this.file=event.target.files[0];
    console.log(this.file.type);
    if (!this.allowedImageTypes.includes(this.file.type)) {
      this.alert.showErrorAlert("Only image files are allowed.")
      return;
    }

    Swal.fire({
      title: 'Do you want to add '+this.file.name+" as your Cover Picture",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.uploadCoverImage()
      }
    });
  }

  uploadCoverImage(){

    //this.storage.maxOperationRetryTime()
    const storageRef= ref(this.storage,this.user.id+"/coverPic/cover"+this.user.id );
    
    const uploadFile= uploadBytesResumable(storageRef,this.file);

    uploadFile.on('state_changed', 
  (snapshot) => {
    var progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    // Update SweetAlert progress bar
  
    Swal.fire({
      title: 'Uploading...',
      html: 'Uploading... ' + '<br>' +
        '<progress value="' + progress + '" max="100"></progress>',
      timerProgressBar: true,
      showCancelButton:true,
      cancelButtonColor: '#d33',
      showConfirmButton:false
    }).then((result)=>{
      if (!result.isConfirmed) {
        console.log("stooped")
        Swal.close()
        snapshot.task.cancel()
        window.location.reload()
      }
    })
    
    // Close SweetAlert when upload is complete
    
    
    console.log('Upload is ' + progress + '% done');
  },(error) => {
    // Handle unsuccessful uploads
    console.log(error)
    this.alert.showErrorAlert("Something went wrong!")
    window.location.reload()
  },() => {
    // Handle successful uploads on complete
    
    getDownloadURL(uploadFile.snapshot.ref).then(async (downloadURL) => {
      //console.log("33/ "+this.saveProfile_CoverPost(downloadURL," Updated His Cover Pic"))
      /*if(!this.saveProfile_CoverPost(downloadURL," Updated His Cover Pic")){
        this.alert.showErrorAlert(" Something Went Wrong")
        return;
      }
      else{
        
      }*/
       
      this.saveProfileCoverUrl(downloadURL,"/update-coverPic");
      //this.profilePic=downloadURL
      
      
      
    });
    
  });
  
  }
  

  async saveProfileCoverUrl(downloadURL:string,urlSave:string){
    
    var title=""
    if(urlSave=="/update-coverPic"){
      title=this.user.fullName+" Updated His Cover Pic"
    }else{
      title=this.user.fullName+" Updated His Profile Pic"
    }
    this.token=localStorage.getItem("token");
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    
    var data = JSON.stringify({
      "url": downloadURL.toString()
    });

    
    
//xhr.withCredentials = true;
var url=this.urlUserServices+urlSave
var postServices=this.postServices
xhr.addEventListener("readystatechange", async function() {
  if(this.readyState === 4 ) {
    
    if(this.status==403){
      alert.showErrorAlert("Request Forbidden. Try Later!");
      
    }else{
      localStorage.setItem("user",this.responseText);
      postServices.saveProfile_CoverPost(downloadURL,title)
    /*await Swal.fire({  
      icon: 'success',
      title: "File upload Succeful",
      showConfirmButton: false,
      timer: 2000
    });*/
    
    //window.location.reload(); 
    }
    
    
  }
  
});

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Could Not Connect To Server!")
});

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", "Bearer "+this.token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);
  }

  getProfile(){
    this.userService.getUserByID(this.id).subscribe(data=>{
      console.log("user: "+  JSON.stringify(data))
      this.user=data
      this.getProfilePic();
      this.getCoverPic();
    });
  }

  verifyFriendShipStatut(){
    this.friendshipService.verifyFriendShipStatut(this.id).subscribe(data=>{

      console.log("data: "+data)
      console.log(typeof data)

      if(data=="BLOCKED"){
        this.blockButton="Unblock";
      }
      if(data=="SENDYOUREQUEST"){
        this.friendshipButton="Accept";
        this.declineRequestButton=true
        return
      }
      if(data=="WAITINGFORACCEPT"){
        this.friendshipButton="Unsent";
        return
      }
      if(data=="FRIENDS"){
        this.friendshipButton="UnFollow"
      }
    });
  }

  async sendRequest(){
    if(this.friendshipButton=="Accept"){
      this.friendshipService.acceptRequest(this.user.id,"/profile/"+this.user.id)
      this.notificationServices.saveNotification(this.currentUser.id,
        " Accept your Request.","ACCEPTREQUEST",this.id);
      await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()
      return;
    }
    if(this.friendshipButton=="UnFollow"){
      this.friendshipService.deleteFriend(this.user.id,"/profile/"+this.user.id)
      await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()
      return;
    }
    if(this.friendshipButton=="Unsent"){
      this.friendshipService.cancelRequest(this.user.id,"/profile/"+this.user.id)
      await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()
      return;
    }
    this.friendshipService.sendRequest(this.user.id,"/profile/"+this.user.id)
    this.notificationServices.saveNotification(this.currentUser.id,
      " Send you a Friend Request.","SENDREQUEST",this.id);
      await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()

  }

  async declineRequest(){
    this.friendshipService.declineRequest(this.user.id,"/profile/"+this.user.id)
    await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()

  }

  async blockUser(id:any){
    if(this.blockButton=="Unblock"){
      this.friendshipService.unBlockUser(id,"/profile/"+id)
      await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()
      return;
    }
    this.friendshipService.blockUser(id,"/profile/"+id)
    await this.timeWaiter.waitTwoSeconds(1000)
      this.verifyFriendShipStatut()
  }


  navToTimeline(){}

  //TODO FRIENDS SHOURTCUT
  navToFriends(){
    this.navNameUpdate=false
  }

  navToCommunity(){}

  navToPhoto(){
    this.alert.showErrorAlert("Not Configure yet Please wait")
  }

  NotCofigureYet(){
    this.alert.showErrorAlert("Not Configure yet Please wait")
  }


  onMouseOver() {
    this.isMouseOver = true;
    
  }

  onMouseOut() {
    this.isMouseOver = false;
    
  }

  onMouseOver2() {
    
    this.isMouseOver2=true
  }

  onMouseOut2() {
    
    this.isMouseOver2=false;
  }

  addFileToPost(event:any){
    this.postFile=event.target.files[0];
    console.log(this.postFile.type);
    console.log(this.postFile);

    if(this.postFile==null){
      this.postFile={}
      return;
    }
    if (!this.allowedImageTypes.includes(this.postFile.type) && !this.allowedVideoTypes.includes(this.postFile.type)) {
      this.alert.showErrorAlert("Only images or videos files are allowed.")
      this.postFile={}
      return;
    }
    if (this.postFile.size > this.maxFilePostSize) { // 25MB in bytes
      this.alert.showErrorAlert("The selected file is too large. Please select a file smaller than "
      +Math.round(this.maxFilePostSize/(1024*1024))+"MB")
      
      this.postFile={}
      return;
    }
    this.showFileBool=true
    
    //window.location.reload()
  }

  cancelPostFile(){
    this.showFileBool=false
    this.postFile={}
  }

  addPost(){

    if(this.postFile.size==null && this.postValue==""){
      //console.log(this.profilePosts)
      this.alert.showErrorAlert("Please Add a valid Post")
      return;
    }
    
    if(this.postFile.size!=null){
          this.uploadPostFile() 
    }else{
      this.postServices.savePost("",this.user.fullName,this.audiance,this.postValue,this.postFile)
    }
  }

  uploadPostFile(){
    
    const storageRef= ref(this.storage,this.user.id+"/Posts/post"+Math.random()+this.postFile.name);
    
    const uploadFile= uploadBytesResumable(storageRef,this.postFile);

    uploadFile.on('state_changed',
    
     (snapshot) => {
    var progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    // Update SweetAlert progress bar
      
    Swal.fire({
      title: 'Uploading...',
      html: 'Uploading... ' + '<br>' +
        '<progress value="' + progress + '" max="100"></progress>',
      showCancelButton:true,
      cancelButtonColor: '#d33',
      showConfirmButton:false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading()
      }
    }).then((result)=>{
      if (!result.isConfirmed) {
        console.log("stooped")
        Swal.close()
        snapshot.task.cancel()
        return;
       
      }
    });
    
    // Close SweetAlert when upload is complete
    
    
    console.log('Upload is ' + progress + '% done');
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error)
    this.alert.showErrorAlert("Something went wrong!")
    //window.location.reload()
    
  },() => {
    // Handle successful uploads on complete
    
    getDownloadURL(uploadFile.snapshot.ref).then(async (downloadURL) => {
      
      await Swal.fire({
        icon: 'success',
        title: 'File Saved ',
        showConfirmButton: false,
        timer: 500
      })
      //this.profilePic=downloadURL
      //this.saveImageUrl(downloadURL,"/update-profilePic")
      this.postServices.savePost(downloadURL,this.user.fullName,this.audiance,this.postValue,this.postFile)
      this.cancelPostFile()
      //Swal.close()
      
    });
    
  });
  
  }


  addPlace(){
    this.alert.showErrorAlert("Not Configured yet! Please Wait")
  }

  calculateDate(p:Posts){
    //console.log(p.createdAt);
    //console.log(typeof JSON.parse(p.createdAt.toString()))
    //console.log( Date.now())
  }

  DeletePost(id:string){
    this.postServices.deletePost(id)
  }

  

  messageInput:string=""
  newMessage!:ChatMessage

  sendMessage(){

    if(this.messageInput==""){
      return;
    }

    //var user=JSON.parse(localStorage.getItem("user")!);
    this.newMessage=new ChatMessage(this.currentUser.id,this.messageInput,this.user.id)

    this.chatServices.saveMessage(this.id,this.newMessage).subscribe();
    
    //this.chatServices.sendMessage(this.newMessage);
    this.privateChat.sendMessageToAll(this.newMessage)
    //console.log("messages all: "+this.chatServices.chatMessages)
    
    this.messageInput='';
  }

  

  CloseMessageModel(){
    //this.chatServices.closeWebSocket();
  }

  newComment:string=""
  allComments:Comments[]=[]
  

  addComment(post:Posts){
    if(this.newComment==""){
      return
    }
    console.log("this post: "+JSON.stringify(post))
    this.commentsServices.addComment(this.currentUser.id,this.currentUser.fullName,this.newComment,post.id,post.userId)
    this.notificationServices.saveNotification(this.currentUser.id,
      " Commented Your Post: '"+this.newComment.slice(0,20)+"...' ","NEWCOMMENT",this.user.id);
    //this.getComments(post)
    this.newComment=""
  }

  tempPost:any
  async addCommentFromModel(){
    if(this.newComment==""){
      return
    }
    var post=this.tempPost
    this.commentsServices.addComment(this.currentUser.id,this.currentUser.fullName,this.newComment,post.id,post.userId);
    this.notificationServices.saveNotification(this.currentUser.id,
      " Commented Your Post: '"+this.newComment.slice(0,20)+"...' ","NEWCOMMENT",this.user.id);
    //this.getComments(post)
    this.newComment=""
    await this.timeWaiter.waitTwoSeconds(1000)
    this.getComments(post);
  }

  
  
  getComments(post:Posts){
    
    this.tempPost=post
    //console.log("this post: "+JSON.stringify(post))
    this.commentsServices.getAllComments(post.id,post.userId).subscribe(data=>{
      
      this.allComments=JSON.parse(JSON.stringify(data));
    });
  }

  closeCommentModel(){
    this.allComments=[]
    this.tempPost={}
  }

  addReaction(type:string,p:Posts){
    p.isReactedByUser=!p.isReactedByUser
    //this.reactionColor='cyan'
    console.log(type)
    this.commentsServices.addReaction(this.currentUser.id,type,p.id,p.userId)
    this.notificationServices.saveNotification(this.currentUser.id,
      " Reacted to Your Post","NEWREACTION",this.user.id);
    window.location.reload()
  }

  allReaction:Reactions[]=[]
  getReactions(p:Posts){
    this.commentsServices.getAllReactions(p.id,p.userId).subscribe(data=>{
      this.allReaction=JSON.parse(JSON.stringify(data))
    })
  }


}
