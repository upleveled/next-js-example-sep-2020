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
    SELECT * FROM users;
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

export async function getUserById(id) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql`
    SELECT * FROM users WHERE id = ${id};
  `;

  const camelcaseUsers = users.map(camelcaseKeys);
  return camelcaseUsers[0];
}

export async function updateUserById(id, user) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql`
    UPDATE users
      SET first_name = ${user.firstName}
      WHERE id = ${id}
      RETURNING *;
  `;

  const camelcaseUsers = users.map(camelcaseKeys);
  return camelcaseUsers[0];
}

// Old static list of users
// export const users = [
//   {
//     id: '1',
//     firstName: 'Karl',
//     lastName: 'Horky',
//     following: false,
//   },
//   {
//     id: '2',
//     firstName: 'Sabine',
//     lastName: 'Ballata',
//     following: false,
//   },
// ];
