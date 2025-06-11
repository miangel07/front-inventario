export interface Props<T> {
  url: string;
  method: 'GET' | 'HEAD' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  body?: T;
  params?: T
}

export interface resposeDefault<T> {
    message: T[]
}

export type ExtendedErrorDefaul = {
    data: { message: string };
    status: number;
}; 

export interface PaginationGet {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    from: number;
    to: number;
}

export interface errorDefaultApi {
  field: string;
  message: string;
}