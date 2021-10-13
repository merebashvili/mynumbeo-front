import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, ResponseCountry } from '../country';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl = '/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<ResponseCountry[]>(this.countriesUrl).pipe(
      // maybe I should do this transformation to the back end and
      // deliver ready data

      map((countries: ResponseCountry[]) =>
        countries.map(
          (country: ResponseCountry): Country =>
            this.transformResponseCountry(country)
        )
      )
    );
  }

  getCountryById(id: string): Observable<ResponseCountry> {
    return this.http.get<ResponseCountry>(`${this.countriesUrl}/${id}`);
  }

  calculateTotalExpenses(products: Product[]): number {
    const initialValue = 0;

    const totalExpenseInGlobalCurrency: number = products.reduce(
      (previousValue, currentValue) => {
        return (
          previousValue +
          currentValue.price_in_usd * currentValue.quantity_for_month
        );
      },
      initialValue
    );

    return totalExpenseInGlobalCurrency;
  }

  transformResponseCountry(responseCountry: ResponseCountry): Country {
    const transformedCountryData: Country = {
      _id: responseCountry._id,
      name: responseCountry.name,
      quantity_of_products: responseCountry.products.length,
      totalExpenseInGlobalCurrency: this.calculateTotalExpenses(
        responseCountry.products
      ),
    };
    return transformedCountryData;
  }
}
