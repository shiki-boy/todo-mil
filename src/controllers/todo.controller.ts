import { UpsertTodoDto } from '@/dtos/todo/createTodo';
import { NextFunction, Response } from "express";

import TodoService from "@/services/todo.service";
import { RequestWithUser } from "@/interfaces/utils.interface";

class TodoController {
  public todoService = new TodoService();

  public listTodos = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.todoService.listTodos(
        req.user);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createTodo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todoData: UpsertTodoDto = req.body;
      const newTodo = await this.todoService.createTodo(
        todoData,
        req.user
      );
      res.json({ newTodo });
    } catch (error) {
      next(error);
    }
  };

  public updateTodo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todoData: UpsertTodoDto = req.body;
      const todo = await this.todoService.updateTodo(
        todoData,
        req.params.id
      );
      res.json({ todo });
    } catch (error) {
      next(error);
    }
  };

  public deleteTodo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.params.id) {
        res.status(400).json({message: "No id provided"})
      }
      await this.todoService.deleteTodo(req.params.id, req.user)

      res.status(204).json({ message: "Todo deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default TodoController;
