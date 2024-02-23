import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor() { }

  rentalMovie : any;

  rentMovie(movie : any){
     this.rentalMovie = movie;
  }
}
