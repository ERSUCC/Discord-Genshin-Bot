const discord = require("discord.js");
const client = new discord.Client();
const prefix = "~";

client.on("message", message =>
{
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    var arguments = message.content.substring(1).split(" ").map(x => x.toLowerCase().trim());

    if (arguments[0] == "ping")
    {
        message.channel.send("pong");
    }

    else if (arguments[0] == "translate")
    {
        
    }
});

client.login(process.env.token);