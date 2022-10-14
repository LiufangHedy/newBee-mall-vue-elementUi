var express = require("express");
var app = express();

const hostname = "localhost";
const port = 3838;
app.use(express.static("./dist"));
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
