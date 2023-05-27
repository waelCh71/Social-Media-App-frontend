import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Posts } from 'src/models/posts';
import Swal from 'sweetalert2';
import { SweetAlertServicesService } from './sweet-alert-services.service';
import { TimeWaiterService } from './time-waiter.service';

@Injectable({
  providedIn: 'root'
})

export class postServices {

  constructor(private alert:SweetAlertServicesService,private http:HttpClient,private waiter:TimeWaiterService,) { }

  private urlPostServices=environment.urlPostServices


 public saveProfile_CoverPost(urlMedia:any,title:any){
    //console.log("post services executed: "+urlMedia)
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    //var router=this.router
    var data = JSON.stringify({
      "type": "IMAGE",
      "title": title,
      "audiance": "PUBLIC",
      "text": "",
      "urlMedia": urlMedia
    });
    var checkError=false;

xhr.addEventListener("load", async function() {
  if(this.readyState === 4 ) {
    if(this.status==400){
      alert.showErrorAlert(this.responseText);
      return;
    }
    if(this.status==403){
      alert.showErrorAlert("Request Forbidden. Try Later!");
    }else{
      checkError=true
    await Swal.fire({  
      icon: 'success',
      title: "File upload Succeful",
      showConfirmButton: false,
      timer: 2000
    });
    //console.log("response22: "+this.responseText);
    
    //xhr.DONE
    window.location.reload(); 
    }
  }
});

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", this.urlPostServices+"/add-post");
xhr.setRequestHeader("Authorization", "Bearer "+token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);
//return checkError
  }

  public savePost(urlMedia:any,userFullName:any,audiance:any,postValue:any,postFile:any){
    console.log(urlMedia)
    var postType=""
    var title=""
    if(urlMedia==""){
      postType="TEXT"
      title=userFullName+" Add a New Post";
    }else{
      if(postFile.type.toString().startsWith("video")){
        postType="VIDEO"
        title=userFullName+" Add a New Video";
      }else{
        postType="IMAGE";
        title=userFullName+" Add a New Image";
      }
    }
    console.log(postType)
    console.log(audiance)
    
    var xhr = new XMLHttpRequest();
     var token=localStorage.getItem("token")
    var alert=this.alert
    //var router=this.router
    var data = JSON.stringify({
      "type": postType,
      "title": title,
      "audiance": audiance,
      "text": postValue,
      "urlMedia": urlMedia
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
      alert.showSuccessAlertWithTimer(this.responseText,2000,'center')
      /*await Swal.fire({  
        icon: 'success',
        title: this.responseText,
        showConfirmButton: false,
        timer: 2000
      });*/
      window.location.reload(); 
    }
    
  }
  
});

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", this.urlPostServices+"/add-post");
xhr.setRequestHeader("Authorization", "Bearer "+token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);

  }

  getMyPosts3(id:string):Observable<Posts[]>{
    var url=this.urlPostServices+"/getMyPosts?id="+id
    var token=localStorage.getItem("token")!
    

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {headers} );
  }
  

  getMyPosts2(id:string){
    var url=this.urlPostServices+"/getMyPosts?id="+id
    var token=localStorage.getItem("token")
    var posts:Posts[]=[]
    var settings = {
      "url": url,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token
      },
    };
    
    $.ajax(settings).done(function (response) {
      console.log("resonse is: "+response);
      sessionStorage.setItem("profilePost",response.toString())
      
      posts=response
    });
    //window.location.reload()
  }

    getMyPosts(id:string){
    
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlPostServices+"/getMyPosts?id="+id
    //var router=this.router
    
    var posts:any

    
    
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        sessionStorage.setItem("profilePost",this.responseText)
          window.location.reload()
        
      }
    };

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", "Bearer "+token);
//xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
//console.log("here"+xhr.responseText)
//console.log("posts here: "+posts)

  }

  deletePost(id:string){
    var token=localStorage.getItem("token")
    var xhr = new XMLHttpRequest();
    var alert=this.alert
    var url=this.urlPostServices+"/delete-post?postId="+id

    xhr.onreadystatechange = function() {
      if (this.readyState === 4 ) {
        if(this.status==400){
          alert.showErrorAlert(this.responseText);
          return
        }
        if(this.status==403){
          alert.showErrorAlert("Error Deleting Post")
        }else{
           alert.showSuccessAlertWithTimer(this.responseText,1000)
          window.location.reload()
        }
        
      }
    };

xhr.addEventListener("error", function(e) {
  console.log("Error:", e);
  alert.showErrorAlert("Error Connection To Server!")
});

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", "Bearer "+token);
//xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
  }

  //TODO deletefromFireBase
  deletefromFireBase(){
    /*const storageRef= ref(this.storage,this.user.id+"/Posts/post"+Math.random()+this.postFile.name);
    
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });*/
  }

  getAcceuilPosts(idUser:any):Observable<Posts[]>{

    console.log("idUser: "+idUser)
    
    var url=this.urlPostServices+"/get-acceuilPosts?idUser="+idUser
    var token=localStorage.getItem("token")!
    
    console.log("token : "+token)

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"",{headers});
  }

  getTest():Observable<any>{
    var url=this.urlPostServices
    var token=localStorage.getItem("token")!
    
    console.log("token : "+token)

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url , "",{headers} );
  }



  

}
