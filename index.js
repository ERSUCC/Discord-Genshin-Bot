const prefix = "~";
const translateId = process.env.translateId;

const discord = require("discord.js");
const {Translate} = require("@google-cloud/translate").v2;

const client = new discord.Client();
const translate = new Translate({ projectId: translateId });

client.on("message", message =>
{
    if (message.content.startsWith(prefix))
    {
        var arguments = message.content.substring(1).split(" ").map(x => x.toLowerCase().trim());

        if (arguments[0] == "ping")
        {
            message.channel.send("pong");
        }
    }

    else if (!message.author.bot)
    {
        var [language] = translate.detect(message.content);

        language = Array.isArray(language) ? language : [language];

        if (language[0].language != "en")
        {
            var [translation] = translate.translate(message.content, "en");

            translation = Array.isArray(translation) ? translation : [translation];

            if (translation[0] != message.content)
            {
                message.channel.send(message.author.username + " said: " + translation[0]);
            }
        }
    }
});

client.login(process.env.token);