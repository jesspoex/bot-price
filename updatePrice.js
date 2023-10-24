require('isomorphic-fetch')

//fetch price Coingecko
async function fetchPrice_coingecko(name){
  const name_l=name.toLowerCase();
  const url='https://api.coingecko.com/api/v3/simple/price?ids='+name_l+'&vs_currencies=usd';

  let priceInfo=null;
  await fetch(url).then(function(response) {
      return response.json();
    }).then(function(res_data) {
      priceInfo=res_data;
    }).catch(function(err) {
      console.log('Fetch Error :-S');
      throw err;
    });

  if (!priceInfo){return;}

  console.log(priceInfo)
  
  return priceInfo[name_l]['usd']
}


//Jupiter fetch price
async function fetchPrice(symbol){

  const url='https://price.jup.ag/v1/price?id='+symbol
  /*
  for BNB tokens use url below. replace symbol with a mint address
  const url='https://api.pancakeswap.info/api/v2/tokens/'+symbol
  */
  let priceInfo=null;
  await fetch(url).then(function(response) {
      return response.json();
    }).then(function(res_data) {
      priceInfo=res_data;
    }).catch(function(err) {
      console.log('Fetch Error :-S');
      throw err;
    });

  if (!priceInfo){return;}
  if (!priceInfo.data){return;}
  if (!priceInfo.data.price){return;}
  
  return priceInfo.data.price
}


  
//update the bot
async function updateBot(inputs, client){

  try{
    let guild=client.guilds.cache.get(process.1134089193195315203)

    let member = guild.members.cache.get(client.user.id)
  
    if (inputs.USE_COINGECKO_PRICING){
      let price=await fetchPrice_coingecko(inputs.TOKEN_NAME);
      member.setNickname(inputs.TOKEN_SYMBOL+': $'+price+' USD');
      
    } else {
      let price=await fetchPrice(inputs.TOKEN_SYMBOL)
      member.setNickname(inputs.TOKEN_SYMBOL+': $'+price+' USD');
      
    }
  } catch(e){
    console.log(e)
  }

  return
}

module.exports={
  updateBot
}
