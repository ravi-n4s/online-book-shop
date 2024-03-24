const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const containerName = "database"; // Replace with the actual name of your MySQL container
const databaseConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "test",
  database: "book_shop",
};

const executeSqlScriptInContainer = (containerName, sqlScriptPath) => {
  const command = `docker exec -i ${containerName} mysql -h ${databaseConfig.host} -P ${databaseConfig.port} -u${databaseConfig.user} -p${databaseConfig.password}`;
  const sqlScriptContent = fs.readFileSync(sqlScriptPath, "utf8");

  try {
    execSync(command, { input: sqlScriptContent });
    console.log(`${sqlScriptPath} executed successfully.`);
  } catch (error) {
    console.error(`Error executing ${sqlScriptPath}: ${error.message}`);
  }
};

(async () => {
  try {
    const files = fs.readdirSync(__dirname);
    let availableScripts = files.filter((file) => file.includes(".sql"));
    availableScripts = availableScripts.map(
      (script) => script.split(".sql")[0]
    );
    const arg = process.argv[2];
    if (!arg || !availableScripts.includes(arg)) {
      console.log("\n=====================================================\n");
      console.error(
        "Provide any of available scripts as argument: \n",
        availableScripts.join(" | ")
      );
      console.log("\n=====================================================\n");
      return;
    }
    const schemaScriptPath = path.join(__dirname, arg + ".sql");
    console.log(`Executing ${arg}.sql...`);
    executeSqlScriptInContainer(containerName, schemaScriptPath);
  } catch (error) {
    console.error(error.message);
  }
})();
