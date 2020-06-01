const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Fuse = require("fuse.js");
const fs = require("fs");
require("dotenv").config();
const app = express();
const port = 5000;

const data = fs.readFileSync("applist.json");
const appList = JSON.parse(data);

// console.log("storage:", appList);

app.get("/steam/applist/update", (req, res) => {
  fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
    .then((res) => res.json())
    .then((data) => {
      if (data.applist.apps.length === 0) {
        console.log("applist storage update unsuccessful, try again");
        res.send("applist storage update unsuccessful, try again");
      } else {
        fs.writeFile("applist.json", JSON.stringify(data), finished);
        res.send("applist storage update successful");
      }

      function finished(err) {
        console.log("applist storage update successful");
      }
    })
    .catch((err) => console.log("Request failed", err));
});

app.get("/steam/applist", (req, res) => {
  fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
    .then((res) => res.json())
    .then((data) => {
      if (data.applist.apps.length === 0) {
        console.log("sending applist from storage");
        res.json(appList);
      } else {
        console.log("sending applist from api");
        res.json(data);
      }
    })
    .catch((err) => console.log("Request failed", err));
});

app.get("/steam/search/:term", (req, res) => {
  fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
    .then((res) => res.json())
    .then((data) => {
      let apps = {};

      if (data.applist.apps.length === 0) {
        console.log("searching with storage data");
        apps = appList;
      } else {
        console.log("searching with api data");
        apps = data;
      }

      const options = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.08,
        distance: 50,
        // useExtendedSearch: false,
        keys: ["name"],
      };

      const fuse = new Fuse(apps.applist.apps, options);

      res.json(fuse.search(req.params.term, { limit: 100 }));
    })
    .catch((err) => console.log("Request failed", err));
});

app.get("/steam/top100", (req, res) => {
  fetch("https://store.steampowered.com/stats/")
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);

      const data = { updated: $(".statsTopSmall").text(), apps: [] };

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

        data.apps.push(obj);
      });

      res.json(data);
    })
    .catch((err) => console.log("Request failed", err));
});

app.get("/steam/app/:appid", (req, res) => {
  fetch(
    `https://store.steampowered.com/api/appdetails/?appids=${req.params.appid}`
  )
    .then((res) => res.json())
    .then((data) => res.json(data))
    .catch((err) => console.log("Request failed", err));
});

app.get("/steam/app/:appid/players", (req, res) => {
  fetch(
    `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${req.params.appid}`
  )
    .then((res) => res.json())
    .then((data) => res.json(data))
    .catch((err) => console.log("Request failed", err));
});

app.get("/twitch/validate", (req, res) => {
  const options = {
    headers: {
      Authorization: `OAuth ${process.env.TWITCH_TOKEN}`,
    },
  };

  fetch("https://id.twitch.tv/oauth2/validate", options)
    .then((res) => res.json())
    .then((data) => res.json(data))
    .catch((err) => console.log("Request failed", err));
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
    .then((data) => res.json(data))
    .catch((err) => console.log("Request failed", err));
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

app.get("/deals/", async (req, res) => {
  api_key = process.env.IS_THERE_ANY_DEAL_KEY;
  best_games = [];
  min_price = 10;
  max_price = 61;
  games_list_full = false;
  offset = 0;
  limit = 3000;
  max_games = 100;

  do {
    await fetch(
      `https://private-anon-f775a85414-itad.apiary-proxy.com/v01/deals/list/?key=${api_key}&limit=${limit}&offset=${offset}&sort=price%3Aasc`
    )
      .then((res) => res.json())
      .then((data) => {
        for (var i = 0; i < data.data.list.length; i++) {
          if (
            data.data.list[i].price_old > min_price &&
            data.data.list[i].price_old < max_price &&
            games_list_full == false
          ) {
            best_games.push(data.data.list[i]);
          }
          if (best_games.length >= max_games) {
            games_list_full = true;
          }
          if (games_list_full == true) {
            break;
          }
        }
        offset += limit;
      })
      .catch((error) => console.error("Error", error));
  } while (games_list_full == false);
  return res.json(best_games);
});

app.get("/deals/:appid/", (req, res) => {
  api_key = process.env.IS_THERE_ANY_DEAL_KEY;
  if (isNaN(req.params.appid)) {
    fetch(
      `https://private-anon-f775a85414-itad.apiary-proxy.com/v01/game/prices/?key=${api_key}%09&plains=${req.params.appid}`
    )
      .then((res) => res.json())
      .then((data) => res.json(data))
      .catch((error) => console.error("Error", error));
  } else {
    // get the title of the game in "plains" format
    fetch(
      `https://private-anon-f775a85414-itad.apiary-proxy.com/v02/game/plain/?key=${api_key}&shop=steam&game_id=app%2F${req.params.appid}`
    )
      .then((res) => res.json())
      .then((data) => {
        // use the plains title to request deals from all available sites
        plain = data.data.plain;
        fetch(
          `https://private-anon-f775a85414-itad.apiary-proxy.com/v01/game/prices/?key=${api_key}%09&plains=${plain}`
        )
          .then((res) => res.json())
          .then((data) => res.json(data))
          .catch((error) => console.error("Error", error));
      });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
