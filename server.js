const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
require("dotenv").config();
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
        const appid = $(elem).find(".gameLink").attr("href").split("/")[4];
        const name = $(elem).find(".gameLink").text();

        const obj = {
          current,
          peak,
          appid,
          name,
        };

        data.push(obj);
      });

      res.json(data);
    });
});

app.get("/app/:appid", (req, res) => {
  fetch(
    `https://store.steampowered.com/api/appdetails/?appids=${req.params.appid}`
  )
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.get("/app/:appid/players", (req, res) => {
  fetch(
    `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${req.params.appid}`
  )
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.get("/twitch/validate", (req, res) => {
  const options = {
    headers: {
      Authorization: `OAuth ${process.env.TWITCH_TOKEN}`,
    },
  };

  fetch("https://id.twitch.tv/oauth2/validate", options)
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.get("/twitch/:game", (req, res) => {
  const options = {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${process.env.TWITCH_TOKEN}`,
    },
  };

  fetch(`https://api.twitch.tv/helix/games?name=${req.params.game}`, options)
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.get("/twitch/:gameid/streams", (req, res) => {
  const init = `https://api.twitch.tv/helix/streams?first=100&game_id=${req.params.gameid}`;

  const streams = [];

  let getStreams = (url) => {
    const options = {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_TOKEN}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        json.data.forEach((stream) => {
          streams.push({
            id: stream.id,
            user_name: stream.user_name,
            viewer_count: stream.viewer_count,
          });
        });

        if (Object.keys(json.pagination).length !== 0) {
          // console.log(`going to the next page: ${json.pagination.cursor}`);
          getStreams(`${init}&after=${json.pagination.cursor}`);
        } else {
          res.json(streams);
        }
      })
      .catch((err) => {
        console.log("Request failed", err);
      });
  };

  getStreams(init);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
