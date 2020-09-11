export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
  departmentId: string;
  taskIds?: string[];
  department?: string;
  searchKey?: string[];
  address?: string;
  description?: string;
}
