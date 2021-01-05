const prefix = "~";

const https = require("https");
const mongoose = require("mongoose");

mongoose.connect(process.env.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const pokesSchema = new mongoose.Schema({
    username: String,
    pokes: Number
});

const Pokes = mongoose.model("Pokes", pokesSchema);

const statsSchema = new mongoose.Schema({
    username: String,
    messages: Number
});

const Stats = mongoose.model("Stats", statsSchema);

const discord = require("discord.js");
const client = new discord.Client();

client.on("message", message =>
{
    Stats.find({ username: message.author.id }, function(error, docs)
    {
        if (docs.length == 0)
        {
            var stats = new Stats({ username: message.author.id, messages: 1 });

            stats.save();
        }

        else
        {
            var stats = docs[0];

            stats.messages++;

            stats.save();
        }
    });

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var msgArgs = message.content.substring(1).split(" ").map(x => x.toLowerCase().trim());

    if (msgArgs[0] == "ping")
    {
        message.channel.send("pong");
    }

    else if (msgArgs[0] == "poke")
    {
        Pokes.find({ username: message.author.username }, function(error, docs)
        {
            if (docs.length == 0)
            {
                var pokes = new Pokes({ username: message.author.username, pokes: 1 });

                pokes.save();
            }

            else
            {
                var pokes = docs[0];

                pokes.pokes++;

                pokes.save();
            }
        });
    }

    else if (msgArgs[0] == "pokes")
    {
        Pokes.find({ username: message.author.username }, function(error, docs)
        {
            if (docs.length == 0)
            {
                message.channel.send(message.author.username + " has poked Genshin Bot 0 times.");
            }

            else
            {
                message.channel.send(message.author.username + " has poked Genshin Bot " + docs[0].pokes + " times.");
            }
        });
    }

    else if (msgArgs[0] == "pig" && msgArgs.length > 1)
    {
        message.channel.send(msgArgs.slice(1).map(x => pigLatin(x)).join(" "));
    }

    else if (msgArgs[0] == "stats" && msgArgs.length > 1)
    {
        Stats.find({ username: msgArgs[1].substring(3, msgArgs[1].length - 1) }, function(error, docs)
        {
            if (docs.length == 0)
            {
                message.channel.send(msgArgs[1] + " has sent 0 messages since Jan 5, 2021.");
            }

            else
            {
                message.channel.send(msgArgs[1] + " has sent " + docs[0].messages + " messages since Jan 5, 2021.");
            }
        });
    }

    else if (msgArgs[0] == "choice")
    {
        var url = "https://www.conversationstarters.com/wyrq.php";

        https.get(url, result =>
        {
            var content = "";
        
            result.setEncoding("utf-8");
        
            result.on("data", data =>
            {
                content += data;
            });
        
            result.on("end", () =>
            {
                var qa = content.match("qa>(.+?)</div>")[1].trim().replace("?", "");
                var qb = content.match("qb>(.+?)</div>")[1].trim().replace("?", "");

                var poll = new discord.MessageEmbed();

                poll.setTitle("Would you rather:")
                poll.setDescription("1. " + qa + "\n2. " + qb)
                poll.setColor("GREEN");

                message.channel.send(poll).then((msg) =>
                {
                    msg.react("1️⃣").then(() => msg.react("2️⃣")).catch((reason) => console.log(reason));
                });
            });
        });
    }
});

function pigLatin(str)
{
    if ("aeiou".includes(str[0]))
    {
        return str + "hay";
    }

    var i = 0;

    while (!"aeiou".includes(str[i]))
    {
        i++;
    }

    return str.substring(i) + str.substring(0, i) + "ay";
}

client.login(process.env.token);