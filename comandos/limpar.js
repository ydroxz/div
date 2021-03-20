module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Você não pode excluir mensagens....").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Isso não é um numero, e nao posso mandar apagar 0 mensagens.").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Não consigo excluir isso tudo de mensagens .").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`🧹 **|** <@${message.author.id}> **limpou** \`${deleted.size}\` **mensagens**`).then(msg => {msg.delete(50000)}))
            .catch(err => message.reply(`Algo deu errado ${err}`));
    }
}
module.exports.help = {
    name: "clear",
    category:"ADM",
    description:"Limpa as mensagens do servidor",
    usage:",clear <quantidade>"
}