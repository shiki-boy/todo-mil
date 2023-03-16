import { Router } from 'express';
import TodoController from '@controllers/todo.controller';
import { Routes } from '@interfaces/routes.interface';
import authenticate from '@/middlewares/authenticate';

class TodoRoute implements Routes {
  public path = '/api/todos';
  public router = Router();
  public todoController = new TodoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authenticate, this.todoController.listTodos);

    this.router.post(`${this.path}`, authenticate, this.todoController.createTodo);

    this.router.put(`${this.path}/:id`, authenticate, this.todoController.updateTodo);

    this.router.delete(`${this.path}/:id`, authenticate, this.todoController.deleteTodo);
  }
}

export default TodoRoute;
