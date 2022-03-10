const Datastore = require("nedb");
const path = require("path");

const databasePath = path.join(__dirname, "../input/jobs.json");
const dbConnection = new Datastore({ filename: databasePath, autoload: true });
const dbReferenceId = "fJ0p8GfKYkEwgbSm";

const updateJobRecord = (newResult) => {
  dbConnection.update({ _id: dbReferenceId }, newResult, {}, function () {
    console.log("Doc updated");
  });
};

module.exports = {
  updateJobRecord,
};
