import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/database/pagination';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { PaginatedUsersDto } from './paginated-users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async findAll({ take, skip }: Pagination): Promise<PaginatedUsersDto> {
    const [result, count] = await this.usersRepository.findAndCount({
      take,
      skip,
    });

    return { count, result };
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
