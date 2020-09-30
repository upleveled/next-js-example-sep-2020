import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { users } from '../../database';

export default function UserList() {
  return (
    <Layout>
      <Head>
        <title>User list</title>
      </Head>

      <h1>User List</h1>

      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {/* Create a link to /users/:id */}
              <Link href={`/users/${user.id}`}>
                <a>
                  {user.firstName} {user.lastName}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
