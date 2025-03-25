var ITEMS_GSC = [
    'Berry',
    'Berry Juice',
    'Black Belt',
    'Black Glasses',
    'Charcoal',
    'Dragon Fang',
    'Gold Berry',
    'Hard Stone',
    'King\'s Rock',
    'Leftovers',
    'Light Ball',
    'Magnet',
    'Metal Coat',
    'Metal Powder',
    'Miracle Seed',
    'Mystic Water',
    'Never-Melt Ice',
    'Pink Bow',
    'Poison Barb',
    'Polkadot Bow',
    'Sharp Beak',
    'Silver Powder',
    'Soft Sand',
    'Spell Tag',
    'Stick',
    'Thick Club',
    'Twisted Spoon',
    //NO FUNCT
    'Bright Powder',
    'Lucky Punch',
    'Quick Claw',
];

var ITEMS_ADV = ITEMS_GSC.concat([
    'Choice Band',
    'Deep Sea Scale',
    'Deep Sea Tooth',
    'Oran Berry',
    'Silk Scarf',
    'Sitrus Berry',
    'Soul Dew',
    'Aguav Berry',
    'Iapapa Berry',
    'Mago Berry',
    'Wiki Berry',
    'Figy Berry',
    'Sea Incense',
    //NO FUNCT
    'Focus Band',
    'Shell Bell',
    'White Herb'
]);

ITEMS_ADV.splice(ITEMS_ADV.indexOf('Berry'), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf('Gold Berry'), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf('Pink Bow'), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf('Polkadot Bow'), 1);

var ITEMS_DPP = ITEMS_ADV.concat([
    'Adamant Orb',
    'Apicot Berry',
    'Babiri Berry',
    'Belue Berry',
    'Black Sludge',
    'Charti Berry',
    'Chesto Berry',
    'Chilan Berry',
    'Choice Scarf',
    'Choice Specs',
    'Chople Berry',
    'Coba Berry',
    'Colbur Berry',
    'Custap Berry',
    'Draco Plate',
    'Dread Plate',
    'Durin Berry',
    'Earth Plate',
    'Enigma Berry',
    'Expert Belt',
    'Fist Plate',
    'Flame Orb',
    'Flame Plate',
    'Ganlon Berry',
    'Griseous Orb',
    'Haban Berry',
    'Icicle Plate',
    'Insect Plate',
    'Iron Ball',
    'Iron Plate',
    'Jaboca Berry',
    'Kasib Berry',
    'Kebia Berry',
    'Lagging Tail',
    'Lansat Berry',
    'Leppa Berry',
    'Liechi Berry',
    'Life Orb',
    'Lum Berry',
    'Lustrous Orb',
    'Macho Brace',
    'Meadow Plate',
    'Micle Berry',
    'Mind Plate',
    'Muscle Band',
    'Occa Berry',
    'Odd Incense',
    'Passho Berry',
    'Payapa Berry',
    'Petaya Berry',
    'Rawst Berry',
    'Razor Fang',
    'Rindo Berry',
    'Rock Incense',
    'Rose Incense',
    'Rowap Berry',
    'Salac Berry',
    'Shuca Berry',
    'Sky Plate',
    'Splash Plate',
    'Spooky Plate',
    'Starf Berry',
    'Stone Plate',
    'Tanga Berry',
    'Toxic Orb',
    'Toxic Plate',
    'Wacan Berry',
    'Watmel Berry',
    'Wave Incense',
    'Wise Glasses',
    'Yache Berry',
    'Zap Plate',
    //NO FUNCT
    'Damp Rock',
    'Heat Rock',
    'Icy Rock',
    'Smooth Rock',
    'Power Anklet',
    'Power Band',
    'Power Belt',
    'Power Bracer',
    'Power Lens',
    'Power Weight',
    'Big Root',
    'Focus Sash',
    'Full Incense',
    'Grip Claw',
    'Lax Incense',
    'Light Clay',
    'Mental Herb',
    'Metronome',
    'Power Herb',
    'Quick Powder',
    'Razor Claw',
    'Scope Lens',
    'Shed Shell',
    'Wide Lens',
    'Zoom Lens',
]);

