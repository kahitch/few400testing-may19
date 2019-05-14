import * as actions from '../actions/list.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { TodoListItem } from '../models';
import { tassign } from 'tassign';

export interface TodoEntity {
  id: string;
  description: string;
}


export interface State extends EntityState<TodoEntity> {
  completedIds: string[];
}

const initialState: State = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', description: 'Clean Garage' },
    2: { id: '2', description: 'Finish Daryl\'s Deck' }
  },
  completedIds: ['1']
};

export const adapter = createEntityAdapter<TodoEntity>();
export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ITEM_ADDED_SUCCESS: {
      const tempState = adapter.removeOne(action.oldId, state);
      return adapter.addOne(action.item, tempState);
    }
    case actions.ITEM_ADDED: {
      return adapter.addOne(action.item, state);
    }
    case actions.ITEM_COMPLETED: {
      return tassign(state, {
        completedIds:
          [action.item.id, ...state.completedIds]
      });
    }
    default: {
      return state;
    }
  }
}


// feature
// tslint:disable-next-line: variable-name
export const _selectTodosFeature = createFeatureSelector<State>('todos');

// per branch


// helpoers
// tslint:disable-next-line: variable-name
export const { selectAll: _selectAllTodos } = adapter.getSelectors(_selectTodosFeature);
// tslint:disable-next-line: variable-name
export const _selectCompletedIds = createSelector(_selectTodosFeature, f => f.completedIds);
// components
// selector that returns TodoListItem[]
export const selectTodoListItems = createSelector(_selectAllTodos, _selectCompletedIds, (todos, ids) => {
  return todos.map(todo => {
    return ({
      id: todo.id,
      description: todo.description,
      completed: ids.some(i => i === todo.id)
    }) as TodoListItem;
  });
});
