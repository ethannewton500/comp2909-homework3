import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MovieImageComponent } from '../movie-image/movie-image.component';

const API_KEY  = '528283121e7f9493e0783f4e31d660fc'; // Use v3
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY;

const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [HttpClientModule, MovieImageComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit{
  
  httpClient = inject(HttpClient)
  data: any = [];
  _movieArray: any = [];
  _genreArray: any = [];
  pageNumber: number = 1;
  genreNumber: number = 12;
  currentBaseURL = this.constructBaseURL(this.getStartDate(), this.getEndDate(), this.pageNumber, this.genreNumber);
  selectedGenre!: string;

  
  constructBaseURL(startDate: string, endDate: string, pageNumber: number, genreNumber: number) {
    console.log('Original Base URL: ' + BASE_URL + '&primary_release_date.gte=' + startDate + '&primary_release_date.lte=' + endDate + '&page=' + pageNumber + '&with_genres=' + genreNumber)
    return BASE_URL + '&primary_release_date.gte=' + startDate + '&primary_release_date.lte=' + endDate + '&page=' + pageNumber + '&with_genres=' + genreNumber;
  }

  getStartDate() {
    let today = new Date();
    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate( thirtyDaysAgo.getDate() - 30 );
    return thirtyDaysAgo.getFullYear() + '-' + (thirtyDaysAgo.getMonth() + 1) + '-' + thirtyDaysAgo.getDate();
  }

  getEndDate() {
    let today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  increasePageNumber() {
    if (this.pageNumber < this._movieArray.total_pages) {
      this.pageNumber++;
      this.currentBaseURL = this.constructBaseURL(this.getStartDate(), this.getEndDate(), this.pageNumber, this.genreNumber);
      this.getMovies();
    }
  }

  decreasePageNumber() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.currentBaseURL = this.constructBaseURL(this.getStartDate(), this.getEndDate(), this.pageNumber, this.genreNumber);
    this.getMovies();
    }
  }

  changeGenre(genreNumber: String) {
    console.log('Genre Number: ' + genreNumber)
    this.genreNumber = Number(genreNumber);
    this.pageNumber = 1;
    this.currentBaseURL = this.constructBaseURL(this.getStartDate(), this.getEndDate(), this.pageNumber, this.genreNumber);
    this.getMovies();
  }

  ngOnInit(): void {
    this.getGenres();
    this.getMovies();
  }

getMovies() {
  this.httpClient.get<any[]>(this.currentBaseURL).subscribe(data => {
    this._movieArray = data;
    console.log(this._movieArray);
  });
}

getGenres() {
  this.httpClient.get<any[]>(GENRE_URL).subscribe(data => {
    this._genreArray = data;
  });
}

}
