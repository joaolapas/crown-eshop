import { Component, inject, OnInit, signal } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ShopService } from '../../../core/services/shopService';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  imports: [
    MatButton,
    MatIcon,
    CurrencyPipe,
    RouterLink
  ]
})
export class ProductDetails implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);

  product = signal<Product | null>(null);

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!id) return;

    this.shopService.loadProduct(id).subscribe({
      next: (product) => this.product.set(product),
      error: (error) => console.log(error),
    });
  }
}
