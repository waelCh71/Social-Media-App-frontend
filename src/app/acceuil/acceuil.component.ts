import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Comments } from 'src/models/comments';
import { Posts } from 'src/models/posts';
import { User } from 'src/models/user';
import { BrodcastService } from 'src/services/brodcast.service';
import { CommentService } from 'src/services/comment.service';
import { postServices } from 'src/services/posts.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
import { NotificationService } from 'src/services/notification.service';
import { TimeWaiterService } from 'src/services/time-waiter.service';
import { Reactions } from 'src/models/reactions';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html'
})
export class AcceuilComponent implements OnInit ,AfterViewInit{

  constructor(private http: HttpClient,private router: Router,private userservices: UserService, private commentsServices:CommentService,
    private postServices:postServices,private alert:SweetAlertServicesService,
    private storage:Storage,private brodcastService:BrodcastService,private notificationServices:NotificationService,
    private timeWaiter:TimeWaiterService) { }

  
  urlAuthServices=environment.urlLogoutService
  urlUserServices=environment.urlUserServices;
  urlPostServices=environment.urlPostServices
  urlMedia=environment.urlMediaServices;
  profilePic:any;
  token:any;

  allowedImageTypes=environment.allowedImageTypes
  allowedVideoTypes=environment.allowedVideoTypes
  maxFilePostSize=environment.maxFilePostSize
  noImageAvailable=environment.emptyProfilePic;

  user!:User
  userFirstName:any
  postValue:string=""
  showFileBool:boolean=false;
  postFile:any;
  audiance:any="FRIENDS";

  tunisianBrodCast:any
  initialTunisianBrodCast:number=3
  seeMoreTunButton:any="See More"

  worldWideBrodCast:any
  initialworldWideBrodCast:number=3
  seeMoreworldButton:any="See More"

  sportBrodCast:any
  initialSportBrodCast:number=3
  seeMoreSportButton:any="See More"

  allPosts:any=[]
  

  @ViewChild('post-file') postFileInput!: ElementRef<HTMLInputElement>;
  
  
  ngOnInit(): void {
    
    
    this.token=localStorage.getItem("token");
    if(localStorage.getItem("user")==null){
      console.log("111")
      this.getUser();
      //HeaderComponent.call(ngOnInit,this.router)
      
    }else{
      this.user=JSON.parse(localStorage.getItem("user")!)
      
    //this.getAcceuilPosts()
    }
    
    console.log(this.user)
    this.userFirstName=this.user.firstname;

    this.postFile={}
    
    
  }

  getPosts(){
    this.getAcceuilPosts()
  }
  acceuillPosts:any=[]
  ngAfterViewInit(): void {
    this.getAcceuilPosts()
    /*this.postServices.getTest().subscribe(data=>{
      console.log("test: "+data)
    })*/
    
    /*this.postServices.getAcceuilPosts()
    .pipe(map(response=>{
      //console.log("test: "+response.entries())
      
      for(let key in response){
        
        this.acceuillPosts.push(JSON.parse(JSON.stringify(key)))
        //this.allPosts=response
        console.log(this.acceuillPosts)
        //this.allPosts.set(JSON.parse(JSON.stringify(key)),response.get(JSON.parse(JSON.stringify(key))))
        //this.acceuillPosts.push(JSON.parse("{"+key.slice(6,key.length)+"}"))
      }
      
      
      //console.log("allUser: "+JSON.parse(JSON.stringify(response.)))
      console.log("type: "+typeof response)
      
    }))
    .subscribe(data =>{
      //this.allPosts=JSON.parse(JSON.stringify(data))
      //this.acceuillPosts = this.acceuillPosts = [...this.allPosts.keys()];
      console.log("post: "+this.allPosts)
      console.log(typeof data)
      
    });*/
  }

  getAcceuilPosts(){
    this.postServices.getAcceuilPosts(this.user.id).subscribe(data=>{
      this.acceuillPosts=JSON.parse(JSON.stringify(data))
      console.log("Acc post: "+this.acceuillPosts)
    })
  }
  
  NotConfugured(){
    this.alert.showErrorAlert("Not Covigured yet Please Wait")
  }

   getUser(){
    this.userservices.getUserByToken().subscribe(data=>{
      
      localStorage.setItem("user",JSON.stringify(data));
      window.location.reload()
      
    })

    /*var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        localStorage.setItem("user",this.response)
          window.location.reload()
        
      }
    };

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  //alert("Something Went Wrong! Try Again...");
  
});

xhr.open("POST", this.urlUserServices+"/get-user");
xhr.setRequestHeader("Authorization", "Bearer "+this.token);

xhr.send();*/

  }


  getProfilePic() {
    const token = localStorage.getItem("token"); 
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    var profilePic= this.profilePic
    var data=""

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        if(this.status!=200){
          console.log("error "+this.responseText);
          
        }
        else{
       //   var yourData = atob(this.responseText);
       var yourData = window.btoa(unescape(encodeURIComponent(this.responseText)));
       var imgSrc = "data:image/jpeg;base64," + yourData;
       profilePic = imgSrc;
       console.log(profilePic)
          
        }
        
      }
    });
    
    xhr.addEventListener("error", () => {
      console.error("Failed to get profile picture.");
    });

xhr.open("GET", this.urlMedia+"/getProfilePic");
xhr.setRequestHeader("Authorization", "Bearer "+token);

