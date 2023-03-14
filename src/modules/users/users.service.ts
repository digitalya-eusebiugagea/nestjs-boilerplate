import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { PaginationFilterOrderRelations } from 'src/modules/core/infrastructure/complex-query/complex-query';
import { EntityPropertyNotFoundError, Repository } from 'typeorm';

import type { CreateUserDto } from './create-user.dto';
import type { PaginatedUsersDto } from './paginated-users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async findAll(args: PaginationFilterOrderRelations): Promise<PaginatedUsersDto> {
    try {
      const [result, count] = await this.usersRepository.findAndCount({
        take: args.pagination.take,
        skip: args.pagination.skip,
        where: args.filter,
        order: args.order,
        relations: args.relations,
      });

      return { count, result };
    } catch (err) {
      if (err instanceof EntityPropertyNotFoundError) {
        throw new BadRequestException('Filters are not correct');
      }

      throw err;
    }
  }

  async findById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: parseInt(userId) } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async patch(partialUser: Partial<User>): Promise<void> {
    const { id, ...propsToUpdate } = partialUser;
    await this.usersRepository.update({ id }, propsToUpdate);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    this.logger.log(`User ${user.id} created`);

    return user;
  }

  async delete(userId: string): Promise<boolean> {
    const { affected } = await this.usersRepository.delete(userId);

    if (!affected) {
      throw new NotFoundException();
    }

    this.logger.log(`User ${userId} deleted`);

    return true;
  }
}
