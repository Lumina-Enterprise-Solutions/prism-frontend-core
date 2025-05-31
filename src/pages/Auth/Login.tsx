import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/utils';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Label } from '../../components/atoms/Label';
import { loginSchema } from '../../helper/schema/authSchema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SkeletonAuth from '../../components/organims/loading/SkeletonAuth';
import { Card } from '../../components/atoms/Card';
import { toast } from 'react-toastify';
import { useLogin } from '../../features/auth/useAuth';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/auth';

type LoginAuthInput = z.infer<typeof loginSchema>;

export function LoginPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAuthInput>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: login, isPending } = useLogin();
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

  const onSubmit = (data: LoginAuthInput) => {
    login(data, {
      onSuccess: (res) => {
        dispatch(loginSuccess(res.data.access_token));
        toast.success('Login berhasil');
        navigate('/dashboard');
      },
      onError: () => {
        toast.error('Email atau password salah');
      },
    });
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6 items-center', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center text-foreground">
        <h1 className="text-2xl font-bold dark:text-primary-foreground">
          {t('login.title', 'Login to your account')}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t('login.subtitle', 'Enter your email below to login to your account')}
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
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t('form.password', 'Password')}</Label>
              <Link
                to="/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                {t('form.forgot_password', 'Forgot your password?')}
              </Link>
            </div>
            <div className="relative">
              <Input
                {...register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="pr-10"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/50"
                aria-label="Toggle password visibility"
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
            Login
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="pt-2">
          <div className="flex flex-row items-center justify-between space-x-6">
            <Button type="submit" className="w-full" variant="outline">
              Facebook
            </Button>
            <Button type="submit" className="w-full" variant="outline">
              Google
            </Button>
          </div>
        </div>
        <div className="text-center text-sm pt-4">
          Don&apos;t have an account?{' '}
          <Link to={'/register'} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </Card>
      <div className="pt-2">
        <p className="text-xs text-foreground">
          For demo purposes, you can use any email and password
        </p>
      </div>
    </form>
  );
}
