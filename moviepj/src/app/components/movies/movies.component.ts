import {MatTableModule} from '@angular/material/table';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../../Services/movie.service';
import { GenreComponent } from '../Genre/genre.component';
import { MovietableComponent } from './movietable/movietable.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DataSource } from '@angular/cdk/collections';
import { UsersService } from '../../../Services/users.service';
import { AuthService } from '../../../Services/auth.service';
import { Store } from '@ngrx/store';
import { getMovies } from '../../store/action/movietable.action';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgFor,
    MatTableModule,
    MatButtonModule,
    NgTemplateOutlet,
    GenreComponent,
    MovietableComponent,
    NavbarComponent,
    MatTabsModule,
    MoviesComponent,
    MatListModule,
    NgClass,
    NgIf],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
     
  
   @ViewChild(MovietableComponent) movietble! : MovietableComponent;
    Store = inject(Store)
     activeRoute : ActivatedRoute = inject(ActivatedRoute);
     
     route:Router = inject(Router);
     movieSource : string = 'AllMovies'
     isLogins! : boolean ;
     val = 0
     userservice : UsersService = inject(UsersService)
     authservice : AuthService = inject(AuthService)


  changeData(tab:any){
    
    //  if(tab.index == 1){
    //       this.movieSource = 'MyMovies';
        
    //  }else if(tab.index == 0){
      
    //       this.movieSource = 'AllMovies';
    //  }

     this.movieSource = (tab.index == 0 ? 'AllMovies' : 'MyMovies');
   }
   
     ngOnInit() {
      this.Store.dispatch(getMovies())
      this.isLogins = false
        this.activeRoute.queryParams.subscribe((data)=>{
          let id:string = data['genre'];
          if(id != ''){
             if(this.movieSource == 'AllMovies')
             this.movietble?.sort(id,'All');      
            else  this.movietble?.sort(id,this.authservice.profile);      
          }
          
      })   

     
      this.isLogins = this.authservice.islogin;

      this.authservice.validUser.subscribe( (data ) =>{
        this.isLogins = true
       
        // console.log('tom',this.isLogins,this.val)
       
        // this.profile   = data.profile     
      })
      
        
      
     }

  //    dataSource = this.movieDBinst.getAllMovies();
  //    displayedColumns = ['name','genre','stocks','rating']


    //  favMovie(id:string){
    //     this.Movies.map(item => { if(item.id == id)item.isfav = !item.isfav});
    //  }

   addMovie(){
       this.route.navigate(['/add']);
   }

  
  check(){
    
    console.log(this.isLogins)
  }

}
