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
import { Skeleton } from '../../components/atoms/Skeleton';
import SkeletonAuth from '../../components/organims/loading/SkeletonAuth';
import { Card } from '../../components/atoms/Card';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik loading, bisa sesuaikan

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <SkeletonAuth />
      </div>
    );
  }

  const onSubmit = async (data: RegisterAuthInput) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      if (!data.email || !data.password) {
        return;
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-48 h-4" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center py-2 md:py-6 text-foreground">
          <h1 className="text-2xl font-bold dark:text-card">
            {t('register.title', 'Create an account')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('register.subtitle', 'Enter your information to get started')}
          </p>
        </div>
      )}
      <Card className="p-4 md:p-6 w-full max-w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn('flex flex-col gap-6', className)}
          {...props}
        >
          <div className="grid gap-4">
            {isLoading ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-full h-10" />
                  </div>
                  <div className="grid gap-2">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-full h-10" />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Skeleton className="w-24 h-4" />
                  </div>
                  <div className="relative">
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      {t('form.firstName', 'First Name')}
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={t('form.firstName', 'First Name')}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      {t('form.lastName', 'Last Name')}
                    </Label>
                    <Input
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
              </>
            )}

            {isLoading ? (
              <Skeleton className="w-full h-10" />
            ) : (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
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
