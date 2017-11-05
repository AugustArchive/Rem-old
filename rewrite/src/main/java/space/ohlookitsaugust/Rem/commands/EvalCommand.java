package space.ohlookitsaugust.Rem.commands;

import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import space.ohlookitsaugust.Rem.handlers.Command;
import space.ohlookitsaugust.Rem.utils.ConfigReader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class EvalCommand extends Command
{
      public EvalCommand(String name, String help, Category category, boolean usableInDM)
      {
         super(name, help, category, usableInDM);
      }
      
      @Override
      public void execute(List<String> arguments, MessageReceivedEvent event)
      {
         try
         {
            ConfigReader config = new ConfigReader("./config.txt", " :: ");
            String devs = config.get("devs");
            if (!event.getAuthor().getId().equals(devs))
            {
               event.getChannel().sendMessage("You don't have permission to execute this command.").queue();
            }
            else
            {
               ScriptEngine se = new ScriptEngineManager().getEngineByName("nashorn");
                se.put("event", event);
                se.put("jda", event.getJDA());
                se.put("channel", event.getTextChannel());
                se.put("message", event.getMessage());
                se.put("guild", event.getGuild());
                
                try
                {
                 event.getChannel().sendMessage("It was successful! ```java\n" +
                     se.eval(arguments.stream().collect(Collectors.joining("  "))) + "```").queue();
                } catch (Exception err) {
                   event.getChannel().sendMessage("It wasn't successful: ```java\n" + err + "```");
                }
            }
        } catch(IOException error) {
          event.getChannel().sendMessage("Something isn't right.. right?```\n" + Arrays.toString(error.getStackTrace()) + "```\n");
        }
     }
}