import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const todosController = app.get(TodosController);
      expect(todosController.getHello()).toBe('Hello World!');
    });
  });
});
