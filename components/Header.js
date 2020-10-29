import Link from 'next/link';
import { css } from '@emotion/core';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background: #eee;
  margin-bottom: 40px;
`;

const headerLinksStyles = css`
  margin-right: -10px;

  a {
    padding: 0 10px;
  }
`;

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';

  return (
    <header css={headerStyles}>
      <div>header with some links</div>
      <div css={headerLinksStyles}>
        <Link href="/">
          <a data-cy="header-link-home">Home</a>
        </Link>
        <Link href="/users/user-list">
          <a data-cy="header-link-user-list">User List</a>
        </Link>
        {!loggedInPassed ? null : props.loggedIn ? (
          <Link href="/logout">
            <a>Log out</a>
          </Link>
        ) : (
          <Link href="/login">
            <a>Log in</a>
          </Link>
        )}
      </div>
    </header>
  );
}
