import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: Product;
  productForm!: FormGroup;
  paramsId!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.params.id;
    this.getProduct(this.paramsId);
  }

  getProduct(id: string): void {
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      product: [this.product.product],
      price_in_local: [this.product.price_in_local],
      price_in_usd: [this.product.price_in_usd],
      quantity_for_month: [this.product.quantity_for_month],
    });
  }

  onProductSubmit(): void {
    const product = this.productForm.getRawValue();
    if (product) {
      this.productService
        .updateProduct(product, this.paramsId)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
