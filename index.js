const prefix = "~";

const discord = require("discord.js");
const mongoose = require("mongoose");
const https = require("https");

const client = new discord.Client();

mongoose.connect(process.env.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

client.on("message", message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var msgArgs = message.content.substring(1).split(" ").map(x => x.toLowerCase().trim());

    if (msgArgs[0] == "ping")
    {
        message.channel.send("pong");
    }

    else if (msgArgs[0] == "whatis")
    {
        /*var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + msgArgs.splice(1).join("%20") + "&format=json";

        https.get(url, function(result)
        {
            result.setEncoding("utf-8");

            result.on("data", (data) => 
            {
                var results = JSON.parse(data)[1];

                if (results.length == 0)
                {
                    message.channel.send("Could not find result for: " + msgArgs.splice(1).join(" "));

                    return;
                }

                var searchTerm = results[0].split(" ").join("_");

                var url2 = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&titles=" + searchTerm;

                https.get(url2, function(result2)
                {
                    result2.setEncoding("utf-8");

                    result2.on("data", (data) =>
                    {
                        var start = data.indexOf("extract\":\"") + 10;
                        var end = data.indexOf("}", start) - 1;

                        message.channel.send("Showing result for: " + results[0]);
                        message.channel.send(data.substring(start, end));
                    });
                });
            });
        });*/
    }

    else if (msgArgs[0] == "dbtest")
    {
        mongoose.set("test", "this is a test");
    }
});

client.login(process.env.token);