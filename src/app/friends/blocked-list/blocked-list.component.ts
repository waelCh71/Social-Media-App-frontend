import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';

@Component({
  selector: 'app-blocked-list',
  templateUrl: './blocked-list.component.html',
  styles: [
  ]
})
export class BlockedListComponent implements OnInit {

  constructor(private alert:SweetAlertServicesService,private friendshipServices:FriendshipService) { }

  users!:User[]
  emptyProfilePic=environment.emptyProfilePic

  ngOnInit(): void {
    this.friendshipServices.blockedListUsers().subscribe(data=>{
      
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

  unBlockUser(id:any){
    this.friendshipServices.unBlockUser(id,"/friends/"+id)
  }

}
