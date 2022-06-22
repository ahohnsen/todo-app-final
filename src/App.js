import {useEffect, useState} from 'react';
import styled from 'styled-components';

import TodoForm from './components/TodoForm.js';
import TodoItem from './components/TodoItem.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/todos')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Grid>
      {isLoading && <div>... Loading ...</div>}
      {!isLoading &&
        (todos.length ? (
          <Scroller>
            {todos.map((todo, index) => (
              <TodoItem
                key={todo._id}
                description={todo.description}
                onToggle={() => toggleTodo(index)}
                isDone={todo.isDone}
                id={todo._id}
              />
            ))}
          </Scroller>
        ) : (
          <div>No todos. Start by adding new todos.</div>
        ))}
      <TodoForm onCreateTodo={addTodo} />
    </Grid>
  );

  function addTodo(description) {
    fetch('/api/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({description: description}),
    })
      .then(response => response.json())
      .then(todo => setTodos([...todos, todo]))
      .catch(error => console.log(error));
  }

  function toggleTodo(index) {
    const todo = todos[index];
    fetch('/api/todos/' + todo._id, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isDone: !todo.isDone}),
    })
      .then(response => response.json())
      .then(todo => setTodos([...todos.slice(0, index), {...todo}, ...todos.slice(index + 1)]))
      .catch(error => console.log(error));
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
