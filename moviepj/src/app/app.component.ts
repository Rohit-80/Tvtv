import { Observable, Subject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgTemplateOutlet } from '@angular/common';
import { HttpService } from '../Services/http.service';
import { Store } from '@ngrx/store';
import { getMovies, loadMyDataSuccess } from './store/action/movietable.action';
import { MoviesEffects } from './store/action/movies.effects';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MoviesComponent,RouterModule,NavbarComponent,MoviesComponent,NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mvtv';

  ischange = false;
  http : HttpService = inject(HttpService)
  tp : MoviesEffects = inject(MoviesEffects)
  cnt = 0
 sub = new  Observable<any>(data=>{
    data.next(this.cnt++)
 })
  Store = inject(Store)
  constructor(private toastr: ToastrService) {}

  // change(){
  //   // this.toastr.success('Hello world!', 'Toastr fun!');
  //   this.http.pushMovie();
  //   // this.http.addMovie()
  //   // this.http.getAllMovies().subscribe(movies=> { console.log(movies) ;this.Store.dispatch(loadMyDataSuccess({data:movies}))})
    

  // }

  ngOnInit(){
     
  }
  
}
