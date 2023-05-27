import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { SweetAlertServicesService } from './sweet-alert-services.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private alert:SweetAlertServicesService,private http:HttpClient,private router:Router) { }

  private urlFriendShipServices=environment.urlFriendshipServices
  private urluserServices=environment.urlUserServices

  

  verifyFriendShipStatut(id:any):Observable<string>{
    
    var token=localStorage.getItem("token")

    var url=this.urlFriendShipServices+"/verifyFriendShip?idUser="+id
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {headers} );
  }

  friendsList(id:any):Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlFriendShipServices+"/friendList?idUser="+id
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }

  requestListUsers():Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlFriendShipServices+"/requestList"
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }

  requestSentListUsers():Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlFriendShipServices+"/requestSentList"
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }
  

  blockedListUsers():Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlFriendShipServices+"/blockedList"
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }

  suggestionListUsers():Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlFriendShipServices+"/suggestionList"
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }

  sendRequest(id:any,redirectTo:string){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/sendRequest?idUserRequest="+id
    
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==400){
          alert.showErrorAlert(this.responseText)
          return;
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          if(!redirectTo.startsWith("/profile")){
            router.navigateByUrl(redirectTo)
          window.location.reload()
          }
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  acceptRequest(id:any,redirectTo:any){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/acceptRequest?idFriend="+id
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==400){
          alert.showErrorAlert(this.responseText)
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          if(!redirectTo.startsWith("/profile")){
            router.navigateByUrl(redirectTo)
          window.location.reload()
          }
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  deleteFriend(id:any,redirectTo:any){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/deleteFriend?idFriend="+id
    
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==403){
          alert.showErrorAlert(this.responseText)
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          router.navigateByUrl(redirectTo)
          window.location.reload()
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  cancelRequest(id:any,redirectTo:any){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/cancelRequest?idUserRequest="+id
    
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==403){
          alert.showErrorAlert(this.responseText)
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          router.navigateByUrl(redirectTo)
          window.location.reload()
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  declineRequest(id:any,redirectTo:any){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/declineRequest?idUserRequest="+id
    
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==403){
          alert.showErrorAlert(this.responseText)
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          router.navigateByUrl(redirectTo)
          window.location.reload()
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  blockUser(id:any,redirectTo:any){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/blockFriend?idFriend="+id
    
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==400){
          alert.showErrorAlert(this.responseText)
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          router.navigateByUrl(redirectTo)
          window.location.reload()
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  unBlockUser(id:any,redirectTo:any){
    
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlFriendShipServices+"/unblockFriend?idFriend="+id
    
    var router=this.router
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4) {
        if(this.status==400){
          alert.showErrorAlert(this.responseText)
        }
        if(this.status==200){
          alert.showSuccessAlertWithTimer(this.responseText,1000)
          router.navigateByUrl(redirectTo)
          window.location.reload()
          
        }
        
      }
    });
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      alert.showErrorAlert("Error Connecting to the Server")
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+token);
    
    
    xhr.send();
  }

  
}
