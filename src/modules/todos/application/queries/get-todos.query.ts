import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../infrastructure/entities/todos.entity';

export class GetTodosQuery {
  constructor() {}
}

@QueryHandler(GetTodosQuery)
export class GetTodosQueryHandler
  implements IQueryHandler<GetTodosQuery, Todo[]>
{
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async execute(): Promise<Todo[]> {
    const todos = await this.todosRepository.find();
    return todos;
  }
}
