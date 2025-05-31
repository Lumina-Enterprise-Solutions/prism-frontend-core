import { cn } from '../../utils/utils';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Label } from '../../components/atoms/Label';
import { registerSchema } from '../../helper/schema/authSchema';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SkeletonAuth from '../../components/organims/loading/SkeletonAuth';
import { Card } from '../../components/atoms/Card';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRegister } from '../../features/auth/useAuth';

type RegisterAuthInput = z.infer<typeof registerSchema>;

export function RegisterPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAuthInput>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useRegister();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
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
        <SkeletonAuth />
      </div>
    );
  }

  const onSubmit = async (data: RegisterAuthInput) => {
    registerUser(data, {
      onSuccess: () => {
        toast.success('Registrasi berhasil');
        navigate('/login');
      },
      onError: () => {
        toast.error('Please try again')
      }
    })
  };

  return (
    <div className="flex flex-col items-center justify-center">

      <div className="flex flex-col items-center gap-2 text-center py-2 md:py-6 text-foreground">
        <h1 className="text-2xl font-bold dark:text-card">
          {t('register.title', 'Create an account')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('register.subtitle', 'Enter your information to get started')}
        </p>
      </div>
      <Card className="p-4 md:p-6 w-full max-w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn('flex flex-col gap-6', className)}
          {...props}
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="First Name">
                  {t('form.firstName', 'First Name')}
                </Label>
                <Input
                  {...register('first_name')}
                  id="firstName"
                  type="text"
                  placeholder={t('form.firstName', 'First Name')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Last Name">
                  {t('form.lastName', 'Last Name')}
                </Label>
                <Input
                  {...register('last_name')}
                  id="lastName"
                  type="text"
                  placeholder={t('form.lastName', 'Last Name')}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('form.email', 'Email')}</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder={t('form.emailPlaceholder', 'm@example.com')}
                required
              />
              {errors.email && <p>{errors.email.message}</p>}
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
              Submit
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </form>
      </Card>
      <div className="pt-2">
        <p className="text-xs text-foreground">
          For demo purposes, you can use any email and password
        </p>
      </div>
    </div>
  );
}
