const discord = require("discord.js");
const {Translate} = require("@google-cloud/translate").v2;

const client = new discord.Client();
const translate = new Translate();

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
        var translation = await translate.translate(arguments.slice(1), "en");

        message.channel.send("Translation: " + translation);
    }
});

client.login(process.env.token);