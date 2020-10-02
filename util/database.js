import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();

const sql = postgres();

// If you want to use the connection string instead for testing,
// you can try this:
//
// const sql = postgres('postgres://username:password@localhost:5432/database')

export async function getUsers() {
  const users = await sql`
    SELECT * from users;
  `;
  return users.map(camelcaseKeys);
  // This is what it looks like without a library:
  // return users.map((user) => {
  //   return {
  //     id: user.id,
  //     firstName: user.first_name,
  //     lastName: user.last_name,
  //   };
  // });
}

export const users = [
  {
    id: '1',
    firstName: 'Karl',
    lastName: 'Horky',
    following: false,
  },
  {
    id: '2',
    firstName: 'Sabine',
    lastName: 'Ballata',
    following: false,
  },
];
