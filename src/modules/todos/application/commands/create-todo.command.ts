import { Logger } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateTodoDto } from '../../infrastructure/dtos/create-todo.dto';
import { Todo } from '../../infrastructure/entities/todos.entity';

export class CreateTodoCommand {
  constructor(public readonly createTodoDto: CreateTodoDto) {}
}

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler implements ICommandHandler<CreateTodoCommand, Todo> {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    private readonly logger: Logger,
  ) {}

  async execute(command: CreateTodoCommand): Promise<Todo> {
    const todo = this.todosRepository.create(command.createTodoDto);
    await this.todosRepository.save(todo);

    this.logger.log(`Todo ${todo.id} created`);

    return todo;
  }
}
