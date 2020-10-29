import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 30,
        background: '#eee',
        marginBottom: 40,
      }}
    >
      <div>header with some links</div>
      <div style={{ marginRight: -10 }}>
        <Link href="/">
          <a style={{ padding: '0 10px' }} data-cy="header-link-home">
            Home
          </a>
        </Link>
        <Link href="/users/user-list">
          <a style={{ padding: '0 10px' }} data-cy="header-link-user-list">
            User List
          </a>
        </Link>
        {!loggedInPassed ? null : props.loggedIn ? (
          <Link href="/logout">
            <a style={{ padding: '0 10px' }}>Log out</a>
          </Link>
        ) : (
          <Link href="/login">
            <a style={{ padding: '0 10px' }}>Log in</a>
          </Link>
        )}
      </div>
    </header>
  );
}
