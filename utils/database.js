const Datastore = require("nedb");

const databasePath = path.join(__dirname, "../input/jobs.json");
const dbConnection = new Datastore({ filename: databasePath, autoload: true });
const dbReferenceId = "fJ0p8GfKYkEwgbSm";
