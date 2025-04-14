import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'country/:name', component: CountryDetailsComponent },
];