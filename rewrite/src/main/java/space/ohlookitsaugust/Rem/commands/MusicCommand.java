package space.ohlookitsaugust.Rem.commands;

import com.sedmelluq.discord.lavaplayer.player.AudioLoadResultHandler;
import com.sedmelluq.discord.lavaplayer.player.AudioPlayerManager;
import com.sedmelluq.discord.lavaplayer.player.DefaultAudioPlayerManager;
import com.sedmelluq.discord.lavaplayer.source.AudioSourceManagers;
import com.sedmelluq.discord.lavaplayer.tools.FriendlyException;
import com.sedmelluq.discord.lavaplayer.track.AudioPlaylist;
import com.sedmelluq.discord.lavaplayer.track.AudioTrack;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import net.dv8tion.jda.core.entities.Guild;
import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.VoiceChannel;

import space.ohlookitsaugust.Rem.handlers.Command;

public class MusicCommand extends Command {
  public MusicCommand(String name, String help, Category category, boolean usableInDM) {
    super(name, help, category, usableInDM);
  }
  
  	private synchronized GuildMusicManager getGuildAudioPlayer(Guild guild) {
		long guildId = Long.parseLong(guild.getId());
		GuildMusicManager musicManager = musicManagers.get(guildId);

		if (musicManager == null) {
			musicManager = new GuildMusicManager(playerManager);
			musicManagers.put(guildId, musicManager);
		}

		guild.getAudioManager().setSendingHandler(musicManager.getSendHandler());

		return musicManager;
}

  @Override
  public void execute(List<String> args, MessageRecievedEvent event) {
    	private AudioPlayerManager playerManager = null;
        private Map<Long, GuildMusicManager> musicManagers = null;
        
        String msg = event.getMessage().getContent();
        
        if (msg.startsWith("!r.play ")) {
          loadAndPlay(event.getTextChannel(), msg.substring("ncs play ".length()));
        } else if (msg.startsWith("!r.join")) {
          joinVC(event.getTextChannel());
        }
  }
  
  	private void loadAndPlay(final TextChannel channel, final String trackUrl) {
		final GuildMusicManager musicManager = getGuildAudioPlayer(channel.getGuild());

		playerManager.loadItemOrdered(musicManager, trackUrl, new AudioLoadResultHandler() {
			public void trackLoaded(AudioTrack track) {
				channel.sendMessage("I am adding: " + track.getInfo().title + " to the queue!").queue();

				play(channel.getGuild(), musicManager, track, channel, channel.getGuild().getAudioManager());
			}

			public void playlistLoaded(AudioPlaylist playlist) {
				AudioTrack firstTrack = playlist.getSelectedTrack();

				if (firstTrack == null) {
					firstTrack = playlist.getTracks().get(0);
				}

				channel.sendMessage("Adding to queue " + firstTrack.getInfo().title + " (first track of playlist "
						+ playlist.getName() + ")").queue();

				play(channel.getGuild(), musicManager, firstTrack, channel, channel.getGuild().getAudioManager());
			}

			public void noMatches() {
				channel.sendMessage("I haven't found: " + trackUrl).queue();
			}

			public void loadFailed(FriendlyException exception) {
				channel.sendMessage("Could not play: " + exception.getMessage()).queue();
			}
		});
    }
    
    private void play(Guild guild, GuildMusicManager musicManager, AudioTrack track, TextChannel channel,
			AudioManager audioManager) {
		if (!audioManager.isConnected() && !audioManager.isAttemptingToConnect()) {
			channel.sendMessage("Use `!r.join` to join my voiceChannel!").queue();
			return;
		}
		if (audioManager.isConnected()) {
			musicManager.scheduler.queue(track);
		}
    }
    
	private void skipTrack(TextChannel channel) {
		GuildMusicManager musicManager = getGuildAudioPlayer(channel.getGuild());
		musicManager.scheduler.nextTrack();

		channel.sendMessage("Skipped! <3").queue();
    }
    

	private void joinVoiceChannel(TextChannel channel) {
		Guild guild = channel.getGuild();
		AudioManager am = guild.getAudioManager();
		try {
			am.openAudioConnection(guild.getVoiceChannelsByName("Music", true).get(0));
		} catch(Exception e) {
			channel.sendMessage("You need to create a voice channel named `Music`!").queue();
		}
			
    }
   
    private void leaveVoiceChannel(TextChannel channel) {
		Guild guild = channel.getGuild();
		if (guild.getAudioManager().isConnected()) {
			channel.sendMessage("Goodbye fwend.").queue();
			guild.getAudioManager().closeAudioConnection();
		} else {
			channel.sendMessage("I wasn't in a channel to begin with!").queue();
		}
    }
}