import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { CountryService } from './service/country.service';

describe('AppComponent', () => {
  let countryServiceSpy: jasmine.SpyObj<CountryService>;

  beforeEach(() => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['someMethod']);

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: CountryService, useValue: countryServiceSpy }
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title "ioco-challenge-fe"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ioco-challenge-fe');
  });
});