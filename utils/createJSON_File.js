const FILENAME = "civ5Quotes-greatWorks";

const fs = require("fs");
const data = require(`../dev-data/data/${FILENAME}`);

fs.writeFileSync(
  `${__dirname}/../dev-data/data/${FILENAME}.json`,
  JSON.stringify(data)
);
