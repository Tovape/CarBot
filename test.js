require('dotenv').config()
const embedcolor = "#FFA200"
const config = require("./config.json");
const mysql = require("mysql");
const SQL = require('sql-template-strings');
const yaml = require('yaml');
const Profanity = require('profanity-js');
const profanity = new Profanity();
const Scraper = require('images-scraper');
const TOKEN = process.env.TOKEN;
const CLIENTID = process.env.CLIENTID;
const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(TOKEN);
var temp1 = 0;

//Google Search for images | Windows

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
  safe: true
});

//Google Search for images | Linux

/*
const google = new Scraper({
  puppeteer: {
    headless: false,
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});
*/

//Connects to SQL Database in the Linux Server | Windows

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'test2',
  password: 'test2',
  database: "carbotdb"
});

//Connects to SQL Database | Linux

/*

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ireland36',
  database: "carbotdb"
});

*/

/* Commands */

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'information') {
		const em_information = new EmbedBuilder()
			.setColor(embedcolor)
			.setTitle("Information")
			.setFooter({text: `Bot Problem? Contact Tovape#9946`,})
			.setDescription("Developer: Tovape#9946\nVersion: v3.1 Stable\n[TopGG](https://top.gg/bot/478201115985444866)\n[Webpage](http://carbot.github.io)\nThis bot was created the " + client.user.createdAt)
			.setTimestamp();
		await interaction.reply({embeds: [em_information]});
	} else if (interaction.commandName === 'help') {
		const em_help = new EmbedBuilder()
			.setColor(embedcolor)
			.setTitle("Help")
			.setFooter({text: `Bot Problem? Contact Tovape#9946`,})
			.setDescription("/information (Bot information)\n/settings (Current Bot Configuration)\n/carbot (Carbot Servers Count)\n/ddbb (Count Cars in the Database)\n/ping (Ping Command)\n/uptime (Uptime)\n\nSearching Manufacturers:\n/make Holden (Typos supported to a certain extent)\n\nSearching Cars:\n/test holden monaro 2001 (suports query with model, manufacturer and year)")
			.setTimestamp();
		await interaction.reply({embeds: [em_help]});
	} else if (interaction.commandName === 'invite') {
		const em_invite = new EmbedBuilder()
			.setColor(embedcolor)
			.setTitle("Invite")
			.setFooter({text: `Bot Problem? Contact Tovape#9946`,})
			.setDescription("[Server](https://discord.gg/9txwYxM)\n[Invite](https://discordapp.com/api/oauth2/authorize?client_id=478201115985444866&permissions=0&scope=bot)")
			.setTimestamp();
		await interaction.reply({embeds: [em_invite]});
	} else if (interaction.commandName === 'settings') {
		const em_settings = new EmbedBuilder()
			.setColor(embedcolor)
			.setTitle("Settings")
			.setFooter({text: `Bot Problem? Contact Tovape#9946`,})
			.setDescription("MariaDB: 10.4.19\nImage Scraper: 6.3.0\nSql-template-strings: 2.2.2\nYaml: 1.10.2\nProfanity-js: 0.1.4\nForever: 4.0.1\nDiscord.js V14")
			.setTimestamp();
		await interaction.reply({embeds: [em_settings]});
	} else if (interaction.commandName === 'carbot') {
		client.guilds.cache.forEach((guild) => {
			temp1 = temp1 + guild.memberCount;
		})
		await interaction.reply(`Carbot is in ${client.guilds.cache.size} servers serving ` + temp1 + " Users!");
	} else if (interaction.commandName === 'ping') {
		await interaction.reply("Ping is " + client.ws.ping + "ms");
	} else if (interaction.commandName === 'uptime') {
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
		
		await interaction.reply(uptime);
	} else if (interaction.commandName === 'count') {
		await interaction.reply("70868 cars");
	}
});

const commands = [
	{
		name: 'information',
		description: 'Want to know more details?',
	},
	{
		name: 'help',
		description: 'See what this bot can do',
	},
	{
		name: 'invite',
		description: 'Get the invite link for your server',
	},
	{
		name: 'settings',
		description: 'See the specs',
	},
	{
		name: 'carbot',
		description: 'How many servers Carbot is in?',
	},
	{
		name: 'ping',
		description: 'Check Ping in ms',
	},
	{
		name: 'uptime',
		description: 'Check Uptime',
	},
	{
		name: 'count',
		description: 'Count the ammout of cars in the database',
	},
];

/* ANSI */

db.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('\n\t __   _    __   __   __  ___');
    console.log('\t/    /_\\  |__) |__) /  \\  |');
    console.log('\t\\__ /   \\ |  \\ |__) \\__/  |');
    console.log('\n\t' +  '\x1b[90m', 'v4.0.0 | Stable' + '\x1b[0m');
    console.log("\t--------------------------\n\t" + "\x1b[94m", "MySql" + "\x1b[0m" + " Connected\n\t--------------------------");
  }
});

client.on("ready", () => {
    console.log("\t" + "\x1b[32m", "NodeJS" + "\x1b[0m" + " Online");
    console.log("\t--------------------------\n\t" + "\x1b[33m", "Server " + "\x1b[0m" + "Port 80/443\n\t--------------------------");
    console.log("\t\x1b[31m", "Filter " + "\x1b[0m" + "Enabled");
    client.user.setActivity(`/help | ${client.guilds.cache.size} Servers`)
	temp1 = 1;
});

(async () => {
	try {
		await rest.put(Routes.applicationCommands(CLIENTID), { body: commands });
		if (temp1 === 1) {
			console.log("\t--------------------------\t");
			console.log("\x1b[35m", "\t " + "V14" + "\x1b[0m" + " Loaded");	
		} else {
			console.log("\x1b[35m", "\t " + "V14" + "\x1b[0m" + " Loaded\n\t--------------------------");		
		}
	} catch (error) {
		console.error(error);
	}
})();

client.login(TOKEN);