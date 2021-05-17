#!/usr/bin/env node
const readline = require("readline");
const fetch = require("node-fetch");
const helpers = require("./helpers");
const chalk = require("chalk");

// Need to refactor this function, way too long and messy
// break out value collection from API?
// function for chalk formatting?

async function takeInput() {
  let more = true;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("What Coin Would You Like To Search For? ", async (answer) => {
    console.log("Searching for " + chalk.magenta(`${answer}`));
    console.log("\n");
    const value = await getCoin(answer).then((res) => {
      return (collection = {
        price:
          Math.round(res.data[answer.toUpperCase()].quote.USD.price * 100) /
          100,
        oneHourChange: helpers.round(
          res.data[answer.toUpperCase()].quote.USD.percent_change_1h,
          2
        ),
        dayChange: helpers.round(
          res.data[answer.toUpperCase()].quote.USD.percent_change_24h,
          2
        ),
        sevenDayChange: helpers.round(
          res.data[answer.toUpperCase()].quote.USD.percent_change_7d,
          2
        ),
        thirtyDayChange: helpers.round(
          res.data[answer.toUpperCase()].quote.USD.percent_change_30d,
          2
        ),
      });
    });
    console.log(
      `The ${chalk.blue(`price`)} of ${chalk.magenta(
        answer
      )} is currently ${chalk.yellow(value.price)}`
    );
    console.log(
      `The ${chalk.blue(`1 hour change`)} of ${chalk.magenta(
        answer
      )} is currently ${chalk.red(value.oneHourChange + `%`)}`
    );
    console.log(
      `The ${chalk.blue(`day change`)} of ${chalk.magenta(
        answer
      )} is currently ${chalk.red(value.dayChange + `%`)}`
    );
    console.log(
      `The ${chalk.blue(`7 day change`)} of ${chalk.magenta(
        answer
      )} is currently ${chalk.red(value.sevenDayChange + `%`)}`
    );
    console.log(
      `The ${chalk.blue(`30 day change`)} of ${chalk.magenta(
        answer
      )} is currently ${chalk.red(value.thirtyDayChange + `%`)}`
    );
    rl.close();
  });
}

async function getCoin(query) {
  const apiKey = "b9968c2b-c365-457e-b409-f39d7bdb0acd";
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  let qString = "?CMC_PRO_API_KEY=" + apiKey + `&symbol=${query.toUpperCase()}`;
  const response = await fetch(url + qString);
  return response.json();
}

takeInput();
