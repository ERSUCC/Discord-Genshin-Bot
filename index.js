const prefix = "~";

const discord = require("discord.js");
const http = require("http");

const client = new discord.Client();

client.on("message", message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var arguments = message.content.substring(1).split(" ").map(x => x.toLowerCase().trim());

    if (arguments[0] == "ping")
    {
        message.channel.send("pong");
    }

    else if (arguments[0] == "whatis")
    {
        var host = "https://en.wikipedia.org";
        var path = "/w/api.php?action=opensearch&search={" + arguments.splice(1).join(" ") + "}&format=json";

        http.request({ host: host, path: path }, function(result)
        {
            console.log(result);
        });
    }
});

client.login(process.env.token);