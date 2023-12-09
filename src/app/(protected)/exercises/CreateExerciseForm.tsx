'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
  link: z.string().url().optional(),
});

const CreateExerciseForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      link: '',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise name</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormDescription>Link to useful insights about the exercise.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Add Exercise</Button>
      </form>
    </Form>
  );
};

export default CreateExerciseForm;
