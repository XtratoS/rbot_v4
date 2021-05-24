const Discord = require('discord.js');
require('dotenv').config();

const messageListener = require('./core/listeners/messageListener');
const readyListener = require('./core/listeners/readyListener');

const client = new Discord.Client();

client.on('message', (message) => {messageListener(message, client)});
client.on('ready', (message) => {readyListener(client)});

client.login(process.env.DISCORD_BOT_TOKEN);