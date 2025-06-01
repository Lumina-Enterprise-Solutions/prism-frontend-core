import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/utils';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Label } from '../../components/atoms/Label';
import { forgotPasswordSchema } from '../../helper/schema/authSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import SkeletonReset from '../../components/organims/loading/SkeletonReset';
import { Card } from '../../components/atoms/Card';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useForgotPassword } from '../../features/auth/useAuth';
import { z } from 'zod';

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik loading, bisa sesuaikan

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isPending) {
    return (
      <div className="animate-pulse">
        <SkeletonReset />
      </div>
    );
  }

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword(data, {
      onSuccess: () => {
        navigate('/reset-password');
      },
      onError: () => {
        toast.error("Cannot forgot the password")
      }
    },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6 items-center', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center text-foreground">
        <h1 className="text-2xl font-bold">
          {t('forgot_password.title', 'Forgot Password')}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t('forgot_password.subtitle', 'Enter the email address with your account')}
        </p>
      </div>
      <Card className="p-4 md:p-6 w-full max-w-full">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('form.email', 'Email')}</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            Reset
          </Button>
        </div>
      </Card>
    </form>
  );
}
