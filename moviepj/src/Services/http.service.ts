import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieInterface, Movies } from '../utils/moviesdb';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  url : string = 'https://movietv-ff382-default-rtdb.firebaseio.com/';
  constructor(private http : HttpClient) { }
 
  getAllMovies(){
    // console.log(this.http.get(this.url + '/home.json').subscribe(data=>console.log(data)))
   return this.http.get(this.url + 'home.json').pipe(map((movie)=>{ let arr = Object.values(movie); let keys = Object.keys(movie); arr.map((item,i)=>item.id = keys[i]); return arr;}));
 }

 addMovie(movie : MovieInterface){
   return this.http.post(this.url+'/home.json',movie);
 }

 getMovie(id:string){
  return this.http.get(this.url+'/home/'+id+'.json');
 }

 deleteMovie(id:string){
    return this.http.delete(this.url+'home/'+id+'.json');

 }

 updateMovie(id:string,movie:MovieInterface){
   return this.http.patch(this.url+'home/'+id+'.json',movie)
 }

 pushMovie(){
  this.http.post(this.url + 'room.json',{...Movies}).subscribe()
   Movies.forEach(movie=>{console.log(movie);   this.http.post(this.url + 'home.json',movie).subscribe()})
 }


 registerUser(user:any){
   return this.http.post(this.url + 'user.json',user);
 }

 getAllUsers(){
  return this.http.get(this.url + 'user.json');
 }


}
