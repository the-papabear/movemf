import connectToDB from 'backend/mongoConnection';

export default async function handler(req: any, res: any) {
  const {
    body: { name, link },
  } = req;

  if (req.method === 'GET') {
    const connection = await connectToDB();

    const exercises = await connection
      .collection('exercises')
      .find({})
      .toArray();

    res.status(200).json(exercises);
  }

  if (req.method === 'POST') {
    const connection = await connectToDB();

    const exercise = await connection
      .collection('exercises')
      .insertOne({ name, link });

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'EXERCISE_CREATED_SUCCESSFULLY',
    });
  }
}
