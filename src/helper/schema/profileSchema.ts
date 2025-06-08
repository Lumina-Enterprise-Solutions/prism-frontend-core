import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const profileSchema = z.object({
  profile_image: z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  date: z.string().min(2, 'Date must be at least 2 characters'),
  description: z.string().min(2, 'Description must be at least 2 characters').optional(),
  country: z.string().min(2, 'Country must be at least 2 characters').optional(),
  city: z.string().min(2, 'City must be at least 2 characters').optional(),
  pos_code: z.string().min(2, 'Pos Code must be at least 2 characters').optional(),
});