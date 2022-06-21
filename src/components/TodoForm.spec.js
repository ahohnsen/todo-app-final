import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoForm from './TodoForm.js';

describe('TodoForm', () => {
  it('is an accessible form', () => {
    render(<TodoForm />);
    screen.getByRole('form');
    screen.getByLabelText('Todo description');
    screen.getByRole('button', {name: 'Create new todo'});
  });

  it('calls onCreateTodo on submit', async () => {
    const user = userEvent.setup();
    const callback = jest.fn();
    render(<TodoForm onCreateTodo={callback} />);

    const input = screen.getByLabelText('Todo description');
    await user.type(input, 'buy coffee{Enter}');
    expect(callback).toHaveBeenCalledWith('buy coffee');
  });

  it('does not call onCreateTodo with only whitespace', async () => {
    const user = userEvent.setup();
    const callback = jest.fn();

    render(<TodoForm onCreateTodo={callback} />);

    const input = screen.getByLabelText('Todo description');
    await user.type(input, '           {Enter}');
    expect(callback).not.toHaveBeenCalled();
  });

  it('does trim whitespace before submit', async () => {
    const user = userEvent.setup();
    const callback = jest.fn();
    render(<TodoForm onCreateTodo={callback} />);

    const input = screen.getByLabelText('Todo description');
    await user.type(input, '      needs trimming     {Enter}');
    expect(callback).toHaveBeenCalledWith('needs trimming');
  });

  it('does allow 100 characters', async () => {
    const user = userEvent.setup();
    const callback1 = jest.fn();
    render(<TodoForm onCreateTodo={callback1} />);

    const input = screen.getByLabelText('Todo description');
    const longText = Array(100).fill('x').join('');
    await user.type(input, longText + '{Enter}');
    expect(callback1).toHaveBeenCalledWith(longText);
  });

  it('does not allow more than 100 characters', async () => {
    const user = userEvent.setup();
    const callback1 = jest.fn();
    render(<TodoForm onCreateTodo={callback1} />);

    const input = screen.getByLabelText('Todo description');
    const longText = Array(100).fill('x').join('');
    const tooLongText = longText + 'XXX';
    await user.type(input, tooLongText + '{Enter}');
    expect(callback1).toHaveBeenCalledWith(longText);
  });
});
