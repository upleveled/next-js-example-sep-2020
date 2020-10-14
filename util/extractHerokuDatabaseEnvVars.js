module.exports = function extractHerokuDatabaseEnvVars() {
  if (process.env.DATABASE_URL) {
    const url = require('url');

    // Extract the connection information from the Heroku
    // environment variable
    const { hostname, pathname, auth } = url.parse(process.env.DATABASE_URL);

    const [username, password] = auth.split(':');

    process.env.PGHOST = hostname;
    process.env.PGDATABASE = pathname.slice(1);
    process.env.PGUSERNAME = username;
    process.env.PGPASSWORD = password;
  }
};
