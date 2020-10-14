import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, insertUser } from '../../../util/database';

//
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  let users;
  let user;

  if (request.method === 'GET') {
    users = await getUsers();
  } else if (request.method === 'POST') {
    const newUser = request.body.user;
    user = await insertUser(newUser);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(
    JSON.stringify({
      // Only add "users" key to object if users exists
      // (eg. GET request)
      ...(users ? { users: users } : {}),
      // Only add "user" key to object if user exists
      // (eg. POST request)
      ...(user ? { user: user } : {}),
    }),
  );
}
