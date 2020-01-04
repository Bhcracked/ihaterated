const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const config = require("./config.json")
require('dotenv/config');

client.on('ready', () => {
   client.user.setPresence({
        game: {
            name: config.status,
            type: "WATCHING"
        }
   })

   console.log(`You can invite this bot to your server with this link:https://discordapp.com/api/oauth2/authorize?client_id=662710343545651201&permissions=8&scope=bot`)
   

});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
      
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
      
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(config.token)
