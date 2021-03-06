var ABILITIES_ADV = [
    'Air Lock',
    'Battle Armor',
    'Blaze',
    'Chlorophyll',
    'Clear Body',
    'Cloud Nine',
    'Drizzle',
    'Drought',
    'Flash Fire',
    'Flash Fire (activated)',
    'Forecast',
    'Guts',
    'Huge Power',
    'Hustle',
    'Hyper Cutter',
    'Intimidate',
    'Levitate',
    'Marvel Scale',
    'Overgrow',
    'Pure Power',
    'Rain Dish',
    'Sand Stream',
    'Sand Veil',
    'Shell Armor',
    'Soundproof',
    'Swarm',
    'Swift Swim',
    'Thick Fat',
    'Torrent',
    'Volt Absorb',
    'Water Absorb',
    'White Smoke',
    'Wonder Guard',
    //NO FUNCTION IN CALCS
    'Arena Trap',
    'Color Change',
    'Compoundeyes',
    'Cute Charm',
    'Damp', //Might implement functionality
    'Early Bird',
    'Effect Spore',
    'Flame Body',
    'Illuminate',
    'Immunity',
    'Inner Focus',  //Has functionality in a later gen
    'Insomnia',
    'Keen Eye',
    'Lightning Rod',    //Has functionality in a later gen
    'Limber',
    'Liquid Ooze',
    'Magma Armor',
    'Magnet Pull',
    'Minus',   
    'Natural Cure',
    'Oblivious',    //Has functionality in a later gen
    'Own Tempo',    //Has functionality in a later gen
    'Pickup',
    'Plus', 
    'Poison Point',
    'Pressure',
    'Rough Skin',
    'Run Away',
    'Serene Grace',
    'Shadow Tag',
    'Shed Skin',
    'Shield Dust',
    'Speed Boost',
    'Static',
    'Stench',
    'Sticky Hold',
    'Sturdy',
    'Suction Cups',
    'Synchronize',
    'Trace',    //Might have relevant functionality?
    'Truant',
    'Vital Spirit',
    'Water Veil',
];

var ABILITIES_DPP = ABILITIES_ADV.concat([
    'Adaptability',
    'Bad Dreams',
    'Download',
    'Dry Skin',
    'Filter',
    'Flower Gift',
    'Gluttony',
    'Heatproof',
    'Ice Body',
    'Iron Fist',
    'Klutz',
    'Magic Guard',
    'Mold Breaker',
    'Motor Drive',
    'Multitype',
    'Normalize',
    'Poison Heal',
    'Reckless',
    'Scrappy',
    'Simple',
    'Skill Link',
    'Slow Start',
    'Sniper',
    'Snow Cloak',
    'Snow Warning',
    'Solar Power',
    'Solid Rock',
    'Technician',
    'Tinted Lens',
    'Unaware',
    //NO FUNCTIONALITY IN CALCS
    'Aftermath',
    'Anger Point',
    'Anticipation',
    'Forewarn',
    'Frisk',
    'Honey Gather',
    'Hydration',
    'Leaf Guard',
    'No Guard',
    'Quick Feet',
    'Rivalry',  //Only implement functionality if demand is a lot
    'Stall',
    'Steadfast',
    'Storm Drain',   //Has functionality in a later gen
    'Super Luck',
    'Tangled Feet',
    'Unburden'
]);

var ABILITIES_BW = ABILITIES_DPP.concat([
    'Analytic',
    'Contrary',
    'Defeatist',
    'Defiant',
    'Flare Boost',
    'Infiltrator',
    //'Lightning Rod',
    'Multiscale',
    'Overcoat',
    'Sand Force',
    'Sand Rush',
    'Sap Sipper',
    'Sheer Force',
    //'Storm Drain',
    'Teravolt',
    'Toxic Boost',
    'Turboblaze',
    'Unnerve',
    //NO FUNCTIONALITY IN CALCS
    'Big Pecks',
    'Cursed Body',
    'Friend Guard',
    'Harvest',
    'Healer',
    'Heavy Metal',
    'Illusion',
    'Imposter',
    'Iron Barbs',
    'Justified',
    'Light Metal',
    'Magic Bounce',
    'Moody',
    'Moxie',
    'Mummy',
    'Overcoat',
    'Pickpocket',
    'Poison Touch',
    'Prankster',
    'Rattled',
    'Regenerator',
    'Telepathy',
    'Victory Star',
    'Weak Armor',
    'Wonder Skin',
    'Zen Mode',  //Might implement functionality
]);

var ABILITIES_XY = ABILITIES_BW.concat([
    'Aerilate',
    'Aura Break',
    'Bulletproof',
    'Competitive',
    'Dark Aura',
    'Delta Stream',
    'Desolate Land',
    'Fairy Aura',
    'Fur Coat',
    'Mega Launcher',
    'Parental Bond',
    'Pixilate',
    'Primordial Sea',
    'Protean',
    'Refrigerate',
    'Strong Jaw',
    'Tough Claws',
    //NO FUNCTIONALITY IN CALCS
    'Aroma Veil',
    'Cheek Pouch',  //Maybe implement functionality
    'Flower Veil',
    'Gale Wings',
    'Gooey',
    'Grass Pelt',
    'Magician',
    'Stance Change',
    'Sweet Veil',
    'Symbiosis'
]);

var ABILITIES_SM = ABILITIES_XY.concat([
    'Electric Surge',
    'Psychic Surge',
    'Grassy Surge',
    'Misty Surge',
    'Merciless',
    'Stakeout',
    'Water Bubble',
    'Steelworker',
    'Liquid Voice',
    'Galvanize',
    'Fluffy',
    'RKS System',
    'Shadow Shield',
    'Prism Armor',
    'Full Metal Body',
    'Slush Rush',
    'Surge Surfer',
    'Neuroforce',
    'Power Construct',
    //NO FUNCTIONALITY IN CALCS
    'Battery',
    'Battle Bond',
    'Beast Boost',
    'Berserk',
    'Comatose',
    'Corrosion',
    'Dancer',
    'Dazzling',
    'Disguise',
    'Emergency Exit',
    'Innards Out',
    'Long Reach',
    'Power of Alchemy',
    'Queenly Majesty',
    'Receiver',
    'Schooling',    
    'Shields Down', 
    'Soul-Heart',
    'Stamina',
    'Tangling Hair',
    'Triage',
    'Water Compaction',
    'Wimp Out'
]);

var ABILITIES_SS = ABILITIES_SM.concat([
    //'Inner Focus',
    //'Oblivious',
    //'Own Tempo',
    'Libero',
    'Ice Scales',
    'Power Spot',
    'Intrepid Sword',
    'Dauntless Shield',
    "Gorilla Tactics",
    "Punk Rock",
    'Mirror Armor',
    'Neutralizing Gas',
    'Ripen',
    'Steely Spirit',
    'Transistor',
    'Dragon\'s Maw',
    'As One',
    //NO FUNCTIONALITY IN CALCS
    'Ball Fetch',
    'Cotton Down',
    'Gulp Missile',
    'Hunger Switch',
    'Ice Face',
    'Mimicry',  //Might implement functionality
    'Pastel Veil',
    'Perish Body',
    'Propeller Tail',
    'Sand Spit',    //Maybe implement? idk
    'Screen Cleaner',   
    'Stalwart',
    'Steam Engine',
    'Wandering Spirit',
    'Quick Draw',
    'Unseen Fist',
    'Curious Medicine',
    'Chilling Neigh',
    'Grim Neigh'
]);

//ABILITIES_XY.splice(ABILITIES_XY.indexOf('Lightning Rod'), 1, 'Lightning Rod');
