//! https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication
//! https://developer.sas.com/reference/filtering/
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsObject, IsOptional } from 'class-validator';

import { transformFilter } from './filter';
import type { Pagination } from './pagination';
import { parsePaginatedQuery } from './pagination';

export class ComplexQuery {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ type: Number, required: false })
  take?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ type: Number, required: false })
  skip?: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: Object, required: false })
  filter?: Record<string, any>;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: Object, required: false })
  order?: Record<string, any>;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: Object, required: false })
  relations?: string[];
}

// make validation for filter, order and relations
export const parseComplexQuery = (query: ComplexQuery): PaginationFilterOrderRelations => {
  console.log(query);
  if (query.filter) transformFilter(query.filter);
  console.log(query);

  return {
    pagination: parsePaginatedQuery({ take: query.take, skip: query.skip }),
    filter: query.filter,
    order: query.order,
    relations: query.relations,
  };
};

export class PaginationFilterOrderRelations {
  pagination: Pagination;
  filter: Record<string, any>;
  order: Record<string, any>;
  relations: Record<string, any>;
}
