import { ExerciseDTO } from '@backend/domain/exercise/interfaces';
import { EditSetData } from '@backend/domain/set/usecase/editSet';
import { CreateSetData } from '@backend/domain/set/usecase/createSet';

export interface SetDTO {
  _id: string;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  workoutId: string;
  setNumber: number;
  exercise: ExerciseDTO;
}

export interface ICreateSetUseCase {
  (set: CreateSetData): Promise<SetDTO>;
}

export interface IRetrieveSetById {
  (setId: string): Promise<SetDTO | null>;
}

export interface IRetrieveSetByIds {
  (setIds: string[]): Promise<SetDTO[]>;
}

export interface IPersistSet {
  (set: SetDTO): Promise<void>;
}

export interface IEditSetUseCase {
  (set: EditSetData): Promise<SetDTO>;
}

export interface IUpdateSet {
  (set: SetDTO): Promise<void>;
}

export interface IRemoveSet {
  (setId: string): Promise<void>;
}

export interface IRetrieveSetByExerciseId {
  (exerciseId: string): Promise<{ _id: string; workoutId: string }[]>;
}
