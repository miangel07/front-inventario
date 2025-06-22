
export interface UnitOfMeasurementsType {
  id?: number;
  nameUnit: string;
  code: string;
  Status?: 'active' | 'inactive'
}

// Tipado para la metadata de paginación
export interface UnitOfMeasurementsPaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
// Tipado para los parámetros de consulta
export interface GetUnitOfMeasurementsParams {
  page?: number;
  search?: string;
  limit?: number; // En Nest.js usas 'limit' en lugar de 'per_page'
}

export interface UnitOfMeasurementsResponse {
  message: string;
  data: UnitOfMeasurementsType[];
  meta: UnitOfMeasurementsPaginationMeta;
}

export interface RegisterUnitOfMeasurementsProps {
  onClose: () => void;
  isOpen?: boolean;
  unit?: UnitOfMeasurementsType;
}

