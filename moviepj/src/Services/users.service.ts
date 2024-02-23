import { userMovies , getAllUserMovies} from './../utils/moviesdb';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
// import { UserInterface, Users } from '../utils/users';

export interface UserInterface  {
  username : string,
  password : string
}


export let Users : UserInterface[] = [
  {username:'Tom',password : '1234'}
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  user = Users;
  curuser:any;
  constructor(private http : HttpService) {  }

 
  createUser(username : string, password : string){
     this.http.registerUser({username : username,password : password}).subscribe()
      this.user.push({username : username,password : password});
  }
  existUser(username : string, password : string) : Promise<any>{


     return new Promise((res,rej)=>{
      this.http.getAllUsers().subscribe(data=> {
        let us = Object.values(data);
        us.forEach(u=>{
           if(u.username == username && u.password == password){
            this.curuser = username;
            console.log('ues')
              res('true')
          }
   
        })
        rej();
      })

      
     })
     
   
    
    
  }
  usermovies : any = getAllUserMovies();
  addUserMovie(username : string,movie:any){
      this.usermovies[username] = this.usermovies[username]??[];
      this.usermovies[username].push({author : username,...movie});

   
  }

  getallUserMovies(username : string){
     return this.usermovies[username];
  }


    
  
}
