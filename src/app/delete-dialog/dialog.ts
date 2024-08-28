import {
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
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
export class DeleteDialog {
  @Output() deleted = new EventEmitter<string>();
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteItem(): void {
    console.log(this.data);
    this.http
      .delete(`https://jsonplaceholder.typicode.com/posts/${this.data.id}`)
      .subscribe(
        (response) => {
          console.log('Delete created:', response);
          this.deleted.emit(this.data.id); 
          alert('Successfully deleted post');
          this.dialogRef.close(); 
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
  }
}
