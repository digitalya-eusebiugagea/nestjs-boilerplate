import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Pagination } from 'src/database/pagination';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let app: TestingModule;

  const mockUsersService = {
    findAll: jest.fn().mockImplementation((_pagination: Pagination) => {
      return {
        count: 1,
        result: [
          {
            id: 1,
            username: 'john',
            password: 'changeme',
            token: null,
          },
        ],
      };
    }),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();
  });

  describe('getAll', () => {
    it('should return the paginated result of users', async () => {
      const usersController = app.get(UsersController);
      const result = await usersController.getAll(undefined);
      expect(result).toEqual({
        count: 1,
        result: [
          {
            id: 1,
            username: 'john',
            password: 'changeme',
            token: null,
          },
        ],
      });
    });
  });
});
