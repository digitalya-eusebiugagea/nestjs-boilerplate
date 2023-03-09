import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateTodoCommandHandler } from './application/commands/create-todo.command';
import { DeleteTodoCommandHandler } from './application/commands/delete-todo.command';
import { GetTodosQueryHandler } from './application/queries/get-todos.query';
import { TodosController } from './infrastructure/controllers/todos.controller';
import { Todo } from './infrastructure/entities/todos.entity';

const QueryHandlers = [GetTodosQueryHandler];
const CommandHandlers = [CreateTodoCommandHandler, DeleteTodoCommandHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    Logger,
  ],
})
export class TodosModule {}
