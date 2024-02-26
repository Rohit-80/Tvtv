import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, EmptyError } from 'rxjs';
import { map, exhaustMap, catchError, tap, concatMap, switchMap } from 'rxjs/operators';
import { HttpService } from '../../../Services/http.service';
import { addMovies, addMoviesSuccess, getMovies, loadMyDataSuccess } from './movietable.action';

@Injectable()
export class MoviesEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(getMovies),
    switchMap(() => this.http.getAllMovies()
      .pipe(
        map(movies =>loadMyDataSuccess({data:movies})),
        catchError(() => EMPTY)
      ))
    )
  );

  addMovie$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addMovies),
    tap((movie) => console.log(movie)),
    concatMap(({ movie }) =>
      this.http.addMovie(movie).pipe(
        map((newMovie) => addMoviesSuccess(newMovie))
       
      )
    )
  )
);

  constructor(
    private actions$: Actions,
    private http: HttpService
  ) {}
}