var ITEMS_GEMS = [
    'Bug Gem',
    'Dark Gem',
    'Dragon Gem',
    'Electric Gem',
    'Fighting Gem',
    'Fire Gem',
    'Flying Gem',
    'Ghost Gem',
    'Grass Gem',
    'Ground Gem',
    'Ice Gem',
    'Poison Gem',
    'Psychic Gem',
    'Rock Gem',
    'Steel Gem',
    'Water Gem',
];

var ITEMS_BW_NO_GEMS = ITEMS_DPP.concat([
    'Air Balloon',
    'Eviolite',
    //GENESECT DRIVES
    'Burn Drive',
    'Chill Drive',
    'Douse Drive',
    'Shock Drive',
    //NO FUNCT
    'Absorb Bulb',
    'Binding Band',
    'Eject Button',
    'Float Stone',  //is actually implemented
    'Red Card',
    'Ring Target',  //is actually implemented
    'Rocky Helmet',
    'Normal Gem',
    'Big Nugget', //pretty much only here because of Fling 130 BP Gen 8+
]);

var ITEMS_BW = ITEMS_BW_NO_GEMS.concat(ITEMS_GEMS);

var ITEMS_MEGA_STONES = [
    //MEGA STONES
    'Abomasite',
    'Absolite',
    'Aerodactylite',
    'Aggronite',
    'Alakazite',
    'Ampharosite',
    'Banettite',
    'Blastoisinite',
    'Blazikenite',
    'Charizardite X',
    'Charizardite Y',
    'Garchompite',
    'Gardevoirite',
    'Gengarite',
    'Gyaradosite',
    'Heracronite',
    'Houndoominite',
    'Kangaskhanite',
    'Latiasite',
    'Latiosite',
    'Lucarionite',
    'Manectite',
    'Mawilite',
    'Medichamite',
    'Mewtwonite X',
    'Mewtwonite Y',
    'Pinsirite',
    'Scizorite',
    'Tyranitarite',
    'Venusaurite',
    'Altarianite',
    'Audinite',
    'Beedrillite',
    'Cameruptite',
    'Diancite',
    'Galladite',
    'Glalitite',
    'Lopunnite',
    'Metagrossite',
    'Pidgeotite',
    'Sablenite',
    'Salamencite',
    'Sceptilite',
    'Sharpedonite',
    'Slowbronite',
    'Steelixite',
    'Swampertite',
    'Red Orb',
    'Blue Orb',
];

var ITEMS_XY_NO_MEGA = ITEMS_BW_NO_GEMS.concat([
    'Assault Vest',
    'Kee Berry',
    'Maranga Berry',
    'Pixie Plate',
    'Roseli Berry',
    'Safety Goggles',
    //NO FUNCT
    'Luminous Moss',
    'Snowball',
    'Weakness Policy',
]);

var ITEMS_XY = ITEMS_XY_NO_MEGA.concat(ITEMS_MEGA_STONES);

var ITEMS_Z_AND_MEGA = ITEMS_MEGA_STONES.concat([
    //Z-CRYSTALS
    'Buginium Z',
    'Darkinium Z',
    'Dragonium Z',
    'Electrium Z',
    'Fairium Z',
    'Fightinium Z',
    'Firium Z',
    'Flyinium Z',
    'Ghostium Z',
    'Grassium Z',
    'Groundium Z',
    'Icium Z',
    'Normalium Z',
    'Poisonium Z',
    'Psychium Z',
    'Rockium Z',
    'Steelium Z',
    'Waterium Z',
    'Aloraichium Z',
    'Decidium Z',
    'Eevium Z',
    'Incinium Z',
    'Marshadium Z',
    'Mewnium Z',
    'Pikanium Z',
    'Pikashunium Z',
    'Primarium Z',
    'Snorlium Z',
    'Tapunium Z',
    'Kommonium Z',
    'Lunalium Z',
    'Lycanium Z',
    'Mimikium Z',
    'Solganium Z',
    'Ultranecrozium Z',
]);

var ITEMS_SM_NO_Z_MEGA = ITEMS_XY_NO_MEGA.concat([
    'Psychic Seed',
    'Misty Seed',
    'Electric Seed',
    'Grassy Seed',
    //SILVALLY MEMORIES
    'Bug Memory',
    'Dark Memory',
    'Dragon Memory',
    'Electric Memory',
    'Fairy Memory',
    'Fighting Memory',
    'Fire Memory',
    'Flying Memory',
    'Ghost Memory',
    'Grass Memory',
    'Ground Memory',
    'Ice Memory',
    'Poison Memory',
    'Psychic Memory',
    'Rock Memory',
    'Steel Memory',
    'Water Memory',
    //NO FUNCT
    'Adrenaline Orb',   //sike it's implemented
    'Protective Pads',  //this too
    'Terrain Extender',
]);

