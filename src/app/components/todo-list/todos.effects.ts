import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TodosDataService } from './todos.tata.service';
import * as actions from './actions/list.actions';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodosEffects {

  @Effect() itemAdded$ = this.actions$
    .pipe(
      ofType(actions.ITEM_ADDED),
      // 1. Convert it to AddedItem action (map),
      map(a => a as actions.AddedItem),
      // 2. call the services add method.
      switchMap(a => this.service.addTodo(a.item.description)
        .pipe(
          map(result => new actions.ItemAddedSuccessfully(a.item.id, result))
        )
      )

      // 2.b. Read the description out
      // 3. Dispatch AddedItemSuccessfully
    );

  constructor(private actions$: Actions, private service: TodosDataService) { }
}
