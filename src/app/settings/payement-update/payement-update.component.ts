import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payement-update',
  templateUrl: './payement-update.component.html',
  styles: [
  ]
})
export class PayementUpdateComponent implements OnInit {

  constructor() { }

  async ngOnInit(): Promise<void> {
     await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Not Configure yet Please wait',
    });
    window.location.reload()
  }

}
