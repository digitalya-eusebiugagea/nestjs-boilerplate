import { User } from './user.entity';

export class PaginatedUsersDto {
  count: number;
  result: User[];
}
