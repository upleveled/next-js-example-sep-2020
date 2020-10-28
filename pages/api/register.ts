import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import Tokens from 'csrf';
import { getUserByUsername, registerUser } from '../../util/database';

const tokens = new Tokens();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Extract the username, password and token from the request
  // body (this process is called "destructuring")
  const { username, password, token } = request.body;

  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    response.status(500).send({ success: false });
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Verify the CSRF token sent by the client
  const verified = tokens.verify(secret, token);

  if (!verified) {
    // HTTP status code: 401 Unauthorized
    return response.status(401).send({ success: false });
  }

  // Check if there's a database user matching this username
  const usernameAlreadyTaken =
    typeof (await getUserByUsername(username)) !== 'undefined';

  if (usernameAlreadyTaken) {
    // TODO: Send back a full error message here
    // HTTP status code: 409 Conflict
    return response.status(409).send({ success: false });
  }

  try {
    const passwordHash = await argon2.hash(password);
    await registerUser(username, passwordHash);
  } catch (err) {
    // If hashing the password or registering the user fails
    // for any reason, then return an error status
    // HTTP status code: 500 Internal Server Error
    return response.status(500).send({ success: false });
  }

  response.send({ success: true });
}
