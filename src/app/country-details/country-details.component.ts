import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  country: any;

  constructor(private route: ActivatedRoute, private countryService: CountryService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const countryName = params['name'];
      console.log("Extracted country name:", countryName);
      this.fetchCountryDetails(countryName);
    });
  }

  fetchCountryDetails(name: string) {
    this.countryService.getCountryDetails(name).subscribe(
      (data) => this.country = data,
      (error) => console.error("Error fetching country details:", error)
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}