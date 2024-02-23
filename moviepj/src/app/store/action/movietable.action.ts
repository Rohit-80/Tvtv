import { createAction,  createActionGroup,  props } from '@ngrx/store';
import { MovieInterface } from '../../../utils/moviesdb';

export const sortaction = createAction(
    '[movietable] Sort',
     props<{sortId : string,curUser : string}>(),
 
);
export const getMovies = createAction('[Movie] Get movie');

export const addMovies = createAction(
    '[Movie] Add movie',
    (movie: any) => ({ movie })
    // props<{ movie: Movie }>()
  );
  export const addMoviesSuccess = createAction(
    '[Movie] Add movie success',
    // props<{ movie: Movie }>(),
    (movie: any) => ({ movie })
  );

export const movietableActions =  createActionGroup({
    source : '[]',
    events : {
        delete : props<{id:number}>(),
        update : props<{id:number,movie :any}>(),
        like :  props<{id:number}>(),
        add :  props<{movie :any,auth : any}>()
    }

});

export const loadMyDataSuccess = createAction(
    '[My Module] Load Data Success',
    props<{ data: any }>() 
  );