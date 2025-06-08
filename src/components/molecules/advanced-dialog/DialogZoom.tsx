import {
  useForm,
  type DefaultValues,
  type Path,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Label } from '../../atoms/Label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { type LucideIcon } from 'lucide-react';
import type { FieldConfig } from '../../../types/field-config-types';

interface DynamicDialogFormProps<T extends ZodType<any, any, any>> {
  schema: T;
  fields: FieldConfig[];
  title: string;
  description?: string;
  triggerText?: string;
  icon: LucideIcon;
  defaultValues?: DefaultValues<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
}

export function DynamicDialogForm<T extends ZodType<any, any, any>>({
  schema,
  fields,
  title,
  description,
  triggerText = 'Open Dialog',
  icon: Icon,
  defaultValues,
  onSubmit,
}: DynamicDialogFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<z.infer<T>> = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold items-center text-sm">
          {Icon && <Icon className="h-4 w-4" />}
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[425px] h-auto min-w-[calc(50vw-2rem)] overflow-y-auto">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="pb-20">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4 py-4">
              {fields.map((field) => {
                const fieldName = field.name as Path<z.infer<T>>;
                const colSpanClass = `col-span-${field.colSpan ?? 1}`;

                return (
                  <div
                    key={field.name}
                    className={`grid gap-2 ${colSpanClass}`}
                  >
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type === 'file' ? (
                      <Input
                        id={field.name}
                        type="file"
                        {...register(fieldName)}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        {...register(fieldName)}
                      />
                    )}
                    {errors[fieldName] && (
                      <p className="text-xs text-red-500">
                        {(errors[fieldName] as any)?.message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        <DialogFooter className="sticky bottom-0 mt-2 py-3 flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
