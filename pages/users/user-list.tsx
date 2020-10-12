import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import Layout from '../../components/Layout';
import { toggleFollowUserInCookie } from '../../util/cookies';
import { User } from '../../util/types';
import { GetServerSidePropsContext } from 'next';

 type Props = {
   followingFromCookie: string[],
   users: User[]
 }

export default function UserList( props: Props) {
  const [followingFromCookie, setFollowingFromCookie] = useState(
    props.followingFromCookie,
  );

  const [usersWithFollowingData, setUsersWithFollowingData] = useState(
    props.users,
  );

  // Update the users every time that the
  // "following" value changes
  useEffect(() => {
    setUsersWithFollowingData(
      props.users.map((user) => {
        // If the id of the user is in the
        // array, then set following to true
        // followingFromCookie = ['1', '2']

        return {
          ...user,
          following: followingFromCookie.includes(user.id),
        };
      }),
    );
  }, [props.users, followingFromCookie, setUsersWithFollowingData]);

  return (
    <Layout>
      <Head>
        <title>User list</title>
      </Head>

      <h1>User List</h1>

      <ul>
        {usersWithFollowingData.map((user) => {
          return (
            <li key={user.id}>
              {/* Create a link to /users/:id */}
              <Link href={`/users/${user.id}`}>
                <a>
                  {user.firstName} {user.lastName}
                </a>
              </Link>

              <button
                style={{
                  marginLeft: 15,
                  background: '#ddd',
                  borderRadius: 5,
                  border: 0,
                  padding: '8px 14px 8px 11px',
                }}
                onClick={
                  // Any onClick functions will be only
                  // run in the browser
                  () => {
                    // Save the "following" attribute of the user
                    // in the cookie
                    const following = toggleFollowUserInCookie(user.id);
                    setFollowingFromCookie(following);
                  }
                }
              >
                {user.following ? 'Unfollow' : 'Follow'}
              </button>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUsers } = await import('../../util/database');
  const users = await getUsers();

  // nextCookies reads from context.req.headers.cookie
  const allCookies = nextCookies(context);

  // Use "|| []" in order to use a default
  // value, in case this is undefined
  const following = allCookies.following || [];

  return {
    props: {
      followingFromCookie: following,
      users,
      // Serialization will error out
      // on values such as:
      // following: undefined,
      // date: new Date(),
    },
  };
}
