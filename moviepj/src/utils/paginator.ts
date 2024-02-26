import { Injectable, OnInit } from '@angular/core';
import { HttpService } from "../Services/http.service";
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../app/store/action/movietable.selector';



@Injectable({
    providedIn : 'root'
})
export class Pagination implements OnInit{
 
    length = 0;
    pageSize = 6;
    pageIndex = 0;
    pageSizeOptions = [6,8,10];  
    pageSub = new Subject<any>;
     constructor(private http : HttpService,private store : Store){
        this.store.select(selectAllMovies).subscribe(allmovies=>{

            this.pageSub.next({
                length : allmovies.length,
                pageSize : this.pageSize,
                pageIndex : this.pageIndex,
                pageSizeOptions : this.pageSizeOptions
            })
        })
    
     }

    
     
   ngOnInit() {
 
   }
    


}