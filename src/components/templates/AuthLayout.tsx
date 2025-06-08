import { Outlet } from 'react-router-dom';
import LoginImage from '../../assets/images/Login.jpg';
import { DarkModeToggle } from '../atoms/DarkModeToggle';
import { LanguangeToggle } from '../atoms/LanguangeToggle';
import { motion } from 'framer-motion';
import logoPrism from '../../assets/images/logo/Prism_ERP_Logo.png'

export default function AuthLayout() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      <div className="relative hidden bg-muted lg:block">
        {/* Background Image */}
        <img
          src={LoginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale filter saturate-50"
        />

        {/* Overlay Background */}
        <div className="absolute inset-0 bg-foreground/50 dark:bg-background/10" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          {/* Header Section */}
          <div className="mt-10">
            <h1 className="text-5xl font-bold text-primary-foreground dark:text-foreground drop-shadow-lg">
              Welcome to Prism
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-md">
              Manage your business operations in an integrated and efficient manner.
            </p>
          </div>

          {/* Features Section */}
          <motion.div
            variants={itemVariants}
            className="mt-10 space-y-4"
          >
            {[
              { icon: "check", text: "Seamless Collaboration" },
              { icon: "check", text: "Powerful Analytics" },
              { icon: "check", text: "Task Management" },
              { icon: "check", text: "Secure & Private" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-primary/50 text-primary-foreground dark:text-foreground p-2 rounded-full">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium text-primary-foreground dark:text-foreground">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-auto pt-10 text-sm text-primary-foreground dark:text-foreground"
          >
            © {new Date().getFullYear()} Prism. All rights reserved.
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <div className="flex justify-center gap-2 md:justify-start">
            <a
              href="#"
              className="flex items-center gap-2 text-foreground font-semibold"
            >
              <img src={logoPrism} alt="Prism Logo" className="h-6" />
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
