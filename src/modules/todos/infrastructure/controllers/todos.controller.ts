import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/rbac/roles.guard';

import { HttpLoggingExceptionFilter } from '../../../../modules/core/infrastructure/exception-filters/http-logging.exception-filter';
import { HttpLoggingInterceptor } from '../../../../modules/core/infrastructure/interceptors/http-logging.interceptors';
import { CreateTodoCommand } from '../../application/commands/create-todo.command';
import { DeleteTodoCommand } from '../../application/commands/delete-todo.command';
import { GetTodosQuery } from '../../application/queries/get-todos.query';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import type { Todo } from '../entities/todos.entity';

@ApiTags('todos')
@ApiBearerAuth()
@Controller({
  path: 'todos',
  version: '1',
})
@UseGuards(RolesGuard)
@UseInterceptors(HttpLoggingInterceptor)
@UseFilters(HttpLoggingExceptionFilter)
export class TodosController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  // @Roles(Role.User)
  @UseGuards(JwtAuthGuard)
  async getTodos(): Promise<Todo[]> {
    const todos = await this.queryBus.execute(new GetTodosQuery());
    return todos;
  }

  @Post()
  @ApiUnprocessableEntityResponse({ description: 'Validation errors' })
  @ApiInternalServerErrorResponse()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.commandBus.execute(new CreateTodoCommand(createTodoDto));
  }

  @Delete('/:id')
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async deleteTodo(@Param('id') todoId: string): Promise<boolean> {
    return await this.commandBus.execute(new DeleteTodoCommand(todoId));
  }
}
