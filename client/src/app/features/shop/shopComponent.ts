import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ShopService } from '../../core/services/shopService';
import { ProductItem } from './product-item/product-item';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { ShopParams } from '../../shared/models/shopParams';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductItem,
    MatButton,
    MatIcon,
    MatMenuModule,
    MatPaginator,
    MatListOption,
    MatSelectionList,
    FormsModule
  ],
  templateUrl: './shopComponent.html',
  styleUrl: './shopComponent.css',
})
export class ShopComponent {
  shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  shopParams = new ShopParams();

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];

  pageSizeOptions = [8, 12, 16, 20];

  constructor() {
    this.shopService.loadColors();
    this.shopService.loadModels();
    this.shopService.loadProducts(this.shopParams); // agora carrega e atualiza pagination também
  }

  onSearchChange() {
  this.shopParams.pageNumber = 1;
  this.shopService.loadProducts(this.shopParams);
}

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.shopService.loadProducts(this.shopParams);
  }

  setSort(sort: string): void {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.shopService.loadProducts(this.shopParams);
  }

  openFiltersDialog(): void {
    const dialogRef = this.dialogService.open(FiltersDialog, {
      width: '92vw',
      maxWidth: '520px',
      maxHeight: '90vh',
      data: {
        selectedColors: this.shopParams.colors,
        selectedModels: this.shopParams.models,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.shopParams.models = result.selectedModels;
      this.shopParams.colors = result.selectedColors;
      this.shopParams.pageNumber = 1;

      this.shopService.loadProducts(this.shopParams);
    });
  }
  rangeLabel(): string {
    const pag = this.shopService.pagination();
    if (!pag) return '';

    const total = pag.count ?? 0;
    const pageSize = this.shopParams.pageSize;
    const pageNumber = this.shopParams.pageNumber; // 1-based

    const start = total === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
    const end = Math.min(pageNumber * pageSize, total);

    return `${start}–${end} of ${total}`;
  }

  isLastPage(): boolean {
    const pag = this.shopService.pagination();
    if (!pag) return true;

    const total = pag.count ?? 0;
    return this.shopParams.pageNumber * this.shopParams.pageSize >= total;
  }

  prevPage(): void {
    if (this.shopParams.pageNumber <= 1) return;
    this.shopParams.pageNumber--;
    this.shopService.loadProducts(this.shopParams);
  }

  nextPage(): void {
    if (this.isLastPage()) return;
    this.shopParams.pageNumber++;
    this.shopService.loadProducts(this.shopParams);
  }

}
