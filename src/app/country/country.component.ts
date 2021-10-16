import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { ResponseCountry } from '../country';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  country!: ResponseCountry;
  private inputCountry = new Subject<string>();

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.getCountry(id);
    this.setCountryNameEdit(id);
  }

  getCountry(id: string): void {
    this.countryService.getCountryById(id).subscribe((country) => {
      this.country = country;
    });
  }

  editCountry(name: string): void {
    // name.length to avoid unnecessary error responses,
    // name !== this.country.name to avoid unnecessary requests for the unchanged names
    if (name.length > 2 && name !== this.country.name) {
      this.inputCountry.next(name);
    }
  }

  setCountryNameEdit(countryId: string): void {
    this.inputCountry
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((name: string) =>
          this.countryService.updateCountry({ name }, countryId)
        )
      )
      .subscribe();
  }
}
