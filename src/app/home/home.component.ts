import { Component, OnInit } from '@angular/core';
import { CountryService } from '../service/country.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  countries: any[] = [];

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data.map((c) => ({
          name: c.name,
          flagUrl: c.flagUrl,
        }));
      },
      (error) => console.error('Error fetching countries', error)
    );
  }

  showDetails(countryName: string) {
    this.countryService.getCountryDetails(countryName).subscribe(
      (data) => {
        console.log('Country details:', data);
        this.router.navigate(['/country', countryName]);
      },
      (error) => console.error("Error fetching country details", error)
    );
  }

}