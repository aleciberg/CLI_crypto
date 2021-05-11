#!/usr/bin/env node
const readline = require("readline");
const rp = require("request-promise");
const fetch = require("node-fetch");

async function takeInput() {
  let more = true;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("What Coin Would You Like To Search For? ", async (answer) => {
    console.log(`Searching for ${answer}...`);
    const value = await getCoin(answer).then((res) => {
      const { price } = res.data[answer.toUpperCase()].quote.USD;
      return Math.round(price * 100) / 100;
    });
    console.log(`The price of ${answer} is currently ${value}`);
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
