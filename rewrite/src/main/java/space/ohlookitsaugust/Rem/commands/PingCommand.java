package space.ohlookitsaugust.Rem.commands;

import space.ohlookitsaugust.Rem.handlers.Command;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import java.util.List;

public class PingCommand extends Command {
  public PingCommand(String name, String help, Category category, boolean usableInDM) {
    super(name, help, category, usableInDM);
  }
  
  @Override
  public void execute(List<String> arguments, MessageReceivedEvent event) {
    event.getChannel().sendMessage(Math.round(event.getJda().getPing() + "ms");
  }
}