import { Fragment } from 'react';
import { ExternalLink, Pen, PlusIcon, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const mockExercises = [
  { _id: '1', name: 'Lateral extensions', link: 'link.test.com' },
  { _id: '2', name: 'Long exercise name in this input', link: 'link.test.com' },
  { _id: '3', name: 'Lateral extensions', link: 'link.test.com' },
  { _id: '4', name: 'Lateral extensions', link: 'link.test.com' },
  { _id: '5', name: 'Lateral extensions', link: 'link.test.com' },
];

const ExercisesPage = () => {
  return (
    <section className="flex w-full flex-col items-center gap-4 py-4">
      <Button className="w-full">
        <PlusIcon /> Add new exercise
      </Button>

      <div className="flex w-full flex-col gap-4">
        {mockExercises.map((exercise) => (
          <Fragment key={exercise._id}>
            <Card className="flex flex-col gap-6 p-4">
              <CardTitle className="truncate">{exercise.name}</CardTitle>
              <CardContent className="flex items-center justify-between p-0">
                <Button size="sm" className="flex items-center gap-2">
                  <ExternalLink /> Exercise Info
                </Button>
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