var ITEMS_SM = ITEMS_SM_NO_Z_MEGA.concat(ITEMS_Z_AND_MEGA);

var NEW_ITEMS_SS = [
    'Utility Umbrella',
    //NO FUNCT
    'Blunder Policy',
    'Eject Pack',
    'Heavy-Duty Boots',
    'Room Service',
    'Throat Spray',
    'Rusted Sword',
    'Rusted Shield',
    'Leek',
];

var ITEMS_SS = ITEMS_SM_NO_Z_MEGA.concat(NEW_ITEMS_SS);
ITEMS_SS.splice(ITEMS_SS.indexOf('Stick'), 1);

var NEW_ITEMS_SV = [
    'Mirror Herb',  //copies stat boosts from last stat boosting move from opponent, no calc functionality
    'Covert Cloak', //item Shield Dust, no calc functionality
    'Loaded Dice',  //increases chances of hitting more times with multi hit moves
    'Ability Shield',   //prevents other mons from changing ability
    'Booster Energy',   //activates paradox mon abilities without sun/electric terrain
    'Clear Amulet', //item Clear Body
    'Punching Glove',   //item Iron Fist, no contact, probably stacks with Iron Fist
    'Adamant Crystal',  //Origin Dialga item, also acts like Adamant Orb
    'Lustrous Globe',   //Origin Palkia item, also acts like Lustrous Orb
    'Griseous Core',    //Origin Giratina item, also acts like Griseous Orb
    'Fairy Feather',    //Non-Plate equivalent of Pixie Plate
    'Hearthflame Mask',     //Fire Ogerpon, Atk Embody Aspect
    'Wellspring Mask',      //Water Ogerpon, SpD Embody Aspect
    'Cornerstone Mask',     //Rock Ogerpon, Def Embody Aspect
];

var ITEMS_SV = ITEMS_SS.concat(NEW_ITEMS_SV);

var ITEMS_SS_NATDEX = ITEMS_SM.concat(NEW_ITEMS_SS);
var ITEMS_SV_NATDEX = ITEMS_SS_NATDEX.concat(NEW_ITEMS_SV);

function getItemBoostType(item) {
    switch (item) {
        case 'Draco Plate':
        case 'Dragon Fang':
            return 'Dragon';
        case 'Dread Plate':
        case 'BlackGlasses':
        case 'Black Glasses':
            return 'Dark';
        case 'Earth Plate':
        case 'Soft Sand':
            return 'Ground';
        case 'Fist Plate':
        case 'Black Belt':
            return 'Fighting';
        case 'Flame Plate':
        case 'Charcoal':
            return 'Fire';
        case 'Icicle Plate':
        case 'NeverMeltIce':
        case 'Never-Melt Ice':
            return 'Ice';
        case 'Insect Plate':
        case 'SilverPowder':
        case 'Silver Powder':
            return 'Bug';
        case 'Iron Plate':
        case 'Metal Coat':
            return 'Steel';
        case 'Meadow Plate':
        case 'Rose Incense':
        case 'Miracle Seed':
            return 'Grass';
        case 'Mind Plate':
        case 'Odd Incense':
        case 'TwistedSpoon':
        case 'Twisted Spoon':
            return 'Psychic';
        case 'Pixie Plate':
        case 'Fairy Feather':
            return 'Fairy';
        case 'Sky Plate':
        case 'Sharp Beak':
            return 'Flying';
        case 'Splash Plate':
        case 'Sea Incense':
        case 'Wave Incense':
        case 'Mystic Water':
            return 'Water';
        case 'Spooky Plate':
        case 'Spell Tag':
            return 'Ghost';
        case 'Stone Plate':
        case 'Rock Incense':
        case 'Hard Stone':
            return 'Rock';
        case 'Toxic Plate':
        case 'Poison Barb':
            return 'Poison';
        case 'Zap Plate':
        case 'Magnet':
            return 'Electric';
        case 'Silk Scarf':
        case 'Pink Bow':
        case 'Polkadot Bow':
            return 'Normal';
        default:
            return '';
    }
}

