import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ToasterService {
  constructor(public snackBar: MatSnackBar) {}

  show(message: string) {
    this.snackBar.open(message, null, {
      duration: 5000,
    });
  }

  dismiss() {
    this.snackBar.dismiss();
  }
}
