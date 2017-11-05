package space.ohlookitsaugust.Rem.commands;

import net.dv8tion.jda.core.EmbedBuilder;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import space.ohlookitsAugust.Rem.handlers.Command;

import java.awt.*;
import java.util.List;

import static space.ohlookitsaugust.Rem.RemBoat.cats;


public class HelpCommand extends Command {

    public HelpCommand(String name, String help, Category category, boolean usableInDM) {
        super(name, help, category, usableInDM);
    }

    @Override
    public void execute(List<String> arguments, MessageReceivedEvent event) {
        EmbedBuilder builder = new EmbedBuilder()
                .setAuthor("Rem Command List", null, event.getAuthor().getEffectiveAvatarUrl())
                .setColor(Color.PURPLE);
        cats.getCommands().forEach(command -> builder.appendDescription("+ **" +
                cats.getPrefix() + command.getName() + "**: *" + command.getHelp() + "*\n"));
        event.getChannel().sendMessage(builder.build()).queue();
    }
}