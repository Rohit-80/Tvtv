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
        author : 'Tom' ,
        id : 10,
        name : "The Lord of the Rings: The Return of the King' (2003)",
        stocks : 100,
        rating : 9,
        genre : 'Adventure',
        isfav : true
    },
    {
        author : 'Tom' ,
        id : 11,
        name : "3 'Inception' (2010) ...",
        stocks : 100,
        rating : 9,
        genre : 'Adventure',
        isfav : true
    },
    {
        author : 'Tom' ,
        id : 12,
        name : "Crazy Rich Asians(2003)",
        stocks : 100,
        rating : 9,
        genre : 'Rom-Com',
        isfav : true
    },
    {
        author : 'Tom' ,
        id : 13,
        name : 'When Harry Met Sally?',
        stocks : 95,
        rating : 8,
        genre : 'Rom-com',
        isfav : true
    },
    {
        author : 'Tom' ,
        id : 14,
        name : 'Thank God(2023)',
        stocks : 85,
        rating : 8,
        genre : 'Fantasy',
        isfav : false
    },
    {
        author : 'Tom' ,
        id : 15,
        name : 'The Crash Landing',
        stocks : 100,
        rating : 8,
        genre : 'Fantasy',
        isfav : false
    },
    {
        author : 'Tom' ,
        id :18,
        name : '500 Days of Summer',
        stocks : 840,
        rating : 8,
        genre : 'Horror',
        isfav : false
    },
    {
        author : 'Tom' ,
        id : 19,
        name : ' Without Exit (2004) ',
        stocks : 840,
        rating : 8,
        genre : 'Thriller',
        isfav : false
    },
    {
        author : 'Tom' ,
        id : 20,
        name : ' The Rock Loop ',
        stocks : 840,
        rating : 10,
        genre : 'Action',
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