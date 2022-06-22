import TodoItem from './TodoItem.js';

export default {
  title: 'Components/TodoItem',
  component: TodoItem,
  argTypes: {onToggle: {action: 'onToggle'}},
};

const Template = args => <TodoItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  isDone: false,
  description: 'Buy chocolate',
};

export const Checked = Template.bind({});
Checked.args = {
  id: '2',
  isDone: true,
  description: 'Buy milk',
};
