import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../infrastructure/entities/todos.entity';

export class DeleteTodoCommand {
  constructor(public readonly todoId: string) {}
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
  implements ICommandHandler<DeleteTodoCommand, boolean>
{
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    private readonly logger: Logger,
  ) {}

  async execute(command: DeleteTodoCommand): Promise<boolean> {
    const { affected } = await this.todosRepository.delete(command.todoId);

    if (!affected) {
      throw new NotFoundException();
    }

    this.logger.log(`Todo ${command.todoId} deleted`);

    return true;
  }
}
