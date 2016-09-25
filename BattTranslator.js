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
		if(message.content.charAt(0) === '!')
		{
			var tokens = message.content.split(" ");
			switch(tokens[0])
			{
				case "!+":
					TranslationCommand(tokens, message.channel);
					break;
				case "!batthelp":
					BattHelp(message.channel);
					break;
				case "!d":
					RollDiceCommand(tokens, message.channel);
					break;
			}
		}
	}
	catch(err) 
	{
		message.channel.sendMessage("I couldn't parse your input and crashed! Error: \r" + err.message);
	}
});

function RollDiceCommand(tokens, channel)
{
	// Help message
	if(tokens.length >= 2 && tokens[1] == "help")
	{
		SendMessage(channel, "Usage: !d SIDES_OF_DICE NUMBER_OF_DICE_TO_ROLL (Optional: -s will sum your rolls together) \rExample: !d 6 2 will roll 2d6");
		return;
	}
	// Can't roll dice if we have no parameters
	if(tokens.length < 2) return;
	
	var sum = false;
	if(tokens[tokens.length - 1] == "-s") sum = true;
	
	numDice = 1;
	if(tokens.length >= 3) numDice = parseInt(tokens[2]);
	
	if(numDice > 10)
	{
		SendMessage(channel, "Only up to 10 dice at a time, don't spam the chat!!");
		return;
	}
	
	sides = parseInt(tokens[1]);
	msg = "";
	results = [];
	for(var i = 0; i < numDice; i++)
	{
		var roll = RollDice(sides)
		msg += roll + " ";
		results.push(roll);
	}
	if(sum)
		msg += "= "+ results.reduce(SimpleSum, 0);
	SendMessage(channel, msg);
}

function RollDice(num)
{
	return Math.floor((Math.random() * num) + 1);
}

function SimpleSum(a, b)
{
	return a + b;
}

function BattHelp(channel)
{
	var msg = "The current translation mapping is: \r";
	for (var key in translationDict)
	{
		msg += translationDict[key] + ": " + key +", "
	}
	SendMessage(channel, msg.substring(0, msg.length - 2));
}

function TranslationCommand(tokens, channel)
{
	// Nothing to do if we didn't give any words to translate
	if(tokens.length <= 1) return;
	
	tokens = tokens.slice(1, tokens.length);
	
	var msg = "";
	for(var word in tokens)
	{
		msg += TranslateWord(tokens[word]) + " ";
	}
	SendMessage(channel, msg.substring(0, msg.length - 1));
}

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

function SendMessage(channel, message)
{
	channel.sendMessage(message);
}

bot.login("");