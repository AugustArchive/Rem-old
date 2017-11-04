package space.ohlookitsaugust.Rem.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

public class ConfigReader {
    private HashMap<String, String> keyPairs = new HashMap<>();

    public ConfigReader(String path, String seperator) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(path));
        lines.forEach(line -> {
            String[] split = line.split(seperator);
            if (split.length == 2) keyPairs.put(split[0], split[1]);
        });
    }

    public String get(String key) {
        return keyPairs.get(key);
    }
}