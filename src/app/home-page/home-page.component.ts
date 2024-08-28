import { Component } from '@angular/core';
import { PlaceholderService } from '../services/placeholder.service';
import {MatTableModule} from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface PeriodicElement {
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
  imports: [MatTableModule,MatPaginatorModule],
  providers:[PlaceholderService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  posts: any[] = [];
  title = 'Test'
  displayedColumns: string[] = ['userId','title', 'body'];
  dataSource:PeriodicElement[] = []
  constructor(private placeholderService:PlaceholderService){}
  ngOnInit(): void {
    this.placeholderService.getPosts().subscribe((data:any[]) => {
     console.log(data,'data')
     this.dataSource = data
    });
  }
}