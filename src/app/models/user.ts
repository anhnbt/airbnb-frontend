import {Timestamp} from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: number;
  dateOfBirth: Date;
  phone: string;
  active: boolean;
  createdAt: Timestamp<any>;
  updatedAt: Timestamp<any>;
}
