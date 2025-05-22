require("dotenv").config();
const app = require("./app");
const connectToDb = require("./utils/db");

connectToDb().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
