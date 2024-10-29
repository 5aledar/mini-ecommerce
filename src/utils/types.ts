export interface Input {
    label: string;
    placeholder?: string;
    type: string;
    name?: string;
}

export interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}
export interface Item {
    name: string;
    path: string;
}
export interface Product {
    id: number;
    name: string;
    price: string;
    image_url: string;
}

export  interface FormData {
    [key: string]: string;
  }


