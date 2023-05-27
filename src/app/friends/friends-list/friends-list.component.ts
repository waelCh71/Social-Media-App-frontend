import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styles: [
  ]
})
export class FriendsListComponent implements OnInit {

  constructor(private userServices:UserService,private alert:SweetAlertServicesService,
    private friendshipServices:FriendshipService,private route:ActivatedRoute) { }

  id=this.route.snapshot.params['id']
  users!:User[]
  emptyProfilePic=environment.emptyProfilePic

  

  ngOnInit(): void {

    this.friendshipServices.friendsList(this.id).subscribe(data=>{
      
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

  deleteFriend(id:any){
    this.friendshipServices.deleteFriend(id,"/friends/"+id)
  }
  

  blockUser(id:any){
    this.friendshipServices.blockUser(id,"/friends/"+id)
    //this.ngOnInit()
  }

}
