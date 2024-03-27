import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-image',
  standalone: true,
  imports: [],
  templateUrl: './movie-image.component.html',
  styleUrl: './movie-image.component.css'
})
export class MovieImageComponent {
  @Input() posterPath!: string;
  @Input() title!: string;
  @Input() hasImage!: boolean;

  getImageSrc(): string {
    return this.posterPath ? `https://image.tmdb.org/t/p/w300${this.posterPath}` : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fpicture-sharing-sites%2F32%2FNo_Image-1024.png&f=1&nofb=1';
  }
}