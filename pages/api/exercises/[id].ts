import { ObjectId } from 'mongodb';
import dbConnection from 'backend/mongoConnection';

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    body: { name, link },
  } = req;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      code: 404,
      success: false,
      message: 'EXERCISE_NOT_FOUND',
    });
  }

  if (req.method === 'GET') {
    const connection = await dbConnection();

    const exercise = await connection
      .collection('exercises')
      .findOne({ _id: new ObjectId(id) });

    return res.status(200).json(exercise);
  }

  if (req.method === 'PATCH') {
    const connection = await dbConnection();

    const exercise = await connection
      .collection('exercises')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, link } });

    return res.status(200).send({
      code: 200,
      success: true,
      message: 'EXERCISE_UPDATED_SUCCESSFULLY',
    });
  }

  if (req.method === 'DELETE') {
    const connection = await dbConnection();

    await connection
      .collection('exercises')
      .deleteOne({ _id: new ObjectId(id) });

    return res.status(200).send({
      code: 200,
      success: true,
      message: 'EXERCISE_DELETED',
    });
  }
}
