import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  title: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  description: string;
}
