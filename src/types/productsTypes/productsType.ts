
export interface ProductsType {
  id?: number;
  nameProduct: string;
  description?: string | null;
  internalCode: string;
  brand?: string | null;
  Status?: 'active' | 'inactive';
  quantity: number;
  stockMax?: number | null;
  stockMin?: number | null;
  img?:  File | string | null;
  observations?: string | null;
  location?: string | null;
  expirationDate?: Date | null; 
  measureUnitId: number;
  categoryId: number;
  storage: number | null;
}

// Tipado para la metadata de paginación
export interface ProductsPaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
// Tipado para los parámetros de consulta
export interface GetProductsParams {
  page?: number;
  search?: string;
  limit?: number; 
}

export interface ProductsResponse {
  message: string;
  data: ProductsType[];
  meta: ProductsPaginationMeta;
}

export interface RegisterProductsProps {
  onClose: () => void;
  isOpen?: boolean;
  product?: ProductsType;
}

