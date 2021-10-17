import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product!: Product;
  productForm!: FormGroup;
  paramsId!: string;
  private subcriptions!: Array<Subscription>;

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
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  getProduct(id: string): void {
    const getProductSub = this.productService
      .getProduct(id)
      .subscribe((product) => {
        this.product = product;
        this.initializeForm();
      });

    this.subcriptions.push(getProductSub);
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

      this.subcriptions.push(productUpdatingSub);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
