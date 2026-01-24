import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
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
    MatMenu,
    MatMenuTrigger,
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
}
