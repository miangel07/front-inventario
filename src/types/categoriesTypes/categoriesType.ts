
export interface CategoriesType {
  id?: number;
  NameCategory: string;
  Status?: 'active' | 'inactive'
}

// Tipado para la metadata de paginación
export interface CategoriesPaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
// Tipado para los parámetros de consulta
export interface GetCategoriesParams {
  page?: number;
  search?: string;
  limit?: number; // En Nest.js usas 'limit' en lugar de 'per_page'
}

export interface CategoriesResponse {
  message: string;
  data: CategoriesType[];
  meta: CategoriesPaginationMeta;
}

export interface RegisterCategorieProps {
  onClose: () => void;
  isOpen?: boolean;
  category?: CategoriesType;
}

