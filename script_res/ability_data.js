var ABILITIES_ADV = [
    //RSFRLGE abilities
    'Stench',
    'Drizzle',
    'Speed Boost',
    'Battle Armor',
    'Sturdy',
    'Damp',
    'Limber',
    'Sand Veil',
    'Static',
    'Volt Absorb',
    'Water Absorb',
    'Oblivious',
    'Cloud Nine',
    'Compound Eyes',
    'Insomnia',
    'Color Change',
    'Immunity',
    'Flash Fire',
    'Shield Dust',
    'Own Tempo',
    'Suction Cups',
    'Intimidate',
    'Shadow Tag',
    'Rough Skin',
    'Wonder Guard',
    'Levitate',
    'Effect Spore',
    'Synchronize',
    'Clear Body',
    'Natural Cure',
    'Lightning Rod',
    'Serene Grace',
    'Swift Swim',
    'Chlorophyll',
    'Illuminate',
    'Trace',
    'Huge Power',
    'Poison Point',
    'Inner Focus',
    'Magma Armor',
    'Water Veil',
    'Magnet Pull',
    'Soundproof',
    'Rain Dish',
    'Sand Stream',
    'Pressure',
    'Thick Fat',
    'Early Bird',
    'Flame Body',
    'Run Away',
    'Keen Eye',
    'Hyper Cutter',
    'Pickup',
    'Truant',
    'Hustle',
    'Cute Charm',
    'Plus',
    'Minus',
    'Forecast',
    'Sticky Hold',
    'Shed Skin',
    'Guts',
    'Marvel Scale',
    'Liquid Ooze',
    'Overgrow',
    'Blaze',
    'Torrent',
    'Swarm',
    'Rock Head',
    'Drought',
    'Arena Trap',
    'Vital Spirit',
    'White Smoke',
    'Pure Power',
    'Shell Armor',
    'Air Lock',
];

var ABILITIES_DPP = ABILITIES_ADV.concat([
    //DPPHGSS abilities
    'Tangled Feet',
    'Motor Drive',
    'Rivalry',
    'Steadfast',
    'Snow Cloak',
    'Gluttony',
    'Anger Point',
    'Unburden',
    'Heatproof',
    'Simple',
    'Dry Skin',
    'Download',
    'Iron Fist',
    'Poison Heal',
    'Adaptability',
    'Skill Link',
    'Hydration',
    'Solar Power',
    'Quick Feet',
    'Normalize',
    'Sniper',
    'Magic Guard',
    'No Guard',
    'Stall',
    'Technician',
    'Leaf Guard',
    'Klutz',
    'Mold Breaker',
    'Super Luck',
    'Aftermath',
    'Anticipation',
    'Forewarn',
    'Unaware',
    'Tinted Lens',
    'Filter',
    'Slow Start',
    'Scrappy',
    'Storm Drain',
    'Ice Body',
    'Solid Rock',
    'Snow Warning',
    'Honey Gather',
    'Frisk',
    'Reckless',
    'Multitype',
    'Flower Gift',
    'Bad Dreams',
]);

var ABILITIES_BW = ABILITIES_DPP.concat([
    //BWB2W2 ablities
    'Pickpocket',
    'Sheer Force',
    'Contrary',
    'Unnerve',
    'Defiant',
    'Defeatist',
    'Cursed Body',
    'Healer',
    'Friend Guard',
    'Weak Armor',
    'Heavy Metal',
    'Light Metal',
    'Harvest',
    'Telepathy',
    'Multiscale',
    'Toxic Boost',
    'Flare Boost',
    'Moody',
    'Overcoat',
    'Poison Touch',
    'Regenerator',
    'Big Pecks',
    'Sand Rush',
    'Wonder Skin',
    'Analytic',
    'Illusion',
    'Imposter',
    'Infiltrator',
    'Mummy',
    'Moxie',
    'Justified',
    'Rattled',
    'Magic Bounce',
    'Sap Sipper',
    'Prankster',
    'Sand Force',
    'Iron Barbs',
    'Zen Mode',  //Might implement functionality
    'Victory Star',
    'Turboblaze',
    'Teravolt',
]);

var ABILITIES_XY = ABILITIES_BW.concat([
    //XY abilities
    'Aroma Veil',
    'Flower Veil',
    'Cheek Pouch',  //Maybe implement functionality
    'Protean',
    'Fur Coat',
    'Magician',
    'Bulletproof',
    'Competitive',
    'Strong Jaw',
    'Refrigerate',
    'Sweet Veil',
    'Stance Change',
    'Gale Wings',
    'Mega Launcher',
    'Grass Pelt',
    'Symbiosis',
    'Tough Claws',
    'Pixilate',
    'Gooey',
    'Aerilate',
    'Parental Bond',
    'Dark Aura',
    'Fairy Aura',
    'Aura Break',
    //ORAS abilities
    'Primordial Sea',
    'Desolate Land',
    'Delta Stream',
]);

