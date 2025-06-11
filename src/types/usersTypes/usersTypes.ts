
export interface UsersType {
  id?: number; 
  username: string;
  lastname: string;
  password: string;
  phone: string;
  identificationNumber: number;
  address: string; 
  Status?: "active" | "inactive"; 
  typeDocument: "cc" | "ti" | "ce";
  email: string;
  createDate?: string; 
  rolId?: number; 
}



export interface UsersPaginados {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface GetUsersParams {
  page?: number;
  search?: string;
  per_page?: number;
}

export interface UsersResponse {
  message: string;
  data: UsersType[];
  pagination: UsersPaginados;
}

export interface RegisterUserProps {
  onClose: () => void;
  user?: UsersType;
}
