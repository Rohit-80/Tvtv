import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import {MatTabsModule} from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatListModule,MatButtonModule,MatTabsModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    route : Router = inject(Router)

 
    authservice : AuthService = inject(AuthService);
    islogin : boolean = this.authservice.islogin;
    toast = inject(ToastrService)
    profile : string = this.authservice.profile
    ngOnInit() {
   
      this.authservice.validUser.subscribe( (data ) =>{
        this.islogin   = data.login
        this.profile   = data.profile     
      })
      
      this.islogin   = this.authservice.islogin;
      this.profile   = this.authservice.profile
    }
    
     home(){
         this.route.navigate(['/'])
     }

     login(){
      this.route.navigate(['/login'])
     }

     logout(){
      this.toast.success('Bye  ' + this.profile + "  :( " )
      this.authservice.logout()
      
      this.route.navigate(['/login'])
     }
     register(){
      this.route.navigate(['/register'])
     }

     profilefn(){
      this.toast.show ('Hey,  ' + this.profile + "  :) " )
      this.route.navigate(['/profile'])
     }
}
