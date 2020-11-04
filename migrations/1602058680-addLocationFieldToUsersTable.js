exports.up = async (sql) => {
  await sql`
    ALTER TABLE users
      ADD COLUMN location VARCHAR(40);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE users
      DROP COLUMN location;
  `;
};
