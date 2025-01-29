'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
  firstName: z.coerce
    .string()
    .min(2, { message: 'Must be at least 2 characters' })
    .max(20, { message: 'Max 20 characters' }),
  email: z.coerce
    .string()
    .email({ message: 'Invalid email address' })
    .min(5, { message: 'Must be at least 5 characters' }),
});

function LoginForm() {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      email: '',
    },
  });

  // Define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="mx-auto h-screen bg-orange-800">
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
                <FormMessage />
                <FormControl>
                  <Input placeholder="Oliver" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="oliverthebeagle@aol.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full text-center">
            <Button type="submit" className="px-12 bg-slate-800">
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
