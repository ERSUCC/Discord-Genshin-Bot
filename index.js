const prefix = "~";

const discord = require("discord.js");
const client = new discord.Client();

const mongoose = require("mongoose");

mongoose.connect(process.env.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", function()
{
    console.log("connected to database");
});

connection.on("error", function()
{
    console.log("error connecting to database");
});

const pokesSchema = new mongoose.Schema({
    username: String,
    pokes: Number
});

const Pokes = mongoose.model("Pokes", pokesSchema);

client.on("message", message =>
{
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
});

client.login(process.env.token);