import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookListItem } from '../models';
import { BookDataService } from '../book-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books$: Observable<BookListItem[]>;
  constructor(private service: BookDataService) { }

  ngOnInit() {
    this.books$ = this.service.getBooks();
  }

}
