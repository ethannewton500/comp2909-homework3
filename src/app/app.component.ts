import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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

ngOnInit(): void {
  this.fetchData();
}

fetchData() {
  this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
    console.log(data);
    this.data = data;
  });
}
}
