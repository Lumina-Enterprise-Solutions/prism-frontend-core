export type FieldConfig = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'file' | 'textarea';
    colSpan?: number;
  };