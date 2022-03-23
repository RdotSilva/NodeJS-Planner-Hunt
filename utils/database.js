const Datastore = require("nedb");
const path = require("path");

const databasePath = path.join(__dirname, "../input/jobs.json");
const dbConnection = new Datastore({ filename: databasePath, autoload: true });
const dbReferenceId = "fJ0p8GfKYkEwgbSm";

/**
 * Update a job record in the database
 * @param {String} newResult New data to update the job record
 */
const updateJobRecord = (newResult) => {
  dbConnection.update({ _id: dbReferenceId }, newResult, {}, function () {
    console.log("Doc updated");
  });
};

/**
 * Find a job record by ID
 */
const findJobRecord = new Promise((resolve, reject) => {
  dbConnection.findOne({ _id: dbReferenceId }, function (err, doc) {
    resolve(doc);
  });
});

module.exports = {
  updateJobRecord,
  findJobRecord,
};
