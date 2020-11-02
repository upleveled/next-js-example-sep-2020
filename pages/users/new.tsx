import Head from 'next/head';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import Layout from '../../components/Layout';
import { User } from '../../util/types';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../../util/auth';

type Props = {
  user: User;
};

export default function NewUser(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');

  return (
    <Layout>
      <Head>
        <title>New User</title>
      </Head>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: {
                firstName: firstName,
                lastName: lastName,
                city: city,
              },
            }),
          });
          const newUser = (await response.json()).user;
          window.location.href = `/users/${newUser.id}`;
        }}
      >
        <label style={{ display: 'block' }}>
          firstName
          <input
            data-cy="new-user-first-name-input"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label style={{ display: 'block' }}>
          lastName
          <input
            data-cy="new-user-last-name-input"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </label>
        <label style={{ display: 'block' }}>
          city
          <input
            data-cy="new-user-city-input"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
          />
        </label>
        <button data-cy="new-user-form-button">New User</button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/users/new',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
