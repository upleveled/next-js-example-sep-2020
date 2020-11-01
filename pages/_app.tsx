import { NextPage } from 'next';
import globalStyles from '../components/GlobalStyles';

type Props = {
  Component: NextPage;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
