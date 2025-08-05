import { StorageLocation } from "../login/loginType";

export interface AuthUserType {
  id: number;
  username: string;
  email: string;
  role: string;
  businessId: number;    
  storageId?: number | null;  
  storage?: StorageLocation | null;
  storages?: StorageLocation[];
}

export interface AuthState {
  user: AuthUserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tempUser: AuthUserType | null;
}