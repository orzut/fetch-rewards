const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});

const port = 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
