import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import cookie from 'cookie';
import {
  deleteExpiredSessions,
  getUserByUsername,
  insertSession,
} from '../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { username, password } = request.body;
  const user = await getUserByUsername(username);

  if (typeof user === 'undefined') {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  const passwordVerified = await argon2.verify(user.passwordHash, password);

  if (!passwordVerified) {
    // TODO: Return proper message from the server
    return response.status(401).send({ success: false });
  }

  // The session token represents the correct authentication
  // of the user (the user entered the correct username
  // and password combination)
  const token = crypto.randomBytes(24).toString('base64');
  await insertSession(token, user.id);

  const maxAge = 60 * 60 * 24; // 24 hours

  const isProduction = process.env.NODE_ENV === 'production';

  const sessionCookie = cookie.serialize('session', token, {
    // maxAge: maxAge,
    maxAge,

    expires: new Date(Date.now() + maxAge * 1000),

    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production
    secure: isProduction,

    path: '/',

    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });

  response.setHeader('Set-Cookie', sessionCookie);

  response.send({ success: true });

  await deleteExpiredSessions();
}
