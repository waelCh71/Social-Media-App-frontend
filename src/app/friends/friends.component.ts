import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styles: [
  ]
})
export class FriendsComponent implements OnInit {

  constructor(private alert:SweetAlertServicesService,private route: ActivatedRoute, private userService:UserService,
    private friendshipService:FriendshipService) { }

  id=this.route.snapshot.params['id']

  user!:User
  myProfileOrNot:boolean=true
  profilePic:any
  coverPic:any
  errorImage=environment.noImageAvailable

  isMouseOver:boolean=false
  isMouseOver2:boolean=false

  friendsListComponent:boolean=true
  requestsListComponent:boolean=false
  requestsSentListComponent:boolean=false
  sugguestListComponent:boolean=false
  blockedListComponent:boolean=false
  serachListComonent:boolean=false

  searchInput:string=""

  friendshipButton:string="Follow"
  declineRequestButton:boolean=false

  ngOnInit(): void {
    //console.log(this.id)

    //TODO GET USER
    if (this.id==JSON.parse(localStorage.getItem("user")!).id){
      this.user=JSON.parse(localStorage.getItem("user")!);
      this.getProfilePic()
    this.getCoverPic()
    }
    else{
      this.myProfileOrNot=false
      this.getProfile();
      this.verifyFriendShipStatut()
    }
    
  }

  NotCofigureYet(){
    this.alert.showErrorAlert("Not Co nfigured Yet")
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

  sendRequest(){
    if(this.friendshipButton=="Accept"){
      this.friendshipService.acceptRequest(this.user.id,"/profile/"+this.user.id)
      return;
    }
    if(this.friendshipButton=="UnFollow"){
      this.friendshipService.deleteFriend(this.user.id,"/profile/"+this.user.id)
      return;
    }
    if(this.friendshipButton=="Unsent"){
      this.friendshipService.cancelRequest(this.user.id,"/profile/"+this.user.id)
      return;
    }
    this.friendshipService.sendRequest(this.user.id,"/profile/"+this.user.id)
  }

  declineRequest(){
    this.friendshipService.declineRequest(this.user.id,"/profile/"+this.user.id)
  }

  blockUser(){
    this.friendshipService.blockUser(this.user.id,"/profile/"+this.user.id)
  }


  navToPhoto(){
    this.alert.showErrorAlert("Not Co nfigured Yet")
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

  navToFriendsList(){
    this.friendsListComponent=true
    this.requestsListComponent=false
    this.requestsSentListComponent=false
    this.sugguestListComponent=false
    this.blockedListComponent=false
    this.serachListComonent=false
  }

  navToRequestsList(){
    this.friendsListComponent=false
    this.requestsListComponent=true
    this.requestsSentListComponent=false
    this.sugguestListComponent=false
    this.blockedListComponent=false
    this.serachListComonent=false
  }

  navToRequestsSentList(){
    this.friendsListComponent=false
    this.requestsListComponent=false
    this.requestsSentListComponent=true
    this.sugguestListComponent=false
    this.blockedListComponent=false
    this.serachListComonent=false
  }

  navToSuggestList(){
    this.friendsListComponent=false
    this.requestsListComponent=false
    this.requestsSentListComponent=false
    this.sugguestListComponent=true
    this.blockedListComponent=false
    this.serachListComonent=false
  }

  navToBlockedList(){
    this.friendsListComponent=false
    this.requestsListComponent=false
    this.requestsSentListComponent=false
    this.sugguestListComponent=false
    this.blockedListComponent=true
    this.serachListComonent=false
  }

  searchUser(){
    //this.ngOnInit()
    //window.location.reload()
    this.serachListComonent=false
    this.friendsListComponent=true
    this.friendsListComponent=false

    this.requestsListComponent=false
    this.requestsSentListComponent=false
    this.sugguestListComponent=false
    this.blockedListComponent=false
    this.serachListComonent=true
    
  }
  
}
