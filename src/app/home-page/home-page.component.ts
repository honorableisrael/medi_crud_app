import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { PlaceholderService } from '../services/placeholder.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateDialog } from '../create-dialog/dialog';
import { DeleteDialog } from '../delete-dialog/dialog';
import { ITable } from '../../types';
import { EditDialog } from '../edit-dialog/dialog';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [PlaceholderService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  title = 'Test';
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [ 'title', 'body', 'id'];
  dataSource: ITable[] = [];
  constructor(
    private placeholderService: PlaceholderService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.placeholderService.getPosts().subscribe((data: any[]) => {
      console.log(data, 'data');
      this.dataSource = data;
      this.cdr.markForCheck();
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialog);

    dialogRef.componentInstance.created.subscribe((newItem: ITable) => {
      this.dataSource = [newItem, ...this.dataSource];
      this.cdr.markForCheck();
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { id },
    });
    dialogRef.componentInstance.deleted.subscribe((deletedId: number) => {
      this.dataSource = this.dataSource.filter((item) => item.id !== deletedId);
      this.cdr.markForCheck();
    });
  }
  openEditDialog(selectedRow: ITable): void {
    const dialogRef = this.dialog.open(EditDialog, {
      data: { ...selectedRow },
    });

    dialogRef.componentInstance.edited.subscribe((editedData: ITable) => {
      this.dataSource = this.dataSource.map((item) =>
        item.id === editedData.id ? editedData : item
      );
      this.cdr.markForCheck();
    });
  }
}
