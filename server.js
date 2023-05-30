const express = require("express");
const db = require("./db");
const envs = require("./tokens/envs");
const User = require("./models/Users");
const Favorites = require("./models/Favorites");
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3001;

db.sync({ force: false }).then(() => {
  app.listen(envs.PORT, () => console.log(`Listening ${envs.PORT}`));
});
