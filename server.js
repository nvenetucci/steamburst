const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/countries", (req, res) => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
