import * as Form from '@radix-ui/react-form';
import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  message?: string;
}

export const PasswordInput = ({
  id,
  name,
  label,
  className,
  placeholder,
  required = false,
  message,
}: PasswordInputProps) => {
  return (
    <Form.Field name={name} className={className}>
      <div className="mb-2">
        <Form.Label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </Form.Label>
        <PasswordToggleField.Root>
          <div className="flex items-center rounded-md border border-input bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:border-ring">
            <PasswordToggleField.Input
              id={id}
              name={name}
              required={required}
              placeholder={placeholder}
              className="w-full outline-none text-sm text-black placeholder-gray-400"
            />
            <PasswordToggleField.Toggle className="ml-2 focus:outline-none">
              <PasswordToggleField.Icon
                visible={<EyeOpenIcon />}
                hidden={<EyeClosedIcon />}
              />
            </PasswordToggleField.Toggle>
          </div>
        </PasswordToggleField.Root>
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
