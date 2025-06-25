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