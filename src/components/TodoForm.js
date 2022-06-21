import styled from 'styled-components';

import ScreenReaderOnly from './ScreenReaderOnly.js';

export default function TodoForm({onCreateTodo}) {
  return (
    <Form onSubmit={handleSubmit} aria-labelledby="form-title">
      <label htmlFor="todo-input">Todo description</label>
      <input maxLength={40} id="todo-input" name="todo" />
      <button>
        <ScreenReaderOnly id="form-title">Create new todo</ScreenReaderOnly>
        <span aria-hidden>+</span>
      </button>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const description = form.elements.todo.value.trim();
    if (description.length > 0) {
      onCreateTodo(description);
    }
    form.reset();
  }
}

const Form = styled.form`
  display: grid;
  gap: 6px;
  grid-template-columns: auto 48px;
  background: white;

  label {
    grid-column: span 2;
  }
`;
