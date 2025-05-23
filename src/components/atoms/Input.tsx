import * as Form from '@radix-ui/react-form';

export interface InputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  message?: string;
}

export const Input = ({
  id,
  name,
  type,
  label,
  className,
  placeholder,
  required = false,
  message,
}: InputProps) => {
  return (
    <Form.Field name={name} className={className}>
      <div className="mb-2">
        <Form.Label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </Form.Label>
        <Form.Control asChild>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          />
        </Form.Control>
        {message && (
          <Form.Message
            match="valueMissing"
            className="text-sm text-destructive mt-1"
          >
            {message}
          </Form.Message>
        )}
      </div>
    </Form.Field>
  );
};
