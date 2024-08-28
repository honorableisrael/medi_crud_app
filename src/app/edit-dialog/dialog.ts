import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
export class EditDialog {
  title: string;
  body: string;
  userId: number;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; body: string; title: string; userId: number }
  ) {
    this.title = data.title;
    this.body = data.body;
    this.userId = data.userId;
  }

  @Output() edited = new EventEmitter<ITable>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  editItem(): void {
    const payload = {
      title: this.title,
      body: this.body,
      userId: this.userId,
    };
    this.http
      .put(
        `https://jsonplaceholder.typicode.com/posts/${this.data.id}`,
        payload
      )
      .subscribe(
        (response) => {
          this.edited.emit({
            id: this.data.id,
            title: this.title,
            body: this.body,
            userId: this.userId,
          });
          alert('Successfully edited post');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error editing post:', error);
        }
      );
  }
}