function getItemDualTypeBoost(item, species) {
    switch (item) {
        case 'Adamant Orb':
            if (species === 'Dialga') return 'Steel Dragon';
        case 'Lustrous Orb':
            if (species === 'Palkia') return 'Water Dragon';
        case 'Griseous Orb':
            if ((species === 'Giratina-Origin' && gen <= 8) || (species === 'Giratina' && gen >= 9)) return 'Ghost Dragon';
        case 'Soul Dew':
            if ((species === 'Latias' || species === 'Latios') && gen >= 7) return 'Dragon Psychic';
        case 'Adamant Crystal':
            if (species === 'Dialga-Origin') return 'Steel Dragon';
        case 'Lustrous Globe':
            if (species === 'Palkia-Origin') return 'Water Dragon';
        case 'Griseous Core':
            if (species === 'Giratina-Origin') return 'Ghost Dragon';
        default:
            return '';
    }
}

function getBerryResistType(berry) {
    switch (berry) {
        case 'Chilan Berry':
            return 'Normal';
        case 'Occa Berry':
            return 'Fire';
        case 'Passho Berry':
            return 'Water';
        case 'Wacan Berry':
            return 'Electric';
        case 'Rindo Berry':
            return 'Grass';
        case 'Yache Berry':
            return 'Ice';
        case 'Chople Berry':
            return 'Fighting';
        case 'Kebia Berry':
            return 'Poison';
        case 'Shuca Berry':
            return 'Ground';
        case 'Coba Berry':
            return 'Flying';
        case 'Payapa Berry':
            return 'Psychic';
        case 'Tanga Berry':
            return 'Bug';
        case 'Charti Berry':
            return 'Rock';
        case 'Kasib Berry':
            return 'Ghost';
        case 'Haban Berry':
            return 'Dragon';
        case 'Colbur Berry':
            return 'Dark';
        case 'Babiri Berry':
            return 'Steel';
        case 'Roseli Berry':
            return 'Fairy';
        default:
            return '';
    }
}

function getFlingPower(item) {
    isInt = parseInt(item);
    return isNaN(isInt) ?
        (item === 'Iron Ball' || (item === 'Big Nugget' && gen >= 8) || (gen == 4 && item === 'Klutz Iron Ball') ? 130
            : ['Hard Stone', 'Room Service'].indexOf(item) !== -1 ? 100
                : item.indexOf('Plate') !== -1 || ['Deep Sea Tooth', 'Thick Club', 'Grip Claw'].indexOf(item) !== -1 ? 90
                    : (item.indexOf('ite') !== -1 && item == 'Eviolite') || ['Assault Vest', 'Weakness Policy', 'Blunder Policy',
                        'Heavy-Duty Boots', 'Quick Claw', 'Razor Claw', 'Safety Goggles'].indexOf(item) !== -1 ? 80
                        : ['Poison Barb', 'Dragon Fang', 'Power Anklet', 'Power Band', 'Power Belt', 'Power Bracer', 'Power Lens',
                            'Power Weight', 'Burn Drive', 'Chill Drive', 'Douse Drive', 'Shock Drive'].indexOf(item) !== -1 ? 70
                            : ['Adamant Orb', 'Lustrous Orb', 'Macho Brace', 'Leek', 'Rocky Helmet', 'Utility Umbrella', 'Terrain Extender',
                                'Damp Rock', 'Heat Rock'].indexOf(item) !== -1 ? 60
                                : item.indexOf('Memory') !== -1 || ['Sharp Beak', 'Eject Pack'].indexOf(item) !== -1 ? 50
                                    : ['Eviolite', 'Icy Rock', 'Lucky Punch'].indexOf(item) !== -1 ? 40
                                        : ['Black Belt', 'Black Sludge', 'Black Glasses', 'Charcoal', 'Deep Sea Scale', 'Flame Orb', "King's Rock",
                                            'Life Orb', 'Light Ball', 'Magnet', 'Metal Coat', 'Miracle Seed', 'Mystic Water', 'Never-Melt Ice',
                                            'Razor Fang', 'Soul Dew', 'Spell Tag', 'Toxic Orb', 'Twisted Spoon', 'Absorb Bulb', 'Adrenaline Orb',
                                            'Berry Juice', 'Binding Band', 'Eject Button', 'Float Stone', 'Light Clay', 'Luminous Moss',
                                            'Metronome', 'Protective Pads', 'Shell Bell', 'Throat Spray', 'Covert Cloak', 'Loaded Dice',
                                            'Ability Shield', 'Booster Energy', 'Clear Amulet', 'Punching Glove', 'Big Nugget'].indexOf(item) !== -1 ? 30
                                            : 10)
        : isInt;
}

