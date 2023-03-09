import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginatedQuery {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ type: Number })
  take?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ type: Number })
  skip?: string;
}

export class Pagination {
  take: number;
  skip: number;
}

export const parsePaginatedQuery = (paginatedQuery: PaginatedQuery): Pagination => {
  const take = paginatedQuery?.take && parseInt(paginatedQuery.take);
  const skip = paginatedQuery?.skip && parseInt(paginatedQuery.skip);

  return { take, skip };
};
