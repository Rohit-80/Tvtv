import { Injectable } from '@angular/core';
import { Genre } from '../utils/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor() { }
  getGenre(){
    return Genre;
  }
}
