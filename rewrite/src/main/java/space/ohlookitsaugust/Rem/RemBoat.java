package space.ohlookitsaugust.Rem;

import com.google.gson.Gson;
import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.JDABuilder;
import net.dv8tion.jda.core.entities.Game;
import net.dv8tion.jda.core.hooks.AnnotatedEventManager;
import com.github.natanbc.discordbotsapi.DiscordBotsAPI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory

import space.ohlookitsaugust.Rem.commands.HelpCommand;
import space.ohlookitsaugust.Rem.handlers.Command;
import space.ohlookitsaugust.Rem.handlers.CommandCats;
import space.ohlookitsaugust.Rem.commands.EvalCommand;
import space.ohlookitsaugust.Rem.commands.PingCommand;
import space.ohlookitsaugust.Rem.utils.ConfigReader;
import space.ohlookitsaugust.Rem.utils.Utils;


public class RemBoat
{
      public static final Gson gson = new Gson();
      public static CommandCats cats = new CommandCats("!r.");
      public static JDA jda = null;
      public static final Logger log = LoggerFactory.getLogger("RemBoat");
      
      public static void main(String[] args) throws Exception
      {
          ConfigReader config = new ConfigReader("./config.txt", " :: ");
              cats.addCommand(new EvalCommand("eval", "evals arbitrary JS - Owner Only", Command.Category.UTILITY, true))
                  .addCommand(new HelpCommand("help", "help commands", Command.Category.REM, true))
                  .addCommand(new PingCommand("ping", "ping in ms", Command.Category.UTILITY, true));
                  
            DiscordBotsAPI apiWithToken = new DiscordBotsAPI(config.get("oliyBots"));
            
            log.info("Beginning to start Rem, the discord boat.");
        
            jda = new JDABuilder(AccountType.BOT)
                   .setEventManager(new AnnotatedEventManager())
                   .setToken(config.get("token"))
                   .setAutoReconnect(true)
                   .setGame(Game.of("!r.help | v2.0.1 | Am I that cool?"))
                   .addEventListener(cats)
                   .buildBlocking();
            int serverCount = jda.getGuilds().size();
            apiWithToken.postStats(0, 1, serverCount);
      }
}
