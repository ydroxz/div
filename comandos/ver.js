const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  message.delete();
    if ((message.author.id !== "817160910871330836"))
      return message.reply("Você Não Tem Permissão Para Isso!");
  let servidores = client.guilds.size;
  let usuarios = client.users.size;

  let on = client.users.filter(m => m.presence.status === "online");
  let npertube = client.users.filter(m => m.presence.status === "dnd");
  let ausente = client.users.filter(m => m.presence.status === "idle");
  let invisible = client.users.filter(m => m.presence.status === "offline");

  const embed = new Discord.RichEmbed()
    .setTitle(`**D X T Divs!**`)
    .setDescription(
      `**Servidores:** ${client.guilds.size}\n**Total:** ${client.users.size}\n\n**Onlines:** ${on.size}\n**Ausentes:** ${ausente.size}\n**Ocupados:** ${npertube.size}\n**Invisíveis:** ${invisible.size}`
    )
    .setFooter(client.user.username, client.user.avatarURL)
    .setColor("#FF0000")
    .setTimestamp();
  message.channel.send(embed);
 message.delete(100)
};
