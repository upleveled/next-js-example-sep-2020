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
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <label style={{ display: 'block' }}>
          lastName
          <input
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </label>
        <label style={{ display: 'block' }}>
          city
          <input
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
          />
        </label>
        <button>New User</button>
      </form>
    </Layout>
  );
}
