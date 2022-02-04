import * as util from "util";
import chaild_process from "child_process";
const exec = util.promisify(chaild_process.exec);

async function warmup() {
  const command = `docker exec mariadb-tests /bin/bash -c "mysqladmin ping --password=$MARIADB_ROOT_PASSWORD"`;
  try {
    const { stdout } = await exec(command);
    const output = stdout.toString();
    if (!output.includes("mysqld is alive")) {
      setTimeout(warmup, 1000);
    } else {
      console.log("MariaDB is ready.");
    }
  } catch (e) {
    setTimeout(warmup, 1000);
  }
}

warmup();
