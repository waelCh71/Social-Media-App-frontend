import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comments } from 'src/models/comments';
import { Reactions } from 'src/models/reactions';
import { SweetAlertServicesService } from './sweet-alert-services.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private alert:SweetAlertServicesService,private http:HttpClient) { }
  

  private urlPostServices=environment.urlPostServices



  public addComment(userId:any,userName:any,text:any,idPost:any,idUserPost:any){
    
    var url=this.urlPostServices+"/add-comment?idPost="+idPost+"&idUserPost="+idUserPost
    
    var xhr = new XMLHttpRequest();
     var token=localStorage.getItem("token")
    var alert=this.alert
    //var router=this.router
    var data = JSON.stringify({
      "userId": userId,
      "text": text,
      "userName":userName
    });

xhr.addEventListener("readystatechange", async function() {
  if(this.readyState == 4 ) {
    if(this.status==400){
      alert.showErrorAlert(this.responseText);
      return;
    }
    if(this.status==403){
      alert.showErrorAlert("Request Forbidden. Try Later!")
      return;
    }else{
      //alert.showSuccessAlertWithTimer(this.responseText,1000)
      
      //window.location.reload(); 
    }
    
  }
  
});

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", "Bearer "+token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);

  }


  getAllComments(idPost:string,idUserPost:string):Observable<Comments[]>{
    var url=this.urlPostServices+"/get-comments?idPost="+idPost+"&idUserPost="+idUserPost
    var token=localStorage.getItem("token")!
    

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {headers} );
  }

  public addReaction(userId:any,type:any,idPost:any,idUserPost:any){
    
    var url=this.urlPostServices+"/add-reaction?idPost="+idPost+"&idUserPost="+idUserPost
    
    var xhr = new XMLHttpRequest();
     var token=localStorage.getItem("token")
    var alert=this.alert
    //var router=this.router
    var data = JSON.stringify({
      "userId": userId,
      "type": type,
      
    });

xhr.addEventListener("readystatechange", async function() {
  if(this.readyState == 4 ) {
    if(this.status==400){
      alert.showErrorAlert(this.responseText);
      return;
    }
    if(this.status==403){
      alert.showErrorAlert("Request Forbidden. Try Later!")
      return;
    }else{
      alert.showSuccessAlertWithTimer(this.responseText,1000)
      
      //window.location.reload(); 
    }
    
  }
  
});

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", "Bearer "+token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);

  }

  getAllReactions(idPost:string,idUserPost:string):Observable<Reactions[]>{
    var url=this.urlPostServices+"/get-reactions?idPost="+idPost+"&idUserPost="+idUserPost
    var token=localStorage.getItem("token")!
    

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {headers} );
  }
}
