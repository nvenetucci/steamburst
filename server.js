const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/countries", (req, res) => {
  const countries = [
    { name: "Australia", capital: "Canberra" },
    { name: "United States of America", capital: "Washington, D.C." },
    { name: "Poland", capital: "Warsaw" },
  ];

  res.json(countries);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
