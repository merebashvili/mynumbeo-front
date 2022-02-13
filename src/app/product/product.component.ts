import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { SubscriptionsContainer } from '../subscriptions-container';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: any;
  productForm!: FormGroup;
  paramsId!: string;
  private subscriptions = new SubscriptionsContainer();
  public isProductAddComponent = false;
  private country = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.paramsId = this.route.snapshot.params.id;
    this.initComponent(this.paramsId);
  }

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }

  private initComponent(paramsId: string): void {
    this.paramsId
      ? this.getProduct(this.paramsId)
      : this.initProductAddComponent();
  }

  getProduct(id: string): void {
    this.subscriptions.add = this.productService
      .getProduct(id)
      .subscribe((product) => {
        this.product = product;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      product: [
        this.getFormValue('product'),
        [Validators.required, Validators.minLength(2)],
      ],
      price_in_local: [
        this.getFormValue('price_in_local'),
        [Validators.required, Validators.min(0.0001)],
      ],
      price_in_usd: [
        this.getFormValue('price_in_usd'),
        [Validators.required, Validators.min(0.0001)],
      ],
      quantity_for_month: [
        this.getFormValue('quantity_for_month'),
        [Validators.required, Validators.min(1)],
      ],
    });

    if (this.isProductAddComponent) {
      this.productForm.addControl(
        'country',
        new FormControl(this.country, [
          Validators.required,
          Validators.minLength(2),
        ])
      );
    }
  }

  onProductSubmit(): void {
    const product = this.productForm.getRawValue();
    if (product) {
      this.isProductAddComponent
        ? this.addProduct(product)
        : this.updateProduct(product);
    }
  }

  public deleteProduct(): void {
    this.subscriptions.add = this.productService
      .deleteProduct(this.product._id)
      .subscribe(() => this.goBack());
  }

  private goBack(): void {
    this.location.back();
  }

  private getFormValue(value: string): string | number {
    return this.isProductAddComponent ? '' : this.product[value];
  }

  private initProductAddComponent(): void {
    this.isProductAddComponent = true;
    this.setCountryName();
    this.initializeForm();
  }

  private updateProduct(product: any): void {
    this.subscriptions.add = this.productService
      .updateProduct(product, this.paramsId)
      .subscribe(() => this.goBack());
  }

  private addProduct(product: any): void {
    this.subscriptions.add = this.productService
      .addProduct(product)
      .subscribe(() => this.goBack());
  }

  private setCountryName(): void {
    const paramCountry = this.route.snapshot.params.country;
    this.country = paramCountry ? paramCountry : '';
  }
}
