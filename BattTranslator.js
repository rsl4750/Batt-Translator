var Discord = require("discord.js");
var translationDict = {'3':'e', '<':'r', '+':'t', '^':'y', '&':'u', '|':'i', '0':'o'};
var bot = new Discord.Client();

bot.on("ready", () => {
	console.log('+<ansla+0< 0nl|n3');
});

bot.on("message", function(message)
{
	try 
	{
		if(message.content === '!batthelp')
		{
			var msg = "The current translation mapping is: \r";
			for (var key in translationDict)
			{
				msg += translationDict[key] + ": " + key +", "
			}
			
			msg = msg.substring(0, msg.length - 2);
			
			message.channel.sendMessage(msg);
		}
		else if(message.content.substring(0,3) === "!+ ")
		{
			var msg = "";
			var strippedAndSeparated = message.content.substring(3, message.content.length).split(" ");
			for(var word in strippedAndSeparated)
			{
				msg += TranslateWord(strippedAndSeparated[word]) + " ";
			}
			message.channel.sendMessage(msg.substring(0, msg.length - 1));
		}
	}
	catch(err) 
	{
		message.channel.sendMessage("I couldn't parse your input and crashed! Error: \r" + err.message);
	}
});

function TranslateWord(w)
{
	if(w.charAt(0) === '#')
	{
		return w.substring(1, w.length);
	}
	
	var translated = "";
	for(var i = 0; i < w.length; i++)
	{
		var c = w.charAt(i);
		if(c in translationDict)
		{
			translated += translationDict[c];
		}
		else
		{
			translated += c;
		}
	}
	
	return translated;
}

bot.login("REPLACE THIS WITH YOUR BOT TOKEN");