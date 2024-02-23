export interface MovieInterface  {
    author : string,
    id : Number,
    name :string,
    stocks :Number,
    rating :Number,
    genre :string,
    isfav :boolean,
}


export let Movies : MovieInterface[] =
     [{
        author : 'All' ,
        id : 1,
        name : 'The Avengers',
        stocks : 100,
        rating : 8,
        genre : 'Action',
        isfav : false
    },
    {
        author : 'All' ,
        id : 2,
        name : 'Man of steel',
        stocks : 95,
        rating : 8,
        genre : 'Action',
        isfav : true
    },
    {
        author : 'All' ,
        id : 3,
        name : 'Thor',
        stocks : 85,
        rating : 8,
        genre : 'Thriller',
        isfav : false
    },
    {
        author : 'All' ,
        id : 4,
        name : 'Ant Man',
        stocks : 100,
        rating : 8,
        genre : 'Comedy',
        isfav : false
    },
    {
        author : 'Tom' ,
        id : 5,
        name : '500 Days of Summer',
        stocks : 840,
        rating : 8,
        genre : 'Horror',
        isfav : false
    },
    {
        author : 'All' ,
        id : 7,
        name : ' Without a Paddle (2004) ',
        stocks : 840,
        rating : 8,
        genre : 'Comedy',
        isfav : false
    },
    {
        author : 'All' ,
        id : 7,
        name : ' The Forest Gump ',
        stocks : 840,
        rating : 10,
        genre : 'Comedy',
        isfav : true
    }
   
];

interface userMovie {
    [username : string] : MovieInterface[]
}

export const userMovies : userMovie = {
      'Tom' : [{
        author : 'Tom' ,
        id : 8,
        name : '500 Days of Summer',
        stocks : 840,
        rating : 8,
        genre : 'Horror',
        isfav : false
      }]

}

export function getAllUserMovies(){
   return userMovies;
} 

// export function movieUpdate(id : any,upmovie : any){
//     console.log(id,upmovie)
//     MovieDB = MovieDB.map(t=>{
//         if(t.id == id) {
//             console.log(id,upmovie)
//             t = {...upmovie};
//         }
//         return t;
//     }) 
// }

// MovieDB = MovieDB.map((mv)=>{
//     if(mv.id == this.ids && this.ids != -1){
//       mv = {id: mv.id, ...this.reactiveForm.value};
//     }