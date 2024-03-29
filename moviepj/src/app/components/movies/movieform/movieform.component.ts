import { NgFor, NgIf } from '@angular/common';
import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieService } from '../../../../Services/movie.service';
import { MatSelectModule } from '@angular/material/select';
import { Genre } from '../../../../utils/genre';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../../Services/users.service';
import { AuthService } from '../../../../Services/auth.service';
import { Store } from '@ngrx/store';
import { getMovies, movietableActions } from '../../../store/action/movietable.action';
import { AppState } from '../../../store/action/movietable.selector';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../../Services/http.service';



@Component({
  selector: 'app-movieform',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,
    NgIf,
    NgFor, MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule,
    MatRadioModule, MatButtonModule, MatSelectModule],
  templateUrl: './movieform.component.html',
  styleUrl: './movieform.component.css'
})
export class MovieformComponent implements OnInit, DoCheck {

  genre = Genre;
  reactiveForm!: FormGroup;

  movies: MovieService = inject(MovieService)
  userservice: UsersService = inject(UsersService)
  authservice: AuthService = inject(AuthService)
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  route: Router = inject(Router)
  private store = inject(Store);
  http: HttpService = inject(HttpService)

  isUpdate: boolean = false;
  ids: string = '-1';
  isValid: boolean = false;
  user: string = this.authservice.profile;
  

  

  ngOnInit() {


    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      stocks: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      genre: new FormControl('Action', Validators.required),
      isfav: new FormControl(false),
      author: new FormControl(null, Validators.required)
    });

    this.activeRoute.paramMap.subscribe((data) => {
      let id = (data.get('id'));
      if (id && id != null) {
        this.isUpdate = true;
        this.ids = id;
        let mv: any = {};
        this.http.getMovie(id).subscribe(data => {
          mv = data; console.log(data, mv);
          this.reactiveForm.setValue({
            name: mv.name,
            stocks: mv.stocks,
            rating: mv.rating,
            genre: mv.genre,
            isfav: mv.isfav,
            author: mv.author
          })
        })
        
      }
    })


  }

  ngDoCheck(): void {
    this.isValid = !this.reactiveForm.valid
  }

 

  toastor: ToastrService = inject(ToastrService)

  submitMovieForm() {
    this.toastor.success('Movie Added !! ', this.user + ' :)');

    // console.log(this.reactiveForm.value)

    // this.store.dispatch(addMovies({...this.reactiveForm.value,author : this.authservice.profile,isfav : false,id : this.cntid++}))
    if (!this.isUpdate) {

      // this.movies.addMovie({author:this.authservice.profile,...this.reactiveForm.value})
      // this.userservice.addUserMovie(this.authservice.profile,this.reactiveForm.value)
      // this.store.dispatch(movietableActions.add({ movie: this.reactiveForm.value, auth: this.authservice.profile }))
      this.http.addMovie(this.reactiveForm.value).subscribe(data => this.store.dispatch(getMovies()))


      console.log('submit')
    } else {
      this.http.updateMovie(this.ids, this.reactiveForm.value).subscribe(data => this.store.dispatch(getMovies()))

      // this.store.dispatch(movietableActions.update({id:this.ids,movie : this.reactiveForm.value}))


    }
    this.isUpdate = false;
    this.route.navigate(['/home'])
  }



}
