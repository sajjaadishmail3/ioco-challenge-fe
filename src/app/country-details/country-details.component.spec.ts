import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CountryDetailsComponent } from './country-details.component';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../service/country.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('CountryDetailsComponent', () => {
    let component: CountryDetailsComponent;
    let fixture: ComponentFixture<CountryDetailsComponent>;
    let mockCountryService: jasmine.SpyObj<CountryService>;

    beforeEach(async () => {
        mockCountryService = jasmine.createSpyObj('CountryService', ['getCountryDetails']);

        await TestBed.configureTestingModule({
            imports: [CountryDetailsComponent, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ name: 'South Africa' }) }
                },
                { provide: CountryService, useValue: mockCountryService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CountryDetailsComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch country details on init', () => {
        const mockCountryData = { name: 'South Africa', population: 59000000 };
        mockCountryService.getCountryDetails.and.returnValue(of(mockCountryData));

        component.ngOnInit();

        expect(component.country).toEqual(mockCountryData);
        expect(mockCountryService.getCountryDetails).toHaveBeenCalledWith('South Africa');
    });

    it('should navigate back when goBack() is called', () => {
        const routerSpy = spyOn(component['router'], 'navigate');

        component.goBack();

        expect(routerSpy).toHaveBeenCalledWith(['/']);
    });
});