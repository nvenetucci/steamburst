# steamburst
Course Project for Full-Stack Web Development (CS465P)
Created by Nicholai Venetucci and Andrew Bespaly

This web application is an informational site for trending data related to Steam games.

The APIs we used:

* Steam Web API
  * Used for gathering general information about Steam games (current player count, release date, etc.)
  * https://steamcommunity.com/dev
  * https://partner.steamgames.com/doc/webapi_overview

* Twitch API
  * Used for gathering Twitch information about Steam games (current streamer count, viewer count, most-viewed streamer, etc.)
  * https://dev.twitch.tv/docs/api/
  
* IsThereAnyDeal API
  * Used for gathering best-price information on Steam games. Provides price details from sites other than Steam.
  * https://itad.docs.apiary.io/#
  
  
This project was created using an Express backend and React frontend. It's currently being hosted on Heroku.

Note: some features may decline to load due to expired API keys.

https://steamburst.herokuapp.com/
