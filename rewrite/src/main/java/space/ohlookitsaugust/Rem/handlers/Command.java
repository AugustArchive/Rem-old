package space.ohlookitsaugust.Rem.handlers;

import net.dv8tion.jda.core.events.message.MessageReceivedEvent;

import java.util.List;

abstract public class Command {
    private String name;
    private String help;
    private boolean usableInDM;
    private Category category;

    public abstract void execute(List<String> arguments, MessageReceivedEvent event);

    public Command(String name, String help, Category category, boolean usableInDM) {
        this.name = name;
        this.help = help;
        this.category = category;
        this.usableInDM = usableInDM;
    }

    public boolean isUsableInDM() {
        return usableInDM;
    }

    public String getHelp() {
        return help;
    }

    public String getName() {
        return name;
    }

    public Category getCategory() {
        return category;
    }


    public enum Category {
        UTILITY("Utility"),
        REM("Rem");

        private String readable;
        Category(String readable) {
            this.readable = readable;
        }

        @Override
        public String toString() {
            return readable;
        }
    }
}