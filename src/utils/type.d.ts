type ApiResponseState = 'SUCCESS' | 'FAILURE';
type ApiResponseError = {
  message?: string;
  detailMessage?: string;
};

type ApiResponse<T> = {
  state: ApiResponseState;
  status: number;
  data?: T;
  error?: ApiResponseError;
};
