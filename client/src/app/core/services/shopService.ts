import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);

  // STATE (signals)
  products = signal<Product[]>([]);
  pagination = signal<Pagination<Product> | null>(null);

  colors = signal<string[]>([]);
  models = signal<string[]>([]);
  loading = signal(false);

  loadProducts(shopParams: ShopParams) {
    let params = new HttpParams()
      .set('pageSize', String(shopParams.pageSize))
      .set('pageIndex', String(shopParams.pageNumber)); // confirma se no backend é pageIndex

    if (shopParams.colors?.length) {
      params = params.set('colors', shopParams.colors.join(','));
    }

    if (shopParams.models?.length) {
      params = params.set('models', shopParams.models.join(','));
    }

    if (shopParams.sort) {
      params = params.set('sort', shopParams.sort);
    }

    if (shopParams.search){
      params = params.set('search', shopParams.search);
    }

    this.loading.set(true);

    this.http.get<Pagination<Product>>(`${this.baseUrl}products`, { params }).subscribe({
      next: response => {
        this.pagination.set(response);
        this.products.set(response.data);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  loadProduct(id: number){
    return this.http.get<Product>(`${this.baseUrl}products/${id}`);

  }


  loadColors() {
    if (this.colors().length) return;
    this.http.get<string[]>(`${this.baseUrl}products/colors`).subscribe({
      next: response => this.colors.set(response),
    });
  }

  loadModels() {
    if (this.models().length) return;
    this.http.get<string[]>(`${this.baseUrl}products/models`).subscribe({
      next: response => this.models.set(response),
    });
  }
}
