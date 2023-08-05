export type ExceptionHandle = {
  handleAuthError?: () => void;
};

export type PaginationParams = {
  size: number;
  page: number;
};

export type Pageable<T> = {
  content: T[];
  total: number;
  pageable: Pagination;
};

export type Pagination = {
  page: number;
  size: number;
  sort?: PaginationSort;
};

export type PaginationSort = {
  orders?: PaginationSortOrder[];
};

export type PaginationSortOrder = {
  direction: PaginationSortOrderDirection;
  property: string;
};

export type PaginationSortOrderDirection = 'ASC' | 'DESC';
