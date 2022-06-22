import {useEffect, useState} from 'react';
import styled from 'styled-components';

import TodoForm from './components/TodoForm.js';
import TodoItem from './components/TodoItem.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('/api/todos')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos);
        setIsLoading(false);
      })
      .catch(error => {
        setError(new Error('Oooops, something went wrong.'));
        setIsLoading(false);
      });
  }, []);

  return (
    <Grid>
      {isLoading && <div>... Loading ...</div>}
      {error && <div>{error.message}</div>}
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
    setError(null);
    fetch('/api/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({description: description}),
    })
      .then(response => response.json())
      .then(todo => setTodos([...todos, todo]))
      .catch(error => setError(new Error('Something went wrong while adding your todo. Please try again later.')));
  }

  function toggleTodo(index) {
    setError(null);
    const todo = todos[index];
    fetch('/api/todos/' + todo._id, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({isDone: !todo.isDone}),
    })
      .then(response => response.json())
      .then(todo => setTodos([...todos.slice(0, index), {...todo}, ...todos.slice(index + 1)]))
      .catch(error =>
        setError(new Error('Ooops, something went wrong while updating your todo. Please try again later.'))
      );
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
