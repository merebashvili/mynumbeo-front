import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryComponent } from './country/country.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'country-list', component: CountriesListComponent },
  { path: 'country/:id', component: CountryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: '', redirectTo: 'country-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'country-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
