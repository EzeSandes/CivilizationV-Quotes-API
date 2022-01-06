const fs = require("fs");
const data = require("../dev-data/data/civ5Quotes-simple");

fs.writeFileSync(
  `${__dirname}/../dev-data/data/civ5Quotes-simple.json`,
  JSON.stringify(data)
);
