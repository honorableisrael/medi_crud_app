import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { ITable } from '../../types';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CreateDialog {
  title: string = '';
  body: string = ''; 
  readonly dialogRef = inject(MatDialogRef<any>);
  readonly data = inject<ITable>(MAT_DIALOG_DATA);
  constructor(private http: HttpClient) {} 
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(): void {
    const postData = {
      title: this.title,
      body: this.body,
      userId: this.data.userId
    };
    this.http.post('https://jsonplaceholder.typicode.com/posts', postData)
      .subscribe(response => {
        console.log('Post created:', response);
        alert('successfully created post')
        this.dialogRef.close();
      }, error => {
        console.error('Error creating post:', error);
      });
  }
}