#!/usr/bin/env node
const axios = require("axios").default;
const readline = require("readline");

let apikey = "b9968c2b-c365-457e-b409-f39d7bdb0acd";
let url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("What Coin Would You Like To Search For?", (answer) => {
//   // TODO: Log the answer in a database
//   rl.close();
// });

const rp = require("request-promise");
const requestOptions = {
  method: "GET",
  uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
  qs: {
    symbol: "DOGE",
  },
  headers: {
    "X-CMC_PRO_API_KEY": apikey,
  },
  json: true,
  gzip: true,
};

rp(requestOptions)
  .then((response) => {
    let { price } = response.data.DOGE.quote.USD;
    console.log(Math.round(price * 100) / 1000);
  })
  .catch((err) => {
    console.log("API call error:", err.message);
  });
