import Page from '@/components/HOC/page';
import { routeConfig } from '@/config/routeConfig';
import { Button, Form, Input, message, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { authService } from '../../services/auth.service';

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Registration schema
const registerSchema = z
  .object({
    full_name: z.string().min(2, 'Full name must be at least 2 characters long'),
    email: z.string().regex(emailRegex, 'Invalid email format'),
    password: z
      .string()
      .regex(
        passwordRegex,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: RegisterFormData) => {
    try {
      // Validate form data
      registerSchema.parse(values);

      // Send registration request
      const response = await authService.register(values);
      message.success(response.message);
      navigate(routeConfig.login.path());
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        error.errors.forEach((err) => {
          message.error(err.message);
        });
      } else if (error instanceof Error) {
        // Handle API errors
        message.error(error.message || 'Registration failed');
      } else {
        message.error('An unexpected error occurred');
      }
    }
  };

  return (
    <Page>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2 text-center">
          <Typography.Title level={3} className="text-gray-900 m-0">
            Register Account
          </Typography.Title>
          <Typography.Paragraph>
            Please enter your details to create an account
          </Typography.Paragraph>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { min: 2, message: 'Full name must be at least 2 characters long' },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { pattern: emailRegex, message: 'Please enter a valid email address' },
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern: passwordRegex,
                message:
                  'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full mt-2">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Page>
  );
};

export default RegisterPage;
