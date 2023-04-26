//Declarations

const debugging = 1; // 1 ON | 2 OFF

const prefix = "c";
const embedcolor = "#FFA200"
const authorname = " Tovape#9946";
const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const config = require("./config.json");
const express = require("express"),
  port = process.env.PORT || 3000;
const mysql = require("mysql");
const SQL = require('sql-template-strings');
const yaml = require('yaml');
const wiki = require('wikijs').default;
const Profanity = require('profanity-js');
const profanity = new Profanity();
var Scraper = require('images-scraper');
let length = 0;

//Gets Token

client.login("NDc4MjAxMTE1OTg1NDQ0ODY2.DngLqA.LFiMp8IXwtMwlIsAIm59Hqqd6lI");

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

//Shows Console.log - Correct

db.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  } else {

    console.log('\n\t __   _    __   __   __  ___');
    console.log('\t/    /_\\  |__) |__) /  \\  |');
    console.log('\t\\__ /   \\ |  \\ |__) \\__/  |');
    console.log('\n\t' +  '\x1b[90m', 'v3.1.3 | Stable' + '\x1b[0m');

    console.log("\t--------------------------\n\t" + "\x1b[94m", "MySql" + "\x1b[0m" + " Connected\n\t--------------------------");

  }
});

client.on("ready", () => {
    console.log("\t" + "\x1b[32m", "NodeJS" + "\x1b[0m" + " Online");
    console.log("\t--------------------------\n\t" + "\x1b[33m", "Server " + "\x1b[0m" + "Running in Port " + port + "\n\t--------------------------");
    console.log("\t\x1b[31m", "Filter " + "\x1b[0m" + "Enabled\n");

    if (debugging == 1) {
      console.log('Debugging is' + '\x1b[32m', 'ON' + '\x1b[0m' + '\n');
    } else if (debugging == 0) {
      console.log('Debugging is' + '\x1b[31m', 'OFF' + '\x1b[0m' + '\n');
    }

    client.user.setActivity(`c-help | ${client.guilds.cache.size} Servers`)
});

//Car Commands - Correct

