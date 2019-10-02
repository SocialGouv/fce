const Shell = require("./Shell");

const config = require("config");
const MigrationRunner = require("node-pg-migrate/lib/runner");

class MigrationsShell extends Shell {
  async execute() {
    const options = {
      databaseUrl: config.get("db"),
      dir: "migrations",
      migrationsTable: "pgmigrations",
      direction: "up"
    };

    return await MigrationRunner(options);
  }
}

module.exports = MigrationsShell;
