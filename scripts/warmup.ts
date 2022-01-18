import { execSync } from "child_process";

function warmup() {
  const command = `docker exec mariadb-tests /bin/bash -c "mysqladmin ping --password=$MARIADB_ROOT_PASSWORD"`;
  try {
    const output = execSync(command).toString();
    if (!output.includes("mysqld is alive")) {
      setTimeout(warmup, 1000);
    }
  } catch (e) {
    setTimeout(warmup, 1000);
  }
}

warmup();
