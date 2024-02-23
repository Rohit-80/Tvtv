import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UsersService } from '../../../../Services/users.service';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userservice : UsersService = inject(UsersService);
  
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  authservice : AuthService = inject(AuthService)
  user = this.authservice.profile;
}

