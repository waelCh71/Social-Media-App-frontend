import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUserServices=environment.urlUserServices

  constructor(private http:HttpClient) { }

  getUserByToken():Observable<User>{
    var url=this.urlUserServices+"/get-user"
    var token=localStorage.getItem("token")!
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {headers} );
  }

  getUserByID(id:string):Observable<User>{
    var url=this.urlUserServices+"/getUser-ById?id="+id
    var token=localStorage.getItem("token")!
    

    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }

  getAllUsers():Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlUserServices+"/getAllUsers"
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.post<any>(url ,"", {headers} );
  }

  serachList(name:any):Observable<User[]>{
    
    var token=localStorage.getItem("token")

    var url=this.urlUserServices+"/findUserByName?name="+name
    
    const headers = new HttpHeaders().set('Authorization',"Bearer "+ token);

    return this.http.get<any>(url , {headers} );
  }

  changeUserStatut(){
    

var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;
var url=this.urlUserServices+"/setUserStatut"

var token=localStorage.getItem("token")
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", url);
xhr.setRequestHeader("Authorization", "Bearer "+token);

xhr.send();
  }
}
