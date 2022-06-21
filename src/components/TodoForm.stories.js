import TodoForm from './TodoForm.js';

export default {
  title: 'Components/TodoForm',
  component: TodoForm,
  argTypes: {onCreateTodo: {action: 'onCreateTodo'}},
};

const Template = args => <TodoForm {...args} />;

export const Default = Template.bind({});
