import { Fragment } from 'react';
import { NextPage } from 'next';
import globalStyles from '../components/GlobalStyles';

type Props = {
  Component: NextPage;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  return (
    <Fragment>
      {globalStyles}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
