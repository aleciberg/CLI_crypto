#!/usr/bin/env node
const readline = require("readline");
const rp = require("request-promise");
const fetch = require("node-fetch");

async function takeInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("What Coin Would You Like To Search For? ", async (answer) => {
    console.log(`Searching for ${answer}...`);
    const value = await getCoin(answer);
    console.log(`The price of ${answer} is currently ${value}`);
  });
  rl.on("line", (input) => {
    console.log("Closing....");
    rl.close();
  });
}

// // working
// async function getCoin(query) {
//     const apiKey = "b9968c2b-c365-457e-b409-f39d7bdb0acd";
//     const url =
//       "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
//     let qString = "?CMC_PRO_API_KEY=" + apiKey + `&symbol=${query.toUpperCase()}`;
//     const response = await fetch(url + qString);
//     const json = await response.json();
//     const price = json.data[query.toUpperCase()].quote.USD.price;
//     return Math.round(price * 100) / 100;
//   }

// refactor
async function getCoin(query) {
  const apiKey = "b9968c2b-c365-457e-b409-f39d7bdb0acd";
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  let qString = "?CMC_PRO_API_KEY=" + apiKey + `&symbol=${query.toUpperCase()}`;
  const response = await fetch(url + qString)
    .then((res) => await res.json())
    .then((json) => {
      const { price } = json.data[query.toUpperCase()].quote.USD.price;
      return Math.round(price * 100) / 100;
    });
}

takeInput();
