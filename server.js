require('dotenv').config()
const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const path = require('path')
const cors = require('cors')

let COUNT_DUELS = 0

const {ROLLBAR_ACCESS_TOKEN} = process.env

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: `${ROLLBAR_ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true

});

rollbar.log("Hello world!");

const playerRecord = {
  wins: 0,
  losses: 0,
};
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors())

// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);
  // Make happens the rollbar critical event
  if (COUNT_DUELS === 3) return null

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res) => {
  try {
    rollbar.info('GET ALL ROBOTS INFORMATION')
    res.status(200).send(bots);
  } catch (error) {
    rollbar.critical("ERROR GETTING BOTS")
    console.error("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/shuffled", (req, res) => {
  try {
    let shuffled = shuffle(bots);
    console.log(shuffled)
    rollbar.info('GET ALL SHUFFLED ROBOTS')
    res.status(200).send(shuffled);
  } catch (error) {
    rollbar.error("ERROR GETTING SHUFFLED BOTS")
    console.error("ERROR GETTING SHUFFLED BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    const { compDuo, playerDuo } = req.body;
    rollbar.info("STARTED DUEL")
    COUNT_DUELS += 1
    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses += 1;
      res.status(200).send("You won!");
    }
  } catch (error) {
    rollbar.critical("ERROR DUELING")
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    if (COUNT_DUELS > 3 && playerRecord.wins === 0)
      rollbar.warning("SOMETHING WRONG WITH DUEL! USER NEVER WINS!")

    res.status(200).send(playerRecord);
  } catch (error) {
    rollbar.critical("ERROR GETTING PLAYER STATS")
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

app.listen(8000, () => {
  console.log(`Listening on 8000`);
});
