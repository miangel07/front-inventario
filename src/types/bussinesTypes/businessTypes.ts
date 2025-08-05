export interface BusinessRegisterRequest {
  name: string;
  address: string;
  createdAt: string;
  planRenewalDate: string;
  config: {
    infinty: boolean;
    cuantityUsers: number;
    maxStorage: number;
  };
}




export interface BusinessType {
  id: number;
  name: string;
  address: string;
  createdAt: string; // ISO format: YYYY-MM-DD
  typeBusiness: string;
  planRenewalDate: string; // ISO format: YYYY-MM-DD
  status: string;
  user: UserBusinessType[];
  config: ConfigBusiness[];
}

export interface UserBusinessType {
  id: number;
  username: string;
  lastname: string;
  password: string;
  phone: string;
  identificationNumber: number;
  address: string;
  Status: string; // Nota: la "S" mayúscula puede ser intencional, pero si no, es mejor cambiarla a "status"
  typeDocument: string;
  email: string;
  createDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
}

export interface ConfigBusiness {
  id: number;
  infinty: boolean; 
  cuantityUsers: number; // Nota: probablemente quisiste decir "quantityUsers"
  maxStorage: number;
}

// Tipado para la metadata de paginación
export interface BusinessPaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
// Tipado para los parámetros de consulta
export interface GetBusinessParams {
  page?: number;
  search?: string;
  limit?: number; 
  enabled?:boolean
}

export interface BusinessResponse {
  message: string;
  data: BusinessType[];
  meta: BusinessPaginationMeta;
}

export interface RegisterBusinessProps {
  onClose: () => void;
  isOpen?: boolean;
  business?: BusinessType;
}

