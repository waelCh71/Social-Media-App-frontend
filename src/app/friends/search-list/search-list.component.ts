import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { FriendshipService } from 'src/services/friendship.service';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styles: [
  ]
})
export class SearchListComponent implements OnInit {


  @Input('nameUser') nameUser:string=""
  users!:User[]
  
  constructor(private userServices:UserService,private friendshipServices:FriendshipService,
     private alert:SweetAlertServicesService) { }

  emptyProfilePic=environment.emptyProfilePic
  userButton:string="Follow"

  ngOnInit(): void {

    this.userServices.serachList(this.nameUser).subscribe(data=>{
      
      //console.log("all users: "+JSON.stringify(data))
      //console.log(typeof data)
      this.users=JSON.parse(JSON.stringify(data))
    });
    console.log("hello "+this.nameUser)

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

  goToProfile(id:any){
    //this.friendshipServices.sendRequest(id,"/friends/"+id)

  }

}
