import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { CountryService } from './service/country.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private countryService: CountryService) {}
  title = 'ioco-challenge-fe';
}
