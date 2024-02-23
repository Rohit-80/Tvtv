
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInterface } from "../../../Services/users.service";
import { MovieInterface } from "../../../utils/moviesdb";

export interface AppState {
    selectedGenre: any ;
    allmovies:any;
    selectedUser :UserInterface;
    
  }
 export const getcounterstate=createFeatureSelector<AppState>('mtable');

export const selectedGenre = createSelector(getcounterstate ,(state:AppState) => { return state.selectedGenre});
export const selectedUser = createSelector(getcounterstate ,(state:AppState) => state.selectedUser);
export const selectAllMovies = createSelector(getcounterstate ,(state:AppState) => state.allmovies);


export const seleUsers = createSelector(
  getcounterstate,
  (state: AppState) => state.allmovies,
  
);
export const SortMovietable = createSelector(
  getcounterstate,
  selectedUser,
  selectedGenre,
  selectAllMovies,
  // (state:AppState) => state.allmovies,
  (state : AppState,selectedUser: UserInterface,selectedGenres : any,allmovies : MovieInterface[]) => {
    if (selectedUser ) {
      return allmovies.filter((movie: MovieInterface) => (movie.author === selectedUser.username || selectedUser.username == 'All') &&( movie.genre === selectedGenres || selectedGenres == 'All Genre'));
    } else {
      return allmovies;
    }
  }
);