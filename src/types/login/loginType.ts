export interface LoginType {
    email: string;
    password: string
}

export interface LoginUserConfirm {
    email: string;
    storageId: number
}

export interface RegisterLoginProps {
    onClose:() => void,
}

export interface Storage {
  id: number;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    business: any;
        storage?: Storage | null;
    storages?: Storage[]; 
  };
  message: string;
}
