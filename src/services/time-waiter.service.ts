import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeWaiterService {

  constructor() { }

  public async  waitTwoSeconds(timer:number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timer);
    });
  }
}

const sleep= async(milliseconds:any)=>{
  await new Promise(resolve=>{
    return setTimeout(resolve,milliseconds)
  })
}