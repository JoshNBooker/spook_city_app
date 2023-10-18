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

        Ghost ghost1 = new Ghost("Greyfriars Bobby",
                "greyfriarsBobby.jpg",
                "Mans best friend, found near Greyfriars Kirkyard",
                "A loyal and heartwarming ghost. Known for his devotion to his owner, John Gray, even in the afterlife.",
                LocalDate.of(1858, 1, 14),
                "Woof woof!", false, "The best-known version of the story is that Bobby belonged to John Gray, who worked for the Edinburgh City Police as a nightwatchman. When John Gray died he was buried in Greyfriars Kirkyard, the kirkyard surrounding Greyfriars Kirk in the Old Town of Edinburgh. Bobby then became known locally, spending the rest of his life sitting on his master's grave.\n" +
                "In 1867 the lord provost of Edinburgh, Sir William Chambers, who was also a director of the Scottish Society for Prevention of Cruelty to Animals, paid for Bobby's licence and gave the dog a collar, now in the Museum of Edinburgh.");
        Ghost ghost2 = new Ghost(
                "Mackenzie Poltergeist", "mackenziePoltergeist.jpg",
                "A terrifying poltergest of an old judge, haunts Mackenzie's Mausoleum","'Bloody Mackenzie', is the malevolent spirit of Sir George Mackenzie, a notorious persecutor of Covenanters. People have reported sudden drops in temperature, unexplained injuries, and even fainting spells when visiting his mausoleum."
                , LocalDate.of(1691, 2, 28), "Who dares summon me?!", false, "The MacKenzie Poltergeist and the tormented souls of his victims are said to haunt Greyfriars. There are literally hundreds of accounts of sightings of ghostly apparitions, strange phenomena and poltergeist attacks, with many visitors to the graveyard having encountered some sort of paranormal activity, sustaining bruises, bites and scratches, having the sensation of being followed, and/or being knocked to the ground sometimes resulting in the individual being rendered unconscious. Even homes built next to the graveyard are plagued by crockery smashing, objects moving and unidentified laughter. The hauntings are said to have intensified in more recent years following the Mausoleum being broken into several times and George’s burial chamber and remains being disturbed. One incident in 1999 involved a homeless man breaking into the Mausoleum. He descended the staircase to the lower burial chamber containing the MacKenzie family coffins to seek shelter, he tripped in the pitch darkness, fell and crashed straight through the weak floor. He fell some distance and landed on something bumpy, not knowing what was around him he flicked on his lighter and realised to his horror he had fallen into a hidden room below, an ossuary filled with unidentified skeletons speculated to be a plague burial pit.");
        Ghost ghost3 = new Ghost("Abandoned Annie", "abandonedAnnie.jpg","A tragic victim of the plague, found in the Underground vaults of Edinburgh","Visitors have reported sightings of a young girl named Annie who died in the close during the plague. Her spirit is said to wander the underground streets, and some have heard her laughter or seen her apparition.", LocalDate.of(1823, 6, 5), "Have you seen my mum?", false, "Arriving at a specific room towards the end of the close, Gibo refused to enter, citing a terrible sense of sickness, hunger and cold. Finally going inside after apparently being 'invited' in by the ghost of a little girl called Annie who had died of the plague, she declared the girl had been abandoned by her family and had lost her doll.\n" +
                "\n" +
                "\n" +
                "Depending on the story you hear Annie either tugged at the hand of the psychic or grabbed at her leg, and in keeping with the Japanese tradition of honouring the dead, Gibo went to the Royal Mile and brought back a tartan Barbie doll. Since then, visitors to Annie's room have left similar gifts for the spirit.\n" +
                "\n" +
                "Chris Trotter, a guide at the attraction at the time said he too knew of many instances of tourists suddenly feeling unwell, of feeling a little hand grabbing at them or feeling a dread sense of cold.");
        Ghost ghost4 = new Ghost(  "The Headless Drummer",
                "headlessDrummer.jpg",
                "A spectral drummer, reported in many areas of the city",
                "A headless drummer whose ghostly drumming is heard as an omen before major disasters.",
                LocalDate.of(1600, 11, 11),
                "Drumming in the dark...", false, "In 1650, servants noticed a mysterious little boy circling the castle’s courtyard, playing a drum. Upon closer inspection, they realised something was very wrong: he had no head. Too scared to approach, they let him play into the night. By morning, he was gone. \n" +
                "\n" +
                "Not long after, the castle was captured by Oliver Cromwell.\n" +
                "\n" +
                "Seeing the Headless Drummer Boy is considered to be an omen of bad luck. Sometimes, in the middle of the night, castle staff still hear his distant tap-tap-tap…");
        Ghost ghost5 = new Ghost("Mary, Queen of Scots",
                "maryQueenOfScots.jpg","A royal spirit, found in Holyrood Palace",
                "The spirit of the famous queen, known to roam the halls and chambers of Holyrood Palace.",
                LocalDate.of(1542, 12, 8),
                "Long live the queen!", false, "In 1561, the palace was inhabited by Mary, Queen of Scots. Mary came to live in Holyrood Palace after her first husband, Francis, the Dauphin of France, had passed away. Mary claimed the Scottish thrown and lived at the palace from 1561 to 1567. In 1565, she married Henry Stuart, also known as Lord Darnley. They had a child together (James VI of Scotland), but the marriage wasn’t a happy one. Lord Darnley was a jealous man and was convinced of the fact that his wife had an affair with her personal secretary, David Rizzio.\n" +
                "\n" +
                "On March 9, 1566, Lord Darnley and several nobles used the passageway from his room to the Queen’s quarters. They busted in while the 7-month pregnant Queen was having supper with David and four other courtiers. Darnley and his nobles dragged Rizzio to the Audience Room where they stabbed him 57 times. No matter what they try, they are still to this day, not able to clean the bloodstain. And yes, we saw it, for we visited this beautiful palace in September 2019.  ");
        Ghost ghost6 = new Ghost( "The Woman in Black",
                "womanInBlack.jpg","A mournful ghost, haunting Canongate Kirk",
                "A mysterious woman in black who appears near tombs in Canongate Kirk.",
                LocalDate.of(11, 11, 11),
                "Abandon all hope, ye who sight me!", false, "This ancient church yard is the burial place of many important Roberts and other unmarked commoners. However, there have been far more spooky matters afoot here. In the 1980s the night porter was going about his evening duties when he noticed something strange in the cemetery. He goes out to investigate when he is presented with the blood curling sight of a black figure in the fog amongst the headstones. \n" +
                "\n" +
                "Standing tall, this figure in black was spotted by a witness as they walked towards each other. It vanished when they reached touching distance.");
        Ghost ghost7 = new Ghost( "The Phantom Piper",
                "phantomPiper.jpg","A wondering piper, trapped in Edinburgh's underground tunnels",
                "A ghostly piper believed to have vanished while exploring underground tunnels.",
                LocalDate.of(11, 11, 11),
                "Would ye like to hear me play ma pipes, laddy?", false, "The sad story dates back several hundred years when a number of tunnels were found under the castle that seemed to lead towards Holyrood House, the royal palace that stands at the bottom of the Royal Mile. Holyrood Palace stands in the grounds of the ruined Augustinian Holyrood Abbey founded in 1128 at the order of King David I.\n" +
                "\n" +
                "When found there was great curiosity to see where the tunnels beneath the castle would lead. However, the entrance was only small enough for a young boy piper to get through. He was sent down with his bagpipes to investigate. As instructed he played the pipes loudly as he walked through the tunnel. Those above ground could therefore trace his progress and work out where the tunnel went. This worked well for a time, then suddenly the pipes stopped somewhere near the site of Tron Kirk, a church  which is a well-known landmark on the Royal Mile.\n" +
                "\n" +
                "Search parties undertook rescue attempts, but the boy piper had vanished. He was never found and although rescue parties was sent to look for him, there was no trace of the piper. With the disappearance of the piper the tunnel was sealed. But Edinburgh being Edinburgh, the story did not end there. Ever since that time many people have reported hearing the faint underground sounds of a lone bagpipe being played far below ground under Edinburgh Castle and the Royal Mile.");
        Ghost ghost8 = new Ghost(
                "The Poltergeist of Mary King's Close",
                "poltergeistOfMaryKingsClose.jpg","The feared specter of Mary King's Close",
                "Reports of poltergeist activity in Mary King's Close, including objects moving on their own and mysterious noises.",
                LocalDate.of(1700, 11, 11),
                "Beware the unseen sprit of the close!"
        , false, "Mary King's Close is a historic close located under the Edinburgh City Chambers building on the Royal Mile, in the historic Old Town area of Edinburgh, Scotland. It took its name from one Mary King, a merchant burgess who resided on the Close in the 17th century.The close was partially demolished and buried due to the building of the Royal Exchange in the 18th century, and later closed to the public for many years. The area became shrouded in myths and urban legends; tales of hauntings and murders abounded.");
        Ghost ghost9 = new Ghost( "Wee Annie",
                "weeAnnie.jpg","The ghost of a baby girl, found on George Street",
                "The cries of a baby named Wee Annie are heard near a building on George Street.",
                LocalDate.of(11, 11, 11),
                "Can anyone hear me?", false, "The sad tale of this child dates back to the 1600s, when a husband and wife were arguing in their townhouse on George street. The couple had recently birthed a baby girl, named Annie, into the world and amidst their arguing the screams of little Annie could be head all through the house, until she fell silent. The couple moments later noticed the absence of their daughter’s screams and went to check on her. \n" +
                "\n" +
                "However, Wee Annie was nowhere to be found… No one could explain what happened to little Annie but strange activity had been reported by residents of the area years later. Such as the sightings of a mysterious ghostly infant crawling in the corner of their rooms in their house, or hearing faint screams through the walls of the house. ");
        Ghost ghost10 = new Ghost(
                "The Phantom Harpist",
                "phantomHarpist.jpg","A harpist, trapped eternally within George Heriot's School",
                "A young harpist whose music is heard in George Heriot's School.",
                LocalDate.of(11, 11, 11),
                "Please... stay... listen to my music", false, "Through careful diplomacy over the centuries, the Chief of the Campbells had risen through the ranks to become the Earl, Marquess and finally Duke of Argyll. The clan were regularly involved in Scottish political disputes, usually coming out on top and benefitting greatly from it. That was until the mid-17th century, when the Marquess of Argyll found himself up against the Marquess of Montrose during a Scottish civil war.\n" +
                "The conflict turned personal in 1644 when Montrose and his army marched deep into Campbell territory and headed straight for Inveraray. Argyll found himself on the backfoot, forced to flee his home with his faithful servant, a young Irish harp boy.\n" +
                "Montrose’s men eventually found Argyll and brutally murdered him. When they discovered the harpist, the army’s large Irish contingent were furious that one of their own would ever work for a Campbell. Their blood was up, and they took out their rage on that innocent boy.\n" +
                "They didn’t just kill him; they dismembered his body and left it lying out on Argyll’s bed. Beautiful harp melodies could occasionally still be heard coming from the room that the boy was murdered in."
        );

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


