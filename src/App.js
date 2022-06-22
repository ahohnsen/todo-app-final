import {nanoid} from 'nanoid';
import styled from 'styled-components';

import TodoForm from './components/TodoForm.js';
import TodoItem from './components/TodoItem.js';
import useLocalStorage from './hooks/useLocalStorage.js';

export default function App() {
  const [todos, setTodos] = useLocalStorage('My ToDos', []);

  return (
    <Grid>
      <Scroller>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            description={todo.description}
            onToggle={() => toggleTodo(index)}
            isDone={todo.isDone}
            id={todo.id}
          />
        ))}
      </Scroller>
      <TodoForm onCreateTodo={addTodo} />
    </Grid>
  );

  function addTodo(description) {
    setTodos([...todos, {id: nanoid(), description: description, isDone: false}]);
  }

  function toggleTodo(index) {
    const todo = todos[index];
    setTodos([...todos.slice(0, index), {...todo, isDone: !todo.isDone}, ...todos.slice(index + 1)]);
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
