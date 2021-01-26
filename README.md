# NHL Stats project

Stats are scrapped from hockey-refrence.com

I use axios to fetch the webpage. Cheerio.js to create a DOM and query the specific data i need. I assembled the data into and object or array and respond with a JSON string. 

## Endpoints


- GET /api/team/skaters/:id
  gets scoring data for the team
  example output : 
  ```json
  [
    {
        "_id": "hertlto01",
        "rank": "1",
        "name": "Tomas Hertl",
        "position": "C",
        "age": "27",
        "gamesPlayed": "6",
        "goals": "3",
        "assists": "4",
        "points": "7",
        "plusminus": "-6",
        "pims": "2",
        "evengoals": "1",
        "shortgoals": "0",
        "ppgoals": "2",
        "gwgoals": "0",
        "shots": "10",
        "shootingPercentage": "30.0",
        "toi": "127",
        "atoi": "21:05"
    },
     ...
  ]
  ```


- GET /api/team/roster/:id
  gets roster data from the team
   example output : 
  ```json
  [
     {
        "number": "88",
        "name": "Brent Burns",
        "position": "D",
        "age": "35",
        "years": "16",
        "salary": " $10,000,000",
        "drafted": "2003 MIN 1st (20)",
        "birthdate": "March 9, 1985",
        "_id": "burnsbr01"
    },
     ...
  ]
  ```

- GET /api/team/games/:id
  gets schedule data for the team
   example output : 
  ```json
  [
     {
        "gameNumber": "1",
        "date": "2021-01-14",
        "time": "9:00 PM",
        "location": "@",
        "opponent": "Arizona Coyotes",
        "goals": "4",
        "opp_goals": "3",
        "game_outcome": "W",
        "overtimes": "SO",
        "wins": "1",
        "losses": "0",
        "ot_losses": "0",
        "game_streak": "W 1"
    },
     ...
  ]
  ```

- GET /api/player/games/:slug
  gets schedule data for the player
   example output : 
  ```json
  [
     {
        "_id": 0,
        "date": "2021-01-14",
        "teamId": "SJS",
        "location": "@",
        "opponent": "W",
        "goals": "2",
        "assists": "1",
        "points": "3",
        "plusminus": "2",
        "pims": "0",
        "evengoals": "1",
        "shortgoals": "0",
        "ppgoals": "1",
        "gwgoals": "0",
        "shots": "3",
        "shootingPercentage": "66.7",
        "toi": "21:57"
    },
     ...
  ]
  ```

- GET /api/leaders/goals
  gets the top players sorted by goals
   example output : 
  ```json
  [
     {
        "_id": 275,
        "rank": "261",
        "name": "Bo Horvat",
        "age": "25",
        "team": "VAN",
        "position": "C",
        "gamesPlayed": "7",
        "goals": "5",
        "assists": "3",
        "points": "8",
        "plusminus": "-5",
        "pims": "2",
        "pointShares": "0.9",
        "ev_goals": "2",
        "sh_goals": "0",
        "pp_goals": "3",
        "gw_goals": "0",
        "toi": "136",
        "atoi": "19:26"
    },
     ...
  ]
  ```

- GET /api/leaders/points
  gets the top players sorted by points
   example output : 
  ```json
  [
     {
        "_id": 335,
        "rank": "319",
        "name": "Anze Kopitar",
        "age": "33",
        "team": "LAK",
        "position": "C",
        "gamesPlayed": "6",
        "goals": "1",
        "assists": "9",
        "points": "10",
        "plusminus": "1",
        "pims": "2",
        "pointShares": "0.9",
        "ev_goals": "1",
        "sh_goals": "0",
        "pp_goals": "0",
        "gw_goals": "1",
        "toi": "141",
        "atoi": "23:28"
    },
     ...
  ]
  ```

## How data was collected
 1. use axios to make requests to webpage and get html back in data from the response object.

 ```js
  const { data } = await axios.get(`https://www.hockey-reference.com/teams/${team_id}/`);
 ```

 2. use cheerio.load to create a variable $ which is a DOM replica that we will use to query and navigate with.

 ```js
 const $ = cheerio.load(data);
 ```

 3. query the page. This first example is searching for a tbody tag that is in an element with the gamelog. It happens to be a table.

 ```js
const games = $('tbody', '#gamelog');
 ```

 4. loop through each row in the table and construct an object for each row. push each completed row to an object. 

```js
  $('tr', games).each((_idx, row) => {
    const game = {};
    game.date = $('td[data-stat="date_game"]', row).text();
     ...
    gamesData.push(game);
   }
```
