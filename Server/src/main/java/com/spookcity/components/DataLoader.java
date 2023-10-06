package com.spookcity.components;

import com.spookcity.models.Ghost;
import com.spookcity.models.Rank;;
import com.spookcity.models.Location;
import com.spookcity.models.User;
import com.spookcity.repositories.GhostRepository;
import com.spookcity.repositories.LocationRepository;
import com.spookcity.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    GhostRepository ghostRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    UserRepository userRepository;

    public DataLoader(){}

    public void run(ApplicationArguments args) {

        Ghost ghost1 = new Ghost("Greyfriars Bobby", "greyfriarsBobby", LocalDate.of(1858, 1, 14), "Woof woof!");
        Ghost ghost2 = new Ghost("Mackenzie Poltergeist", "mackenziePoltergeist", LocalDate.of(1691, 2, 28), "Who dares summon me?!");
        Ghost ghost3 = new Ghost("Annie's Room Ghost", "anniesRoomGhost", LocalDate.of(1823, 6, 5), "Get out of my room!");
        ghostRepository.save(ghost1);
        ghostRepository.save(ghost2);
        ghostRepository.save(ghost3);

        Location location1 = new Location("Greyfriars Kirkyard", "greyfriars_kirkyard.jpg", "Historic graveyard.", 55.9472, -3.1922, ghost1);
        Location location2 = new Location("Greyfriars Kirkyard", "greyfriars_kirkyard.jpg", "Haunted cemetery.", 55.9472, -3.1922, ghost2);
        Location location3 = new Location("Mary King's Close", "mary_kings_close.jpg", "Underground streets.", 55.9497, -3.1919, ghost3);

        locationRepository.save(location1);
        locationRepository.save(location2);
        locationRepository.save(location3);

        User user1 = new User("GhostHunter123", "user1.jpg", Rank.MEDIUM, 1000L);
        User user2 = new User("SpookyExplorer", "user2.jpg", Rank.NOVICE, 500L);

        userRepository.save(user1);
        userRepository.save(user2);

    }
}
