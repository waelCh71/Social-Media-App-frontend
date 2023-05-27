import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { NotificationService } from 'src/services/notification.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styles: [
  ]
})
export class SuggestionListComponent implements OnInit {

  constructor(private alert:SweetAlertServicesService,private friendshipServices:FriendshipService,
    private notificationServices:NotificationService) { }

  users!:User[]
  emptyProfilePic=environment.emptyProfilePic

  ngOnInit(): void {

    this.friendshipServices.suggestionListUsers().subscribe(data=>{
      
      //console.log("all users: "+JSON.stringify(data))
      //console.log(typeof data)
      this.users=JSON.parse(JSON.stringify(data))
    });
  }

  onImageError(event:any){
    event.target.src = this.emptyProfilePic;
  }

  NotConfiguredYet(){
    this.alert.showErrorAlert("Not Configured Yet")
  }

  blockUser(id:any){
    this.friendshipServices.blockUser(id,"/friends/"+id)
  }

  sendRequest(id:any){
    this.friendshipServices.sendRequest(id,"/friends/"+id)
    var currentUser=JSON.parse(localStorage.getItem("user")!)
    this.notificationServices.saveNotification(currentUser.id,
      " Send you a Friend Request.","SENDREQUEST",id);
  }

}
