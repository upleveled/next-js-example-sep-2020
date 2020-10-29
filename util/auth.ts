import { getSessionByToken } from './database';

export async function isSessionTokenValid(token: string | undefined) {
  if (typeof token === 'undefined') {
    return false;
  }

  const session = await getSessionByToken(token);

  if (typeof session === 'undefined') {
    return false;
  }

  if (session.expiryTimestamp < new Date()) {
    return false;
  }

  return true;
}