function getNaturalGift(item) {
    var gift = {
        'Aguav Berry': { 't': 'Dragon', 'p': 80 },
        'Apicot Berry': { 't': 'Ground', 'p': 100 },
        'Aspear Berry': { 't': 'Ice', 'p': 80 },
        'Babiri Berry' : {'t':'Steel','p':80},
        'Belue Berry': { 't': 'Electric', 'p': 100 },
        'Bluk Berry': { 't': 'Fire', 'p': 90 },
        'Charti Berry': { 't': 'Rock', 'p': 80 },
        'Cheri Berry': { 't': 'Fire', 'p': 80 },
        'Chesto Berry' : {'t':'Water','p':80},
        'Chilan Berry' : {'t':'Normal','p':80},
        'Chople Berry' : {'t':'Fighting','p':80},
        'Coba Berry' : {'t':'Flying','p':80},
        'Colbur Berry': { 't': 'Dark', 'p': 80 },
        'Cornn Berry': { 't': 'Bug', 'p': 90 },
        'Custap Berry' : {'t':'Ghost','p':100},
        'Durin Berry' : {'t':'Water','p':100},
        'Enigma Berry': { 't': 'Bug', 'p': 100 },
        'Figy Berry': { 't': 'Bug', 'p': 80 },
        'Ganlon Berry': { 't': 'Ice', 'p': 100 },
        'Grepa Berry': { 't': 'Flying', 'p': 90 },
        'Haban Berry': { 't': 'Dragon', 'p': 80 },
        'Hondew Berry': { 't': 'Ground', 'p': 90 },
        'Iapapa Berry': { 't': 'Dark', 'p': 80 },
        'Jaboca Berry' : {'t':'Dragon','p':100},
        'Kasib Berry' : {'t':'Ghost','p':80},
        'Kebia Berry' : {'t':'Poison','p':80},
        'Kee Berry' : {'t':'Fairy','p':100},
        'Lansat Berry' : {'t':'Flying','p':100},
        'Leppa Berry' : {'t':'Fighting','p':80},
        'Liechi Berry' : {'t':'Grass','p':100},
        'Lum Berry': { 't': 'Flying', 'p': 80 },
        'Mago Berry': { 't': 'Ghost', 'p': 80 },
        'Magost Berry': { 't': 'Rock', 'p': 90 },
        'Maranga Berry' : {'t':'Dark','p':100},
        'Micle Berry': { 't': 'Rock', 'p': 100 },
        'Nanab Berry': { 't': 'Water', 'p': 90 },
        'Nomel Berry': { 't': 'Dragon', 'p': 90 },
        'Occa Berry' : {'t':'Fire','p':80},
        'Oran Berry': { 't': 'Poison', 'p': 80 },
        'Pamtre Berry': { 't': 'Steel', 'p': 90 },
        'Passho Berry' : {'t':'Water','p':80},
        'Payapa Berry': { 't': 'Psychic', 'p': 80 },
        'Pecha Berry': { 't': 'Electric', 'p': 80 },
        'Persim Berry': { 't': 'Ground', 'p': 80 },
        'Petaya Berry': { 't': 'Poison', 'p': 100 },
        'Pinap Berry': { 't': 'Grass', 'p': 90 },
        'Pomeg Berry': { 't': 'Ice', 'p': 90 },
        'Qualot Berry': { 't': 'Poison', 'p': 90 },
        'Rabuta Berry': { 't': 'Ghost', 'p': 90 },
        'Rawst Berry': { 't': 'Grass', 'p': 80 },
        'Razz Berry': { 't': 'Steel', 'p': 80 },
        'Rindo Berry' : {'t':'Grass','p':80},
        'Roseli Berry' : {'t':'Fairy','p':80},
        'Rowap Berry' : {'t':'Dark','p':100},
        'Salac Berry' : {'t':'Fighting','p':100},
        'Shuca Berry' : {'t':'Ground','p':80},
        'Sitrus Berry': { 't': 'Psychic', 'p': 80 },
        'Spelon Berry': { 't': 'Dark', 'p': 90 },
        'Starf Berry': { 't': 'Psychic', 'p': 100 },
        'Tamato Berry': { 't': 'Psychic', 'p': 90 },
        'Tanga Berry' : {'t':'Bug','p':80},
        'Wacan Berry' : {'t':'Electric','p':80},
        'Watmel Berry': { 't': 'Fire', 'p': 100 },
        'Wepear Berry': { 't': 'Electric', 'p': 90 },
        'Wiki Berry': { 't': 'Rock', 'p': 80 },
        'Yache Berry' : {'t':'Ice','p':80}
    }[item];
    if (gift) {
        if (gen < 6) {
            gift.p -= 20;
        }
        return gift;
    }
    return {'t':'Normal','p':1};


}

