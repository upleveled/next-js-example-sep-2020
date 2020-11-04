exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      token VARCHAR(32),
			expiry_timestamp TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
			user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS sessions;
	`;
};
