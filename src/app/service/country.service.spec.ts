import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
    let service: CountryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CountryService]
        });

        service = TestBed.inject(CountryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch country list correctly', () => {
        const mockCountries = [
            { name: 'South Africa', capital: 'Pretoria', population: 59000000, flagUrl: 'flag.jpg' },
            { name: 'Germany', capital: 'Berlin', population: 83000000, flagUrl: 'flag.jpg' }
        ];

        service.getCountries().subscribe(countries => {
            expect(countries.length).toBe(2);
            expect(countries[0].name).toBe('South Africa');
            expect(countries[1].name).toBe('Germany');
        });

        const req = httpMock.expectOne('http://localhost:8090/api/countries');
        expect(req.request.method).toBe('GET');
        req.flush(mockCountries);
    });

    it('should fetch country details correctly', () => {
        const mockCountry = { name: 'South Africa', capital: 'Pretoria', population: 59000000, flagUrl: 'flag.jpg' };

        service.getCountryDetails('South Africa').subscribe(country => {
            expect(country.name).toBe('South Africa');
            expect(country.capital).toBe('Pretoria');
        });

        const req = httpMock.expectOne('http://localhost:8090/api/countries/South%20Africa');
        expect(req.request.method).toBe('GET');
        req.flush(mockCountry);
    });
});