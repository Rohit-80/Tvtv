import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate,OnInit{
 
  islogin : boolean = false;
  profile : string = ''

  ngOnInit(){
       let tempuser = localStorage.getItem('authtoken')?.split('|')[0];
       console.log(tempuser)
       if(tempuser){
          this.profile = tempuser;
          this.islogin = true;
       }
  }

  constructor() { 
    let tempuser = localStorage.getItem('authtoken')?.split('|')[0];
       console.log(tempuser)
       if(tempuser){
          this.profile = tempuser;
          this.islogin = true;
       }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.islogin;
  }


  validUser = new Subject<any>;
  loginDetails = new Subject<any>;

  login(username:string,password:string){
     this.islogin = true;
     this.profile = username;
     localStorage.setItem('authtoken',username +'|'+ password);
     this.validUser.next({login:this.islogin,profile : this.profile})
  }

  logout(){
      this.islogin = false;
      this.profile = ''
      localStorage.removeItem('authtoken')
      this.validUser.next({login:this.islogin,profile : this.profile})
  }
  


}
