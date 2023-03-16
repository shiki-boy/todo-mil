import { UpdateWriteOpResult } from "mongoose";

import { Todo, User } from "@/interfaces/models.interface";
import { UpsertTodoDto } from "@/dtos/todo/createTodo";
import todoModel from "@/models/Todo";

class TodoService {
  public async createTodo(data: UpsertTodoDto, user: User): Promise<Todo> {
    return todoModel.create({ ...data, user });
  }

  // NOTE: can apply pagination here, but choosing not to
  public async listTodos(user: User): Promise<Todo[]> {
    return todoModel.find({ user }).sort({ isCompleted: 1, updatedAt: -1 });
  }

  public async updateTodo(data: UpsertTodoDto, id: string): Promise<Todo> {
    return todoModel.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteTodo(id: string, user: User): Promise<Todo> {
    return todoModel.findOneAndDelete({ _id: id, user });
  }

  public async completeAll(user: User): Promise<UpdateWriteOpResult> {
    return todoModel.updateMany({user }, { isCompleted: true});
  }
}

export default TodoService;
