import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acount-location',
  templateUrl: './acount-location.component.html',
  styles: [
  ]
})
export class AcountLocationComponent implements OnInit {

  

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
