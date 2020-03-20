require("dotenv").config();
const MigrationRunner = require("node-pg-migrate/lib/runner");
const process = require("process");

const Shell = require("./Shell");

class MigrationsShell extends Shell {
  async execute() {
    const options = {
      databaseUrl: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB
      },
      dir: "migrations",
      migrationsTable: "pgmigrations",
      direction: "up"
    };

    return await MigrationRunner(options);
  }
}

export default MigrationsShell;
