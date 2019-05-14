import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookDataService } from '../book-data.service';

import { BookListComponent } from './book-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { first } from 'rxjs/operators';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let deList: DebugElement;
  let elList: HTMLUListElement;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [{ provide: BookDataService, useClass: FakeBookDataService }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    deList = fixture.debugElement.query(By.css('[data-book-list]'));
    elList = deList.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', async () => {
    expect(component.books$).not.toBeUndefined();
    const books = await component.books$.pipe(
      first()
    ).toPromise();
    expect(books[0].title).toBe('Walden');
  });
});


class FakeBookDataService extends BookDataService {
  constructor() {
    super(null); // make sure there is no http client harmed during the filming of this test.
  }

  getBooks() {
    return of([
      { id: '1', title: 'Walden' },
      { id: '2', title: 'Nature' }
    ]);
  }
}
