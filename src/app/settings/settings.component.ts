import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertServicesService } from 'src/services/sweet-alert-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {


  

  navNameUpdate:any
  navContactUpdate:any
  navInfoUpdate:any
  navPasswordUpdate:any
  navDeleteAcount:any
  navAccountLocation:any
  navPayementUpdate:any

  constructor(private route:ActivatedRoute,private alert:SweetAlertServicesService) { }

  ngOnInit(): void {
    this.navNameUpdate=true
    this.navContactUpdate=false
    this.navInfoUpdate=false
    this.navPasswordUpdate=false
    this.navDeleteAcount=false
    this.navAccountLocation=false
    this.navPayementUpdate=false
  }

  yourAcount(){
    this.ngOnInit()
  }

  navToContact(){
    this.ngOnInit()
    this.navNameUpdate=false
    this.navContactUpdate=true

  }

  navToInfo(){
    this.ngOnInit()
    this.navNameUpdate=false
    this.navInfoUpdate=true
  }

  navToPassword(){
    this.ngOnInit()
    this.navNameUpdate=false
    this.navPasswordUpdate=true
  }

  //TODO SECURITY QUESTION
  navToSecurityQuestion(){
    this.alert.showErrorAlert("Not Configure yet Please wait")
    
    //this.ngOnInit();
  }
  
  navToDeleteAcount(){
    this.ngOnInit()
    this.navNameUpdate=false
    this.navDeleteAcount=true
  }

  navToAcountLocation(){
    this.ngOnInit()
    this.navNameUpdate=false
    this.navAccountLocation=true
  }

  navToPayementMethode(){
    this.ngOnInit()
    this.navNameUpdate=false
    this.navPayementUpdate=true
  }



}
