const mineflayer = require('mineflayer');

const SERVER_IP = 'play.nolifesquad.com';
const SERVER_PORT = 25565;
const BOT_USERNAMES = ['SugarMommy6969', '1SugarMommy6969', '2SugarMommy6969', '3SugarMommy6969'];
const BOT_PASSWORD = 'pedal1';

const botInstances = [];

function createBot(username) {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: username,
    password: BOT_PASSWORD,
    version: '1.8',
    offline: false,
  });

  bot.on('error', err => console.log(err));

  bot.on('login', () => {
    console.log(`Bot ${username} logged in`);
    if (bot.game && bot.game.gameMode === 'survival') {
      bot.chat(`/pay NoKeyBoard 69`);
      setInterval(() => {
        bot.chat(`/pay NoKeyBoard 69`);
      }, 2500);
    } else {
      bot.chat('/server prison');
    }
  });

  bot.on('kicked', reason => {
    console.log(`Bot ${username} kicked: ${reason}`);
    setTimeout(() => {
      console.log(`Reconnecting bot ${username}...`);
      createBot(username);
    }, 5000);
  });

  botInstances.push(bot);
  return bot;
}

BOT_USERNAMES.forEach(username => {
  createBot(username);
});

// Example usage of bot.chat() method to send a message from all bots at the same time
setTimeout(() => {
  botInstances.forEach(bot => {
    bot.chat('Hello from all bots!');
  });
}, 10000); // Wait 10 seconds before sending the message to allow time for all bots to join the server. Adjust the delay as needed.
