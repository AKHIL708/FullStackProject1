const express = require("express");
const app = express();
var cors = require("cors");

require("./DBconnection/db");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
const PORT = process.env.PORT || 5000;
const UserRoute = require("./Router/UserRoute");
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(PORT, () => {
  console.log(` express listening at : ${PORT}`);
});
