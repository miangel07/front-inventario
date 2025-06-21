
export interface WineriesType {
  id?: number;
  nameStorage: string;
  address: string;
  TypeStorage: 'principal' | 'branch_warehouse';
  Status?: 'active' | 'inactive';
  managerId?: number | null;
}

// Tipado para la metadata de paginación
export interface WineriesPaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
// Tipado para los parámetros de consulta
export interface GetWineriesParams {
  page?: number;
  search?: string;
  limit?: number; // En Nest.js usas 'limit' en lugar de 'per_page'
}

export interface WineriesResponse {
  message: string;
  data: WineriesType[];
  meta: WineriesPaginationMeta;
}

export interface RegisterWinerieProps {
  onClose: () => void;
  isOpen?: boolean;
  winerie?: WineriesType;
}

