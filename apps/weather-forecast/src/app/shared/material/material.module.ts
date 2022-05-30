import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  declarations: [],
  providers: [],
})
export class MaterialModule {}
