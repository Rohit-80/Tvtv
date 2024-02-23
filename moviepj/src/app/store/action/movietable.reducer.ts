import { AppState } from './movietable.selector';
import {  createReducer, on } from '@ngrx/store';
import { loadMyDataSuccess, movietableActions, sortaction } from './movietable.action';
import { MovieInterface, Movies } from '../../../utils/moviesdb';

export interface State {
    dataSource: MovieInterface[]
}
export let MoviesT = [...Movies];


export const initialState: AppState = {
    selectedUser: {username :'All',password : 'All'},
    selectedGenre : 'All Genre',
    allmovies: []
};



export const movietablereducer = createReducer(
    initialState,
    on(sortaction, (state, { sortId,curUser }) => {   return {...state,selectedGenre : sortId,selectedUser : {username :curUser,password : 'all'}}}
    ),
    // on(movietableActions.delete,(state,{ id })=>({...state,allmovies : state.allmovies.filter((idm: { id: number; })=> 
    // {   
    //     if(idm.id == id){
    //         MoviesT =  MoviesT.filter(i => i.id != id);
    //     }
    //     if(idm.id != id) { return idm;}
    //     return null;
        
        
           
        
    // })})),
    on(movietableActions.update,(state,{ id , movie})=>({...state, allmovies : state.allmovies.map((ids : any)=>{ 
         if(ids.id == id){
           
            let ind = MoviesT.indexOf(ids);
            ids = {...ids,...movie}
            MoviesT[ind] = ids;
         }
        return ids})})),
        on(movietableActions.like,(state,{ id })=>({...state, allmovies : state.allmovies.map((ids : any)=>{ 
            if(ids.id == id){
            
               let ind = MoviesT.indexOf(ids);
               ids = {...ids,isfav : !ids.isfav};
               MoviesT[ind] = ids;
               console.log(ind,MoviesT)
            }
           return ids})})),
           on(movietableActions.add,(state,{ movie,auth })=>{    return ({...state,allmovies : [...state.allmovies]});}
        //    ({...state, allmovies : ()=> { MoviesT.push({...movie,id : MoviesT.length + 2}) 
            
       
        //    console.log('moviest',MoviesT)
        //    return {...state.allmovies,...{...movie,id : MoviesT.length + 2}}}
        // })
        ),
        on(loadMyDataSuccess,(state , {data})=>{  return ({...state,allmovies:[...data]})})
)