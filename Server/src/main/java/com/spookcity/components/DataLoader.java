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

//

        

        Location location1 = new Location(
                "Greyfriars Kirkyard",
                "greyfriarsKirkyard.jpg",
                "A historic cemetery where Greyfriars Bobby is said to guard his owner's grave.",
                55.9469,
                -3.1923,
                ghost1
        );
        Location location2 = new Location(
                "Greyfriars Kirkyard",
                "greyfriarsKirkyard.jpg",
                "Sir George Mackenzie's mausoleum, the reputed haunt of the Mackenzie Poltergeist.",
                55.9472,
                -3.1914,
                ghost2
        );
        Location location3 = new Location(
                "South Bridge Vaults",
                "southBridgeVaults.jpg",
                "Underground vaults beneath South Bridge where the South Bridge Poltergeist is rumored to dwell.",
                55.9485,
                -3.1904,
                ghost3
        );
        Location location4 = new Location(
                "Edinburgh Castle",
                "edinburghCastle.jpg",
                "The castle where the Headless Drummer is said to make eerie appearances.",
                55.9486,
                -3.1999,
                ghost4
        );
        Location location5 = new Location(
                "Holyrood Palace",
                "holyroodPalace.jpg",
                "The royal palace where the Ghosts of Holyrood Palace are known to haunt.",
                55.9521,
                -3.1702,
                ghost5
        );

        Location location6 = new Location(
                "Canongate Kirk Cemetery",
                "canongateKirkCemetery.jpg",
                "A cemetery near the Royal Mile where the Woman in Black has been sighted.",
                55.9522,
                -3.1786,
                ghost6
        );
        Location location7 = new Location(
                "Edinburgh's Underground Tunnels",
                "edinburghUndergroundTunnels.jpg",
                "Mysterious tunnels where the Phantom Piper is said to have disappeared.",
                55.9495,
                -3.1900,
                ghost7
        );
        Location location8 = new Location(
                "Mary King's Close",
                "maryKingsClose.jpg",
                "A historic close where the Poltergeist of Mary King's Close is rumored to cause disturbances.",
                55.9495,
                -3.1914,
                ghost8
        );
        Location location9 = new Location(
                "George Street",
                "georgeStreet.jpg",
                "A street where the cries of Wee Annie are heard near a particular building.",
                55.9536,
                -3.2023,
                ghost9
        );
        Location location10 = new Location(
                "George Heriot's School",
                "georgeHeriotsSchool.jpg",
                "A school where the Phantom Harpist's music is said to be heard in the halls.",
                55.9484,
                -3.1960,
                ghost10
        );

        ghost1.setLocation(location1);
        ghost2.setLocation(location2);
        ghost3.setLocation(location3);
        ghost4.setLocation(location4);
        ghost5.setLocation(location5);
        ghost6.setLocation(location6);
        ghost7.setLocation(location7);
        ghost8.setLocation(location8);
        ghost9.setLocation(location9);
        ghost10.setLocation(location10);


        locationRepository.save(location1);
        locationRepository.save(location2);
        locationRepository.save(location3);
        locationRepository.save(location4);
        locationRepository.save(location5);
        locationRepository.save(location6);
        locationRepository.save(location7);
        locationRepository.save(location8);
        locationRepository.save(location9);
        locationRepository.save(location10);

        ghostRepository.save(ghost1);
        ghostRepository.save(ghost2);
        ghostRepository.save(ghost3);
        ghostRepository.save(ghost4);
        ghostRepository.save(ghost5);
        ghostRepository.save(ghost6);
        ghostRepository.save(ghost7);
        ghostRepository.save(ghost8);
        ghostRepository.save(ghost9);
        ghostRepository.save(ghost10);

        User user1 = new User("GhostHunter123", 4, Rank.NOVICE, 0L, "ILoveGhostHunting");
        User user2 = new User("SpookyExplorer", 2, Rank.NOVICE, 0L, "ExplorerOfTheSpooks");

        userRepository.save(user1);
        userRepository.save(user2);

    }
}


