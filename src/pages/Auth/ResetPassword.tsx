import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/utils';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Label } from '../../components/atoms/Label';
import { resetPasswordSchema } from '../../helper/schema/authSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useResetPassword } from '../../features/auth/useAuth';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import SkeletonReset from '../../components/organims/loading/SkeletonReset';

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useResetPassword();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = (data: ResetPasswordInput) => {
    resetPassword(data, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: () => {
        toast.error("Please Check your new password")
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
        <h1 className="text-2xl font-bold dark:text-primary-foreground">
          {t('reset_password.title', 'Reset Password')}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t('reset_password.subtitle', 'This password should be different from the previous password.')}
        </p>
      </div>
      <Card className="p-4 md:p-6 w-full max-w-full">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="text">{t('form.resetToken', 'Token')}</Label>
            <Input
              {...register('token')}
              id="token"
              type="text"
              placeholder="m@example.com"
              required
            />
            {errors.token && <p>{errors.token.message}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">
                {t('form.password', 'Password')}
              </Label>
            </div>
            <div className="relative">
              <Input
                {...register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('form.passwordPlaceholder', '********')}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 font-sm text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Reset
          </Button>
        </div>
      </Card>
    </form>
  );
}
