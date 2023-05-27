import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { NotificationService } from 'src/services/notification.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { TimeWaiterService } from 'src/services/time-waiter.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styles: [
  ]
})
export class RequestsListComponent implements OnInit {

  constructor(private alert:SweetAlertServicesService,private friendshipServices:FriendshipService,
    private waiter:TimeWaiterService,private notificationServices:NotificationService) { }

  users!:User[]
  emptyProfilePic=environment.emptyProfilePic
  
  ngOnInit(): void {

    this.friendshipServices.requestListUsers().subscribe(data=>{
      
      console.log("all users: "+JSON.stringify(data))
      console.log(typeof data)
      this.users=JSON.parse(JSON.stringify(data))
    });
  }


  onImageError(event:any){
    event.target.src = this.emptyProfilePic;
  }

  NotConfiguredYet(){
    this.alert.showErrorAlert("Not Configured Yet")
  }

  async acceptRequest(id:any){
    this.friendshipServices.acceptRequest(id,"/friends/"+id)
    var currentUser=JSON.parse(localStorage.getItem("user")!)
    this.notificationServices.saveNotification(currentUser.id,
      " Accept your Friend Request.","ACCEPTREQUEST",id);
  }

  async declineRequest(id:any){
    this.friendshipServices.declineRequest(id,"/friends/"+id)
    //await this.waiter.waitTwoSeconds(1000)
    //this.ngOnInit()
  }

  async blockUser(id:any){
    this.friendshipServices.blockUser(id,"/friends/"+id)
    //await this.waiter.waitTwoSeconds(1000)
    //this.ngOnInit()
  }
}
