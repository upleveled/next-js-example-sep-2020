import '../styles/globals.css';
import { NextPage } from 'next';

// To avoid the issue with the "unused" warning above:
// 1. Switch completely to TypeScript
// 2. Use `import('next').NextPage` instead of `NextPage` below
//    (and remove the import above)

/** @typedef {{
  Component: NextPage,
  pageProps: any,
}} Props */

function MyApp(
  /** @type {Props} */
  { Component, pageProps },
) {
  return <Component {...pageProps} />;
}

export default MyApp;
