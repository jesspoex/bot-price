const {Client, GatewayIntentBits}=require('discord.js')
const {updateBot}=require('./updatePrice')
const keepAlive = require ("./keepAlive.js");

//This Bot works for tokens listed on coingecko or Solana SPL tokens visible on https://www.jup.ag


//IMPORTANT THINGS TO UPDATE---------------------------

//! ADD A KEY NAMED "BOT_TOKEN" (WITHOUT QUOTES...) IN SECRETS ON THE LEFT. THE VALUE SHOULD BE YOUR BOT APPLICATION TOKEN.

//! ADD KEY NAMED "GUILD_ID" IN SECRETS ON THE LEFT. THE VALUE SHOULD BE YOUR DISCORD SERVER ID. ENABLE DEVELOPER OPTIONS (IN YOUR ADVANCED SETTINGS ON DISCORD) AND RIGHT CLICK ON THE SERVER & CLICK COPY ID TO GET THE ID.

const inputs={
  
  USE_COINGECKO_PRICING: true, //If USE_COINGECKO_PRICING: false, the bot will use Jupiter Aggregator pricing (Solanatokens only)

  TOKEN_NAME: "wolf-solana", //REQUIRED for Coingecko pricing.  Must match coingecko coin URL name: e.g. solana for https://www.coingecko.com/en/coins/solana. 
  
  TOKEN_SYMBOL: "WOLF",

  WATCHING: "wolf-solana"  //Change string to define "WATCHING" text.
};

//-------------------------------------------------------------

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
})

client.once('ready', ()=>{
  console.log("ready yay!")

  updateBot(inputs, client);

  client.user.setActivity(inputs.WATCHING, {type: 'WATCHING'})

  setInterval(function(){
   updateBot(inputs, client);
  }, 1000*60*60) //Update price every 60 minutes
})

//keepAlive();

client.login(process.env.BOT_TOKEN)

