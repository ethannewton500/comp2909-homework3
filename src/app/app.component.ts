import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const API_KEY  = '528283121e7f9493e0783f4e31d660fc'; // Use v3
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY

                // Hint: You will need a function to change this URL to 
                // dynamically modify the start and end date range.
                + '&primary_release_date.gte=2019-01-01'
                + '&primary_release_date.lte=2019-02-25'
                
                // Hint: You will want to dynamically change the page number 
                // and genre number.
                + '&page=1&with_genres=16';

const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    
  httpClient = inject(HttpClient)
  data: any = [];
  _movieArray: any = [];
  _genreArray: any = [];
  


  ngOnInit(): void {
    this.getMovies();
    this.getGenres();
    this.getDateRange();
  }

  getDateRange() {
    let today = new Date();
    this.getFormattedDate(today);

    let sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate( sixtyDaysAgo.getDate() - 60 );
    this.getFormattedDate(sixtyDaysAgo);
}

// Hint.
// Months and days less than 10 you may want to 
// create some kind of string formater that appends a 0 
// before the day or month number.
getFormattedDate(dt:Date) {
    alert("Current Day: " + dt.getDate() 
        // The month count starts at 0 so Janaury is month number 0.
        + " Month: " + (Number(dt.getMonth()) + 1) 
        + " Year: "  + dt.getFullYear());
}

getMovies() {
  this.httpClient.get<any[]>(BASE_URL).subscribe(data => {
    this._movieArray = data;
    console.log(this._movieArray);
  });
}

fetchData() {
  this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
    console.log(data);
    this.data = data;
  });
}

getGenres() {
  this.httpClient.get<any[]>(GENRE_URL).subscribe(data => {
    this._genreArray = data;
    console.log(this._genreArray);
    console.log('test')
    console.log(this._genreArray.genres);
  });
}

}
