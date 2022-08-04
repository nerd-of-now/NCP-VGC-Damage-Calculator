var ITEMS_GSC = [
    'Berry',
    'Berry Juice',
    'Black Belt',
    'BlackGlasses',
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
    'NeverMeltIce',
    'Pink Bow',
    'Poison Barb',
    'Polkadot Bow',
    'Sharp Beak',
    'SilverPowder',
    'Soft Sand',
    'Spell Tag',
    'Stick',
    'Thick Club',
    'TwistedSpoon',
    //NO FUNCT
    'Bright Powder',
    'Leek',
    'Lucky Punch',
    'Quick Claw',
];

var ITEMS_ADV = ITEMS_GSC.concat([
    'Choice Band',
    'DeepSeaScale',
    'DeepSeaTooth',
    'Oran Berry',
    'Silk Scarf',
    'Sitrus Berry',
    'Soul Dew',
    'Aguav Berry',
    'Iapapa Berry',
    'Mago Berry',
    'Wiki Berry',
    'Figy Berry',
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
    'Sea Incense',
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
    'Lagging Tail',
    'Lax Incense',
    'Light Clay',
    'Metronome',
    'Power Herb',
    'Quick Powder',
    'Razor Claw',
    'Razor Fang',
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
    'Normal Gem',
    'Poison Gem',
    'Psychic Gem',
    'Rock Gem',
    'Steel Gem',
    'Water Gem',
];

var ITEMS_BW_NO_GEMS = ITEMS_DPP.concat([
    'Air Balloon',
    'Eviolite',
    //GENESECT DRIVES (maybe implement)
    'Burn Drive',
    'Chill Drive',
    'Douse Drive',
    'Shock Drive',
    //NO FUNCT
    'Absorb Bulb',
    'Binding Band', //Might implement
    'Eject Button',
    'Float Stone',  //Might implement
    'Red Card',
    'Ring Target',  //Might implement
    'Rocky Helmet',
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

ITEMS_XY_NO_MEGA.splice(ITEMS_XY_NO_MEGA.indexOf('BlackGlasses'), 1, 'Black Glasses');
ITEMS_XY_NO_MEGA.splice(ITEMS_XY_NO_MEGA.indexOf('DeepSeaScale'), 1, 'Deep Sea Scale');
ITEMS_XY_NO_MEGA.splice(ITEMS_XY_NO_MEGA.indexOf('DeepSeaTooth'), 1, 'Deep Sea Tooth');
ITEMS_XY_NO_MEGA.splice(ITEMS_XY_NO_MEGA.indexOf('NeverMeltIce'), 1, 'Never-Melt Ice');
ITEMS_XY_NO_MEGA.splice(ITEMS_XY_NO_MEGA.indexOf('SilverPowder'), 1, 'Silver Powder');
ITEMS_XY_NO_MEGA.splice(ITEMS_XY_NO_MEGA.indexOf('TwistedSpoon'), 1, 'Twisted Spoon');

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
    'Adrenaline Orb',   //might implement
    'Protective Pads',
    'Terrain Extender',
]);

var ITEMS_SM = ITEMS_SM_NO_Z_MEGA.concat(ITEMS_Z_AND_MEGA);

var ITEMS_SS = ITEMS_SM_NO_Z_MEGA.concat([
    'Utility Umbrella',
    //NO FUNCT
    'Blunder Policy',
    'Eject Pack',
    'Heavy-Duty Boots',
    'Room Service',
    'Throat Spray',
    'Rusted Sword',
    'Rusted Shield',
]);

var ITEMS_BDSP = ITEMS_DPP.concat([
    'Pixie Plate',
]);

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
            if (species === 'Giratina-Origin') return 'Ghost Dragon';
        case 'Soul Dew':
            if ((species === 'Latias' || species === 'Latios') && gen >= 7) return 'Dragon Psychic';
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
    return item === 'Iron Ball' ? 130
        : ['Hard Stone','Room Service'].indexOf(item) !== -1 ? 100
        : item.indexOf('Plate') !== -1 || ['Deep Sea Tooth','Thick Club','Grip Claw'].indexOf(item) !== -1 ? 90
        : (item.indexOf('ite') !== -1 && item == 'Eviolite') || ['Assault Vest','Weakness Policy','Blunder Policy', 
            'Heavy-Duty Boots','Quick Claw','Razor Claw','Safety Goggles'].indexOf(item) !== -1 ? 80
        : ['Poison Barb','Dragon Fang','Power Anklet','Power Band','Power Belt','Power Bracer','Power Lens',
            'Power Weight','Burn Drive','Chill Drive','Douse Drive','Shock Drive'].indexOf(item) !== -1 ? 70
        : ['Adamant Orb','Lustrous Orb','Macho Brace','Leek','Rocky Helmet','Utility Umbrella','Terrain Extender',
            'Damp Rock','Heat Rock'].indexOf(item) !== -1 ? 60
        : item.indexOf('Memory') !== -1 || ['Sharp Beak','Eject Pack'].indexOf(item) !== -1 ? 50
        : ['Eviolite','Icy Rock','Lucky Punch'].indexOf(item) !== -1 ? 40
        : ['Black Belt','Black Sludge','Black Glasses','Charcoal','Deep Sea Scale','Flame Orb',"King's Rock",
            'Life Orb','Light Ball','Magnet','Metal Coat','Miracle Seed','Mystic Water','Never-Melt Ice',
            'Razor Fang','Soul Dew','Spell Tag','Toxic Orb','Twisted Spoon', 'Absorb Bulb', 'Adrenaline Orb',
            'Berry Juice','Binding Band','Eject Button','Float Stone','Light Clay', 'Luminous Moss', 
            'Metronome','Protective Pads','Shell Bell','Throat Spray'].indexOf(item) !== -1 ? 30
        : 10;
}