function getMemoryType(item) {
    switch (item) {
        case 'Bug Memory': return 'Bug';
        case 'Dark Memory': return 'Dark';
        case 'Dragon Memory': return 'Dragon';
        case 'Electric Memory': return 'Electric';
        case 'Fairy Memory': return 'Fairy';
        case 'Fighting Memory': return 'Fighting';
        case 'Fire Memory': return 'Fire';
        case 'Flying Memory': return 'Flying';
        case 'Ghost Memory': return 'Ghost';
        case 'Grass Memory': return 'Grass';
        case 'Ground Memory': return 'Ground';
        case 'Ice Memory': return 'Ice';
        case 'Poison Memory': return 'Poison';
        case 'Psychic Memory': return 'Psychic';
        case 'Rock Memory': return 'Rock';
        case 'Steel Memory': return 'Steel';
        case 'Water Memory': return 'Water';
    }
}

function getZType(item) {
    switch (item) {
        case 'Buginium Z': return 'Bug';
        case 'Darkinium Z': return 'Dark';
        case 'Dragonium Z': return 'Dragon';
        case 'Electrium Z': return 'Electric';
        case 'Fairium Z': return 'Fairy';
        case 'Fightinium Z': return 'Fighting';
        case 'Firium Z': return 'Fire';
        case 'Flyinium Z': return 'Flying';
        case 'Ghostium Z': return 'Ghost';
        case 'Grassium Z': return 'Grass';
        case 'Groundium Z': return 'Ground';
        case 'Icium Z': return 'Ice';
        case 'Poisonium Z': return 'Poison';
        case 'Psychium Z': return 'Psychic';
        case 'Rockium Z': return 'Rock';
        case 'Steelium Z': return 'Steel';
        case 'Waterium Z': return 'Water';
        default: return '';
    }
}

var MEGA_STONE_USER_LOOKUP = {
    'Abomasite': 'Abomasnow',
    'Absolite': 'Absol',
    'Aerodactylite': 'Aerodactyl',
    'Aggronite': 'Aggron',
    'Alakazite': 'Alakazam',
    'Ampharosite': 'Ampharos',
    'Banettite': 'Banette',
    'Blastoisinite': 'Blastoise',
    'Blazikenite': 'Blaziken',
    'Charizardite X': 'Charizard',
    'Charizardite Y': 'Charizard',
    'Garchompite': 'Garchomp',
    'Gardevoirite': 'Gardevoir',
    'Gengarite': 'Gengar',
    'Gyaradosite': 'Gyarados',
    'Heracronite': 'Heracross',
    'Houndoominite': 'Houndoom',
    'Kangaskhanite': 'Kangaskhan',
    'Latiasite': 'Latias',
    'Latiosite': 'Latios',
    'Lucarionite': 'Lucario',
    'Manectite': 'Manectric',
    'Mawilite': 'Mawile',
    'Medichamite': 'Medicham',
    'Mewtwonite X': 'Mewtwo',
    'Mewtwonite Y': 'Mewtwo',
    'Pinsirite': 'Pinsir',
    'Scizorite': 'Scizor',
    'Tyranitarite': 'Tyranitar',
    'Venusaurite': 'Venusaur',
    'Altarianite': 'Altaria',
    'Audinite': 'Audino',
    'Beedrillite': 'Beedrill',
    'Cameruptite': 'Camerupt',
    'Diancite': 'Diancie',
    'Galladite': 'Gallade',
    'Glalitite': 'Glalie',
    'Lopunnite': 'Lopunny',
    'Metagrossite': 'Metagross',
    'Pidgeotite': 'Pidgeot',
    'Sablenite': 'Sableye',
    'Salamencite': 'Salamence',
    'Sceptilite': 'Sceptile',
    'Sharpedonite': 'Sharpedo',
    'Slowbronite': 'Slowbro',
    'Steelixite': 'Steelix',
    'Swampertite': 'Swampert',
    'Red Orb': 'Groudon',
    'Blue Orb': 'Kyogre',
};

