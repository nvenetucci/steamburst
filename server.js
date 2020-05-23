const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Steam Burst!");
});

app.get("/top100", (req, res) => {
  fetch("https://store.steampowered.com/stats/")
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);

      const data = [];

      data.push({ updated: $(".statsTopSmall").text() });

      $(".player_count_row").each((i, elem) => {
        const current = $(elem).find(".currentServers").first().text();
        const peak = $(elem).find(".currentServers").last().text();
        const game = $(elem).find(".gameLink").text();

        const obj = {
          current,
          peak,
          game,
        };

        data.push(obj);
      });

      res.json(data);
    });
});

app.get("/countries", (req, res) => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
