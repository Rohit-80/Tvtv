import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink , ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { MatNavList , MatListModule, MatListItemIcon} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { GenreService } from '../../../Services/genre.service';
import { AuthService } from '../../../Services/auth.service';
import { MoviesComponent } from '../movies/movies.component';
@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgClass,NgIf,MatListModule,MatListItemIcon,MatIconModule],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent implements OnInit {
  
    Genreservice : GenreService = inject(GenreService)
    @Input()pid!:number;
    genre = this.Genreservice.getGenre();
    curActive : String = 'All Genre';
    
  
    activeRoute : ActivatedRoute = inject(ActivatedRoute);
    authservice : AuthService = inject(AuthService)
    route : Router = inject(Router)
    Val : String = 'All';
    ngOnInit(): void {
         
    }

    sortGenre(id:String,childid:number){
        this.Val = id;
        this.curActive = id;
        this.route.navigate(['/home'],{queryParams : {genre : id,childid:childid,catalog:this.authservice.profile}})
    }
    
}
