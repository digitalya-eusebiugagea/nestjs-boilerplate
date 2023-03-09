import { PaginatedQuery, parsePaginatedQuery } from './../../database/pagination';
import { Controller, Get, Query } from '@nestjs/common';

import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: PaginatedUsersDto })
  async getAll(@Query() query: PaginatedQuery) {
    console.log('HEI');
    return await this.usersService.findAll(parsePaginatedQuery(query));
  }
}
