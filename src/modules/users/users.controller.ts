import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ComplexQuery,
  parseComplexQuery,
} from 'src/modules/core/infrastructure/complex-query/complex-query';

import { UsersService } from '../users/users.service';
import { PaginatedUsersDto } from './paginated-users.dto';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiQuery({ type: ComplexQuery })
  @ApiOkResponse({ type: PaginatedUsersDto })
  async getAll(@Query() query: ComplexQuery) {
    const parsedQuery = parseComplexQuery(query);

    console.log('FINAL', query);

    return await this.usersService.findAll(parsedQuery);
  }
}
