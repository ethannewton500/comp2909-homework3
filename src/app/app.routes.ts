import { Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'data', component: DataComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/data', pathMatch: 'full' }
];
