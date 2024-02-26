import { Component, inject, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { RentService } from '../../../../Services/rent.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterLink],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  rentService : RentService = inject(RentService);
  movieDetail : any = this.rentService.rentalMovie;
  ngOnInit(): void {
    this.movieDetail = this.rentService.rentalMovie;  
    console.log(this.movieDetail)
  }
  

  
}
