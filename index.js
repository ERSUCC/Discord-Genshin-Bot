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
        var [language] = translate.detect(arguments.slice(1));

        language = Array.isArray(language) ? language : [language];

        if (language[0].language == "en")
        {
            message.channel.send("Text is already translated.");
        }

        else
        {
            var [translation] = translate.translate(arguments.slice(1), "en");

            translation = Array.isArray(translation) ? translation : [translation];

            message.channel.send("Translation: " + translation[0]);
        }
    }
});

client.login(process.env.token);