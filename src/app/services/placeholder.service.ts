import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';  // API endpoint
  constructor(private http: HttpClient) {}
  // Method to get posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}