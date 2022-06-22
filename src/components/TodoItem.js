import styled from 'styled-components';

export default function TodoItem({description, onToggle, isDone, id}) {
  return (
    <StyledListItem>
      <input type="checkbox" onChange={() => onToggle()} checked={isDone} id={id} />
      <label htmlFor={id}>{description}</label>
    </StyledListItem>
  );
}

const StyledListItem = styled.li`
  word-wrap: anywhere;
  list-style-type: none;

  input:checked + label {
    text-decoration: line-through;
    color: hotpink;
  }
`;
