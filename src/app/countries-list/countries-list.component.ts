import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  // ! definite assignment assertion tells to the compiler:
  // "There is a property called countries$ with a type of Observable<Country[]> | undefined.
  // It starts with a value of undefined. But every time I get or set
  // that property, I want to treat it as Observable<Country[]>."
  public countries$!: Observable<Country[]>;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countries$ = this.countryService.getCountries();
  }
}
