import { ObjectId } from 'mongodb';

export const generateObjectId = () => new ObjectId().toString();
