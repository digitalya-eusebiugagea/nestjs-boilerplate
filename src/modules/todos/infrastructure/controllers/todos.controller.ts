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
  Request,
} from '@nestjs/common';

import { Todo } from '../entities/todos.entity';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import {
  ApiTags,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetTodosQuery } from '../../application/queries/get-todos.query';
import { CreateTodoCommand } from '../../application/commands/create-todo.command';
import { DeleteTodoCommand } from '../../application/commands/delete-todo.command';
import { HttpLoggingExceptionFilter } from '../../../../modules/core/infrastructure/exception-filters/http-logging.exception-filter';
import { HttpLoggingInterceptor } from '../../../../modules/core/infrastructure/interceptors/http-logging.interceptors';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/rbac/roles.guard';
import { Roles } from 'src/modules/auth/rbac/roles.decorator';
import { Role } from 'src/modules/auth/rbac/role.enum';

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
  async getTodos(@Request() req): Promise<Todo[]> {
    console.log(req.get('authorization'), req.user);
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
