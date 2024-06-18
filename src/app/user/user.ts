export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  gender: string;
  addresses: Address[];
}

export interface Address {
  city: string;
  street: string;
  state: string;
  country: string;
}