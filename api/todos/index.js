import connectToMongodb from '../../src/backend/lib/connect-to-mongodb';
import Todo from '../../src/backend/model/Todo';

const enclosingHandler = async (request, response) => {
  try {
    await connectToMongodb();

    const {method} = request;

    if (method === 'GET') {
      const allTodos = await Todo.find();
      return response.status(200).json(allTodos);
    }

    if (method === 'POST') {
      const newTodo = await Todo.create(request.body);
      return response.status(200).json(newTodo);
    }
  } catch (error) {
    return response.status(400).json(error);
  }

  response.status(405).send();
};

export default enclosingHandler;
