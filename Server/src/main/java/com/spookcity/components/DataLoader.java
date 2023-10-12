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
//@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    GhostRepository ghostRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    UserRepository userRepository;

    public DataLoader(){}

    public void run(ApplicationArguments args) {

        Ghost ghost1 = new Ghost("Greyfriars Bobby",
                "greyfriarsBobby.jpg",
                "Mans best friend, found near Greyfriars Kirkyard",
                "A loyal and heartwarming ghost. Known for his devotion to his owner, John Gray, even in the afterlife.",
                LocalDate.of(1858, 1, 14),
                "Woof woof!", true);
        Ghost ghost2 = new Ghost(
                "Mackenzie Poltergeist", "mackenziePoltergeist.jpg",
                "A terrifying poltergest of an old judge, haunts Mackenzie's Mausoleum","'Bloody Mackenzie', is the malevolent spirit of Sir George Mackenzie, a notorious persecutor of Covenanters. People have reported sudden drops in temperature, unexplained injuries, and even fainting spells when visiting his mausoleum."
                , LocalDate.of(1691, 2, 28), "Who dares summon me?!", false);
        Ghost ghost3 = new Ghost("Abandoned Annie", "abandonedAnnie.jpg","A tragic victim of the plague, found in the Underground vaults of Edinburgh","Visitors have reported sightings of a young girl named Annie who died in the close during the plague. Her spirit is said to wander the underground streets, and some have heard her laughter or seen her apparition.", LocalDate.of(1823, 6, 5), "Have you seen my mum?", false);
        Ghost ghost4 = new Ghost(  "The Headless Drummer",
                "headlessDrummer.jpg",
                "A spectral drummer, reported in many areas of the city",
                "A headless drummer whose ghostly drumming is heard as an omen before major disasters.",
                LocalDate.of(1600, 11, 11),
                "Drumming in the dark...", false);
        Ghost ghost5 = new Ghost("Mary, Queen of Scots",
                "maryQueenOfScots.jpg","A royal spirit, found in Holyrood Palace",
                "The spirit of the famous queen, known to roam the halls and chambers of Holyrood Palace.",
                LocalDate.of(1542, 12, 8),
                "Long live the queen!", true);
        Ghost ghost6 = new Ghost( "The Woman in Black",
                "womanInBlack.jpg","A mournful ghost, haunting Canongate Kirk",
                "A mysterious woman in black who appears near tombs in Canongate Kirk.",
                LocalDate.of(11, 11, 11),
                "Abandon all hope, ye who sight me!", false);
        Ghost ghost7 = new Ghost( "The Phantom Piper",
                "phantomPiper.jpg","A wondering piper, trapped in Edinburgh's underground tunnels",
                "A ghostly piper believed to have vanished while exploring underground tunnels.",
                LocalDate.of(11, 11, 11),
                "Would ye like to hear me play ma pipes, laddy?", true);
        Ghost ghost8 = new Ghost(
                "The Poltergeist of Mary King's Close",
                "poltergeistOfMaryKingsClose.jpg","The feared specter of Mary King's Close",
                "Reports of poltergeist activity in Mary King's Close, including objects moving on their own and mysterious noises.",
                LocalDate.of(1700, 11, 11),
                "Beware the unseen sprit of the close!"
        , false);
        Ghost ghost9 = new Ghost( "Wee Annie",
                "weeAnnie.jpg","The ghost of a baby girl, found on George Street",
                "The cries of a baby named Wee Annie are heard near a building on George Street.",
                LocalDate.of(11, 11, 11),
                "Can anyone hear me?", true);
        Ghost ghost10 = new Ghost(
                "The Phantom Harpist",
                "phantomHarpist.jpg","A harpist, trapped eternally within George Heriot's School",
                "A young harpist whose music is heard in George Heriot's School.",
                LocalDate.of(11, 11, 11),
                "Please... stay... listen to my music", false
        );
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

        User user1 = new User("GhostHunter123", "user1.jpg", Rank.MEDIUM, 1000L);
        User user2 = new User("SpookyExplorer", "user2.jpg", Rank.NOVICE, 500L);

        userRepository.save(user1);
        userRepository.save(user2);

    }
}
