import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'http://localhost:8090/api/countries';
  countries: Observable<any[]> = new Observable();

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    // Fetching countries from the REST API
    // and transforming the data to match the expected format
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries =>
        countries.map(c => ({
          name: c.name,
          capital: c.capital || 'Unknown',
          population: c.population,
          flagUrl: c.flagUrl,
        }))
      ),
    );
  }

  // Fetching country details by name
  getCountryDetails(name: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8090/api/countries/${encodeURIComponent(name)}`);
  }
}
