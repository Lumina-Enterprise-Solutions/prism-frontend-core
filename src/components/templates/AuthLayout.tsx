import { GalleryVerticalEnd } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import LoginImage from '../../assets/images/Login.jpg';
import { DarkModeToggle } from '../atoms/DarkModeToggle';
import { LanguangeToggle } from '../atoms/LanguangeToggle';

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background dark:bg-foreground">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={LoginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale filter saturate-50 "
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <div className="flex justify-center gap-2 md:justify-start">
            <a
              href="#"
              className="flex items-center gap-2 font-medium dark:text-primary-foreground"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Prism
            </a>
          </div>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <LanguangeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
