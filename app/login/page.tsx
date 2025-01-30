'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginSchema from '@/lib/loginSchema';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

function LoginForm() {
  // Define form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      firstName: 'Rolf',
      email: 'rolf@gmail.com',
    },
  });

  // Define submit handler
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await fetch(
        'https://frontend-take-home-service.fetch.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.firstName,
            email: values.email,
          }),
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP Error. Status: ${res.status}`);
      }
      router.push('/browse/dogs');
    } catch (error) {
      console.log(error);
    }
  }

  const { formState } = form;

  return (
    <div className="mx-auto h-screen bg-opacity-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[100%] sm:w-2/3 sm:rounded-sm max-w-[500px] fixed left-1/2 top-32 transform -translate-x-1/2 bg-slate-50 py-6 px-12
"
        >
          <h1 className="text-2xl text-center">Fetch Rewards Portal</h1>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Oliver" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="oliverthebeagle@aol.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full text-center">
            <Button
              type="submit"
              className="px-12 bg-slate-800"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'Logging In...' : 'Log In'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