client.on("message", (message) => {
  if (message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

  if (cmd === "-") {

  if (!args.length) {
			return;
	}

  if (debugging == 1) {
    console.log("\nCar Channel\n");
    console.log("Profanity: " + profanity.isProfane(args));
    console.log("Args: " + args + " - " + typeof(args));
    for (let i = 0; i < args.length; i++) {
      if (args[i] === " ") {
        length = length + 1;
      }
    }
    console.log("Length: " + length + " - " + typeof(length) + "\n");
  }

  if (profanity.isProfane(args)) {
    var randomnumber = Math.floor(Math.random() * 1000000);
    if (debugging == 1) {
      console.log("Randomnumber: " + randomnumber + " - " + typeof(randomnumber));
    }
    if (randomnumber == 1) {
      message.channel.send("This message had a chance of 1/1000000.")
      .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
    } else if (randomnumber != 1) {
      message.channel.send("Bad Usage!")
      .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
    }
    return;

  } else {

  var argscaryaml = yaml.stringify(args);

  function argsmincarfilter(argscaryaml) {
    argscaryaml = String(argscaryaml).replace(/ /g, "");
    argscaryaml = String(argscaryaml).replace(/-/g,'');
    argscaryaml = String(argscaryaml).replace(/(\r\n|\n|\r)/gm,"");
    return argscaryaml;
  }

  argscaryaml = argsmincarfilter(argscaryaml);

  let argscarmin = argscaryaml.length;

  if (debugging == 1) {
    console.log("Argscaryaml: " + argscaryaml + " - " + typeof(argscaryaml));
    console.log("Argscarmin: " + argscarmin + " - " + typeof(argscarmin));
    console.log("Argsmincarfilter: " + argsmincarfilter(argscaryaml));
    console.log(args.length);
  }

  if (argscarmin < 6) {
    message.channel.send("Too little arguments.")
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
    return;
  }

  if (args.length == 1) {
    message.channel.send("Too little arguments.")
    .then(msg => {
      setTimeout(() => msg.delete(), 3000)
    })
    return;
  }

  if (argscarmin > 90) {
    message.channel.send("Too many arguments.")
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
    return;
  }

  if (args.length > 5) {
      message.channel.send("Too many arguments.")
      .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
      return;
  }

  function carnumberfilter(argscaryaml) {
    argscaryaml = argscaryaml.replace(/['"]+/g, '');
    return /^\d+$/.test(argscaryaml);
  }

  if (debugging == 1) {
    console.log("Carnumberfilter: " + carnumberfilter(argscaryaml) + " - " + typeof(carnumberfilter(argscaryaml)));
  }

  if (carnumberfilter(argscaryaml) == true) {
    message.channel.send("Use more than numbers.")
    .then(msg => {
      setTimeout(() => msg.delete(), 3000)
    })
    return;
  }

  if (args.length == 2) {
    var sqlcarquery = (SQL
                      `SELECT make AS "Manufacturer", model AS "Name", series AS "Type", year_from AS "Date", CONCAT(number_of_cylinders, ' ', cylinder_layout, ' ', engine_type, ' ', engine_hp, ' hp') AS "Engine"
                       FROM car_db
                       WHERE
                              (model LIKE ${'%' + args[0] + '%'} AND make LIKE ${'%' + args[1] + '%'}) OR
                              (make LIKE ${'%' + args[0] + '%'} AND model LIKE ${'%' + args[1] + '%'}) OR
                              (make LIKE ${'%' + args[0] + '%'} AND year_from = ${args[1]}) OR
                              (year_from = ${args[0]} AND make LIKE ${'%' + args[1] + '%'}) OR
                              (model LIKE ${'%' + args[0] + '%'} AND year_from = ${args[1]}) OR
                              (year_from = ${args[0]} AND model LIKE ${'%' + args[1] + '%'})
                       LIMIT 1
                      `
                      )

  } else if (args.length == 3) {
    var sqlcarquery = (SQL
                      `SELECT make AS "Manufacturer", model AS "Name", series AS "Type", year_from AS "Date", CONCAT(number_of_cylinders, ' ', cylinder_layout, ' ', engine_type, ' ', engine_hp, ' hp') AS "Engine"
                       FROM car_db
                       WHERE
                             (model LIKE ${'%' + args[0] + '%'} AND make LIKE ${'%' + args[1] + '%'} AND year_from = ${args[2]}) OR
                             (model LIKE ${'%' + args[0] + '%'} AND year_from = ${args[1]} AND make LIKE ${'%' + args[2] + '%'}) OR
                             (make LIKE ${'%' + args[0] + '%'} AND year_from = ${args[1]} AND model LIKE ${'%' + args[2] + '%'}) OR
                             (make LIKE ${'%' + args[0] + '%'} AND model LIKE ${'%' + args[1] + '%'} AND year_from = ${args[2]}) OR
                             (year_from = ${args[0] + '%'} AND model LIKE ${'%' + args[1] + '%'} AND make LIKE ${'%' + args[2] + '%'}) OR
                             (year_from = ${args[0]} AND make LIKE ${'%' + args[1] + '%'} AND model LIKE ${'%' + args[2] + '%'})
                       LIMIT 1
                      `
                      )
  } else {
    message.channel.send("Too many arguments.")
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
    return;
  }

  db.query(sqlcarquery,
  function (err, car, fields) {
    if (err) throw err;

    var carlistreply = yaml.stringify(car);

    if (car.length === 0 || car == null) {

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      message.channel.send("Car not found in the database.")

      .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })

      function carsimilarquery(args) {
        return String(args).substring(0,4);
      }

      if (debugging == 1) {
        console.log("Carlistreply: " + carlistreply + " - " + typeof(carlistreply));
        console.log("Carsimilarquery: " + carsimilarquery(args));
      }

      var sqlsimilarquery = (SQL
                            `SELECT model AS ""
                             FROM car_db
                             WHERE model LIKE ${'%' + carsimilarquery(args[0]) + '%'} OR model LIKE ${'%' + carsimilarquery(args[1]) + '%'}
                             GROUP BY model
                             LIMIT 1
                            `
                            )

      db.query(sqlsimilarquery,
        function (err, carsimilar, fields) {
            if (err) throw err;
            var carsimilareply = yaml.stringify(carsimilar);
            function carsimilarform(carsimilareply) {
              carsimilareply = carsimilareply.replace(/['"]+/g, '');
              carsimilareply = carsimilareply.replace(/:/g,'');
              return carsimilareply.substring(2);
            }
            message.channel.send("Could it be?" + carsimilarform(carsimilareply));
            if (debugging == 1) {
              console.log("Sqlsimilarquery: " + sqlsimilarquery + " - " + typeof(sqlsimilarquery));
              console.log("Carsimilareply: " + carsimilareply + " - " + typeof(carsimilareply));
              console.log("Carsimilarform: " + carsimilarform(carsimilareply));
            }
      })
    }

    message.channel.send(":hourglass: Loading, please wait...")

    .then(msg => {
      setTimeout(() => msg.delete(), 13000)
    })

    function carlistform(carlistreply) {
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace('  ','');
      carlistreply = carlistreply.replace(/['"]+/g, '');
      return carlistreply.substring(2);
    }

    if (debugging == 1) {
      console.log("Carlistform: \n" + carlistform(carlistreply));
    }

    const arr = carlistreply.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const answer = arr.join(" ");

    (async () => {
      var imageurlas = await google.scrape(`${args} car`, 1);
      var answerimg = yaml.stringify(imageurlas);

      function urlshortener(answerimg) {
        return answerimg.substring(7);
      }

      if (debugging == 1) {
        console.log("Imageurlas: " + imageurlas + " - " + typeof(imageurlas));
        console.log("Answerimg: " + answerimg + " - " + typeof(answerimg));
        console.log("Urlshortener: " + urlshortener(answerimg));
      }

      if (imageurlas == "" || imageurlas == " " || imageurlas == null) {
        message.channel.send("Image not found.")
        .then(msg => {
          setTimeout(() => msg.delete(), 6000)
        })
      } else if (!imageurlas.lenght) {
        message.channel.send((carlistform(answer)) + (urlshortener(answerimg)));
      }
    })();
  })
 }}
});

//Manufacturer Commands - Correct

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "-make")) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

  if (debugging == 1) {
    console.log("\nManufacturer Channel\n");
    console.log("Profanity: " + profanity.isProfane(args));
    console.log("Args: " + args + " - " + typeof(args));
  }

  if (profanity.isProfane(args)) {
    var randomnumber = Math.floor(Math.random() * 1000000);
    if (randomnumber == 1) {
      message.channel.send("This message had a chance of 1/1000000.")
      .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
    } else if (randomnumber != 1) {
      message.channel.send("Bad Usage!")
      .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
    }
    return;
  }

  var argsmakeyaml = yaml.stringify(args);

  function argsminmakefilter(argsmakeyaml) {
    argsmakeyaml = String(argsmakeyaml).replace(/["']/g, "");
    argsmakeyaml = String(argsmakeyaml).replace(/ /g, "");
    argsmakeyaml = String(argsmakeyaml).replace(/-/g,'');
    argsmakeyaml = String(argsmakeyaml).replace(/(\r\n|\n|\r)/gm,"");
    return argsmakeyaml;
  }

  argsmakeyaml = argsminmakefilter(argsmakeyaml);

  let argsmakemin = argsmakeyaml.length;

  if (debugging == 1) {
    console.log("Argsmakeyaml: " + argsmakeyaml + " - " + typeof(argsmakeyaml));
    console.log("Argsmakemin: " + argsmakemin + " - " + typeof(argsmakemin));
    console.log("Argsminmakefilter: " + argsminmakefilter(argsmakeyaml));
  }

  if (argsmakemin < 2) {
    message.channel.send("Too little arguments.")
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
    return;
  }

  if (argsmakemin > 90) {
    message.channel.send("Too many arguments.")
    .then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
    return;
  }

  if (args.length > 5) {
      message.channel.send("Too many arguments.")
      .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
      return;
  }

  function makenumberfilter(argsmakeyaml) {
    argsmakeyaml = argsmakeyaml.replace(/["']+/g, '');
    return /^\d+$/.test(argsmakeyaml);
  }

  if (debugging == 1) {
    console.log("Makenumberfilter: " + makenumberfilter(argsmakeyaml));
  }

  if (makenumberfilter(argsmakeyaml) == true) {
    message.channel.send("Use more than numbers.")
    .then(msg => {
      setTimeout(() => msg.delete(), 3000)
    })
    return;
  }

  var sqlmakequery = (SQL
                      `SELECT make AS ""
                       FROM car_db
                       WHERE make LIKE ${'%' + args[0] + '%'} OR make LIKE ${'%' + args[1] + '%'} OR make LIKE ${'%' + args[2] + '%'} OR make LIKE ${'%' + args[3] + '%'}
                       GROUP BY make
                       LIMIT 1
                      `
                      )

  if (debugging == 1) {
    console.log("Sqlmakequery: " + sqlmakequery + " - " + typeof(sqlmakequery));
  }

  db.query(sqlmakequery,
    function (err, make, fields) {
        if (err) throw err;
        var makelistreply = yaml.stringify(make);

        if (debugging == 1) {
          console.log("Makelistreply: " + makelistreply + " - " + typeof(makelistreply));
        }

        if (make.length === 0 || make == null) {

          const args = message.content.slice(prefix.length).trim().split(/ +/g);
          const cmd = args.shift().toLowerCase();

          message.channel.send("Manufacturer not found.")

          .then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })

          function makesimilarquery(args) {
            return String(args).substring(0,4);
          }

          if (debugging == 1) {
            console.log("Makesimilarquery: " + makesimilarquery(args));
          }

          var sqlmakesimilar = (SQL
                              `SELECT make AS ""
                               FROM car_db
                               WHERE make LIKE ${'%' + makesimilarquery(args[0]) + '%'} OR make LIKE ${'%' + makesimilarquery(args[1]) + '%'} OR make LIKE ${'%' + makesimilarquery(args[2]) + '%'} OR make LIKE ${'%' + makesimilarquery(args[3]) + '%'} OR make LIKE ${'%' + makesimilarquery(args[4]) + '%'}
                               GROUP BY make
                               LIMIT 5
                              `
                              )

          db.query(sqlmakesimilar,
            function (err, makesimilar, fields) {
                if (err) throw err;
                var makesimilareply = yaml.stringify(makesimilar);
                function makesimilarform(makesimilareply) {
                  makesimilareply = makesimilareply.replace(/ /g, "");
                  makesimilareply = makesimilareply.replace(/-/g,'');
                  makesimilareply = makesimilareply.replace(/['"]+/g, '');
                  makesimilareply = makesimilareply.replace(/:/g,'');
                  makesimilareply = makesimilareply.replace(/(\r\n|\n|\r)/gm,"");
                  makesimilareply = makesimilareply.replace(/[[\]]/g,'');
                  return makesimilareply;
                }

                if (debugging == 1) {
                  console.log("Sqlmakesimilar: " + sqlmakesimilar + " - " + typeof(sqlmakesimilar));
                  console.log("Makesimilareply: " + makesimilareply + " - " + typeof(makesimilareply));
                  console.log("Makesimilarform: " + makesimilarform(makesimilareply));
                }

                if (makesimilarform(makesimilareply) == "" || makesimilarform(makesimilareply) == "" || makesimilarform(makesimilareply) == null) {
                  return;
                } else if (!makesimilarform(makesimilareply).lenght) {
                  const similarwikipedia = new Discord.MessageEmbed()
                    .addField("Could it be? \n", makesimilarform(makesimilareply))
                    .setColor(embedcolor)
                  message.channel.send({ embeds: [similarwikipedia] });
                }

          })

        } else if (make.length != 0) {
          function makelistform(makelistreply) {
            makelistreply = makelistreply.replace(/['"]+/g, '');
            makelistreply = makelistreply.replace(/ /g,'');
            makelistreply = makelistreply.replace(/-/g,'');
            makelistreply = makelistreply.replace(/:/g,'');
            makelistreply = makelistreply.replace(/(\r\n|\n|\r)/gm,"");
            return makelistreply;
          }

          var lowermakelistreply = makelistform(makelistreply).toLowerCase();

          if (debugging == 1) {
            console.log("Makelistform: " + makelistform(makelistreply));
            console.log("Lowermakelistform: " + lowermakelistreply);
          }

          const makewikipedia = new Discord.MessageEmbed()
            .addField(makelistform(makelistreply), " [Wikipedia](https://en.wikipedia.org/wiki/" + makelistform(makelistreply) + ")" + " | [Autoevolution](https://www.autoevolution.com/" + lowermakelistreply + ")" + " | [Supercars](https://www.supercars.net/blog/category/brand/" + lowermakelistreply + ")" + " | [Carmodelslist](https://www.carmodelslist.com/" + lowermakelistreply + ")" + " | [Autoexpress](https://www.autoexpress.co.uk/" + lowermakelistreply + ")")
            .setColor(embedcolor)
          message.channel.send({ embeds: [makewikipedia] });
        }
    })
  }
});

//Other Commands - Correct

client.on("message", (message) => {
  if (message.author.bot) return;

  //Count Server the bot is in

  if (message.content.startsWith(prefix + "-carbot")) {
    var totalMembers = 0;
    client.guilds.cache.forEach((guild) => {
      totalMembers = totalMembers + guild.memberCount;
    })
    message.channel.send(`Carbot is in ${client.guilds.cache.size} servers serving ` + totalMembers + " Users!")
  }

  //Calculate Ping

  if (message.content.startsWith(prefix + "-ping")) {
    message.channel.send("Ping is " + client.ws.ping + "ms");
  }

  //View Servers and Total Members

  if (message.content.startsWith(prefix + "-serverlist")) {
    message.channel.send(`Check console.log | List`)
    console.log("\nCarbot Servers:\n")
    var totalMembers = 0;
    client.guilds.cache.forEach((guild) => {
      console.log(" - " + guild.name + "\t\t\t with " + guild.memberCount + " members")
      totalMembers = totalMembers + guild.memberCount;
    })
    console.log("\nTotal Users: " + totalMembers)
  }

  //Check Uptime

  if (message.content.startsWith(prefix + "-uptime")) {
      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
      message.channel.send(uptime);
    }

  //Counts how many cars are in the database

  if (message.content.startsWith(prefix + "-ddbb")) {

    var sqlcountquery = (SQL
                        `SELECT COUNT(id) AS ""
                         FROM car_db
                        `
                        )

    db.query(sqlcountquery,
      function (err, ddbb, fields) {
          if (err) throw err;
          var ddbbreply = yaml.stringify(ddbb);
          function countform(ddbbreply) {
            ddbbreply = ddbbreply.replace(/['"]+/g, '');
            return ddbbreply.substring(2);
          }
          message.channel.send("Number of cars in the database" + countform(ddbbreply))

          if (debugging == 1) {
            console.log("\nBBDD Channel\n");
            console.log("Sqlcountquery: " + sqlcountquery + " - " + typeof(sqlcountquery));
            console.log("Ddbb: " + ddbb + " - " + typeof(ddbb));
            console.log("Ddbbreply: " + ddbbreply + " - " + typeof(ddbbreply));
            console.log("Countform: " + countform(ddbbreply));
          }

      })
  }
});

//Embed Commands - Correct

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "-info")) {
    const info = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle('Information')
      .setAuthor(client.user.username, message.author.avatarURL)
      .setFooter('Bot Problem? Contact' + authorname)
      .setDescription ("Developer:" + authorname +"\nVersion: v3.1 Stable\n[TopGG](https://top.gg/bot/478201115985444866)\n[Webpage](http://carbot.github.io)\nThis bot was created the "+ client.user.createdAt)
      .setTimestamp();
    message.channel.send({ embeds: [info] });
  }

  if (message.content.startsWith(prefix + "-help")) {
    const help = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle('Help')
      .setAuthor(client.user.username, message.author.avatarURL)
      .setFooter('Bot Problem? Contact' + authorname)
      .setDescription ("Prefix: c-\nc-info (Bot information)\nc-config (Bot Current Configuration)\nc-carbot (Carbot Servers Count)\nc-ddbb (Count Cars in the Database)\nc-ping (Ping Command)\nc-uptime (Uptime)\n\nSearching Manufacturers:\nc-make Holden (Typos supported to a certain extent)\n\nSearching Cars:\nc- holden monaro 2001 (suports query with model, manufacturer and year)")
      .setTimestamp();
    message.channel.send({ embeds: [help] });
  }

  if (message.content.startsWith(prefix + "-invite")) {
    const invite = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle('Carbot Server')
      .setAuthor(client.user.username, message.author.avatarURL)
      .setFooter('Bot Problem? Contact' + authorname)
      .setDescription ("https://discord.gg/9txwYxM\nhttps://discordapp.com/api/oauth2/authorize?client_id=478201115985444866&permissions=0&scope=bot")
      .setTimestamp();
    message.channel.send({ embeds: [invite] });
  }

  if (message.content.startsWith(prefix + "-config") || message.content.startsWith(prefix + "-settings")) {
    const settings = new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setTitle('Current Configuration')
      .setAuthor(client.user.username, message.author.avatarURL)
      .setFooter('Bot Problem? Contact' + authorname)
      .setDescription ("MariaDB: 10.4.19\nImage Scraper: 6.3.0\nSql-template-strings: 2.2.2\nYaml: 1.10.2\nProfanity-js: 0.1.4\nExpress: 4.17.1\nForever: 4.0.1\nDiscord.js V13")
      .setTimestamp();
    message.channel.send({ embeds: [settings] });
  }
});

client.login(config.token);
