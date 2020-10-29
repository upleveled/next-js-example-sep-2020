import { Fragment, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { User } from '../../util/types';
import { useRouter } from 'next/router';

type Props = {
  user: User;
};

export default function SingleUser(props: Props) {
  const router = useRouter();
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
        <Fragment>
          <button
            onClick={async () => {
              await fetch(`/api/users/${props.user.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { firstName: firstName } }),
              });
              setEditingKey(null);
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
        </Fragment>
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
        <Fragment>
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
        </Fragment>
      )}
      <br />
      <br />
      <button
        data-cy="single-user-delete-button"
        onClick={async () => {
          const answer = window.confirm(
            `Really delete user ${props.user.firstName} ${props.user.lastName}?`,
          );

          if (answer === true) {
            await fetch(`/api/users/${props.user.id}`, { method: 'DELETE' });

            // This is just a fast way of refreshing the information
            //
            // A better version would be to save the props.user to a
            // separate state variable and then just set it here to null
            router.push('/users/user-list');
          }
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
  const id = context.query.id as string;

  // import { users } from '../../util/database';
  const { getUserById } = await import('../../util/database');
  const user = await getUserById(id);

  // TODO: Don't do this in getServerSideProps
  // updateUserById(id, { firstName: 'Evan' });

  const props: { user?: User } = {};
  if (user) props.user = user;

  return {
    props: props,
  };
}
