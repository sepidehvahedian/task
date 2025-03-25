const express = require("express");
const app = express();

// routes
app.get("/hello", (req, res) => {
  console.log(res);
  res.send("TASK MANAGER APP");
});

const port = 3000;
app.listen(port, console.log(`server is listening on port ${port}...`));
