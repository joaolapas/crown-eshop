import { Component, input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import { Product } from '../../../shared/models/product';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatButton, MatIcon, RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input<Product | undefined>();
}
