import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertServicesService {

  constructor() { }

  showErrorAlert(message:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }

  async showSuccessAlertWithTimer(message:string,timer:number,position?:any){
    let locPosition=(position==null)? 'top-end' : position
    await Swal.fire({
      position: locPosition,
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: timer
    })
  }

  async loading(message:any,timer:any){
    await Swal.fire({
      title: message,
      showConfirmButton: false,
      timer: timer
    })
  }

  
}
