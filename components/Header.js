import Link from 'next/link';
export default function Header() {
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
      </div>
    </header>
  );
}
