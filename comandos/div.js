const Discord = require("discord.js");
exports.run = async (client, message, args, member) => {
  message.delete();
  if (message.author.id !== "817160910871330836")
    return message.reply("Você Não Tem Permissão Para Isso!");

  const mensagem = args.slice(0).join(" ");
  if (!mensagem)
    return message
      .reply("Me Diga Algo Para Mandar!")
      .then(msg => msg.delete(8000));

  let on = client.users.filter(m => m.presence.status === "online");
  let npertube = client.users.filter(m => m.presence.status === "dnd");
  let ausente = client.users.filter(m => m.presence.status === "idle");
  let invisible = client.users.filter(m => m.presence.status === "offline");

  const embed = new Discord.RichEmbed()
    .setTitle(`**ydroxz Divs!**`)
    .setDescription(
      `**Mensagem enviada para:**\n\n **Servidores:** ${client.guilds.size}\n **Total:** ${client.users.size}\n\n **Onlines:** ${on.size}\n **Ausentes:** ${ausente.size}\n **Ocupados:** ${npertube.size}\n **Offline:** ${invisible.size}`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setColor("#FF0000");

  message.channel.send(embed).then(msg => msg.delete(50000));

  
  await on.array().forEach(async c => {
    await c.send(mensagem).then(() => console.log(`Recebido! (Online) ${c.tag}`)).catch(() => console.log(`Não Recebido! (Online) ${c.tag}`));
    process.title = `Divulgando em: ${client.user.username} (Online)`
  });

  await npertube.array().forEach(async c => {
    await c.send(mensagem).then(() => console.log(`Recebido! (Ocupado) ${c.tag}`)).catch(() => console.log(`Não Recebido! (Ocupado) ${c.tag}`));
    process.title = `Divulgando em: ${client.user.username} (Ocupado)`
  });

  await ausente.array().forEach(async c => {
    await c.send(mensagem).then(() => console.log(`Recebido! (Ausente) ${c.tag}`)).catch(() => console.log(`Não Recebido! (Ausente) ${c.tag}`));
    process.title = `Divulgando em: ${client.user.username} (Ausente)`
  });

  await invisible.array().forEach(async c => {
    await c.send(mensagem).then(() => console.log(`Recebido! (Offline) ${c.tag}`)).catch(() => console.log(`Não Recebido! (Offline) ${c.tag}`));
    process.title = `Divulgando em: ${client.user.username} (Offline)`
  });
};
