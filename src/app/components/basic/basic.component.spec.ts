import { BasicComponent } from './basic.component';

describe('Testing the class directly', () => {
  let component: BasicComponent;

  beforeEach(() => {
    component = new BasicComponent();
  });

  it('should have a default message', () => {
    expect(component.message).toBe('Hello, World');
  });

  describe('clicking the button', () => {
    beforeEach(() => {
      component.changeMessage();
    });
    it('should change the message', () => {
      expect(component.message).toBe('Thanks!');
    });
  });
});
