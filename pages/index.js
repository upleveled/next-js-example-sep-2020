import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home page</title>
      </Head>
      Some page content on the homepage
      <img src="/laptop.jpg" alt="Laptop computer" />
      {/* <a href="./users/user-list">User List</a> */}
    </Layout>
  );
}
