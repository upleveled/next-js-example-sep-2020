import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserById,
  deleteUserById,
  updateUserById,
} from '../../../util/database';
import { User } from '../../../util/types';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const userId = request.query.id as string;

  if (!/^\d+$/.test(userId)) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ errors: 'Not found' }));
  }

  let user: User | undefined | {} = {};

  if (request.method === 'GET') {
    user = await getUserById(userId);
  } else if (request.method === 'PATCH') {
    const newUser = request.body.user;
    user = await updateUserById(userId, newUser);
  } else if (request.method === 'DELETE') {
    user = await deleteUserById(userId);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ user: user }));
}
