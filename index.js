const express = require("express");
const db = require("./db");
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

const corsOptions = {
  credentials: true,
  origin: ORIGIN,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",

};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  console.log("Data Base Connect");

  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
