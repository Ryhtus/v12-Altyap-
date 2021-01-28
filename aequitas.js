const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const snekfetch = require('snekfetch');
const ayarlar = require('./ayarlar.json');
require('./events/loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komut/', (err, files) => {
if (err) console.log(`Bir Komut Yüklemelisin!`);
console.log(`
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
 -> ${files.length} Komut Yükeniyor...
∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞`);
files.forEach(f => {
let props = require(`./komut/${f}`);
console.log(`-> ${props.help.name}`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);});});});

client.reload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komut/${command}`)];
let cmd = require(`./komut/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);});
resolve(); } catch (e) { reject(e);}});};

client.load = command => {
return new Promise((resolve, reject) => { try {
let cmd = require(`./komut/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);});
resolve(); } catch (e) { reject(e); }});};

client.unload = command => {
return new Promise((resolve, reject) => { try {
delete require.cache[require.resolve(`./komut/${command}`)];
let cmd = require(`./komut/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
resolve(); } catch (e) {reject(e); }});};
client.elevation = message => {
if (!message.guild) { return; }

let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
if (message.author.id === ayarlar.bot.owner) permlvl = 3;
return permlvl;};

client.login(process.env.token).then(() => {
console.log(`-> ∞ | 𝙸𝙽𝙵𝙸𝙽𝙸𝚃𝚈 | ∞ Sunucusunda Görevimdeyim Aequitas!`);});
//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\

