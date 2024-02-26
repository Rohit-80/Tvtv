import { Component, inject, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../../../../Services/users.service';
import { AuthService } from '../../../../Services/auth.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule,MatFormFieldModule, MatChipsModule,MatInputModule, MatDatepickerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit,AfterViewInit {
  userservice: UsersService = inject(UsersService);

  longText = `
  I am a good timekeeper, always willing to learn new skills. 
  I am friendly, helpful and polite, have a good sense of humour. 
  I am able to work independently in busy environments and also within a team setting`;
  authservice: AuthService = inject(AuthService)
  user = this.authservice.profile;
  startDate = new Date(1990, 0, 1);
  DOB = new Date(new Date().getMilliseconds());
  availableColors = [
    {name: 'Male', color: 'primary'},
    {name: 'Female', color: 'warn'},
    
  ];

  @ViewChild('dpicker') datepicker! : ElementRef;

  ngOnInit(){
    console.log('datepicker' , this.datepicker?.nativeElement.value)
  }

  ngAfterViewInit(): void {
  //  this.DOB =  this.datepicker?.nativeElement.value;
  }
}

