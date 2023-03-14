export class PaginationQuery {
  take: string;
  skip: string;
}

export class Pagination {
  take: number;
  skip: number;
}

export const parsePaginatedQuery = (paginatedQuery: PaginationQuery): Pagination => {
  const take = paginatedQuery?.take && parseInt(paginatedQuery.take);
  const skip = paginatedQuery?.skip && parseInt(paginatedQuery.skip);

  return { take, skip };
};
