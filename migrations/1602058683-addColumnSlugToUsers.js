exports.up = async (sql) => {
  await sql`
    ALTER TABLE users
      ADD COLUMN slug varchar(40) UNIQUE;
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE users
      DROP COLUMN slug;
  `;
};
