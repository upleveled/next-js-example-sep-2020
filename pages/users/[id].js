import Head from 'next/head';
import Layout from '../../components/Layout';

export default function User(props) {
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
      user firstName: {props.user.firstName}
      <br />
      user lastName: {props.user.lastName}
      <br />
    </Layout>
  );
}

// This is run by Next.js BEFORE the component
// above is run, and passes in the props
export async function getServerSideProps(context) {
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

  const props = {};
  if (user) props.user = user;

  return {
    props: props,
  };
}
