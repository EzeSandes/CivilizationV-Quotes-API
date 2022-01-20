const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true, // ---> NOT SUPPORTED IN 6.0
    useFindAndModify: false, //---> NOT SUPPORTED IN 6.0
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB conection successful!"));

/*********************************  SERVER ******************************** */
/************************************************************************** */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
