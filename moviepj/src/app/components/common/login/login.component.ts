import { UsersService } from './../../../../Services/users.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../../Services/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,
    MatToolbarModule,
    MatIconModule,MatButtonModule,MatInputModule,MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide:boolean = true
  reactiveForm! : FormGroup;
  route : Router = inject(Router)
  userservice : UsersService = inject(UsersService)
  authservice : AuthService = inject(AuthService)
  constructor(private _snackBar: MatSnackBar,private toast : ToastrService) {}

  openSnackBar(message: string, action: string) {
  
  }

   ngOnInit(){
       this.reactiveForm = new FormGroup({
           password : new FormControl(null,Validators.required),
           username : new FormControl(null,Validators.required)
       })
   }
    submitLoginForm(){
      let username = this.reactiveForm.value['username'];
      let passwordp = this.reactiveForm.value['password']
      console.log(this.userservice.existUser(this.reactiveForm.value['username'],passwordp));

      this.userservice.existUser(username,passwordp).then(res=>{
        this.authservice.login(username,passwordp);



        this.toast.success('Welcome ' + username + " !!" )
        this.route.navigate(['/home']);
      }).catch(err=>{
        this.toast.error('Oops ' + username + " doesn't exist" )
      })
      
     
        // this._snackBar.open("User doesn't exist", 'Try Again');
       
    }
}
