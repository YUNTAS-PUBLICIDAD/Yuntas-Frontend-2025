export interface UserData {
    id: number;
    name: string;
    email: string;
}

export interface NewUserData {
    name: string;
    email: string;
    password: string;
    role_id: number;
}

export interface AddUserFormProps {
  onSubmit: (data: NewUserData) => Promise<void>;
  onCancel: () => void;
}