function canMega(item, species) {
    return MEGA_STONE_USER_LOOKUP[item] === species;
}

var SIGNATURE_Z_MOVE_LOOKUP = {
    'Raichu-Alola': { 'Aloraichium Z': { 'Thunderbolt': 'Stoked Sparksurfer' } },
    'Decidueye': { 'Decidium Z': { 'Spirit Shackle': 'Sinister Arrow Raid' } },
    'Eevee': { 'Eevium Z': { 'Last Resort': 'Extreme Evoboost' } },
    'Incineroar': { 'Incinium Z': { 'Darkest Lariat': 'Malicious Moonsault' } },
    'Marshadow': { 'Marshadium Z': { 'Spectral Thief': 'Soul-Stealing 7-Star Strike' } },
    'Mew': { 'Mewnium Z': { 'Psychic': 'Genesis Supernova' } },
    'Pikachu': {
        'Pikanium Z': { 'Volt Tackle': 'Catastropika' },
        'Pikashunium Z': { 'Thunderbolt': '10,000,000 Volt Thunderbolt' }
    },
    'Primarina': { 'Primarium Z': { 'Sparkling Aria': 'Oceanic Operetta' } },
    'Snorlax': { 'Snorlium Z': { 'Giga Impact': 'Pulverizing Pancake' } },
    'Tapu Koko': { 'Tapunium Z': { 'Nature\'s Madness': 'Guardian of Alola' } },
    'Tapu Lele': { 'Tapunium Z': { 'Nature\'s Madness': 'Guardian of Alola' } },
    'Tapu Bulu': { 'Tapunium Z': { 'Nature\'s Madness': 'Guardian of Alola' } },
    'Tapu Fini': { 'Tapunium Z': { 'Nature\'s Madness': 'Guardian of Alola' } },
    'Kommo-o': { 'Kommonium Z': { 'Clanging Scales': 'Clangorous Soulblaze' } },
    'Lunala': { 'Lunalium Z': { 'Moongeist Beam': 'Menacing Moonraze Maelstrom' } },
    'Necrozma-Dawn-Wings': { 'Lunalium Z': { 'Moongeist Beam': 'Menacing Moonraze Maelstrom' } },
    'Lycanroc-Midday': { 'Lycanium Z': { 'Stone Edge': 'Splintered Stormshards' } },
    'Lycanroc-Midnight': { 'Lycanium Z': { 'Stone Edge': 'Splintered Stormshards' } },
    'Lycanroc-Dusk': { 'Lycanium Z': { 'Stone Edge': 'Splintered Stormshards' } },
    'Mimikyu': { 'Mimikium Z': { 'Play Rough': 'Let\'s Snuggle Forever' } },
    'Solgaleo': { 'Solganium Z': { 'Sunsteel Strike': 'Searing Sunraze Smash' } },
    'Necrozma-Dusk-Mane': { 'Solganium Z': { 'Sunsteel Strike': 'Searing Sunraze Smash' } },
    'Ultra Necrozma': { 'Ultranecrozium Z': { 'Photon Geyser': 'Light That Burns the Sky' } }
};

function getSignatureZMove(item, species, move) {
    var isSigZ = SIGNATURE_Z_MOVE_LOOKUP[species] && SIGNATURE_Z_MOVE_LOOKUP[species][item] && SIGNATURE_Z_MOVE_LOOKUP[species][item][move]
        ? SIGNATURE_Z_MOVE_LOOKUP[species][item][move] : -1;
    return isSigZ;
}

