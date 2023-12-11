'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronDown, CopyPlus, Pen, PlusIcon, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useWorkoutQueries } from '@/lib/useWorkoutQueries';
import { Skeleton } from '@/components/ui/skeleton';

const WorkoutsOverview = () => {
  const { data, isPending } = useWorkoutQueries();

  return (
    <section className="flex w-full flex-col items-center gap-4 py-4">
      <Link
        href="/new-workout"
        className={cn('flex w-full items-center gap-2', buttonVariants({ variant: 'default' }))}
      >
        <PlusIcon /> Add new workout
      </Link>

      {isPending ? (
        <>
          <WorkoutLoadingSkeleton />
          <WorkoutLoadingSkeleton />
          <WorkoutLoadingSkeleton />
        </>
      ) : (
        <div className="flex w-full flex-col gap-4">
          {/* TODO: Fix any ƒor .map() argument */}
          {data.map((workout: any) => (
            <Fragment key={workout._id}>
              <Collapsible>
                <Card className="flex flex-col gap-6 p-4">
                  <CollapsibleTrigger asChild>
                    <div className="flex cursor-pointer items-center justify-between">
                      <CardDescription className="flex items-center gap-2">
                        <ChevronDown />
                        {workout.completedAt}
                      </CardDescription>
                      <CardTitle className="max-w-[11.5ch] truncate">{workout.name}</CardTitle>
                    </div>
                  </CollapsibleTrigger>
                  <CardContent className="flex items-center justify-between gap-2 p-0">
                    <p>Number of sets: {workout.sets.length}</p>
                    <div className="flex gap-4">
                      <Button size={'sm'}>
                        <Pen />
                      </Button>
                      <Button size={'sm'}>
                        <CopyPlus />
                      </Button>
                      <Button variant="destructive" size={'sm'}>
                        <Trash2 />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <CollapsibleContent className="mx-2 mt-1 gap-2 rounded border border-slate-400">
                  {/* TODO: Remove any after you fix the workout type from the TODO above this one */}
                  {workout.sets.map((set: any, index: number) => (
                    <Fragment key={index}>
                      <Card className=" m-2 flex flex-col gap-4 p-2">
                        <div className="flex justify-between">
                          <CardDescription>Set {set.setNumber}</CardDescription>
                          <CardTitle>{set.exercise.name}</CardTitle>
                        </div>
                        <CardContent className="flex justify-between p-0">
                          <div className="flex gap-2">
                            <Badge>Weight {set.weight} kg</Badge>
                            <Badge>Reps {set.reps}</Badge>
                          </div>
                          <Badge variant={'outline'}>Rest 10 sec</Badge>
                        </CardContent>
                      </Card>
                    </Fragment>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
};

const WorkoutLoadingSkeleton = () => {
  return (
    <Card className="flex w-full flex-col gap-6 p-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-8 w-[300px]" />
      </div>
      <div className="flex items-center justify-between gap-2 p-0">
        <Skeleton className="h-4 w-[200px]" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-9" />
          <Skeleton className="h-10 w-9" />
          <Skeleton className="h-10 w-9" />
        </div>
      </div>
    </Card>
  );
};

export default WorkoutsOverview;
