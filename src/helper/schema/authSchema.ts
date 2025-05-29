import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email({
      message: 'Email is required.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    tenant_id: z.string().default('default').optional(),
  })
  .refine((data) => data.email, {
    path: ['email'],
    message: 'Invalid email format.',
  });

export const registerSchema = z
  .object({
    email: z.string().email({
      message: 'Email is required.',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    first_name: z.string().min(1, {
      message: 'First name is required.',
    }),
    last_name: z.string().min(1, {
      message: 'Last name is required.',
    }),
    tenant_id: z.string().default('default').optional(),
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required.'
  }),
  tenant_id: z.string().default('default').optional(),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
  token: z.string().default('reset_token').optional(),
})
