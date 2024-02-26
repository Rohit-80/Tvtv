
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpService } from '../Services/http.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MoviesComponent,RouterModule,
            NavbarComponent,MoviesComponent,NgTemplateOutlet,
            MatProgressBarModule,
            NgIf

          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
          
  title = 'mvtv';

  routes : Router = inject(Router)
  http : HttpService = inject(HttpService);
  show = true;
   ngOnInit(){

    
    this.routes.events.subscribe(event=>{
       if(event instanceof NavigationStart){
         this.show = true;
       }

       if(event instanceof NavigationEnd){
        setTimeout(()=>{
          this.show = false;

        },1000)
        // this.show = false;
      }
    })


   }

   
   pushMovie(){
    this.http.pushMovie()
 }

}
