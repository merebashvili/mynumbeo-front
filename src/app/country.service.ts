import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl = 'http://localhost:3000/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }
}
