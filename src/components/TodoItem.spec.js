import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoItem from './TodoItem.js';

describe('TodoItem', () => {
  it('renders an item with a checkbox', () => {
    render(<TodoItem id="1" description="Buy chocolate" isDone={false} />);

    const todoItem = screen.getByLabelText('Buy chocolate');
    expect(todoItem).toBeInTheDocument();
  });

  it('calls onToggle on click', async () => {
    const callback = jest.fn();
    render(<TodoItem id="1" description="Buy chocolate" isDone={false} onToggle={callback} />);

    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Buy chocolate'));
    expect(callback).toHaveBeenCalled();
  });

  it('can be checked and unchecked', () => {
    const {rerender} = render(<TodoItem id="1" description="Buy chocolate" isDone={false} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<TodoItem id="1" description="Buy chocolate" isDone={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
