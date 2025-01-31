'use client';

import { useRouter } from 'next/navigation';
import Logout from '@/components/ui/logout';
import { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import dogSchema from '@/lib/dogSchema';
function Breeds() {
  const router = useRouter();
  const [breeds, setBreeds] = useState([]);
  const sizes = ['10', '25', '50'];
  useEffect(() => {
    const getBreeds = async () => {
      const res = await fetch(
        'https://frontend-take-home-service.fetch.com/dogs/breeds',
        {
          credentials: 'include',
        }
      );
      if (!res.ok) router.push('/login');
      const data = await res.json();
      setBreeds(data);
    };
    getBreeds();
  }, [router]);

  const form = useForm<z.infer<typeof dogSchema>>({
    resolver: zodResolver(dogSchema),
    defaultValues: {
      breeds: '',
      zipCodes: '',
      ageMin: 0,
      ageMax: 10,
      size: '25',
      from: 1,
    },
  });

  const { formState } = form;

  return (
    <div className="max-w-[1280px] relative bg-blue-300 bg-opacity-70 w-full h-screen mx-auto">
      <Logout />
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[100%] sm:w-2/3 sm:rounded-sm max-w-[500px] fixed left-1/2 top-32 transform -translate-x-1/2 bg-slate-50 py-6 px-12
"
        >
          <h1 className="text-2xl text-center">Fetch Rewards Portal</h1>
          <FormField
            control={form.control}
            name="breeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breeds</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === 'all' ? '' : value)
                  }
                  defaultValue={field.value || 'all'}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={'All Breeds'} />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="all" key={0}>
                      All Breeds
                    </SelectItem>
                    {breeds.map((breed, index) => (
                      <SelectItem value={breed} key={index}>
                        {breed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can pick multiple breeds. Default is All Breeds.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCodes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Codes</FormLabel>
                <FormControl>
                  <Input placeholder="77203, 79067, 77472" {...field} />
                </FormControl>
                <FormDescription>
                  You can enter multiple ZIP codes. Ex. 77203, 79067, 77472
                </FormDescription>
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
export default Breeds;
