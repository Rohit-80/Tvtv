
import { Injectable, OnInit, inject } from '@angular/core';
import { MovieInterface, Movies } from '../utils/moviesdb';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnInit {

  constructor() { }
 
  
  movies : MovieInterface[] = Movies;
  ngOnInit(){
      
  }
 
  getAllMovies(){
     return this.movies;
  }
  
  addMovie( move : MovieInterface){
    
     this.movies.push({...move,id : this.movies.length + 1});
  }

  

  getMovie(id : string){
     return this.movies.find(movie => movie.id == +id);
  }

  updateMovie(id : string , move : MovieInterface){
      this.movies.map(movie=>{ 
          if(movie.id==+id){
               movie = move;
         }
     }
  )
  return this.movies;
}
  deleteMovie(id : string){
      this.movies = this.movies.filter(
        movie => movie.id != +id
      )
  }
}