xhr.send(data);

  }

  Speech(){
    this.alert.showErrorAlert("Not Covigured yet Please Wait")
  }

  //Tunisian
  TunisianBrodcast(){
    //this.alert.showErrorAlert("Not Covigured yet Please Wait")
    if(this.initialTunisianBrodCast>=this.brodcastService.getTunisianBrodCast().length){
      console.log("hello")
      this.seeMoreTunButton="Show Less"
    }else{
      this.seeMoreTunButton="Show More"
    }

    var allTunisianBrodcast=this.brodcastService.getTunisianBrodCast();
    this.tunisianBrodCast=allTunisianBrodcast.slice(0,this.initialTunisianBrodCast)
    //this.tunisianBrodCast
    console.log("tun  brod: "+this.tunisianBrodCast);
  }
  seeMoreOrLessTun(){
    
    if(this.seeMoreTunButton=="Show Less"){
      this.initialTunisianBrodCast=3
    this.TunisianBrodcast()
    return;
    }
    this.seeMoreTunButton="Show More"
    this.initialTunisianBrodCast+=3
    this.TunisianBrodcast()
  }

  //Sport
  SportBrodcast(){
    
    //this.alert.showErrorAlert("Not Covigured yet Please Wait")

    if(this.initialSportBrodCast>=this.brodcastService.getSportBrodCast().length){
      this.seeMoreSportButton="Show Less"
    }else{
      this.seeMoreSportButton="Show More"
    }

    var allSportBrodcast=this.brodcastService.getSportBrodCast();
    this.sportBrodCast=allSportBrodcast.slice(0,this.initialSportBrodCast)
    //this.tunisianBrodCast
    //console.log("tun  brod: "+this.tunisianBrodCast);
  }
  seeMoreOrLessSport(){
    if(this.brodcastService.getSportBrodCast().length<=3){
      return;
    }
    
    if(this.seeMoreSportButton=="Show Less"){
      this.initialSportBrodCast=3
    this.SportBrodcast()
    return;
    }
    this.seeMoreSportButton="Show More"
    this.initialSportBrodCast+=3
    this.SportBrodcast()
  }

  //WOrldWide
  WorldWideBrodcast(){
    if(this.initialworldWideBrodCast>=this.brodcastService.getWorldWideBrodCast().length){
      
      this.seeMoreworldButton="Show Less"
    }else{
      this.seeMoreworldButton="Show More"
    }

    var allWorldBrodcast=this.brodcastService.getWorldWideBrodCast();
    this.worldWideBrodCast=allWorldBrodcast.slice(0,this.initialworldWideBrodCast)
    //this.tunisianBrodCast
    
  }
  seeMoreOrLessWorld(){
    
    if(this.seeMoreworldButton=="Show Less"){
      this.initialworldWideBrodCast=3
    this.WorldWideBrodcast()
    return;
    }
    this.seeMoreworldButton="Show More"
    this.initialworldWideBrodCast+=3
    this.WorldWideBrodcast()
  }

  //Favourite
  FavouriteBrodcast(){}

  openBrodcastWindow(currentURL:any) {
    console.log(currentURL.changingThisBreaksApplicationSecurity)
    currentURL=currentURL.changingThisBreaksApplicationSecurity
    const myData = { message: 'Hello from the parent window!' };
    //const myUrl = 'https://example.com/my-page';
    const myWindow = window.open(currentURL, '_blank','width=700,height=150')!;
    //myWindow.postMessage(myData, '*');
  }

  CloseBrodCast(){
    window.location.reload()
    //console.log("closed")
  }

  Watch(){
    this.alert.showErrorAlert("Not Covigured yet Please Wait")
  }
  addPlace(){
    this.alert.showErrorAlert("Not Covigured yet Please Wait")
  }

  addFileToPost(event:any){
    if(event.returnValue==false){
      console.log("not changed")
    }
    this.postFile=event.target.files[0];
    console.log(event);
    console.log("file value: "+this.postFile);

    
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
      this.alert.showErrorAlert("The selected file is too large. Please select a file smaller than 25MB.")
      this.postFile={}
      event.type="load"
      console.log(event)
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
      timerProgressBar: true,
      showCancelButton:true,
      cancelButtonColor: '#d33',
      showConfirmButton:false
    }).then((result)=>{
      if (!result.isConfirmed) {
        console.log("stooped")
        Swal.close()
        snapshot.task.cancel()
        return;
       // window.location.reload()
      }
    });
    
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

  newComment:string=""
  allComments:Comments[]=[]
  

  addComment(post:Posts){
    if(this.newComment==""){
      return
    }
    console.log("this post: "+JSON.stringify(post))
    this.commentsServices.addComment(this.user.id,this.user.fullName,this.newComment,post.id,post.userId)
    this.notificationServices.saveNotification(this.user.id,
      " Commented Your Post: '"+this.newComment.slice(0,20)+"...' ","NEWCOMMENT",post.userId);
    //this.getComments(post)
    this.newComment=""
  }

  tempPost:any
  async addCommentFromModel(){
    if(this.newComment==""){
      return
    }
    var post=this.tempPost
    this.commentsServices.addComment(this.user.id,this.user.fullName,this.newComment,post.id,post.userId)
    this.notificationServices.saveNotification(this.user.id,
      " Commented Your Post: '"+this.newComment.slice(0,20)+"...' ","NEWCOMMENT",post.userId);

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

    this.commentsServices.addReaction(this.user.id,type,p.id,p.userId)
    this.notificationServices.saveNotification(this.user.id,
      " Reacted to Your Post. ","NEWREACTION",p.userId);
    //this.getPosts()
  }

  allReaction:Reactions[]=[]
  getReactions(p:Posts){
    this.commentsServices.getAllReactions(p.id,p.userId).subscribe(data=>{
      this.allReaction=JSON.parse(JSON.stringify(data))
    })
  }

  DeletePost(id:string){
    this.postServices.deletePost(id)
  }






}
