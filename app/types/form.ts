// Types for form fields
export type FieldType =
  | "text"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "image";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface CheckboxOptions {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  options?: string[] | CheckboxOptions[];
  validation?: ValidationRule;
  customStyles?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

export interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSubmission {
  id: string;
  templateId: string;
  data: Record<string, any>;
  submittedAt: Date;
}
