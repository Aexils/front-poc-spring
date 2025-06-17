export interface DynamicAttributeTemplate {
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  options?: string[];
}
