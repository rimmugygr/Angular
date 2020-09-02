export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
  departmentId: number;
  department?: string;
  searchKey?: string[];
  address?: string;
  description?: string;
}
