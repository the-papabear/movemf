'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { ExternalLink, Pen, PlusIcon, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import CreateExerciseForm from '@/app/(protected)/exercises/CreateExerciseForm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const mockExercises = [
  { _id: '1', name: 'Lateral extensions', link: 'link.test.com' },
  { _id: '2', name: 'Long exercise name in this input', link: 'link.test.com' },
  { _id: '3', name: 'Lateral extensions' },
  { _id: '4', name: 'Lateral extensions', link: 'link.test.com' },
  { _id: '5', name: 'Lateral extensions' },
];

const ExercisesPage = () => {
  return (
    <section className="flex w-full flex-col items-center gap-4 py-4">
      <Collapsible className="w-full">
        <CollapsibleTrigger className={cn('w-full', buttonVariants({ variant: 'default' }))}>
          <PlusIcon /> Add new exercise
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-2 flex flex-col gap-4 p-2">
            <CardTitle>New Exercise</CardTitle>
            <CardContent>
              <CreateExerciseForm />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <div className="flex w-full flex-col gap-4">
        {mockExercises.map((exercise) => (
          <Fragment key={exercise._id}>
            <Card className="flex flex-col gap-6 p-4">
              <CardTitle className="truncate">{exercise.name}</CardTitle>
              <CardContent className="flex items-center justify-between p-0">
                {exercise.link && (
                  <Link
                    href={exercise.link}
                    className={cn('flex items-center gap-2', buttonVariants({ variant: 'default' }))}
                  >
                    <ExternalLink /> Exercise Info
                  </Link>
                )}
                <div className="flex gap-4">
                  <Button size={'sm'}>
                    <Pen />
                  </Button>
                  <Button variant="destructive" size={'sm'}>
                    <Trash2 />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default ExercisesPage;
