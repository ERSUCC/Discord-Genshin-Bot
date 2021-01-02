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

const clicksSchema = new mongoose.Schema({
    username: String,
    clicks: Number
});

const Clicks = mongoose.model("Clicks", clicksSchema);

client.on("message", message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var msgArgs = message.content.substring(1).split(" ").map(x => x.toLowerCase().trim());

    if (msgArgs[0] == "ping")
    {
        message.channel.send("pong");
    }

    else if (msgArgs[0] == "click")
    {
        Clicks.find({ username: message.author.username }, function(error, docs)
        {
            console.log(error);
        });
    }

    else if (msgArgs[0] == "clicks")
    {

    }
});

client.login(process.env.token);