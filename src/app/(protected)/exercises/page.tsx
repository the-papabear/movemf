'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Pen, PlusIcon, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { useExerciseQueries } from '@/lib/useExerciseQueries';
import { useExerciseMutations } from '@/lib/useExerciseMutations';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ExerciseData, ExerciseDTO } from '@/app/(protected)/exercises/interfaces';
import CreateExerciseForm from '@/app/(protected)/exercises/CreateExerciseForm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ExercisesPage = () => {
  const { isPending, data } = useExerciseQueries();
  const { deleteExercise } = useExerciseMutations();

  const [isOpen, setIsOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState<ExerciseData>({ _id: '', name: '', link: '' });

  const handleDeleteBtnClick = (exerciseId: string) => deleteExercise.mutate(exerciseId);
  return (
    <section className="flex w-full flex-col items-center gap-4 py-4">
      <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          onClick={() => setExerciseData({ _id: '', name: '', link: '', userId: '' })}
          className={cn('w-full', buttonVariants({ variant: isOpen ? 'destructive' : 'default' }))}
        >
          {isOpen ? (
            <>Cancel</>
          ) : (
            <>
              <PlusIcon /> Add new exercise
            </>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-2 flex flex-col gap-4 p-2">
            <CardTitle>{exerciseData.name || 'New Exercise'}</CardTitle>
            <CardContent>
              <CreateExerciseForm
                name={exerciseData.name}
                link={exerciseData.link}
                exerciseId={exerciseData._id}
                setIsCollapsibleOpen={setIsOpen}
              />
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
                  <CardContent className="flex  items-center justify-between p-0">
                    {exercise.link && (
                      <a
                        target="_blank"
                        href={`https://${exercise.link}`}
                        className={cn('flex items-center gap-2', buttonVariants({ variant: 'default' }))}
                      >
                        <ExternalLink /> Exercise Info
                      </a>
                    )}
                    <div className="flex flex-1 justify-end gap-4">
                      <Button
                        size={'sm'}
                        disabled={isOpen}
                        onClick={() => {
                          setExerciseData({
                            _id: exercise._id,
                            name: exercise.name,
                            link: exercise.link,
                            userId: exercise.userId,
                          });
                          setIsOpen(true);
                        }}
                      >
                        <Pen />
                      </Button>
                      <Button
                        size={'sm'}
                        disabled={isOpen}
                        variant="destructive"
                        onClick={() => handleDeleteBtnClick(exercise._id)}
                      >
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
