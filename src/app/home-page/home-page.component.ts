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

export interface ITable {
  body: string;
  title: number;
  userId: number;
}
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
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['userId', 'title', 'body', 'id'];
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialog, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { id }
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
