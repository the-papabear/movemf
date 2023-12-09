'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronDown, CopyPlus, Pen, PlusIcon, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const mockWorkouts = [
  {
    _id: '1',
    name: 'Super long name workout',
    completedAt: new Date('01-01-2023').toDateString(),
    sets: [
      { reps: 1, weight: 1, setNumber: 1, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 2, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 3, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
    ],
  },
  {
    _id: '2',
    name: 'Super workout',
    completedAt: new Date('01-01-2023').toDateString(),
    sets: [
      { reps: 1, weight: 1, setNumber: 1, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 2, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 3, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
    ],
  },
  {
    _id: '3',
    name: 'Super workout',
    completedAt: new Date('01-01-2023').toDateString(),
    sets: [
      { reps: 1, weight: 1, setNumber: 1, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 2, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 3, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
    ],
  },
  {
    _id: '6',
    name: 'Super workout',
    completedAt: new Date('01-01-2023').toDateString(),
    sets: [
      { reps: 1, weight: 1, setNumber: 1, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 2, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 3, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
    ],
  },
  {
    _id: '4',
    name: 'Super workout',
    completedAt: new Date('01-01-2023').toLocaleDateString(),
    sets: [
      { reps: 1, weight: 1, setNumber: 1, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 2, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 3, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
    ],
  },
  {
    _id: '5',
    name: 'Super workout',
    completedAt: new Date('01-01-2023').toLocaleDateString(),
    sets: [
      { reps: 1, weight: 1, setNumber: 1, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 2, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
      { reps: 1, weight: 1, setNumber: 3, exercise: { _id: 'ex1', name: 'Pullups', link: 'lorem.com' } },
    ],
  },
];

const WorkoutsOverview = () => {
  return (
    <section className="flex w-full flex-col items-center gap-4 py-4">
      <Link href="/new-workout" className={cn('flex items-center gap-2', buttonVariants({ variant: 'default' }))}>
        <PlusIcon /> Add new workout
      </Link>

      <div className="flex w-full flex-col gap-4">
        {mockWorkouts.map((workout) => (
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
                {workout.sets.map((set, index) => (
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
    </section>
  );
};

export default WorkoutsOverview;
