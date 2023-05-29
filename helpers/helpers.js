//FILE READ AND WRITE
const fs = require("fs");

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};
const newDate = () => new Date().toString();

// const newDate = ()=> {
//    return new Date().toString();
// }

function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: "Id not found",
        status: 404,
      });
    }
    resolve(row);
  });
}

function writeJSONFile(fileName, content) {
  fs.writeFileSync(fileName, JSON.stringify(content), "utf8", (err) => {
    if (erro) {
      console.log("Helper file writeJSONFile :" + err);
    }
  });
}
module.exports = { getNewId, newDate, mustBeInArray, writeJSONFile };
