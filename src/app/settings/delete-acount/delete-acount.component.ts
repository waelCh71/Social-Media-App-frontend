import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-acount',
  templateUrl: './delete-acount.component.html',
  styles: [
  ]
})
export class DeleteAcountComponent implements OnInit {

  url=environment.urlUserServices

  token:any
  password:any;
  isCheked:boolean=false
  formValid:boolean=false


  constructor(private http:HttpClient, private router:Router,private location:Location) { }

  ngOnInit(): void {
    this.token=localStorage.getItem("token")

  }

  checkButton(event:any){
    //console.log(this.isCheked)
  }

  deleteAcount(){
    Swal.fire({
      title: 'Are you sure?',
      text: "This Action Connot Be Undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Acount!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendDeleteRequest()
      }
    })
  }

  sendDeleteRequest(){
    
    var url=this.url+"/delete-profile"+"?password="+this.password

    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", async function() {
      if(this.readyState === 4 && this.status===200) {
        localStorage.clear();
        await Swal.fire({
          icon: 'success',
          title: 'Acount Deleted Succesfuly',
          
        })
        window.location.reload()
      }
    });
    
    xhr.addEventListener("error", function(e) {
      console.log("Error:", e);
      //alert("Something Went Wrong! Try Again...");
      
    });
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer "+this.token);
    
    xhr.send();

  }

  showSuccesDialogue(){
    Swal.fire({
      
      icon: 'success',
      title: 'Acount Deleted Succesfuly',
      
    })
  }
}
