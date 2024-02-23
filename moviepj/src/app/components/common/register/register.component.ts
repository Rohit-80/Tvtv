
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
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,
    MatIconModule,MatButtonModule,MatToolbarModule,MatInputModule,MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide:boolean = true
  reactiveForm! : FormGroup;
  route : Router = inject(Router)
  userservice : UsersService = inject(UsersService)
  authservice : AuthService = inject(AuthService)
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.reactiveForm = new FormGroup({
        password : new FormControl(null,Validators.required),
        username : new FormControl(null,Validators.required)
    })
}
 submitRegisterForm(){
   console.log(this.userservice.existUser(this.reactiveForm.value['username'],this.reactiveForm.value['password']));
    if(this.userservice.existUser(this.reactiveForm.value['username'],this.reactiveForm.value['password'])){
      this._snackBar.open("User Already exist", 'Try Again'); 
     
    }else{
    //  this._snackBar.open("User doesn't exist", 'Try Again');
     this.userservice.createUser(this.reactiveForm.value['username'],this.reactiveForm.value['password']);
     this.authservice.login(this.reactiveForm.value['username'],this.reactiveForm.value['username']);
     this.route.navigate(['/home']);
    }
 }
}
