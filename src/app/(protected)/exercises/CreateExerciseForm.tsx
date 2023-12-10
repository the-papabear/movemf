'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useExerciseMutations } from '@/lib/useExerciseMutations';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface CreateExerciseFormProps {
  name?: string;
  link?: string;
  userId?: string;
  exerciseId?: string;
  setIsCollapsibleOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1),
  _id: z.string().optional(),
  link: z.string().optional(),
  userId: z.string().optional(),
});

const CreateExerciseForm = ({ setIsCollapsibleOpen, name, link, exerciseId, userId }: CreateExerciseFormProps) => {
  const { createExercise, updateExercise } = useExerciseMutations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || '',
      link: link || '',
      _id: exerciseId,
      userId: userId || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    exerciseId ? updateExercise.mutate(values) : createExercise.mutate(values);
    setIsCollapsibleOpen(false);
  };

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
        <Button type="submit">{exerciseId ? 'Update Exercise' : 'Add Exercise'}</Button>
      </form>
    </Form>
  );
};

export default CreateExerciseForm;
