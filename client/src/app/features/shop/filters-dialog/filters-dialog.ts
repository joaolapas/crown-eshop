import {Component, inject} from '@angular/core';
import {ShopService} from '../../../core/services/shopService';
import {MatDivider, MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {throwDialogContentAlreadyAttachedError} from '@angular/cdk/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filters-dialog',
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './filters-dialog.html',
  styleUrl: './filters-dialog.css',
})
export class FiltersDialog {
  shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FiltersDialog>);
  data = inject(MAT_DIALOG_DATA);

  selectedColors : string[] = this.data.selectedColors;
  selectedModels : string[] = this.data.selectedModels;


  applyFilters(){
    this.dialogRef.close({
      selectedModels: this.selectedModels,
      selectedColors: this.selectedColors
    });
  }
}

