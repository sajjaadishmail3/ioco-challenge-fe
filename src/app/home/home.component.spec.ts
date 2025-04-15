import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CountryService } from '../service/country.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let mockCountryService: jasmine.SpyObj<CountryService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockCountryService = jasmine.createSpyObj('CountryService', ['getCountries', 'getCountryDetails']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                { provide: CountryService, useValue: mockCountryService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch countries on init', () => {
        const mockCountries = [{ name: 'South Africa', flagUrl: 'flag.jpg' }];
        mockCountryService.getCountries.and.returnValue(of(mockCountries));

        component.ngOnInit();

        expect(component.countries).toEqual(mockCountries);
        expect(mockCountryService.getCountries).toHaveBeenCalled();
    });

    it('should navigate to country details when showDetails() is called', () => {
        const mockCountryData = { name: 'South Africa', population: 59000000 };
        mockCountryService.getCountryDetails.and.returnValue(of(mockCountryData));

        component.showDetails('South Africa');

        expect(mockCountryService.getCountryDetails).toHaveBeenCalledWith('South Africa');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/country', 'South Africa']);
    });
});