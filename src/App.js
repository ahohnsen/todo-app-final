import {useState} from 'react';
import styled from 'styled-components';

import TodoForm from './components/TodoForm.js';

export default function App() {
  const [todos, setTodos] = useState([]);

  return (
    <Grid>
      <Scroller>
        {todos.map((todo, index) => (
          <TodoItem key={index}>{todo}</TodoItem>
        ))}
      </Scroller>
      <TodoForm onCreateTodo={addTodo} />
    </Grid>
  );

  function addTodo(description) {
    setTodos([...todos, description]);
  }
}

const Grid = styled.main`
  display: grid;
  align-content: start;
  grid-template-rows: 1fr auto;
  height: 100vh;
  padding: 12px;
`;

const Scroller = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

const TodoItem = styled.li`
  word-wrap: anywhere;
`;