var ABILITIES_SM = ABILITIES_XY.concat([
    //SM abilities
    'Stamina',
    'Wimp Out',
    'Emergency Exit',
    'Water Compaction',
    'Merciless',
    'Shields Down',
    'Stakeout',
    'Water Bubble',
    'Steelworker',
    'Berserk',
    'Slush Rush',
    'Long Reach',
    'Liquid Voice',
    'Triage',
    'Galvanize',
    'Surge Surfer',
    'Schooling',
    'Disguise',
    'Battle Bond',
    'Power Construct',
    'Corrosion',
    'Comatose',
    'Queenly Majesty',
    'Innards Out',
    'Dancer',
    'Battery',
    'Fluffy',
    'Dazzling',
    'Soul-Heart',
    'Tangling Hair',
    'Receiver',
    'Power of Alchemy',
    'Beast Boost',
    'RKS System',
    'Electric Surge',
    'Psychic Surge',
    'Misty Surge',
    'Grassy Surge',
    'Full Metal Body',
    'Shadow Shield',
    'Prism Armor',
    //USUM abilities
    'Neuroforce',
]);

var ABILITIES_SS = ABILITIES_SM.concat([
    //SS abilities
    'Intrepid Sword',
    'Dauntless Shield',
    'Libero',
    'Ball Fetch',
    'Cotton Down',
    'Propeller Tail',
    'Mirror Armor',
    'Gulp Missile',
    'Steam Engine',
    'Stalwart',
    "Punk Rock",
    'Sand Spit',
    'Ice Scales',
    'Ripen',
    'Ice Face',
    'Power Spot',
    'Mimicry',
    'Screen Cleaner',
    'Steely Spirit',
    'Perish Body',
    'Wandering Spirit',
    "Gorilla Tactics",
    'Neutralizing Gas',
    'Pastel Veil',
    'Hunger Switch',
    //IoA abilities
    'Quick Draw',
    'Unseen Fist',
    //CT abilities
    'Curious Medicine',
    'Transistor',
    "Dragon's Maw",
    'Chilling Neigh',
    'Grim Neigh',
    'As One',
]);

var ABILITIES_SV = ABILITIES_SS.concat([
    'Lingering Aroma',  //Mummy clone, no calc functionality
    'Seed Sower',   //Grassy Terrain when hit
    'Thermal Exchange', //+1 Atk when hit by Fire and cannot be burned, no calc functionality
    'Anger Shell',  //+1 Atk SpA Spe -1 Def SpD at half health, consider calc functionality
    'Purifying Salt',   //half Ghost damage taken and status condition immunity
    'Well-Baked Body',  //Fire immunity and +2 Def when hit
    'Wind Rider',   //Wind move immunity and +1 Atk when hit or Tailwind is set
    'Guard Dog',    //Boosted Attack from Intimidate, switch-out moves fail
    'Rocky Payload',    //increase Rock damage dealt by 1.5x
    'Wind Power',   //charge when hit by wind move, abilityOff like Electromorphosis
    'Zero to Hero', //changes form when switching out, no calc functionality
    'Commander',    //all effects are related to the one mon, no calc functionality
    'Electromorphosis', //already added, charge as an ability
    'Protosynthesis',   //activates in sun or with Booster Energy, determines stat like Beast Boost
    'Quark Drive',  //activates in electric terrain or with Booster Energy, determines stat like Beast Boost
    'Good as Gold', //status move immunity, no calc functionality
    'Vessel of Ruin',   //NOT A STAT DROP, IT'S A BASE STAT MODIFIER
    'Sword of Ruin',    //SEE ABOVE
    'Tablets of Ruin',  //SEE ABOVE
    'Beads of Ruin',    //SEE ABOVE
    'Orichalcum Pulse', //sun AND stat mod
    'Hadron Engine',    //electric terrain AND stat mod
    'Opportunist',  //boosts same stats as opponent, might have calc functionality but probably not
    'Cud Chew', //reuse the same berry, no calc functionality
    'Sharpness',    //increase slicing move damage dealt
    'Supreme Overlord', //Atk/SpA boost for each ally defeated by +0.1x
    'Costar',   //copies ally stat changes, no calc functionality
    'Toxic Debris', //Toxic Spikes for every physical hit, no calc functionality
    'Armor Tail',   //Queenly Majesty/Dazzling again
    'Earth Eater',  //Ground type Water Absorb
    'Mycelium Might',   //inverse Prankster, no calc functionality
    //Teal Mask DLC new additions
    'Hospitality',  //Heals ally's HP, no calc functionality
    "Mind's Eye",   //Ignores evasion/accuracy and is Scrappy w/o Intimidate immunity
    'Embody Aspect', //Boosts Ogerpon's stats based on mask
    'Toxic Chain',  //Poison Touch but with badly poisoned instead, no calc functionality
    'Supersweet Syrup', //Intimidate but with evasion and only once
    //Indigo Disk new additions
    'Tera Shift',   //Transforms Terapagos into Tera form
    'Tera Shell',   //Max HP means all attacks are not very effective
    'Teraform Zero',    //Removes weather and terrain
    'Poison Puppeteer', //Poisoning also confuses, no calc funcitonality
]);

//ABILITIES_XY.splice(ABILITIES_XY.indexOf('Lightning Rod'), 1, 'Lightning Rod');
var ATE_IZE_ABILITIES = [
    'Normalize',
    'Aerilate',
    'Pixilate',
    'Refrigerate',
    'Galvanize',
];