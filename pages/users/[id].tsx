import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { User } from '../../util/types';

type Props = {
  user: User
}

export default function SingleUser(props: Props) {
  // Tell TypeScript that this state variable may also
  // be a string in the future
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(props.user?.firstName);
  const [lastName, setLastName] = useState(props.user?.lastName);
  // const user = users.find((currentUser) => {
  //   if (currentUser.id === props.id) {
  //     return true;
  //   }
  //   return false;
  // });

  if (!props.user) {
    return (
      <Layout>
        <Head>
          <title>User not found</title>
        </Head>
        User not found.
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Single User</title>
      </Head>
      user id: {props.user.id}
      <br />
      <h2>user firstName</h2>
      {editingKey === 'firstName' ? (
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      ) : (
        firstName
      )}{' '}
      {editingKey !== 'firstName' ? (
        <button
          onClick={() => {
            setEditingKey('firstName');
          }}
        >
          edit
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingKey(null);
              // TODO: Save to server
            }}
          >
            save
          </button>{' '}
          <button
            onClick={() => {
              setEditingKey(null);
              setFirstName(props.user.firstName);
            }}
          >
            cancel
          </button>
        </>
      )}
      <br />
      <h2>user lastName</h2>
      {editingKey === 'lastName' ? (
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      ) : (
        lastName
      )}{' '}
      {editingKey !== 'lastName' ? (
        <button
          onClick={() => {
            setEditingKey('lastName');
          }}
        >
          edit
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingKey(null);
              // TODO: Save to server
            }}
          >
            save
          </button>{' '}
          <button
            onClick={() => {
              setEditingKey(null);
              setLastName(props.user.lastName);
            }}
          >
            cancel
          </button>
        </>
      )}
      <br />
      <br />
      <button
        onClick={() => {
          const answer = window.confirm(
            `Really delete user ${props.user.firstName} ${props.user.lastName}?`,
          );
          console.log('user answer', answer);
        }}
        style={{
          background: 'red',
          color: 'white',
          padding: '7px 6px',
          borderRadius: 4,
          border: 0,
        }}
      >
        delete user
      </button>
    </Layout>
  );
}

// This is run by Next.js BEFORE the component
// above is run, and passes in the props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // context = {
  //   query: { id: '1' },
  //   params: { id: '1' },
  // }
  const id = context.query.id;

  // import { users } from '../../util/database';
  const { getUserById } = await import('../../util/database');
  const user = await getUserById(id);

  // TODO: Don't do this in getServerSideProps
  // updateUserById(id, { firstName: 'Evan' });

  const props: {user?: User} = {};
  if (user) props.user = user;

  return {
    props: props,
  };
}
