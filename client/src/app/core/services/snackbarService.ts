import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  error(msg: string) {
    this.snackbar.open(msg,'Close',{
      duration: 5000,
      panelClass: ['snack-error'],
    })
  }

  success(msg: string) {
    this.snackbar.open(msg,'Close',{
      duration: 5000,
      panelClass: ['snack-success'],
    })
  }
}
