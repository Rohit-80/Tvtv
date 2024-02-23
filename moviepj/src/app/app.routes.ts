import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieformComponent } from './components/movies/movieform/movieform.component';
import { LoginComponent } from './components/common/login/login.component';
import { RegisterComponent } from './components/common/register/register.component';
import { RentComponent } from './components/common/rent/rent.component';
import { AuthService } from '../Services/auth.service';
import { ProfileComponent } from './components/common/profile/profile.component';

export const routes: Routes = [
  
    {path:'', component:MoviesComponent},
    {path : 'home', component:MoviesComponent},
    {path : 'add', component:MovieformComponent},
    {path : 'add/:id', component:MovieformComponent},
    {path : 'login', component:LoginComponent},
    {path : 'profile', component:ProfileComponent},
    {path : 'register', component:RegisterComponent},
    {path : 'rent/:id',canActivate:[AuthService], component:RentComponent},
];
