package space.ohlookitsaugust.Rem;

import com.google.gson.Gson;
import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.JDABuilder;
import net.dv8tion.jda.core.entities.Game;
import net.dv8tion.jda.core.hooks.AnnotatedEventManager;

import space.ohlookitsaugust.Rem.commands.HelpCommand;
import space.ohlookitsaugust.Rem.handlers.Command;
import space.ohlookitsaugust.Rem.handlers.CommandCats;
import space.ohlookitsaugust.Rem.commands.EvalCommand;
import space.ohlookitsaugust.Rem.utils.ConfigReader;
import space.ohlookitsaugust.Rem.utils.Utils;


public class RemBoat
{
      public static final Gson gson = new Gson();
      public static CommandCats cats = new CommandCats("!r.");
      public static JDA jda = null;
      
      public static void main(String[] args) throws Exception
      {
          ConfigReader config = new ConfigReader("./config.txt", " :: ");
          cats.addCommand(new EvalCommand("eval", "evals arbitrary JS - Owner Only", Command.Category.UTILITY, true))
                  .addCommand(new HelpCommand("help", "help commands", Command.Category.REM, true));
        
            jda = new JDABuilder(AccountType.BOT)
                   .setEventManager(new AnnotatedEventManager())
                   .setToken(config.get("token"))
                   .setAutoReconnect(true)
                   .setGame(Game.of("!r.help | rem.ohlookitsAugust.space"))
                   .addEventListener(cats)
                   .buildBlocking();
      }
}
