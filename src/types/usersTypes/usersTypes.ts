
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
// Tipado para la metadata de paginación
export interface UsersPaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
// Tipado para los parámetros de consulta
export interface GetUsersParams {
  page?: number;
  search?: string;
  limit?: number; // En Nest.js usas 'limit' en lugar de 'per_page'
}

export interface UsersResponse {
  message: string;
  data: UsersType[];
  meta: UsersPaginationMeta;
}

export interface RegisterUserProps {
  onClose: () => void;
  user?: UsersType;
}

