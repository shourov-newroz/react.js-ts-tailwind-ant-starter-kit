import Page from '@/components/HOC/page';
import { routeConfig } from '@/config/routeConfig';
import useAuth from '@/hooks/useAuth';
import { EyeOutlined, LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@cardselling.com',
      password: 'Password100@',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data);
  };

  return (
    <Page>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 text-pretty">
            Enter your credentials to access your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <MailOutlined className="absolute left-4 top-[37px] size-[18px] text-gray-400 pointer-events-none" />
              <Input placeholder="Email" className="pl-10 h-12" />
            </div>

            <div className="relative">
              <LockOutlined className="absolute left-4 top-[37px] size-[18px] text-gray-400 pointer-events-none" />
              <Input
                placeholder="Password"
                className="px-10 w-full h-12 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
              />
              <Button
                className="absolute right-4 top-[32px] size-[28px] text-gray-400 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOutlined className="w-4 h-4 text-gray-400" />
                ) : (
                  <EyeOutlined className="w-4 h-4 text-gray-400" />
                )}
              </Button>
            </div>

            <Button
              type="primary"
              className="w-full h-12 text-white transition-colors bg-primary hover:bg-rose-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <LoadingOutlined className="mr-2 animate-spin size-4" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
            <div className="text-center">
              <Link
                to={routeConfig.forgotPassword.routePath}
                className="text-sm text-primary hover:text-rose-600"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </Page>
  );
};

export default Login;
