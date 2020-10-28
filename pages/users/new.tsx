import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { User } from '../../util/types';

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

export function getServerSideProps() {
  if (/* user is not logged in */ true) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