var LOCK_ITEM_LOOKUP = {
    'Giratina-Origin': 'Griseous Orb',
    'Mega Abomasnow': 'Abomasite',
    'Mega Absol': 'Absolite',
    'Mega Aerodactyl': 'Aerodactylite',
    'Mega Aggron': 'Aggronite',
    'Mega Alakazam': 'Alakazite',
    'Mega Ampharos': 'Ampharosite',
    'Mega Banette': 'Banettite',
    'Mega Blastoise': 'Blastoisinite',
    'Mega Blaziken': 'Blazikenite',
    'Mega Charizard X': 'Charizardite X',
    'Mega Charizard Y': 'Charizardite Y',
    'Mega Garchomp': 'Garchompite',
    'Mega Gardevoir': 'Gardevoirite',
    'Mega Gengar': 'Gengarite',
    'Mega Gyarados': 'Gyaradosite',
    'Mega Heracross': 'Heracroite',
    'Mega Houndoom': 'Houndoominite',
    'Mega Kangaskhan': 'Kangaskhanite',
    'Mega Latias': 'Latiasite',
    'Mega Latios': 'Latiosite',
    'Mega Lucario': 'Lucarionite',
    'Mega Manectric': 'Manectite',
    'Mega Mawile': 'Mawilite',
    'Mega Medicham': 'Medichamite',
    'Mega Mewtwo X': 'Mewtwonite X',
    'Mega Mewtwo Y': 'Mewtwonite Y',
    'Mega Pinsir': 'Pinsirite',
    'Mega Scizor': 'Scizorite',
    'Mega Tyranitar': 'Tyranitarite',
    'Mega Venusaur': 'Venusaurite',
    'Mega Altaria': 'Altarianite',
    'Mega Audino': 'Audinite',
    'Mega Beedrill': 'Beedrillite',
    'Mega Camerupt': 'Cameruptite',
    'Mega Diancie': 'Diancite',
    'Mega Gallade': 'Galladite',
    'Mega Glalie': 'Glalitite',
    'Mega Lopunny': 'Lopunnite',
    'Mega Metagross': 'Metagrossite',
    'Mega Pidgeot': 'Pidgeotite',
    'Mega Sableye': 'Sablenite',
    'Mega Salamence': 'Salamencite',
    'Mega Sceptile': 'Sceptilite',
    'Mega Sharpedo': 'Sharpedonite',
    'Mega Slowbro': 'Slowbronite',
    'Mega Steelix': 'Steelixite',
    'Mega Swampert': 'Swampertite',
    'Primal Groudon': 'Red Orb',
    'Primal Kyogre': 'Blue Orb',
    'Ultra Necrozma': 'Ultranecrozium Z',
    'Zacian-Crowned': 'Rusted Sword',
    'Zamazenta-Crowned': 'Rusted Shield',
    'Dialga-Origin': 'Adamant Crystal', 
    'Palkia-Origin': 'Lustrous Globe',
    'Ogerpon-Wellspring': 'Wellspring Mask',
    'Ogerpon-Hearthflame': 'Hearthflame Mask',
    'Ogerpon-Cornerstone': 'Cornerstone Mask',
};

function cantRemoveItem(defItem, defSpecies, terrain) {
    return defItem === null || defItem === "" || defItem.indexOf("ium Z") !== -1
        || LOCK_ITEM_LOOKUP[defSpecies] === defItem
        || (defSpecies === "Arceus" && defItem.indexOf(" Plate") !== -1)
        || (defSpecies === "Genesect" && defItem.indexOf(" Drive") !== -1)
        || (defSpecies === "Silvally" && defItem.indexOf(" Memory") !== -1);
}

function cantFlingItem(atItem, atSpecies, defAbility) {
    return atItem === "" || atItem === 'Klutz' || atItem.indexOf(" Gem") !== -1 || atItem.indexOf(" ium Z") !== -1 || ["Red Orb", "Blue Orb", "Rusted Sword", "Rusted Shield"].indexOf(atItem) !== -1
        || (atSpecies === 'Giratina-Origin' && atItem === "Griseous Orb")
        || (atSpecies === 'Arceus' && atItem.indexOf(" Plate") !== -1)
        || (atSpecies === 'Genesect' && atItem.indexOf(" Drive") !== -1)
        || (atSpecies === 'Silvally' && atItem.indexOf(" Memory") !== -1)
        || canMega(atItem, atSpecies)
        || (["As One", "Unnerve"].indexOf(defAbility) !== -1 && atItem.indexOf(" Berry") !== -1);
}