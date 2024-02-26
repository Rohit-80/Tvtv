import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MovieService } from '../../../../Services/movie.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { UsersService } from '../../../../Services/users.service';
import { AuthService } from '../../../../Services/auth.service';
import { RentService } from '../../../../Services/rent.service';
import { getMovies, movietableActions, sortaction } from '../../../store/action/movietable.action';
import { map } from 'rxjs';
import { AppState, SortMovietable, seleUsers } from '../../../store/action/movietable.selector';
import { AsyncPipe, NgFor } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpService } from '../../../../Services/http.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pagination } from '../../../../utils/paginator';
@Component({
  selector: 'app-movietable',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgFor, AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
  ],
  templateUrl: './movietable.component.html',
  styleUrl: './movietable.component.css'
})
export class MovietableComponent implements OnInit, OnChanges {

  length!: number;
  pageSize!: number;
  pageIndex!: number;
  pageSizeOptions !: number[];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(e)
    this.dataSource = this.maindata.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));


  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }




  store = inject(Store<AppState>);


  Movieservice: MovieService = inject(MovieService)
  rentService: RentService = inject(RentService)

  maindata: any;
  route: Router = inject(Router)
  displayedColumns: String[] = ['name', 'genre', 'stocks', 'rating', 'isfav'];
  profile: string = this.authservice.profile;

  @Input() movieSource!: string;
  @Input() child!: number;
  dataSource!: any;
  constructor(private userservice: UsersService, private authservice: AuthService, public dialog: MatDialog, private pagination: Pagination) {

    // console.log('movietable constructor console logged','child',this.child)
    // this.dataSource = this.movieSource == 'AllMovies' ? this.Movieservice.getAllMovies() : this.userservice.getallUserMovies(this.authservice.profile);
  }
  dod$ = this.store.pipe(select(seleUsers));
  ngOnInit() {
    this.store.pipe(map(state => SortMovietable(state))).subscribe(data => {
      this.dataSource = data; this.maindata = data;
      this.length = data.length;
    
      this.dataSource = this.maindata.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
      this.pagination.pageSub.subscribe(pageObj => {
        this.length = pageObj['length']
        this.pageSize = pageObj['pageSize']
        this.pageIndex = pageObj['pageIndex']
        this.pageSizeOptions = pageObj['pageSizeOptions']
       
      })

    })

    // this.pagination.pageSub.subscribe(pageObj => {
    //   console.log(pageObj);
    //   this.length = pageObj['length']
    //   this.pageSize = pageObj['pageSize']
    //   this.pageIndex = pageObj['pageIndex']
    //   this.pageSizeOptions = pageObj['pageSizeOptions']
    //   this.dataSource = this.maindata.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
    // })







    //  console.log('dod',this.dod$.subscribe(data=>console.log(data)))
    this.store.select(SortMovietable).subscribe(data => {
      //  console.log('88888888888888888888888888888888888888888888',data);
    })
    //  console.log('sssssss', this.store.pipe(select(map((state:AppState)=> { console.log(state.allmovies); return SortMovietable(state)}))))
    //    console.log('from movie talbe',data)
    //  }));
    // console.log('movietable oninit console logged',this.movieSource,'child',this.child)


  }

  cnt = 0
  ngOnChanges(changes: SimpleChanges): void {


    // console.log('onchanges-------------',changes,this.dataSource,this.movieSource,this.cnt++,'child',this.child)
    // console.log(this.movieSource)
    if (this.movieSource == 'AllMovies') {
      this.store.dispatch(sortaction({ sortId: 'All Genre', curUser: 'All' }))
    } else if (this.movieSource == 'MyMovies') {
      this.store.dispatch(sortaction({ sortId: 'All Genre', curUser: this.authservice.profile }))
    }
  }


  http = inject(HttpService)



  sort(id: string, user: string) {
    // console.log(this.dataSource)

    this.store.dispatch(sortaction({ sortId: id, curUser: user }));
    this.dataSource = this.maindata.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
    // console.log('datasssssssss',id,this.dataSource,this.movieSource,'child',this.child)
    // console.log(id)
    //     if(id == 'All Genre'){
    //        if(this.movieSource == 'AllMovies')
    //        this.dataSource = [...this.Movieservice.getAllMovies()];
    //        else if(this.movieSource == 'MyMovies'){
    //         this.dataSource = [...this.userservice.getallUserMovies(this.authservice.profile)];

    //        }
    //     }else{

    //       if(this.movieSource == 'AllMovies'){
    //         this.dataSource = this.Movieservice.getAllMovies().filter(movie=>movie.genre == id);
    //       }

    //       else if(this.movieSource == 'MyMovies'){

    //         let arr:MovieInterface[] = Array.from(this.userservice.getallUserMovies(this.authservice.profile));
    //         console.log('000000000000000000000000000000',arr)
    //         this.dataSource = arr.filter((movie:any)=>movie.genre == id)  ;

    //       }

    //     }

    //     console.log(this.dataSource,'child',this.child)
  }



  updateMovie(id: string) {
    // this.dialog.open(DialogElement)
    const dialogRef = this.dialog.open(DialogElement, {
      autoFocus: true,
      restoreFocus: true,
      disableClose: true,
      data: { MovieName: this.dataSource.find((movie: { id: string; }) => movie.id == id).name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes')
        this.route.navigate(['/add', id])
    });

  }
  likeMovie(id: number) {
    // this.dataSource.map((movie: { id: number; isfav: boolean; })=>{ if(movie.id == id)  movie.isfav = !movie.isfav; } );
    this.store.dispatch(movietableActions.like({ id: id }))
  }
  deleteMovie(id: string) {
    this.http.deleteMovie(id).subscribe(data => this.store.dispatch(getMovies()));
    // this.store.dispatch(getMovies())
    // this.dataSource = this.dataSource.filter((movie: { id: number; })=>movie.id != id);
    // this.store.dispatch(movietableActions.delete({id : id}))

  }

  rent(movie: any) {
    console.log(movie)
    this.rentService.rentMovie(movie);
    this.route.navigate(['/rent', movie.id])
  }


}

@Component({
  selector: 'dialog-elements',
  templateUrl: './dialog-elements.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElement {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { MovieName: string }) { }
}