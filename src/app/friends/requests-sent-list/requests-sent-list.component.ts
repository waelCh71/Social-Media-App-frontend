import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';

@Component({
  selector: 'app-requests-sent-list',
  templateUrl: './requests-sent-list.component.html',
  styles: [
  ]
})
export class RequestsSentListComponent implements OnInit {

  constructor(private alert:SweetAlertServicesService,private friendshipServices:FriendshipService) { }

  users!:User[]
  emptyProfilePic=environment.emptyProfilePic

  ngOnInit(): void {
    this.friendshipServices.requestSentListUsers().subscribe(data=>{
      
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

  cancelRequest(id:any){
    this.friendshipServices.cancelRequest(id,"/friends/"+id)
  }
  
  blockUser(id:any){
    this.friendshipServices.blockUser(id,"/friends/"+id)
  }
}
