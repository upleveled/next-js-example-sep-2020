exports.up = async (sql) => {
  await sql`
    ALTER TABLE users
      RENAME COLUMN location TO city;
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE users
      RENAME COLUMN city TO location;
  `;
};
