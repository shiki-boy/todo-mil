import { Todo, User } from "@/interfaces/models.interface";
import { UpsertTodoDto } from "@/dtos/todo/createTodo";
import todoModel from "@/models/Todo";

class TodoService {
  public async createTodo(data: UpsertTodoDto, user: User): Promise<Todo> {
    return todoModel.create({ ...data, user });
  }

  // NOTE: can apply pagination here, but choosing not to
  public async listTodos(user: User): Promise<Todo[]> {
    return todoModel.find({ user });
  }

  public async updateTodo(data: UpsertTodoDto, id: string): Promise<Todo> {
    return todoModel.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteTodo(id: string, user: User): Promise<Todo> {
    return todoModel.findOneAndDelete({ _id: id, user });
  }
}

export default TodoService;
