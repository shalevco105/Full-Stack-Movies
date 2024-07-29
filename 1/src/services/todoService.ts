import axios from 'axios';
import { TODO_PATH } from '../constants/consts';
import { Todo } from '../models/todoModel';

class TodoService {
    static async getTasksByUserId(userId: number): Promise<Todo[] | undefined> {
        const response = await axios.get<Todo[]>(TODO_PATH);
        const todos = response.data;
        const userTodos = todos.filter(todo => todo.userId === userId).slice(0, 10);
        return userTodos;
    }
}

export default TodoService;
