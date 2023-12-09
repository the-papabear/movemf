'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { ExternalLink, Pen, PlusIcon, Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { getExercises } from '@/lib/exerciseQueries';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { deleteExercise } from '@/lib/exerciseMutations';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ExerciseDTO } from '@/app/(protected)/exercises/interfaces';
import CreateExerciseForm from '@/app/(protected)/exercises/CreateExerciseForm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ExercisesPage = () => {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({ queryKey: ['exercises'], queryFn: getExercises });
  const removeExercise = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

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
        {isPending ? (
          <>
            <ExerciseLoadingSkeleton />
            <ExerciseLoadingSkeleton />
            <ExerciseLoadingSkeleton />
          </>
        ) : (
          <>
            {data.map((exercise: ExerciseDTO) => (
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
                      <Button variant="destructive" size={'sm'} onClick={() => removeExercise}>
                        <Trash2 />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Fragment>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default ExercisesPage;

const ExerciseLoadingSkeleton = () => {
  return (
    <Card className="flex flex-col gap-6 p-4">
      <Skeleton className="h-9 w-[270px]" />
      <div className="flex items-center justify-between p-0">
        <Skeleton className="h-10 w-[140px]" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-9" />
          <Skeleton className="h-10 w-9" />
        </div>
      </div>
    </Card>
  );
};