function getNaturalGift(item) {
    var gift = {
        'Apicot Berry' : {'t':'Ground','p':100},
        'Babiri Berry' : {'t':'Steel','p':80},
        'Belue Berry' : {'t':'Electric','p':100},
        'Charti Berry' : {'t':'Rock','p':80},
        'Chesto Berry' : {'t':'Water','p':80},
        'Chilan Berry' : {'t':'Normal','p':80},
        'Chople Berry' : {'t':'Fighting','p':80},
        'Coba Berry' : {'t':'Flying','p':80},
        'Colbur Berry' : {'t':'Dark','p':80},
        'Custap Berry' : {'t':'Ghost','p':100},
        'Durin Berry' : {'t':'Water','p':100},
        'Enigma Berry' : {'t':'Bug','p':100},
        'Ganlon Berry' : {'t':'Ice','p':100},
        'Haban Berry' : {'t':'Dragon','p':80},
        'Jaboca Berry' : {'t':'Dragon','p':100},
        'Kasib Berry' : {'t':'Ghost','p':80},
        'Kebia Berry' : {'t':'Poison','p':80},
        'Kee Berry' : {'t':'Fairy','p':100},
        'Lansat Berry' : {'t':'Flying','p':100},
        'Leppa Berry' : {'t':'Fighting','p':80},
        'Liechi Berry' : {'t':'Grass','p':100},
        'Lum Berry' : {'t':'Flying','p':80},
        'Maranga Berry' : {'t':'Dark','p':100},
        'Micle Berry' : {'t':'Rock','p':100},
        'Occa Berry' : {'t':'Fire','p':80},
        'Oran Berry' : {'t':'Poison','p':80},
        'Passho Berry' : {'t':'Water','p':80},
        'Payapa Berry' : {'t':'Psychic','p':80},
        'Petaya Berry' : {'t':'Poison','p':100},
        'Rawst Berry' : {'t':'Grass','p':80},
        'Rindo Berry' : {'t':'Grass','p':80},
        'Roseli Berry' : {'t':'Fairy','p':80},
        'Rowap Berry' : {'t':'Dark','p':100},
        'Salac Berry' : {'t':'Fighting','p':100},
        'Shuca Berry' : {'t':'Ground','p':80},
        'Sitrus Berry' : {'t':'Psychic','p':80},
        'Starf Berry' : {'t':'Psychic','p':100},
        'Tanga Berry' : {'t':'Bug','p':80},
        'Wacan Berry' : {'t':'Electric','p':80},
        'Watmel Berry' : {'t':'Fire','p':100},
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

//FIX THIS CODE TO MATCH THIS EXAMPLE: 'Abomasite': 'Abomasnow'
var MEGA_STONE_USER_LOOKUP = [
['Abomasite', 'Abomasnow'],
['Absolite', 'Absol'],
['Aerodactylite', 'Aerodactyl'],
['Aggronite', 'Aggron'],
['Alakazite', 'Alakazam'],
['Ampharosite', 'Ampharos'],
['Banettite', 'Banette'],
['Blastoisinite', 'Blastoise'],
['Blazikenite', 'Blaziken'],
['Charizardite X', 'Charizard'],
['Charizardite Y', 'Charizard'],
['Garchompite', 'Garchomp'],
['Gardevoirite', 'Gardevoir'],
['Gengarite', 'Gengar'],
['Gyaradosite', 'Gyarados'],
['Heracronite', 'Heracross'],
['Houndoominite', 'Houndoom'],
['Kangaskhanite', 'Kangaskhan'],
['Latiasite', 'Latias'],
['Latiosite', 'Latios'],
['Lucarionite', 'Lucario'],
['Manectite', 'Manectric'],
['Mawilite', 'Mawile'],
['Medichamite', 'Medicham'],
['Mewtwonite X', 'Mewtwo'],
['Mewtwonite Y', 'Mewtwo'],
['Pinsirite', 'Pinsir'],
['Scizorite', 'Scizor'],
['Tyranitarite', 'Tyranitar'],
['Venusaurite', 'Venusaur'],
['Altarianite', 'Altaria'],
['Audinite', 'Audino'],
['Beedrillite', 'Beedrill'],
['Cameruptite', 'Camerupt'],
['Diancite', 'Diancie'],
['Galladite', 'Gallade'],
['Glalitite', 'Glalie'],
['Lopunnite', 'Lopunny'],
['Metagrossite', 'Metagross'],
['Pidgeotite', 'Pidgeot'],
['Sablenite', 'Sableye'],
['Salamencite', 'Salamence'],
['Sceptilite', 'Sceptile'],
['Sharpedonite', 'Sharpedo'],
['Slowbronite', 'Slowbro'],
['Steelixite', 'Steelix'],
['Swampertite', 'Swampert'],
['Red Orb', 'Groudon'],
['Blue Orb', 'Kyogre'],
];

function canMega(item, species) {
    for (var i = 0; i < MEGA_STONE_USER_LOOKUP.length; i++) {
        var tempMega = MEGA_STONE_USER_LOOKUP[i];
        if (tempMega[0] == item && species.includes(tempMega[1]))
            return true;
    }
    return false;
}

var SIGNATURE_Z_MOVE_LOOKUP = [
    ['Aloraichium Z', 'Raichu-Alola', 'Thunderbolt', 'Stoked Sparksurfer'],
    ['Decidium Z', 'Decidueye', 'Spirit Shackle', 'Sinister Arrow Raid'],
    ['Eevium Z', 'Eevee', 'Last Resort', 'Extreme Evoboost'],
    ['Incinium Z', 'Incineroar', 'Darkest Lariat', 'Malicious Moonsault'],
    ['Marshadium Z', 'Marshadow', 'Spectral Thief', 'Soul-Stealing 7-Star Strike'],
    ['Mewnium Z', 'Mew', 'Psychic', 'Genesis Supernova'],
    ['Pikanium Z', 'Pikachu', 'Volt Tackle', 'Catastropika'],
    ['Pikashunium Z', 'Pikachu', 'Thunderbolt', '10,000,000 Volt Thunderbolt'],
    ['Primarium Z', 'Primarina', 'Sparkling Aria', 'Oceanic Operetta'],
    ['Snorlium Z', 'Snorlax', 'Giga Impact', 'Pulverizing Pancake'],
    ['Tapunium Z', 'Tapu Koko', 'Nature\'s Madness', 'Guardian of Alola'],
    ['Tapunium Z', 'Tapu Lele', 'Nature\'s Madness', 'Guardian of Alola'],
    ['Tapunium Z', 'Tapu Bulu', 'Nature\'s Madness', 'Guardian of Alola'],
    ['Tapunium Z', 'Tapu Fini', 'Nature\'s Madness', 'Guardian of Alola'],
    ['Kommonium Z', 'Kommo-o', 'Clanging Scales', 'Clangerous Soulblaze'],
    ['Lunalium Z', 'Lunala', 'Moongeist Beam', 'Menacing Moonraze Maelstrom'],
    ['Lunalium Z', 'Necrozma-Dawn-Wings', 'Moongeist Beam', 'Menacing Moonraze Maelstrom'],
    ['Lycanium Z', 'Lycanroc-Midday', 'Stone Edge', 'Splintered Stormshards'],
    ['Lycanium Z', 'Lycanroc-Midnight', 'Stone Edge', 'Splintered Stormshards'],
    ['Lycanium Z', 'Lycanroc-Dusk', 'Stone Edge', 'Splintered Stormshards'],
    ['Mimikium Z', 'Mimikyu', 'Play Rough', 'Let\'s Snuggle Forever'],
    ['Solganium Z', 'Solgaleo', 'Sunsteel Strike', 'Searing Sunraze Smash'],
    ['Solganium Z', 'Necrozma-Dusk-Mane', 'Sunsteel Strike', 'Searing Sunraze Smash'],
    ['Ultranecrozium Z', 'Ultra Necrozma', 'Photon Geyser', 'Light That Burns the Sky']
];

function getSignatureZMove(item, species, move) {
    var tempZ;
    for (var i = 0; i < SIGNATURE_Z_MOVE_LOOKUP.length; i++) {
        tempZ = SIGNATURE_Z_MOVE_LOOKUP[i];
        if (tempZ[0] == item && tempZ[1] == species && tempZ[2] == move) return tempZ[3];
    }
    return -1;
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
    'Mega Blaziken': 'Blazkienite',
    'Mega Charizard X': 'Charizardite X',
    'Mega Charizard Y': 'Charizardite Y',
    'Mega Garchomp': 'Garchompite',
    'Mega Gardevoir': 'Gardevoirite',
    'Mega Gengar': 'Gengarite',
    'Mega Gyarados': 'Gyaradosite',
    'Mega Heracross': 'Hreacroite',
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
};