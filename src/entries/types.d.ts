type PageParams = {
  size: number;
  page: number;
};

type Page<T> = {
  content: T[];
  total: number;
  pageable: PageInfo;
};

type PageInfo = {
  page: number;
  size: number;
  sort?: PageSort;
};

type PageSort = {
  orders?: PageSortOrder[];
};

type PageSortOrder = {
  direction: PageSortOrderDirection;
  property: string;
};

type PageSortOrderDirection = 'ASC' | 'DESC';
