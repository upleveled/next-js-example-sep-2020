import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

type Props = {loggedIn: boolean}

export default function Home(props: Props) {
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Home page</title>
      </Head>
      Some page content on the homepage
      <br />
      <img src="/laptop.jpg" alt="Laptop computer" />
      {/* <a href="./users/user-list">User List</a> */}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
