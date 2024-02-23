import { userMovies , getAllUserMovies} from './../utils/moviesdb';
import { Injectable } from '@angular/core';
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
  constructor() {  }

 
  createUser(username : string, password : string){
      this.user.push({username : username,password : password});
  }
  existUser(username : string, password : string) : boolean{
     
    console.log(Users)
    let find = Users.find(u=>u.password === password && u.username == username);
    // console.log(Users,this.user,find,username , password,find )
     if(find){
      this.curuser = find;
      return true;
     };
     return false;
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
