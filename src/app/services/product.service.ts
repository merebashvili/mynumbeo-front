import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = '/products';

  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }
}
