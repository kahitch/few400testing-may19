import { TodoListItem } from '../models';
import { CompletedItem } from './list.actions';

describe('the actions', () => {
  describe('the CompletedItem actions', () => {
    it('copies the properties right', () => {
      const inputItem: TodoListItem = {
        id: '42',
        description: 'Pizza',
        completed: true
      };

      const result = new CompletedItem(inputItem);

      expect(result.item).toEqual({
        id: '42',
        description: 'Pizza'
      });
    });
  });
});
