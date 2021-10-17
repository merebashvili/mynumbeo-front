import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private subscriptions: Array<Subscription> = [];

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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getProduct(id: string): void {
    const getProductSub = this.productService
      .getProduct(id)
      .subscribe((product) => {
        this.product = product;
        this.initializeForm();
      });

    this.subscriptions.push(getProductSub);
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      product: [
        this.product.product,
        [Validators.required, Validators.minLength(2)],
      ],
      price_in_local: [
        this.product.price_in_local,
        [Validators.required, Validators.min(0.0001)],
      ],
      price_in_usd: [
        this.product.price_in_usd,
        [Validators.required, Validators.min(0.0001)],
      ],
      quantity_for_month: [
        this.product.quantity_for_month,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  onProductSubmit(): void {
    const product = this.productForm.getRawValue();
    if (product) {
      const productUpdatingSub = this.productService
        .updateProduct(product, this.paramsId)
        .subscribe(() => this.goBack());

      this.subscriptions.push(productUpdatingSub);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
