var MOVES_RBY = {
    'Struggle': {
        bp: 50,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        zp: 1
    },
    '(No Move)': {
        type: 'Normal',
        category: 'Status'
    },
    'Acid': {
        bp: 40,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true,
    },
    'Bind': {
        bp: 15,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Blizzard': {
        bp: 120,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Body Slam': {
        bp: 85,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Bubble Beam': {
        bp: 65,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Clamp': {
        bp: 35,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
    },
    'Crabhammer': {
        bp: 90,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
    },
    'Dig': {
        bp: 100,
        type: 'Ground',
        category: 'Physical',
        makesContact: true,
    },
    'Double Kick': {
        bp: 30,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hitRange: 2
    },
    'Double-Edge': {
        bp: 100,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Drill Peck': {
        bp: 80,
        type: 'Flying',
        category: 'Physical',
        makesContact: true
    },
    'Earthquake': {
        bp: 100,
        type: 'Ground',
        category: 'Physical',
        isSpread: true,
        isGen3Spread: true,
    },
    'Explosion': {
        bp: 170,
        type: 'Normal',
        category: 'Physical',
        isSpread: true,
        isGen3Spread: true,
    },
    'Fire Blast': {
        bp: 120,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Fire Punch': {
        bp: 75,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    'Fire Spin': {
        bp: 15,
        type: 'Fire',
        category: 'Special',
    },
    'Flamethrower': {
        bp: 95,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'High Jump Kick': {
        bp: 85,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Hydro Pump': {
        bp: 120,
        type: 'Water',
        category: 'Special'
    },
    'Hyper Beam': {
        bp: 150,
        type: 'Normal',
        category: 'Special'
    },
    'Ice Beam': {
        bp: 95,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Ice Punch': {
        bp: 75,
        type: 'Ice',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    'Mega Drain': {
        bp: 40,
        type: 'Grass',
        category: 'Special',
        zp: 120,
        isHealing: true,
    },
    'Night Shade': {
        bp: 1,
        type: 'Ghost',
        category: 'Special'
    },
    'Pin Missile': {
        bp: 14,
        type: 'Bug',
        category: 'Physical',
        hitRange: [2, 5],
        zp: 140
    },
    'Psychic': {
        bp: 90,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Quick Attack': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        isPriority: true,
    },
    'Razor Leaf': {
        bp: 55,
        type: 'Grass',
        category: 'Physical',
        isSpread: true,
    },
    'Rock Slide': {
        bp: 75,
        type: 'Rock',
        category: 'Physical',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Seismic Toss': {
        bp: 1,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Self-Destruct': {
        bp: 130,
        type: 'Normal',
        category: 'Physical',
        isSpread: true,
        isGen3Spread: true,
    },
    'Sky Attack': {
        bp: 140,
        type: 'Flying',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Slash': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Sludge': {
        bp: 65,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Submission': {
        bp: 80,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true,
    },
    'Surf': {
        bp: 95,
        type: 'Water',
        category: 'Special',
        isSpread: true
    },
    'Tackle': {
        bp: 35,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Thunder': {
        bp: 120,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Thunder Punch': {
        bp: 75,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    'Thunderbolt': {
        bp: 95,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Twineedle': {
        bp: 25,
        type: 'Bug',
        hitRange: 2,
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Wrap': {
        bp: 15,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Swords Dance': {
        type: 'Normal',
        category: 'Status'
    },
    'Whirlwind': {
        type: 'Normal',
        category: 'Status'
    },
    'Tail Whip': {
        type: 'Normal',
        category: 'Status',
        isSpread: true,
    },
    'Leer': {
        type: 'Normal',
        category: 'Status',
        isSpread: true,
    },
    'Growl': {
        type: 'Normal',
        category: 'Status',
        isSpread: true,
    },
    'Roar': {
        type: 'Normal',
        category: 'Status'
    },
    'Sing': {
        type: 'Normal',
        category: 'Status'
    },
    'Disable': {
        type: 'Normal',
        category: 'Status'
    },
    'Mist': {
        type: 'Ice',
        category: 'Status'
    },
    'Leech Seed': {
        type: 'Grass',
        category: 'Status'
    },
    'Growth': {
        type: 'Normal',
        category: 'Status'
    },
    'Stun Spore': {
        type: 'Grass',
        category: 'Status'
    },
    'Sleep Powder': {
        type: 'Grass',
        category: 'Status'
    },
    'String Shot': {
        type: 'Bug',
        category: 'Status',
        isSpread: true,
    },
    'Thunder Wave': {
        type: 'Electric',
        category: 'Status'
    },
    'Toxic': {
        type: 'Poison',
        category: 'Status'
    },
    'Hypnosis': {
        type: 'Psychic',
        category: 'Status'
    },
    'Agility': {
        type: 'Psychic',
        category: 'Status'
    },
    'Teleport': {
        type: 'Psychic',
        category: 'Status'
    },
    'Screech': {
        type: 'Normal',
        category: 'Status'
    },
    'Double Team': {
        type: 'Normal',
        category: 'Status'
    },
    'Recover': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Minimize': {
        type: 'Normal',
        category: 'Status'
    },
    'Barrier': {
        type: 'Psychic',
        category: 'Status'
    },
    'Light Screen': {
        type: 'Psychic',
        category: 'Status'
    },
    'Haze': {
        type: 'Ice',
        category: 'Status'
    },
    'Reflect': {
        type: 'Psychic',
        category: 'Status'
    },
    'Focus Energy': {
        type: 'Normal',
        category: 'Status'
    },
    'Amnesia': {
        type: 'Psychic',
        category: 'Status'
    },
    'Soft-Boiled': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Glare': {
        type: 'Normal',
        category: 'Status'
    },
    'Poison Gas': {
        type: 'Poison',
        category: 'Status',
        isSpread: true,
    },
    'Lovely Kiss': {
        type: 'Normal',
        category: 'Status'
    },
    'Transform': {
        type: 'Normal',
        category: 'Status'
    },
    'Spore': {
        type: 'Grass',
        category: 'Status'
    },
    'Acid Armor': {
        type: 'Poison',
        category: 'Status'
    },
    'Rest': {
        type: 'Psychic',
        category: 'Status',
        //isHealing: true,
    },
    'Conversion': {
        type: 'Normal',
        category: 'Status'
    },
    'Substitute': {
        type: 'Normal',
        category: 'Status'
    },
    'Pound': {
        bp: 35,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Karate Chop': {
        bp: 50,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Double Slap': {
        bp: 15,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hitRange: [2, 5],
    },
    'Comet Punch': {
        bp: 18,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hitRange: [2, 5],
        isPunch: true,
    },
    'Mega Punch': {
        bp: 80,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        isPunch: true,
    },
    'Pay Day': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
    },
    'Scratch': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Vise Grip': {
        bp: 55,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Guillotine': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        isMLG: true,
        zp: 180
    },
    'Razor Wind': {
        bp: 80,
        type: 'Normal',
        category: 'Special',
        isSpread: true,
    },
    'Cut': {
        bp: 50,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Gust': {
        bp: 40,
        type: 'Normal',
        category: 'Special',
        canDouble: true,
    },
    'Wing Attack': {
        bp: 35, 
        type: 'Flying',
        category: 'Physical',
        makesContact: true,
    },
    'Slam': {
        bp: 80,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Vine Whip': {
        bp: 35,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
    },
    'Stomp': {
        bp: 65,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        miniDoubleBP: true,
        hasSecondaryEffect: true
    },
    'Mega Kick': {
        bp: 120,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Rolling Kick': {
        bp: 60,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Sand Attack': {
        type: 'Normal',
        category: 'Status',
    },
    'Horn Attack': {
        bp: 65,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Fury Attack': {
        bp: 15,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hitRange: [2, 5],
    },
    'Horn Drill': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        isMLG: true,
        zp: 180
    },
    'Take Down': {
        bp: 90,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true,
    },
    'Poison Sting': {
        bp: 15,
        type: 'Poison',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Bite': {
        bp: 60,
        type: 'Normal', 
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    'Supersonic': {
        type: 'Normal',
        category: 'Status',
    },
    'Sonic Boom': {
        bp: 1,
        type: 'Normal',
        category: 'Special',
    },
    'Ember': {
        bp: 40,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Water Gun': {
        bp: 40,
        type: 'Water',
        category: 'Special',
    },
    'Psybeam': {
        bp: 65,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Aurora Beam': {
        bp: 65,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Peck': {
        bp: 35,
        type: 'Flying',
        category: 'Physical',
        makesContact: true,
    },
    'Counter': {
        bp: 1,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        usesOppMoves: true,
    },
    'Strength': {
        bp: 80,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Absorb': {
        bp: 20,
        type: 'Grass',
        category: 'Special',
        isHealing: true,
    },
    'Poison Powder': {
        type: 'Poison',
        category: 'Status',
    },
    'Petal Dance': {
        bp: 70,
        type: 'Grass',
        category: 'Special',
        makesContact: true,
    },
    'Dragon Rage': {
        bp: 1,
        type: 'Dragon',
        category: 'Special',
    },
    'Thunder Shock': {
        bp: 40,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Rock Throw': {
        bp: 50,
        type: 'Rock',
        category: 'Physical',
    },
    'Fissure': {
        bp: 1,
        type: 'Ground',
        category: 'Physical',
        isMLG: true,
        zp: 180
    },
    'Confusion': {
        bp: 50,
        type: 'Psychic',
        category: 'Special',
    },
    'Meditate': {
        type: 'Psychic',
        category: 'Status',
    },
    'Rage': {
        bp: 20,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Mimic': {
        type: 'Normal',
        category: 'Status',
    },
    'Harden': {
        type: 'Normal',
        category: 'Status',
    },
    'Smokescreen': {
        type: 'Normal',
        category: 'Status',
    },
    'Confuse Ray': {
        type: 'Ghost',
        category: 'Status',
    },
    'Withdraw': {
        type: 'Water',
        category: 'Status',
    },
    'Defense Curl': {
        type: 'Normal',
        category: 'Status',
    },
    //'Bide': {
    //    bp: 1,
    //    type: 'Normal',
    //    category: 'Physical',
    //    makesContact: true,
    //},
    'Metronome': {
        type: 'Normal',
        category: 'Status',
    },
    'Mirror Move': {
        type: 'Flying',
        category: 'Status',
    },
    'Egg Bomb': {
        bp: 100,
        type: 'Normal',
        category: 'Physical',
        isBullet: true,
    },
    'Lick': {
        bp: 20,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Smog': {
        bp: 20,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Bone Club': {
        bp: 65,
        type: 'Ground',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Swift': {
        bp: 60,
        type: 'Normal',
        category: 'Special',
        isSpread: true,
    },
    'Skull Bash': {
        bp: 100,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Spike Cannon': {
        bp: 20,
        type: 'Normal',
        category: 'Physical',
        hitRange: [2, 5],
    },
    'Constrict': {
        bp: 10,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Kinesis': {
        type: 'Psychic',
        category: 'Status',
    },
    'Dream Eater': {
        bp: 100,
        type: 'Psychic',
        category: 'Special',
        isHealing: true,
    },
    'Barrage': {
        bp: 15,
        type: 'Normal',
        category: 'Physical',
        hitRange: [2, 5],
        isBullet: true,
    },
    'Leech Life': {
        bp: 20,
        type: 'Bug',
        category: 'Physical',
        makesContact: true,
        isHealing: true,
    },
    'Bubble': {
        bp: 20,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true,
    },
    'Dizzy Punch': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true,
    },
    'Flash': {
        type: 'Normal',
        category: 'Status',
    },
    //'Psywave': {
    //    bp: 1,
    //    type: 'Psychic',
    //    category: 'Special',
    //},
    'Splash': {
        type: 'Normal',
        category: 'Status',
    },
    'Fury Swipes': {
        bp: 18,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hitRange: [2, 5],
    },
    'Bonemerang': {
        bp: 50,
        type: 'Ground',
        category: 'Physical',
        hitRange: 2,
    },
    'Hyper Fang': {
        bp: 80,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true,
    },
    'Sharpen': {
        type: 'Normal',
        category: 'Status',
    },
    'Tri Attack': {
        bp: 80,
        type: 'Normal',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Super Fang': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Jump Kick': {
        bp: 70,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Thrash': {
        bp: 90,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Low Kick': {
        bp: 50,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        zp: 160,
    },
    'Waterfall': {
        bp: 80,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Fly': {
        bp: 70,
        type: 'Flying',
        category: 'Physical',
        makesContact: true,
    },
};

var MOVES_GSC = $.extend(true, {}, MOVES_RBY, {
    //Past move changes
    '(No Move)': { type: 'Typeless', },
    'Karate Chop': { type: 'Fighting', },
    'Gust': { type: 'Flying', },
    'Sand Attack': { type: 'Ground', },
    'Bite': { type: 'Dark', },
    'Wing Attack': { bp: 60, },
    'Dig': { bp: 60, },
    'Double-Edge': { bp: 120 },
    'Explosion': { bp: 250 },
    'Self-Destruct': { bp: 200 },

    //GSC moves
    'Aeroblast': {
        bp: 100,
        type: 'Flying',
        category: 'Special'
    },
    'Ancient Power': {
        bp: 60,
        type: 'Rock',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Cross Chop': {
        bp: 100,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Crunch': {
        bp: 80,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    'Dynamic Punch': {
        bp: 100,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    'Extreme Speed': {
        bp: 80,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        isPriority: true,
    },
    'Feint Attack': {
        bp: 60,
        type: 'Dark',
        category: 'Physical',
        makesContact: true
    },
    'Flail': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Flame Wheel': {
        bp: 60,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Frustration': {
        bp: 102,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Giga Drain': {
        bp: 60,
        type: 'Grass',
        category: 'Special',
        isHealing: true,
    },
    'Headbutt': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Hidden Power Bug': {
        bp: 70,
        type: 'Bug',
        category: 'Special'
    },
    'Hidden Power Dark': {
        bp: 70,
        type: 'Dark',
        category: 'Special'
    },
    'Hidden Power Dragon': {
        bp: 70,
        type: 'Dragon',
        category: 'Special'
    },
    'Hidden Power Electric': {
        bp: 70,
        type: 'Electric',
        category: 'Special'
    },
    'Hidden Power Fighting': {
        bp: 70,
        type: 'Fighting',
        category: 'Special'
    },
    'Hidden Power Fire': {
        bp: 70,
        type: 'Fire',
        category: 'Special'
    },
    'Hidden Power Flying': {
        bp: 70,
        type: 'Flying',
        category: 'Special'
    },
    'Hidden Power Ghost': {
        bp: 70,
        type: 'Ghost',
        category: 'Special'
    },
    'Hidden Power Grass': {
        bp: 70,
        type: 'Grass',
        category: 'Special'
    },
    'Hidden Power Ground': {
        bp: 70,
        type: 'Ground',
        category: 'Special'
    },
    'Hidden Power Ice': {
        bp: 70,
        type: 'Ice',
        category: 'Special'
    },
    'Hidden Power Poison': {
        bp: 70,
        type: 'Poison',
        category: 'Special'
    },
    'Hidden Power Psychic': {
        bp: 70,
        type: 'Psychic',
        category: 'Special'
    },
    'Hidden Power Rock': {
        bp: 70,
        type: 'Rock',
        category: 'Special'
    },
    'Hidden Power Steel': {
        bp: 70,
        type: 'Steel',
        category: 'Special'
    },
    'Hidden Power Water': {
        bp: 70,
        type: 'Water',
        category: 'Special'
    },
    'Icy Wind': {
        bp: 55,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Iron Tail': {
        bp: 100,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Mach Punch': {
        bp: 40,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        isPunch: true,
        isPriority: true,
    },
    'Megahorn': {
        bp: 120,
        type: 'Bug',
        category: 'Physical',
        makesContact: true
    },
    'Pursuit': {
        bp: 40,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        canDouble: true,
    },
    'Rapid Spin': {
        bp: 20,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Return': {
        bp: 102,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Reversal': {
        bp: 1,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Sacred Fire': {
        bp: 100,
        type: 'Fire',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Shadow Ball': {
        bp: 80,
        type: 'Ghost',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true
    },
    'Sludge Bomb': {
        bp: 90,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true
    },
    'Solar Beam': {
        bp: 120,
        type: 'Grass',
        category: 'Special'
    },
    'Steel Wing': {
        bp: 70,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Thief': {
        bp: 40,
        type: 'Dark',
        category: 'Physical',
        makesContact: true
    },
    'Zap Cannon': {
        bp: 100,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true,
    },
    'Pain Split': {
        type: 'Normal',
        category: 'Status'
    },
    'Mind Reader': {
        type: 'Normal',
        category: 'Status'
    },
    'Curse': {
        type: '???',
        category: 'Status'
    },
    'Cotton Spore': {
        type: 'Grass',
        category: 'Status',
        isSpread: true,
    },
    'Protect': {
        type: 'Normal',
        category: 'Status'
    },
    'Scary Face': {
        type: 'Normal',
        category: 'Status'
    },
    'Belly Drum': {
        type: 'Normal',
        category: 'Status'
    },
    'Spikes': {
        type: 'Ground',
        category: 'Status',
        isSpread: true,
    },
    'Foresight': {
        type: 'Normal',
        category: 'Status'
    },
    'Destiny Bond': {
        type: 'Ghost',
        category: 'Status'
    },
    'Perish Song': {
        type: 'Normal',
        category: 'Status'
    },
    'Detect': {
        type: 'Fighting',
        category: 'Status'
    },
    'Lock-On': {
        type: 'Normal',
        category: 'Status'
    },
    'Sandstorm': {
        type: 'Rock',
        category: 'Status'
    },
    'Endure': {
        type: 'Normal',
        category: 'Status'
    },
    'Charm': {
        type: 'Normal',
        category: 'Status'
    },
    'Swagger': {
        type: 'Normal',
        category: 'Status'
    },
    'Milk Drink': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Sleep Talk': {
        type: 'Normal',
        category: 'Status'
    },
    'Heal Bell': {
        type: 'Normal',
        category: 'Status'
    },
    'Safeguard': {
        type: 'Normal',
        category: 'Status'
    },
    'Baton Pass': {
        type: 'Normal',
        category: 'Status'
    },
    'Encore': {
        type: 'Normal',
        category: 'Status'
    },
    'Sweet Scent': {
        type: 'Normal',
        category: 'Status',
        isSpread: true,
    },
    'Morning Sun': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Synthesis': {
        type: 'Grass',
        category: 'Status',
        //isHealing: true,
    },
    'Moonlight': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Rain Dance': {
        type: 'Water',
        category: 'Status'
    },
    'Sunny Day': {
        type: 'Fire',
        category: 'Status'
    },
    'Psych Up': {
        type: 'Normal',
        category: 'Status'
    },
    'Sketch': {
        type: 'Normal',
        category: 'Status',
    },
    'Spider Web': {
        type: 'Bug',
        category: 'Status',
    },
    'Nightmare': {
        type: 'Ghost',
        category: 'Status',
    },
    'Conversion 2': {
        type: 'Normal',
        category: 'Status',
    },
    'Spite': {
        type: 'Ghost',
        category: 'Status',
    },
    'Sweet Kiss': {
        type: 'Normal',
        category: 'Status',
    },
    'Lock-On': {
        type: 'Normal',
        category: 'Status',
    },
    'Mean Look': {
        type: 'Normal',
        category: 'Status',
    },
    'Attract': {
        type: 'Normal',
        category: 'Status',
    },
    'Triple Kick': {
        bp: 10,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        isTripleHit: true,
        hitRange: [1, 3],
        zp: 120,
    },
    'Snore': {
        bp: 40,
        type: 'Normal',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true,
    },
    'Powder Snow': {
        bp: 40,
        type: 'Ice',
        category: 'Special',
        isSpread: true,
        hasSecondaryEffect: true
    },
    'Mud-Slap': {
        bp: 20,
        type: 'Ground',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Octazooka': {
        bp: 65,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true,
    },
    'Bone Rush': {
        bp: 25,
        type: 'Ground',
        category: 'Physical',
        hitRange: [2, 5],
        zp: 140
    },
    'Outrage': {
        bp: 90,
        type: 'Dragon',
        category: 'Physical',
        makesContact: true
    },
    'Rollout': {
        bp: 30,
        type: 'Rock',
        category: 'Physical',
        makesContact: true
    },
    'False Swipe': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Spark': {
        bp: 65,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Fury Cutter': {
        bp: 10,
        type: 'Bug',
        category: 'Physical',
        makesContact: true
    },
    //'Present': {
    //    bp: 1,
    //    type: 'Normal',
    //    category: 'Physical',
    //},
    //'Magnitude': {
    //    bp: 1,
    //    type: 'Ground',
    //    category: 'Physical',
    //    isSpread: true,
    //    isGen3Spread: true,
    //    zp: 140
    //},
    'Dragon Breath': {
        bp: 60,
        type: 'Dragon',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Metal Claw': {
        bp: 50,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Vital Throw': {
        bp: 70,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Twister': {
        bp: 40,
        type: 'Dragon',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true,
        canDouble: true,
    },
    'Mirror Coat': {
        bp: 1,
        type: 'Psychic',
        category: 'Special',
        usesOppMoves: true,
    },
    'Future Sight': {
        bp: 80,
        type: 'Psychic',
        category: 'Special',
    },
    'Rock Smash': {
        bp: 20,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Whirlpool': {
        bp: 15,
        type: 'Water',
        category: 'Special',
    },
    'Beat Up': {
        bp: 10,
        type: 'Dark',
        category: 'Physical',
        hitRange: [1, 6],
    },
});

var MOVES_ADV = $.extend(true, {}, MOVES_GSC, {
    //Past move changes
    'Low Kick': { bp: 1, },

    //RSEFRLG moves
    'Aerial Ace': {
        bp: 60,
        type: 'Flying',
        category: 'Physical',
        makesContact: true
    },
    'Air Cutter': {
        bp: 55,
        type: 'Flying',
        category: 'Special',
        isSpread: true
    },
    'Blast Burn':{
        bp: 150,
        type: 'Fire',
        category: 'Special',
    },
    'Blaze Kick': {
        bp: 85,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Bounce': {
        bp: 85,
        type: 'Flying',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Brick Break': {
        bp: 75,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        ignoreScreens: true,
    },
    'Doom Desire': {
        bp: 120,
        type: 'Steel',
        category: 'Special'
    },
    'Dragon Claw': {
        bp: 80,
        type: 'Dragon',
        category: 'Physical',
        makesContact: true
    },
    'Eruption': {
        bp: 150,
        type: 'Fire',
        category: 'Special',
        isSpread: true,
        zp: 200
    },
    'Extrasensory': {
        bp: 80,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
        miniDoubleBP: true,
    },
    'Facade': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Fake Out': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPriority: true,
    },
    'Focus Punch': {
        bp: 150,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        isPunch: true
    },
    'Heat Wave': {
        bp: 100,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Knock Off': {
        bp: 20,
        type: 'Dark',
        category: 'Physical',
        makesContact: true
    },
    'Leaf Blade': {
        bp: 70,
        type: 'Grass',
        category: 'Physical',
        makesContact: true
    },
    'Luster Purge': {
        bp: 70,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Meteor Mash': {
        bp: 100,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    'Muddy Water': {
        bp: 95,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Mud Shot': {
        bp: 55,
        type: 'Ground',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Overheat': {
        bp: 140,
        type: 'Fire',
        category: 'Special'
    },
    'Poison Fang': {
        bp: 50,
        type: 'Poison',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    'Psycho Boost': {
        bp: 140,
        type: 'Psychic',
        category: 'Special'
    },
    'Revenge': {
        bp: 60,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        canDouble: true,
    },
    'Rock Blast': {
        bp: 25,
        type: 'Rock',
        category: 'Physical',
        hitRange: [2, 5],
        zp: 140
    },
    'Rock Tomb': {
        bp: 50,
        type: 'Rock',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Shadow Punch': {
        bp: 60,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true,
        isPunch: true
    },
    'Shock Wave': {
        bp: 60,
        type: 'Electric',
        category: 'Special'
    },
    'Signal Beam': {
        bp: 75,
        type: 'Bug',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Sky Uppercut': {
        bp: 85,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        isPunch: true
    },
    'Superpower': {
        bp: 120,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Volt Tackle': {
        bp: 120,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        hasRecoil: true
    },
    'Water Pulse': {
        bp: 60,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true,
        isPulse: true
    },
    'Water Spout': {
        bp: 150,
        type: 'Water',
        category: 'Special',
        isSpread: true,
        zp: 200
    },
    'Weather Ball': {
        bp: 50,
        type: 'Normal',
        category: 'Special',
        isBullet: true,
        zp: 160
    },
    'Dive': {
        bp: 60,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
    },
    'Frenzy Plant': {
        bp: 150,
        type: 'Grass',
        category: 'Special',
    },
    'Hydro Cannon': {
        bp: 150,
        type: 'Water',
        category: 'Special',
    },
    'Endeavor': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Stockpile': {
        type: 'Normal',
        category: 'Status'
    },
    'Hail': {
        type: 'Ice',
        category: 'Status'
    },
    'Torment': {
        type: 'Dark',
        category: 'Status'
    },
    'Flatter': {
        type: 'Dark',
        category: 'Status'
    },
    'Will-O-Wisp': {
        type: 'Fire',
        category: 'Status'
    },
    'Memento': {
        type: 'Dark',
        category: 'Status'
    },
    'Follow Me': {
        type: 'Normal',
        category: 'Status'
    },
    'Taunt': {
        type: 'Dark',
        category: 'Status'
    },
    'Helping Hand': {
        type: 'Normal',
        category: 'Status'
    },
    'Trick': {
        type: 'Psychic',
        category: 'Status'
    },
    'Role Play': {
        type: 'Psychic',
        category: 'Status'
    },
    'Wish': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Assist': {
        type: 'Normal',
        category: 'Status'
    },
    'Ingrain': {
        type: 'Grass',
        category: 'Status'
    },
    'Magic Coat': {
        type: 'Psychic',
        category: 'Status'
    },
    'Recycle': {
        type: 'Normal',
        category: 'Status'
    },
    'Yawn': {
        type: 'Normal',
        category: 'Status'
    },
    'Skill Swap': {
        type: 'Psychic',
        category: 'Status'
    },
    'Imprison': {
        type: 'Psychic',
        category: 'Status'
    },
    'Refresh': {
        type: 'Normal',
        category: 'Status'
    },
    'Grudge': {
        type: 'Ghost',
        category: 'Status'
    },
    'Snatch': {
        type: 'Dark',
        category: 'Status'
    },
    'Tail Glow': {
        type: 'Bug',
        category: 'Status'
    },
    'Feather Dance': {
        type: 'Flying',
        category: 'Status'
    },
    'Teeter Dance': {
        type: 'Normal',
        category: 'Status',
        isSpread: true,
    },
    'Slack Off': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Aromatherapy': {
        type: 'Grass',
        category: 'Status'
    },
    'Fake Tears': {
        type: 'Dark',
        category: 'Status'
    },
    'Metal Sound': {
        type: 'Steel',
        category: 'Status'
    },
    'Grass Whistle': {
        type: 'Grass',
        category: 'Status'
    },
    'Tickle': {
        type: 'Normal',
        category: 'Status'
    },
    'Cosmic Power': {
        type: 'Psychic',
        category: 'Status'
    },
    'Iron Defense': {
        type: 'Steel',
        category: 'Status'
    },
    'Howl': {
        type: 'Normal',
        category: 'Status'
    },
    'Bulk Up': {
        type: 'Fighting',
        category: 'Status'
    },
    'Calm Mind': {
        type: 'Psychic',
        category: 'Status'
    },
    'Dragon Dance': {
        type: 'Dragon',
        category: 'Status'
    },
    'Sand Tomb': {
        bp: 15,
        type: 'Ground',
        category: 'Physical',
    },
    'Swallow': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Nature Power': {
        bp: 1,
        type: 'Normal',
        category: 'Status',
    },
    'Charge': {
        type: 'Electric',
        category: 'Status',
    },
    'Camouflage': {
        type: 'Normal',
        category: 'Status',
    },
    'Mud Sport': {
        type: 'Ground',
        category: 'Status',
    },
    'Odor Sleuth': {
        type: 'Normal',
        category: 'Status',
    },
    'Block': {
        type: 'Normal',
        category: 'Status',
    },
    'Water Sport': {
        type: 'Water',
        category: 'Status',
    },
    'Uproar': {
        bp: 50,
        type: 'Normal',
        category: 'Special',
        isSound: true,
    },
    //'Spit Up': {
    //    bp: 1,
    //    type: 'Normal',
    //    category: 'Special',
    //},
    'Smelling Salts': {
        bp: 60,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Secret Power': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Arm Thrust': {
        bp: 15,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hitRange: [2, 5],
    },
    'Mist Ball': {
        bp: 70,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true,
    },
    'Ice Ball': {
        bp: 30,
        type: 'Ice',
        category: 'Physical',
        makesContact: true,
        isBullet: true,
    },
    'Needle Arm': {
        bp: 60,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        miniDoubleBP: true,
    },
    'Hyper Voice': {
        bp: 90,
        type: 'Normal',
        category: 'Special',
        isSound: true,
        isSpread: true
    },
    'Crush Claw': {
        bp: 75,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Astonish': {
        bp: 30,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        miniDoubleBP: true,
    },
    'Silver Wind': {
        bp: 60,
        type: 'Bug',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Sheer Cold': {
        bp: 1,
        type: 'Ice',
        category: 'Special',
        isMLG: true,
        zp: 180
    },
    'Bullet Seed': {
        bp: 10,
        type: 'Grass',
        category: 'Physical',
        hitRange: [2, 5],
        isBullet: true,
        zp: 140
    },
    'Icicle Spear': {
        bp: 10,
        type: 'Ice',
        category: 'Physical',
        hitRange: [2, 5],
        zp: 140
    },
    'Poison Tail': {
        bp: 50,
        type: 'Poison',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Covet': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
        //technically not true for gen 3 but it doesn't come up
    },
    'Magical Leaf': {
        bp: 60,
        type: 'Grass',
        category: 'Special',
    },
});

var MOVES_DPP = $.extend(true, {}, MOVES_ADV, {
    //Past move changes
    'Fly': { bp: 90, },
    'High Jump Kick': { bp: 100 },
    'Jump Kick': { bp: 85, },
    'Leaf Blade': { bp: 90 },
    'Outrage': { bp: 120, },
    'Rock Smash': { bp: 40, },
    'Zap Cannon': { bp: 120 },
    'Dive': { bp: 80 },
    'Dig': { bp: 80, },
    'Petal Dance': { bp: 90, },
    'Astonish': { miniDoubleBP: false, },
    'Extrasensory': { miniDoubleBP: false, },
    'Needle Arm': { miniDoubleBP: false, },

    //DPPt moves
    'Air Slash': {
        bp: 75,
        type: 'Flying',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Aqua Jet': {
        bp: 40,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        isPriority: true,
    },
    'Aqua Tail': {
        bp: 90,
        type: 'Water',
        category: 'Physical',
        makesContact: true
    },
    'Assurance': {
        bp: 50,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        canDouble: true
    },
    'Aura Sphere': {
        bp: 90,
        type: 'Fighting',
        category: 'Special',
        isBullet: true,
        isPulse: true
    },
    'Avalanche': {
        bp: 60,
        type: 'Ice',
        category: 'Physical',
        makesContact: true,
        canDouble: true,
    },
    'Brave Bird': {
        bp: 120,
        type: 'Flying',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Brine': {
        bp: 65,
        type: 'Water',
        category: 'Special',
    },
    'Bug Bite': {
        bp: 60,
        type: 'Bug',
        category: 'Physical',
        makesContact: true
    },
    'Bug Buzz': {
        bp: 90,
        type: 'Bug',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true
    },
    'Bullet Punch': {
        bp: 40,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        isPunch: true,
        isPriority: true,
    },
    'Charge Beam': {
        bp: 50,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Chatter': {
        bp: 60,
        type: 'Flying',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true
    },
    'Close Combat': {
        bp: 120,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Cross Poison': {
        bp: 70,
        type: 'Poison',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Dark Pulse': {
        bp: 80,
        type: 'Dark',
        category: 'Special',
        hasSecondaryEffect: true,
        isPulse: true
    },
    'Discharge': {
        bp: 80,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Double Hit': {
        bp: 35,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hitRange: 2
    },
    'Draco Meteor': {
        bp: 140,
        type: 'Dragon',
        category: 'Special'
    },
    'Dragon Pulse': {
        bp: 90,
        type: 'Dragon',
        category: 'Special',
        isPulse: true
    },
    'Dragon Rush': {
        bp: 100,
        type: 'Dragon',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Drain Punch': {
        bp: 60,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        isPunch: true,
        isHealing: true,
    },
    'Earth Power': {
        bp: 90,
        type: 'Ground',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Energy Ball': {
        bp: 80,
        type: 'Grass',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true
    },
    'Fire Fang': {
        bp: 65,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    'Flare Blitz': {
        bp: 120,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        hasRecoil: true
    },
    'Flash Cannon': {
        bp: 80,
        type: 'Steel',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Fling': {
        bp: 1,
        type: 'Dark',
        category: 'Physical'
    },
    'Focus Blast': {
        bp: 120,
        type: 'Fighting',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true
    },
    'Force Palm': {
        bp: 60,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Giga Impact': {
        bp: 150,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Grass Knot': {
        bp: 1,
        type: 'Grass',
        category: 'Special',
        makesContact: true,
        zp: 160
    },
    'Gunk Shot': {
        bp: 120,
        type: 'Poison',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Gyro Ball': {
        bp: 1,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        isBullet: true,
        zp: 160
    },
    'Hammer Arm': {
        bp: 100,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        isPunch: true
    },
    'Head Smash': {
        bp: 150,
        type: 'Rock',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Ice Fang': {
        bp: 65,
        type: 'Ice',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    'Ice Shard': {
        bp: 40,
        type: 'Ice',
        category: 'Physical',
        isPriority: true,
    },
    'Iron Head': {
        bp: 80,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Judgment': {
        bp: 100,
        type: 'Normal',
        category: 'Special'
    },
    'Last Resort': {
        bp: 130,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Lava Plume': {
        bp: 80,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Leaf Storm': {
        bp: 140,
        type: 'Grass',
        category: 'Special'
    },
    'Magma Storm': {
        bp: 120,
        type: 'Fire',
        category: 'Special'
    },
    'Mud Bomb': {
        bp: 65,
        type: 'Ground',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true,
    },
    'Natural Gift': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        zp: 160
    },
    'Night Slash': {
        bp: 70,
        type: 'Dark',
        category: 'Physical',
        makesContact: true
    },
    'Payback': {
        bp: 50,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        canDouble: true,
    },
    'Pluck': {
        bp: 60,
        type: 'Flying',
        category: 'Physical',
        makesContact: true
    },
    'Poison Jab': {
        bp: 80,
        type: 'Poison',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Power Gem': {
        bp: 70,
        type: 'Rock',
        category: 'Special'
    },
    'Power Whip': {
        bp: 120,
        type: 'Grass',
        category: 'Physical',
        makesContact: true
    },
    'Psycho Cut': {
        bp: 70,
        type: 'Psychic',
        category: 'Physical'
    },
    'Punishment': {
        bp: 60,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Rock Climb': {
        bp: 90,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Seed Bomb': {
        bp: 80,
        type: 'Grass',
        category: 'Physical',
        isBullet: true
    },
    'Seed Flare': {
        bp: 120,
        type: 'Grass',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Shadow Claw': {
        bp: 70,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true
    },
    'Shadow Force': {
        bp: 120,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true
    },
    'Shadow Sneak': {
        bp: 40,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true,
        isPriority: true,
    },
    'Spacial Rend': {
        bp: 100,
        type: 'Dragon',
        category: 'Special'
    },
    'Stone Edge': {
        bp: 100,
        type: 'Rock',
        category: 'Physical'
    },
    'Sucker Punch': {
        bp: 80,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        isPriority: true,
    },
    'Thunder Fang': {
        bp: 65,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    'U-turn': {
        bp: 70,
        type: 'Bug',
        category: 'Physical',
        makesContact: true
    },
    'Vacuum Wave': {
        bp: 40,
        type: 'Fighting',
        category: 'Special',
        isPriority: true,
    },
    'Wake-Up Slap': {
        bp: 60,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Wood Hammer': {
        bp: 120,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'X-Scissor': {
        bp: 80,
        type: 'Bug',
        category: 'Physical',
        makesContact: true
    },
    'Zen Headbutt': {
        bp: 80,
        type: 'Psychic',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Rock Wrecker': {
        bp: 150,
        type: 'Rock',
        category: 'Physical',
        isBullet: true,
    },
    'Roar of Time': {
        bp: 150,
        type: 'Dragon',
        category: 'Special',
    },
    'Roost': {
        type: 'Flying',
        category: 'Status',
        //isHealing: true,
    },
    'Gravity': {
        type: 'Psychic',
        category: 'Status'
    },
    'Healing Wish': {
        type: 'Psychic',
        category: 'Status',
        //isHealing: true,
    },
    'Tailwind': {
        type: 'Flying',
        category: 'Status'
    },
    'Acupressure': {
        type: 'Normal',
        category: 'Status'
    },
    'Embargo': {
        type: 'Dark',
        category: 'Status'
    },
    'Psycho Shift': {
        type: 'Psychic',
        category: 'Status'
    },
    'Heal Block': {
        type: 'Psychic',
        category: 'Status',
        isSpread: true,
    },
    'Power Trick': {
        type: 'Psychic',
        category: 'Status'
    },
    'Gastro Acid': {
        type: 'Poison',
        category: 'Status'
    },
    'Me First': {
        type: 'Normal',
        category: 'Status',
        usesOppMoves: true,
    },
    'Copycat': {
        type: 'Normal',
        category: 'Status'
    },
    'Power Swap': {
        type: 'Psychic',
        category: 'Status'
    },
    'Worry Seed': {
        type: 'Grass',
        category: 'Status'
    },
    'Toxic Spikes': {
        type: 'Poison',
        category: 'Status',
        isSpread: true,
    },
    'Heart Swap': {
        type: 'Psychic',
        category: 'Status'
    },
    'Magnet Rise': {
        type: 'Electric',
        category: 'Status'
    },
    'Rock Polish': {
        type: 'Rock',
        category: 'Status'
    },
    'Switcheroo': {
        type: 'Dark',
        category: 'Status'
    },
    'Nasty Plot': {
        type: 'Dark',
        category: 'Status'
    },
    'Defog': {
        type: 'Flying',
        category: 'Status'
    },
    'Trick Room': {
        type: 'Psychic',
        category: 'Status'
    },
    'Captivate': {
        type: 'Normal',
        category: 'Status',
        isSpread: true,
    },
    'Stealth Rock': {
        type: 'Rock',
        category: 'Status',
        isSpread: true,
    },
    'Lunar Dance': {
        type: 'Psychic',
        category: 'Status',
        //isHealing: true,
    },
    'Dark Void': {
        type: 'Dark',
        category: 'Status',
        isSpread: true,
    },
    'Miracle Eye': {
        type: 'Psychic',
        category: 'Status',
    },
    'Lucky Chant': {
        type: 'Normal',
        category: 'Status',
    },
    'Guard Swap': {
        type: 'Psychic',
        category: 'Status',
    },
    'Aqua Ring': {
        type: 'Water',
        category: 'Status',
    },
    'Defend Order': {
        type: 'Bug',
        category: 'Status',
    },
    'Heal Order': {
        type: 'Bug',
        category: 'Status',
        //isHealing: true,
    },
    'Feint': {
        bp: 50,
        type: 'Normal',
        category: 'Physical',
        isPriority: true,
    },
    'Metal Burst': {
        bp: 1,
        type: 'Steel',
        category: 'Physical',
        usesOppMoves: true,
    },
    'Trump Card': {
        bp: 40,
        type: 'Normal',
        category: 'Special',
        makesContact: true,
        zp: 160
    },
    'Wring Out': {
        bp: 1,
        type: 'Normal',
        category: 'Special',
        makesContact: true,
        zp: 190
    },
    'Mirror Shot': {
        bp: 65,
        type: 'Steel',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Magnet Bomb': {
        bp: 60,
        type: 'Steel',
        category: 'Physical',
        isBullet: true,
    },
    'Attack Order': {
        bp: 90,
        type: 'Bug',
        category: 'Physical',
    },
    'Crush Grip': {
        bp: 1,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        zp: 190
    },
    'Ominous Wind': {
        bp: 60,
        type: 'Ghost',
        category: 'Special',
        hasSecondaryEffect: true
    },
});

var MOVES_BW = $.extend(true, {}, MOVES_DPP, {
    //Past move changes
    'Fire Spin': { bp: 35 },
    'Sand Tomb': { bp: 35 },
    'Bullet Seed': { bp: 25, },
    'Doom Desire': { bp: 140 },
    'Drain Punch': { bp: 75 },
    'Feint': { bp: 30, },
    'Giga Drain': { bp: 75 },
    'High Jump Kick': { bp: 130 },
    'Jump Kick': { bp: 100 },
    'Last Resort': { bp: 140 },
    'Petal Dance': { bp: 120, },
    'Tackle': { bp: 50 },
    'Thrash': { bp: 120, },
    'Fury Cutter': { bp: 20, },
    'Future Sight': { bp: 100, },
    'Whirlpool': { bp: 35, },
    'Uproar': { bp: 90, },
    'Icicle Spear': { bp: 25, },
    'Covet': { bp: 60, },
    'Beat Up': {
        bp: 14, //average fully evolved atk. stat is ~90. 90/10 + 5 = 14. cállate tu boca i'm lazy
    },
    'Curse': { type: 'Ghost', },

    //BWB2W2 moves
    'Electroweb': {
        bp: 55,
        type: "Electric",
        category: "Special",
        isSpread: true,
        hasSecondaryEffect: true
    },
    'Acid Spray': {
        bp: 40,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true
    },
    'Acrobatics': {
        bp: 55,
        type: 'Flying',
        category: 'Physical',
        makesContact: true
    },
    'Blue Flare': {
        bp: 130,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Bolt Strike': {
        bp: 130,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Bulldoze': {
        bp: 60,
        type: 'Ground',
        category: 'Physical',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Circle Throw': {
        bp: 60,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true
    },
    'Clear Smog': {
        bp: 50,
        type: 'Poison',
        category: 'Special'
    },
    'Dragon Tail': {
        bp: 60,
        type: 'Dragon',
        category: 'Physical',
        makesContact: true
    },
    'Drill Run': {
        bp: 80,
        type: 'Ground',
        category: 'Physical',
        makesContact: true
    },
    'Dual Chop': {
        bp: 40,
        type: 'Dragon',
        category: 'Physical',
        makesContact: true,
        hitRange: 2
    },
    'Electro Ball': {
        bp: 1,
        type: 'Electric',
        category: 'Special',
        isBullet: true,
        zp: 160
    },
    'Fiery Dance': {
        bp: 80,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Flame Charge': {
        bp: 50,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Foul Play': {
        bp: 95,
        type: 'Dark',
        category: 'Physical',
        makesContact: true
    },
    'Freeze Shock': {
        bp: 140,
        type: 'Ice',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Frost Breath': {
        bp: 40,
        type: 'Ice',
        category: 'Special',
        alwaysCrit: true
    },
    'Fusion Bolt': {
        bp: 100,
        type: 'Electric',
        category: 'Physical',
        canDouble: true,
    },
    'Fusion Flare': {
        bp: 100,
        type: 'Fire',
        category: 'Special',
        canDouble: true,
    },
    'Gear Grind': {
        bp: 50,
        type: 'Steel',
        category: 'Physical',
        hitRange: 2,
        makesContact: true,
        zp: 180
    },
    'Glaciate': {
        bp: 65,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Head Charge': {
        bp: 120,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Heavy Slam': {
        bp: 1,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Hex': {
        bp: 50,
        type: 'Ghost',
        category: 'Special',
        zp: 160
    },
    'Horn Leech': {
        bp: 75,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
        isHealing: true,
    },
    'Hurricane': {
        bp: 120,
        type: 'Flying',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Ice Burn': {
        bp: 140,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Icicle Crash': {
        bp: 85,
        type: 'Ice',
        category: 'Physical',
        hasSecondaryEffect: true
    },
    'Incinerate': {
        bp: 30,
        type: 'Fire',
        category: 'Special',
        isSpread: true
    },
    'Inferno': {
        bp: 100,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Low Sweep': {
        bp: 60,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Night Daze': {
        bp: 85,
        type: 'Dark',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Psyshock': {
        bp: 80,
        type: 'Psychic',
        category: 'Special',
        dealsPhysicalDamage: true
    },
    'Psystrike': {
        bp: 100,
        type: 'Psychic',
        category: 'Special',
        dealsPhysicalDamage: true
    },
    'Razor Shell': {
        bp: 75,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Relic Song': {
        bp: 75,
        type: 'Normal',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true,
        isSpread: true
    },
    'Retaliate': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        canDouble: true,
    },
    'Sacred Sword': {
        bp: 90,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        ignoresDefenseBoosts: true
    },
    'Scald': {
        bp: 80,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Searing Shot': {
        bp: 100,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true,
        isBullet: true,
    },
    'Secret Sword': {
        bp: 85,
        type: 'Fighting',
        category: 'Special',
        dealsPhysicalDamage: true
    },
    'Sky Drop': {
        bp: 60,
        type: 'Flying',
        category: 'Physical',
        makesContact: true
    },
    'Sludge Wave': {
        bp: 95,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Smack Down': {
        bp: 50,
        type: 'Rock',
        category: 'Physical'
    },
    'Snarl': {
        bp: 55,
        type: 'Dark',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true,
        isSpread: true
    },
    'Stored Power': {
        bp: 20,
        type: 'Psychic',
        category: 'Special',
        zp: 160
    },
    'Storm Throw': {
        bp: 40,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        alwaysCrit: true
    },
    'Struggle Bug': {
        bp: 30,
        type: "Bug",
        category: "Special",
        isSpread: true,
        hasSecondaryEffect: true
    },
    'Synchronoise': {
        bp: 70,
        type: 'Psychic',
        category: 'Special',
        isSpread: true
    },
    'Tail Slap': {
        bp: 25,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        hitRange: [2, 5],
        zp: 140
    },
    'V-create': {
        bp: 180,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        zp: 220
    },
    'Volt Switch': {
        bp: 70,
        type: 'Electric',
        category: 'Special'
    },
    'Wild Charge': {
        bp: 90,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true
    },
    'Fire Pledge': {
        bp: 50,
        type: 'Fire',
        category: 'Special',
        isPledge: true
    },
    'Grass Pledge': {
        bp: 50,
        type: 'Grass',
        category: 'Special',
        isPledge: true
    },
    'Water Pledge': {
        bp: 50,
        type: 'Water',
        category: 'Special',
        isPledge: true
    },
    'Heat Crash': {
        bp: 1,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        zp: 160
    },
    'Final Gambit': {
        bp: 1,
        type: 'Fighting',
        category: 'Special',
        zp: 180
    },
    'Techno Blast': {
        bp: 85,
        type: 'Normal',
        category: 'Special',
    },
    'Hone Claws': {
        type: 'Dark',
        category: 'Status'
    },
    'Wide Guard': {
        type: 'Rock',
        category: 'Status'
    },
    'Guard Split': {
        type: 'Psychic',
        category: 'Status'
    },
    'Power Split': {
        type: 'Psychic',
        category: 'Status'
    },
    'Autotomize': {
        type: 'Steel',
        category: 'Status'
    },
    'Rage Powder': {
        type: 'Bug',
        category: 'Status'
    },
    'Magic Room': {
        type: 'Psychic',
        category: 'Status'
    },
    'Quiver Dance': {
        type: 'Bug',
        category: 'Status'
    },
    'Soak': {
        type: 'Water',
        category: 'Status'
    },
    'Coil': {
        type: 'Poison',
        category: 'Status'
    },
    'Simple Beam': {
        type: 'Normal',
        category: 'Status'
    },
    'Entrainment': {
        type: 'Normal',
        category: 'Status'
    },
    'After You': {
        type: 'Normal',
        category: 'Status'
    },
    'Quick Guard': {
        type: 'Fighting',
        category: 'Status'
    },
    'Ally Switch': {
        type: 'Psychic',
        category: 'Status'
    },
    'Shell Smash': {
        type: 'Normal',
        category: 'Status'
    },
    'Heal Pulse': {
        type: 'Psychic',
        category: 'Status',
        isPulse: true,
        isHealing: true,
    },
    'Shift Gear': {
        type: 'Steel',
        category: 'Status'
    },
    'Quash': {
        type: 'Dark',
        category: 'Status'
    },
    'Reflect Type': {
        type: 'Normal',
        category: 'Status'
    },
    'Work Up': {
        type: 'Normal',
        category: 'Status'
    },
    'Cotton Guard': {
        type: 'Grass',
        category: 'Status'
    },
    'Venoshock': {
        bp: 65,
        type: 'Poison',
        category: 'Special',
    },
    'Wonder Room': {
        type: 'Psychic',
        category: 'Status',
    },
    'Telekinesis': {
        type: 'Psychic',
        category: 'Status',
    },
    'Bestow': {
        type: 'Normal',
        category: 'Status',
    },
    'Flame Burst': {
        bp: 70,
        type: 'Fire',
        category: 'Special',
    },
    'Round': {
        bp: 60,
        type: 'Normal',
        category: 'Special',
        isSound: true,
        canDouble: true,
    },
    'Echoed Voice': {
        bp: 40,
        type: 'Normal',
        category: 'Special',
        isSound: true
    },
    'Chip Away': {
        bp: 70,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        ignoresDefenseBoosts: true,
    },
    'Heart Stamp': {
        bp: 60,
        type: 'Psychic',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Leaf Tornado': {
        bp: 65,
        type: 'Grass',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Steamroller': {
        bp: 65,
        type: 'Bug',
        category: 'Physical',
        makesContact: true,
        miniDoubleBP: true,
        hasSecondaryEffect: true
    },
});

var MOVES_XY = $.extend(true, {}, MOVES_BW, {
    //Past move changes
    'Air Cutter': { bp: 60 },
    'Assurance': { bp: 60 },
    'Aura Sphere': { bp: 80 },
    'Blizzard': { bp: 110 },
    'Chatter': { bp: 65 },
    'Crabhammer': { bp: 100 },
    'Draco Meteor': { bp: 130 },
    'Dragon Pulse': { bp: 85 },
    'Energy Ball': { bp: 90 },
    'Fire Blast': { bp: 110 },
    'Flamethrower': { bp: 90 },
    'Frost Breath': { bp: 60 },
    'Future Sight': { bp: 120 },
    'Heat Wave': { bp: 95 },
    'Hex': { bp: 65 },
    'Hidden Power Bug': { bp: 60 },
    'Hidden Power Dark': { bp: 60 },
    'Hidden Power Dragon': { bp: 60 },
    'Hidden Power Electric': { bp: 60 },
    'Hidden Power Fighting': { bp: 60 },
    'Hidden Power Fire': { bp: 60 },
    'Hidden Power Flying': { bp: 60 },
    'Hidden Power Ghost': { bp: 60 },
    'Hidden Power Grass': { bp: 60 },
    'Hidden Power Ground': { bp: 60 },
    'Hidden Power Ice': { bp: 60 },
    'Hidden Power Poison': { bp: 60 },
    'Hidden Power Psychic': { bp: 60 },
    'Hidden Power Rock': { bp: 60 },
    'Hidden Power Steel': { bp: 60 },
    'Hidden Power Water': { bp: 60 },
    'Hurricane': { bp: 110 },
    'Hydro Pump': { bp: 110 },
    'Ice Beam': { bp: 90 },
    'Incinerate': { bp: 60 },
    'Knock Off': { bp: 65 },
    'Leaf Storm': { bp: 130 },
    'Low Sweep': { bp: 65 },
    'Magma Storm': { bp: 100 },
    'Meteor Mash': { bp: 90 },
    'Muddy Water': { bp: 90 },
    'Overheat': { bp: 130 },
    'Pin Missile': { bp: 25 },
    'Power Gem': { bp: 80 },
    'Rock Tomb': { bp: 60 },
    'Storm Throw': { bp: 60 },
    'Struggle Bug': { bp: 50 },
    'Surf': { bp: 90 },
    'Synchronoise': { bp: 120 },
    'Thief': { bp: 60 },
    'Thunder': { bp: 110 },
    'Thunderbolt': { bp: 90 },
    'Wake-Up Slap': { bp: 70 },
    'Fire Pledge': { bp: 80 },
    'Grass Pledge': { bp: 80 },
    'Water Pledge': { bp: 80 },
    'Techno Blast': { bp: 120, },
    'Fury Cutter': { bp: 40, },
    'Future Sight': { bp: 120, },
    'Vine Whip': { bp: 45, },
    'Lick': { bp: 30, },
    'Smog': { bp: 30, },
    'Skull Bash': { bp: 130, },
    'Snore': { bp: 50 },
    'Bubble': { bp: 40, },
    'Smelling Salts': { bp: 70, },
    'Charm': { type: 'Fairy', },
    'Moonlight': { type: 'Fairy', },
    'Sweet Kiss': { type: 'Fairy', },
    'Body Slam': { miniDoubleBP: true, },
    'Dragon Rush': { miniDoubleBP: true },
    'Shadow Force': { miniDoubleBP: true },
    'Heat Crash': { miniDoubleBP: true },
    'Facade': { ignoresBurn: true },

    //XY moves
    'Boomburst': {
        bp: 140,
        type: 'Normal',
        category: 'Special',
        isSound: true,
        isSpread: true
    },
    'Dazzling Gleam': {
        bp: 80,
        type: 'Fairy',
        category: 'Special',
        isSpread: true
    },
    'Diamond Storm': {
        bp: 100,
        type: 'Rock',
        category: 'Physical',
        hasSecondaryEffect: true,
        isSpread: true
    },
    'Draining Kiss': {
        bp: 50,
        type: 'Fairy',
        category: 'Special',
        makesContact: true,
        isHealing: true,
    },
    'Flying Press': {
        bp: 80,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        miniDoubleBP: true,
        zp: 170
    },
    'Freeze-Dry': {
        bp: 70,
        type: 'Ice',
        category: 'Special',
        hasSecondaryEffect: true
    },
    "Land's Wrath": {
        bp: 90,
        type: 'Ground',
        category: 'Physical',
        isSpread: true,
        zp: 185
    },
    'Moonblast': {
        bp: 95,
        type: 'Fairy',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Oblivion Wing': {
        bp: 80,
        type: 'Flying',
        category: 'Special',
        isHealing: true,
    },
    'Phantom Force': {
        bp: 90,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true,
        miniDoubleBP: true,
    },
    'Play Rough': {
        bp: 90,
        type: 'Fairy',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true
    },
    'Power-Up Punch': {
        bp: 40,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    'Water Shuriken': {
        bp: 15,
        type: 'Water',
        category: 'Physical',
        hitRange: [2, 5],
        isPriority: true,
    },
    'Disarming Voice': {
        bp: 40,
        type: 'Fairy',
        category: 'Special',
        isSound: true,
        isSpread: true,
    },
    'Mystical Fire': {
        bp: 65,
        type: 'Fire',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Parabolic Charge': {
        bp: 50,
        type: 'Electric',
        category: 'Special',
        isSpread: true,
        isHealing: true,
    },
    'Petal Blizzard': {
        bp: 90,
        type: 'Grass',
        category: 'Physical',
        isSpread: true
    },
    'Mat Block': {
        type: 'Fighting',
        category: 'Status'
    },
    'Sticky Web': {
        type: 'Bug',
        category: 'Status',
        isSpread: true,
    },
    'Trick-or-Treat': {
        type: 'Ghost',
        category: 'Status'
    },
    "Forest's Curse": {
        type: 'Grass',
        category: 'Status'
    },
    'Parting Shot': {
        type: 'Dark',
        category: 'Status'
    },
    'Topsy-Turvy': {
        type: 'Dark',
        category: 'Status'
    },
    'Crafty Shield': {
        type: 'Fairy',
        category: 'Status'
    },
    'Grassy Terrain': {
        type: 'Grass',
        category: 'Status'
    },
    'Misty Terrain': {
        type: 'Fairy',
        category: 'Status'
    },
    'Electrify': {
        type: 'Electric',
        category: 'Status'
    },
    "King's Shield": {
        type: 'Steel',
        category: 'Status'
    },
    'Spiky Shield': {
        type: 'Grass',
        category: 'Status'
    },
    'Eerie Impulse': {
        type: 'Electric',
        category: 'Status'
    },
    'Powder': {
        type: 'Bug',
        category: 'Status',
        isPriority: true,
    },
    'Geomancy': {
        type: 'Fairy',
        category: 'Status'
    },
    'Electric Terrain': {
        type: 'Electric',
        category: 'Status'
    },
    'Baby-Doll Eyes': {
        type: 'Fairy',
        category: 'Status',
        isPriority: true,
    },
    'Steam Eruption': {
        bp: 110,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true
    },
    'Rototiller': {
        type: 'Ground',
        category: 'Status',
    },
    'Noble Roar': {
        type: 'Normal',
        category: 'Status',
    },
    'Ion Deluge': {
        type: 'Electric',
        category: 'Status',
    },
    'Flower Shield': {
        type: 'Fairy',
        category: 'Status',
    },
    'Fairy Lock': {
        type: 'Fairy',
        category: 'Status',
    },
    'Aromatic Mist': {
        type: 'Fairy',
        category: 'Status',
    },
    'Venom Drench': {
        type: 'Poison',
        category: 'Status',
    },
    'Magnetic Flux': {
        type: 'Electric',
        category: 'Status',
    },
    'Happy Hour': {
        type: 'Normal',
        category: 'Status',
    },
    'Celebrate': {
        type: 'Normal',
        category: 'Status',
    },
    'Hold Hands': {
        type: 'Normal',
        category: 'Status',
    },
    'Belch': {
        bp: 120,
        type: 'Poison',
        category: 'Special',
    },
    'Fell Stinger': {
        bp: 30,
        type: 'Bug',
        category: 'Physical',
        makesContact: true
    },
    'Fairy Wind': {
        bp: 40,
        type: 'Fairy',
        category: 'Special',
    },
    'Hold Back': {
        bp: 40,
        type: 'Normal',
        category: 'Physical',
        makesContact: true
    },
    'Infestation': {
        bp: 20,
        type: 'Bug',
        category: 'Special',
        makesContact: true
    },
    'Nuzzle': {
        category: 'Physical',
        type: 'Electric',
        bp: 20,
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Hyperspace Hole': {
        category: 'Special',
        type: 'Psychic',
        bp: 80
    },

    //ORAS moves
    'Origin Pulse': {
        bp: 110,
        type: 'Water',
        category: 'Special',
        isSpread: true,
        isPulse: true,
    },
    'Precipice Blades': {
        bp: 120,
        type: 'Ground',
        category: 'Physical',
        isSpread: true
    },
    'Dragon Ascent': {
        bp: 120,
        type: 'Flying',
        category: 'Physical',
        makesContact: true
    },
    'Hyperspace Fury': {
        category: 'Physical',
        type: 'Dark',
        bp: 100
    },

    //Unreleased moves (Thousand Waves and Thousand Arrows not listed because they were usable from Gen 7 onward)
    'Light of Ruin': {
        bp: 140,
        type: 'Fairy',
        category: 'Special',
        hasRecoil: true
    },
});

var ZMOVES_LOOKUP = {
    'Normal':'Breakneck Blitz','Fire':'Inferno Overdrive','Water':'Hydro Vortex',
    'Electric':'Gigavolt Havoc','Grass':'Bloom Doom','Ghost':'Never-Ending Nightmare',
    'Dark':'Black Hole Eclipse','Psychic':'Shattered Psyche','Fighting':'All-Out Pummeling',
    'Steel':'Corkscrew Crash','Ice':'Subzero Slammer','Ground':'Tectonic Rage',
    'Rock':'Continental Crush','Bug':'Savage Spin-Out','Fairy':'Twinkle Tackle',
    'Flying':'Supersonic Skystrike','Dragon':'Devastating Drake','Poison':'Acid Downpour'};

var MOVES_SM = $.extend(true, {}, MOVES_XY, {
    //Past move changes
    'Leech Life': { bp: 80, },
    'Mystical Fire': { bp: 75 },
    'Sucker Punch': { bp: 70, },
    'Flying Press': { bp: 100, },
    'Parabolic Charge': { bp: 65 },
    'Fell Stinger': { bp: 50, },
    'Tackle': { bp: 40 },
    'Phantom Force': { miniDoubleBP: false, },
    'Shadow Force': { miniDoubleBP: false, },
    'Heavy Slam': { miniDoubleBP: true, },
    'Rock Blast': { isBullet: true, },
    'Water Shuriken': { category: 'Special', },

    //SM moves
    'Zing Zap': {
        category: 'Physical',
        type: 'Electric',
        makesContact: true,
        bp: 80,
        hasSecondaryEffect: true,
    },
    'Moongeist Beam': {
        category: 'Special',
        type: 'Ghost',
        bp: 100,
    },
    'Sunsteel Strike': {
        category: 'Physical',
        type: 'Steel',
        makesContact: true,
        bp: 100,
    },
    'Spectral Thief': {
        category: 'Physical',
        type: 'Ghost',
        makesContact: true,
        bp: 90,
    },
    'Prismatic Laser': {
        category: 'Special',
        type: 'Psychic',
        bp: 160,
    },
    'Liquidation': {
        category: 'Physical',
        type: 'Water',
        makesContact: true,
        hasSecondaryEffect: true,
        bp: 85,
    },
    'Accelerock': {
        category: 'Physical',
        type: 'Rock',
        makesContact: true,
        bp: 40,
        isPriority: true,
    },
    'Shadow Bone': {
        category: 'Physical',
        type: 'Ghost',
        bp: 85,
        hasSecondaryEffect: true,
    },
    'Stomping Tantrum': {
        category: 'Physical',
        type: 'Ground',
        makesContact: true,
        bp: 75,
        canDouble: true
    },
    'Psychic Fangs': {
        category: 'Physical',
        type: 'Psychic',
        makesContact: true,
        bp: 85,
        isBite: true,
        ignoreScreens: true,
    },
    'Fleur Cannon': {
        category: 'Special',
        type: 'Fairy',
        bp: 130,
    },
    'Shell Trap': {
        category: 'Special',
        type: 'Fire',
        isSpread: true,
        bp: 150,
    },
    'Genesis Supernova': {
        category: 'Special',
        type: 'Psychic',
        bp: 185,
        isSignatureZ: true,
        hasSecondaryEffect: true,
    },
    'Pulverizing Pancake': {
        category: 'Physical',
        type: 'Normal',
        makesContact: true,
        bp: 210,
        isSignatureZ: true,
    },
    'Stoked Sparksurfer': {
        category: 'Special',
        type: 'Electric',
        bp: 175,
        isSignatureZ: true,
        hasSecondaryEffect: true,
    },
    'Soul-Stealing 7-Star Strike': {
        category: 'Physical',
        type: 'Ghost',
        makesContact: true,
        bp: 195,
        isSignatureZ: true,
    },
    'Oceanic Operetta': {
        category: 'Special',
        type: 'Water',
        bp: 195,
        isSignatureZ: true,
    },
    'Malicious Moonsault': {
        category: 'Physical',
        type: 'Dark',
        bp: 180,
        isSignatureZ: true,
        makesContact: true,
        miniDoubleBP: true,
    },
    'Sinister Arrow Raid': {
        category: 'Physical',
        type: 'Ghost',
        bp: 180,
        isSignatureZ: true,
    },
    'Guardian of Alola': {
        category: 'Special',
        type: 'Fairy',
        bp: 1,
        isSignatureZ: true,
    },
    'Brutal Swing': {
        category: 'Physical',
        type: 'Dark',
        makesContact: true,
        bp: 60,
        isSpread: true,
    },
    'Dragon Hammer': {
        category: 'Physical',
        type: 'Dragon',
        makesContact: true,
        bp: 90,
    },
    'Clanging Scales': {
        category: 'Special',
        type: 'Dragon',
        bp: 110,
        isSound: true,
        isSpread: true,
    },
    'Beak Blast': {
        category: 'Physical',
        type: 'Flying',
        bp: 100,
        isBullet: true,
    },
    'Trop Kick': {
        category: 'Physical',
        type: 'Grass',
        makesContact: true,
        bp: 70,
        hasSecondaryEffect: true,
    },
    'Core Enforcer': {
        category: 'Special',
        type: 'Dragon',
        bp: 100,
        isSpread: true,
        zp: 140
    },
    'Revelation Dance':{
        category: 'Special',
        type: 'Normal',
        bp: 90,
    },
    'Smart Strike':{
        category: 'Physical',
        type: 'Steel',
        makesContact: true,
        bp: 70,
    },
    'Multi-Attack': {
        category: 'Physical',
        type: 'Normal',
        makesContact: true,
        bp: 90,
        zp: 185,
    },
    'Burn Up': {
        category: 'Special',
        type: 'Fire',
        bp: 130,
    },
    'Power Trip': {
        category: 'Physical',
        type: 'Dark',
        makesContact: true,
        bp: 20,
        zp: 160
    },
    'Fire Lash': {
        category: 'Physical',
        type: 'Fire',
        makesContact: true,
        bp: 80,
        hasSecondaryEffect: true,
    },
    'Lunge': {
        category: 'Physical',
        type: 'Bug',
        makesContact: true,
        bp: 80,
        hasSecondaryEffect: true,
    },
    'Anchor Shot': {
        category: 'Physical',
        type: 'Steel',
        makesContact: true,
        hasSecondaryEffect: true,
        bp: 80,
    },
    'Pollen Puff': {
        category: 'Special',
        type: 'Bug',
        bp: 90,
        isBullet: true,
    },
    'Throat Chop': {
        category: 'Physical',
        type: 'Dark',
        makesContact: true,
        hasSecondaryEffect: true,
        bp: 80
    },
    'Solar Blade': {
        category: 'Physical',
        type: 'Grass',
        makesContact: true,
        bp: 125,
    },
    'High Horsepower': {
        category: 'Physical',
        type: 'Ground',
        makesContact: true,
        bp: 95,
    },
    'Ice Hammer': {
        category: 'Physical',
        type: 'Ice',
        makesContact: true,
        bp: 100,
        isPunch: true,
    },
    'First Impression': {
        category: 'Physical',
        type: 'Bug',
        makesContact: true,
        bp: 90,
        isPriority: true,
    },
    'Sparkling Aria': {
        category: 'Special',
        type: 'Water',
        bp: 90,
        isSpread: true,
        hasSecondaryEffect: true,
        isSound: true,
    },
    'Darkest Lariat': {
        category: 'Physical',
        type: 'Dark',
        makesContact: true,
        bp: 85,
        ignoresDefenseBoosts: true
    },
    'Spirit Shackle': {
        category: 'Physical',
        type: 'Ghost',
        bp: 80,
        hasSecondaryEffect: true,
    },
    "Nature's Madness":{
        bp: 1,
        category: 'Special',
        type: 'Fairy',
    },
    'Shore Up': {
        type: 'Ground',
        category: 'Status',
        //isHealing: true,
    },
    'Baneful Bunker': {
        type: 'Poison',
        category: 'Status'
    },
    'Floral Healing': {
        type: 'Fairy',
        category: 'Status',
        isHealing: true,
    },
    'Strength Sap': {
        type: 'Grass',
        category: 'Status',
        isHealing: true,
    },
    'Spotlight': {
        type: 'Normal',
        category: 'Status',
        isPriority: true,
    },
    'Psychic Terrain': {
        type: 'Psychic',
        category: 'Status'
    },
    'Speed Swap': {
        type: 'Psychic',
        category: 'Status'
    },
    'Instruct': {
        type: 'Psychic',
        category: 'Status'
    },
    'Aurora Veil': {
        type: 'Ice',
        category: 'Status'
    },
    'Extreme Evoboost': {
        type: 'Normal',
        category: 'Status',
        isSignatureZ: true,
    },
    'Catastropika': {
        category: 'Physical',
        type: 'Electric',
        makesContact: true,
        bp: 210,
        isSignatureZ: true,
    },
    '10,000,000 Volt Thunderbolt': {
        category: 'Special',
        type: 'Electric',
        bp: 195,
        isSignatureZ: true,
    },
    'Breakneck Blitz': {
        type: 'Normal'
    },
    'Inferno Overdrive': {
        type: 'Fire'
    },
    'Subzero Slammer': {
        type: 'Ice'
    },
    'Hydro Vortex': {
        type: 'Water'
    },
    'Gigavolt Havoc': {
        type: 'Electric'
    },
    'All-Out Pummeling': {
        type: 'Fighting'
    },
    'Bloom Doom': {
        type: 'Grass'
    },
    'Shattered Psyche': {
        type: 'Psychic'
    },
    'Savage Spin-Out': {
        type: 'Bug'
    },
    'Acid Downpour': {
        type: 'Poison'
    },
    'Supersonic Skystrike': {
        type: 'Flying'
    },
    'Devastating Drake': {
        type: 'Dragon'
    },
    'Continental Crush': {
        type: 'Rock'
    },
    'Tectonic Rage': {
        type: 'Ground'
    },
    'Corkscrew Crash': {
        type: 'Steel'
    },
    'Twinkle Tackle': {
        type: 'Fairy'
    },
    'Never-Ending Nightmare': {
        type: 'Ghost'
    },
    'Black Hole Eclipse': {
        type: 'Dark'
    },
    'Thousand Arrows':{
        category: 'Physical',
        type: 'Ground',
        bp: 90,
        isSpread: true,
        zp: 180
    },
    'Thousand Waves':{
        category: 'Physical',
        type: 'Ground',
        bp: 90,
        isSpread: true
    },
    'Toxic Thread': {
        type: 'Poison',
        category: 'Status',
    },
    'Laser Focus': {
        type: 'Normal',
        category: 'Status',
    },
    'Gear Up': {
        type: 'Steel',
        category: 'Status',
    },
    'Purify': {
        type: 'Poison',
        category: 'Status',
        isHealing: true,
    },
    'Tearful Look': {
        type: 'Normal',
        category: 'Status',
    },
    'Leafage': {
        bp: 40,
        type: 'Grass',
        category: 'Physical',
    },

    //USUM moves
    'Mind Blown': {
        bp: 150,
        type: 'Fire',
        category: 'Special',
        isSpread: true
    },
    'Plasma Fists': {
        bp: 100,
        type: 'Electric',
        category: 'Physical',
        isPunch: true,
        makesContact: true
    },
    'Photon Geyser': {
        bp: 100,
        type: 'Psychic',
        category: 'Special',
    },
    'Light That Burns the Sky': {
        bp: 200,
        type: 'Psychic',
        category: 'Special',
        isSignatureZ: true,
    },
    'Searing Sunraze Smash': {
        bp: 200,
        type: 'Steel',
        category: 'Physical',
        isSignatureZ: true,
        makesContact: true
    },
    'Menacing Moonraze Maelstrom': {
        bp: 200,
        type: 'Ghost',
        category: 'Special',
        isSignatureZ: true,
    },
    "Let's Snuggle Forever": {
        bp: 190,
        type: 'Fairy',
        category: 'Physical',
        isSignatureZ: true,
        makesContact: true
    },
    'Splintered Stormshards': {
        bp: 190,
        type: 'Rock',
        category: 'Physical',
        isSignatureZ: true,
    },
    'Clangorous Soulblaze': {
        bp: 185,
        type: 'Dragon',
        category: 'Special',
        isSound: true,
        isSpread: true,
        isSignatureZ: true,
        hasSecondaryEffect: true,
    },
});

var MOVES_SS = $.extend(true, {}, MOVES_SM, {
    //Past move changes
    'Multi-Attack': { bp: 120 },
    'Rapid Spin': {
        bp: 50,
        hasSecondaryEffect: true,
    },

    //LGPE moves
    'Double Iron Bash': {
        bp: 60,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
        hitRange: 2,
        isPunch: true,
        hasSecondaryEffect: true,
    },

    //SwSh moves
    'Dynamax Cannon': {
        bp: 100,
        type: 'Dragon',
        category: 'Special',
    },
    'Snipe Shot': {
        bp: 80,
        type: 'Water',
        category: 'Special',
    },
    'Jaw Lock': {
        bp: 80,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        isBite: true,
    },
    'Dragon Darts': {
        bp: 50,
        type: 'Dragon',
        category: 'Physical',
        hitRange: [1, 2]
    },
    'Bolt Beak': {
        bp: 85,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        canDouble: true
    },
    'Fishious Rend': {
        bp: 85,
        type: 'Water',
        category: 'Physical',
        isBite: true,
        makesContact: true,
        canDouble: true
    },
    'Body Press': {
        bp: 80,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
    },
    'Drum Beating': {
        bp: 80,
        type: 'Grass',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Snap Trap': {
        bp: 35,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
    },
    'Pyro Ball': {
        bp: 120,
        type: 'Fire',
        category: 'Physical',
        hasSecondaryEffect: true,
        isBullet: true,
    },
    'Behemoth Blade': {
        bp: 100,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
    },
    'Behemoth Bash': {
        bp: 100,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
    },
    'Aura Wheel': {
        bp: 110,
        type: 'Electric',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Breaking Swipe': {
        bp: 60,
        type: 'Dragon',
        category: 'Physical',
        isSpread: true,
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Branch Poke': {
        bp: 40,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
    },
    'Overdrive': {
        bp: 80,
        type: 'Electric',
        category: 'Special',
        isSound: true,
        isSpread: true
    },
    'Apple Acid': {
        bp: 80,
        type: 'Grass',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Grav Apple': {
        bp: 80,
        type: 'Grass',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Spirit Break': {
        bp: 75,
        type: 'Fairy',
        category: 'Physical',
        hasSecondaryEffect: true,
        makesContact: true,
    },
    'Strange Steam': {
        bp: 90,
        type: 'Fairy',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'False Surrender': {
        bp: 80,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
    },
    'Meteor Assault': {
        bp: 150,
        type: 'Fighting',
        category: 'Physical',
    },
    'Eternabeam': {
        bp: 160,
        type: 'Dragon',
        category: 'Special',
    },
    'Steel Beam': {
        bp: 140,
        type: 'Steel',
        category: 'Special',
    },
    'No Retreat': {
        type: 'Fighting',
        category: 'Status'
    },
    'Octolock': {
        type: 'Fighting',
        category: 'Status'
    },
    'Clangorous Soul': {
        type: 'Dragon',
        category: 'Status'
    },
    'Decorate': {
        type: 'Fairy',
        category: 'Status'
    },
    'Life Dew': {
        type: 'Water',
        category: 'Status'
    },
    'Stuff Cheeks': {
        type: 'Normal',
        category: 'Status'
    },
    'Tar Shot': {
        type: 'Rock',
        category: 'Status',
    },
    'Magic Powder': {
        type: 'Psychic',
        category: 'Status',
    },
    'Teatime': {
        type: 'Normal',
        category: 'Status',
    },
    'Court Change': {
        type: 'Normal',
        category: 'Status',
    },
    'Max Strike': {
        type: 'Normal'
    },
    'Max Flare': {
        type: 'Fire'
    },
    'Max Hailstorm': {
        type: 'Ice'
    },
    'Max Geyser': {
        type: 'Water'
    },
    'Max Lightning': {
        type: 'Electric'
    },
    'Max Knuckle': {
        type: 'Fighting'
    },
    'Max Overgrowth': {
        type: 'Grass'
    },
    'Max Mindstorm': {
        type: 'Psychic'
    },
    'Max Flutterby': {
        type: 'Bug'
    },
    'Max Ooze': {
        type: 'Poison'
    },
    'Max Airstream': {
        type: 'Flying'
    },
    'Max Wyrmwind': {
        type: 'Dragon'
    },
    'Max Rockfall': {
        type: 'Rock'
    },
    'Max Quake': {
        type: 'Ground'
    },
    'Max Steelspike': {
        type: 'Steel'
    },
    'Max Starfall': {
        type: 'Fairy'
    },
    'Max Phantasm': {
        type: 'Ghost'
    },
    'Max Darkness': {
        type: 'Dark'
    },
    'G-Max Wildfire': {
        type: 'Fire'
    },
    'G-Max Befuddle': {
        type: 'Bug'
    },
    'G-Max Volt Crash': {
        type: 'Electric'
    },
    'G-Max Gold Rush': {
        type: 'Normal'
    },
    'G-Max Chi Strike': {
        type: 'Fighting'
    },
    'G-Max Terror': {
        type: 'Ghost'
    },
    'G-Max Foam Burst': {
        type: 'Water'
    },
    'G-Max Resonance': {
        type: 'Ice'
    },
    'G-Max Cuddle': {
        type: 'Normal'
    },
    'G-Max Replenish': {
        type: 'Normal'
    },
    'G-Max Malodor': {
        type: 'Poison'
    },
    'G-Max Meltdown': {
        type: 'Steel'
    },
    'G-Max Wind Rage': {
        type: 'Flying'
    },
    'G-Max Gravitas': {
        type: 'Psychic'
    },
    'G-Max Stonesurge': {
        type: 'Water'
    },
    'G-Max Volcalith': {
        type: 'Rock'
    },
    'G-Max Tartness': {
        type: 'Grass'
    },
    'G-Max Sweetness': {
        type: 'Grass'
    },
    'G-Max Sandblast': {
        type: 'Ground'
    },
    'G-Max Stun Shock': {
        type: 'Electric'
    },
    'G-Max Centinferno': {
        type: 'Fire'
    },
    'G-Max Smite': {
        type: 'Fairy'
    },
    'G-Max Snooze': {
        type: 'Dark'
    },
    'G-Max Finale': {
        type: 'Fairy'
    },
    'G-Max Steelsurge': {
        type: 'Steel'
    },
    'G-Max Depletion': {
        type: 'Dragon'
    },

    //Isle of Armor moves
    'G-Max Vine Lash': {
        type: 'Grass'
    },
    'G-Max Cannonade': {
        type: 'Water'
    },
    'G-Max Drum Solo': {
        type: 'Grass',
        bp: 160,
    },
    'G-Max Fireball': {
        type: 'Fire',
        bp: 160,
    },
    'G-Max Hydrosnipe': {
        type: 'Water',
        bp: 160,
    },
    'G-Max One Blow': {
        type: 'Dark'
    },
    'G-Max Rapid Flow': {
        type: 'Water'
    },
    'Burning Jealousy': {
        bp: 70,
        type: 'Fire',
        category: 'Special',
        isSpread: true,
        hasSecondaryEffect: true,
    },
    'Dual Wingbeat': {
        bp: 40,
        type: 'Flying',
        category: 'Physical',
        makesContact: true,
        hitRange: 2,
    },
    'Expanding Force': {
        bp: 80,
        type: 'Psychic',
        category: 'Special'
    },
    'Flip Turn': {
        bp: 60,
        type: 'Water',
        category: 'Physical',
        makesContact: true
    },
    'Grassy Glide': {
        bp: 70,
        type: 'Grass',
        category: 'Physical',
        makesContact: true
    },
    'Lash Out': {
        bp: 75,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        canDouble: true
    },
    'Meteor Beam': {
        bp: 120,
        type: 'Rock',
        category: 'Special'
    },
    'Misty Explosion': {
        bp: 100,
        type: 'Fairy',
        category: 'Special',
        isSpread: true
    },
    'Poltergeist': {
        bp: 110,
        type: 'Ghost',
        category:'Physical'
    },
    'Rising Voltage': {
        bp: 70,
        type: 'Electric',
        category: 'Special'
    },
    'Scale Shot': {
        bp: 25,
        type: 'Dragon',
        category: 'Physical',
        hitRange: [2, 5],
    },
    'Scorching Sands': {
        bp: 70,
        type: 'Ground',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Shell Side Arm': {
        bp: 90,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Skitter Smack': {
        bp: 70,
        type: 'Bug',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Steel Roller': {
        bp: 130,
        type: 'Steel',
        category: 'Physical',
        makesContact: true
    },
    'Surging Strikes': {
        bp: 25,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        alwaysCrit: true,
        hitRange: 3,
        isPunch: true,
    },
    'Terrain Pulse': {
        bp: 50,
        type: 'Normal',
        category: 'Special',
        isPulse: true
    },
    'Triple Axel': {
        bp: 20,
        type: 'Ice',
        category: 'Physical',
        makesContact: true,
        isTripleHit: true,
        hitRange: [1, 3]
    },
    'Wicked Blow': {
        bp: 80,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        alwaysCrit: true,
        isPunch: true,
    },
    'Coaching': {
        type: 'Fighting',
        category: 'Status'
    },
    'Jungle Healing': {
        type: 'Grass',
        category: 'Status'
    },
    'Corrosive Gas': {
        type: 'Poison',
        category: 'Status',
        isSpread: true,
    },

    //Crown Tundra moves
    'Astral Barrage': {
        bp: 120,
        type: 'Ghost',
        category: 'Special',
        isSpread: true
    },
    'Dragon Energy': {
        bp: 150,
        type: 'Dragon',
        category: 'Special',
        isSpread: true
    },
    'Eerie Spell': {
        bp: 80,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Fiery Wrath': {
        bp: 90,
        type: 'Dark',
        category: 'Special',
        isSpread: true,
        hasSecondaryEffect: true,
    },
    'Freezing Glare': {
        bp: 90,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Glacial Lance': {
        bp: 130,
        type: 'Ice',
        category: 'Physical',
        isSpread: true
    },
    'Thunder Cage': {
        bp: 80,
        type: 'Electric',
        category: 'Special',
    },
    'Thunderous Kick': {
        bp: 90,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
    },
});

var MAXMOVES_LOOKUP = {
    'Normal':'Max Strike','Fire':'Max Flare','Water':'Max Geyser',
    'Electric':'Max Lightning','Grass':'Max Overgrowth','Ghost':'Max Phantasm',
    'Dark':'Max Darkness','Psychic':'Max Mindstorm','Fighting':'Max Knuckle',
    'Steel':'Max Steelspike','Ice':'Max Hailstorm','Ground':'Max Quake',
    'Rock':'Max Rockfall','Bug':'Max Flutterby','Fairy':'Max Starfall',
    'Flying':'Max Airstream','Dragon':'Max Wyrmwind','Poison':'Max Ooze'
};

var G_MAXMOVES_TYPE = {
    'Charizard-Gmax':'Fire',
    'Butterfree-Gmax':'Bug',
    'Pikachu-Gmax':'Electric',
    'Meowth-Gmax':'Normal',
    'Machamp-Gmax':'Fighting',
    'Gengar-Gmax':'Ghost',
    'Kingler-Gmax':'Water',
    'Lapras-Gmax':'Ice',
    'Eevee-Gmax':'Normal',
    'Snorlax-Gmax':'Normal',
    'Garbodor-Gmax':'Poison',
    'Melmetal-Gmax':'Steel',
    'Corviknight-Gmax':'Flying',
    'Orbeetle-Gmax':'Psychic',
    'Drednaw-Gmax':'Water',
    'Coalossal-Gmax':'Rock',
    'Flapple-Gmax':'Grass',
    'Appletun-Gmax':'Grass',
    'Sandaconda-Gmax':'Ground',
    'Toxtricity-Gmax':'Electric',
    'Centiskorch-Gmax':'Fire',
    'Hatterene-Gmax':'Fairy',
    'Grimmsnarl-Gmax':'Dark',
    'Alcremie-Gmax':'Fairy',
    'Copperajah-Gmax':'Steel',
    'Duraludon-Gmax':'Dragon',
    'Venusaur-Gmax':'Grass',
    'Blastoise-Gmax':'Water',
    'Rillaboom-Gmax':'Grass',
    'Cinderace-Gmax':'Fire',
    'Inteleon-Gmax':'Water',
    'Urshifu-Single Strike-Gmax':'Dark',
    'Urshifu-Rapid Strike-Gmax':'Water',
    }

var G_MAXMOVES_LOOKUP = {
    'Charizard-Gmax': 'G-Max Wildfire',
    'Butterfree-Gmax': 'G-Max Befuddle',
    'Pikachu-Gmax': 'G-Max Volt Crash',
    'Meowth-Gmax': 'G-Max Gold Rush',
    'Machamp-Gmax': 'G-Max Chi Strike',
    'Gengar-Gmax': 'G-Max Terror',
    'Kingler-Gmax': 'G-Max Foam Burst',
    'Lapras-Gmax': 'G-Max Resonance',
    'Eevee-Gmax': 'G-Max Cuddle',
    'Snorlax-Gmax': 'G-Max Replenish',
    'Garbodor-Gmax': 'G-Max Malodor',
    'Melmetal-Gmax': 'G-Max Meltdown',
    'Corviknight-Gmax': 'G-Max Wind Rage',
    'Orbeetle-Gmax': 'G-Max Gravitas',
    'Drednaw-Gmax': 'G-Max Stonesurge',
    'Coalossal-Gmax': 'G-Max Volcalith',
    'Flapple-Gmax': 'G-Max Tartness',
    'Appletun-Gmax': 'G-Max Sweetness',
    'Sandaconda-Gmax': 'G-Max Sandblast',
    'Toxtricity-Gmax': 'G-Max Stun Shock',
    'Centiskorch-Gmax': 'G-Max Centinferno',
    'Hatterene-Gmax': 'G-Max Smite',
    'Grimmsnarl-Gmax': 'G-Max Snooze',
    'Alcremie-Gmax': 'G-Max Finale',
    'Copperajah-Gmax': 'G-Max Steelsurge',
    'Duraludon-Gmax': 'G-Max Depletion',
    'Venusaur-Gmax': 'G-Max Vine Lash',
    'Blastoise-Gmax': 'G-Max Cannonade',
    'Rillaboom-Gmax': 'G-Max Drum Solo',
    'Cinderace-Gmax': 'G-Max Fireball',
    'Inteleon-Gmax': 'G-Max Hydrosnipe',
    'Urshifu-Single Strike-Gmax': 'G-Max One Blow',
    'Urshifu-Rapid Strike-Gmax': 'G-Max Rapid Flow',
};

var MOVES_SS_NATDEX = $.extend(true, {}, MOVES_SS, {});

[
    //Z-moves
    'Breakneck Blitz', 'Inferno Overdrive', 'Bloom Doom', 'Hydro Vortex', 'Gigavolt Havoc', 'Never-Ending Nightmare',
    'Black Hole Eclipse', 'Shattered Psyche', 'All-Out Pummeling', 'Corkscrew Crash', 'Subzero Slammer', 'Tectonic Rage',
    'Continental Crush', 'Savage Spin-Out', 'Twinkle Tackle', 'Supersonic Skystrike', 'Devastating Drake', 'Acid Downpour',
    'Catastropika', 'Clangorous Soulblaze', 'Genesis Supernova', "Let's Snuggle Forever", 'Light That Burns the Sky',
    'Malicious Moonsault', 'Menacing Moonraze Maelstrom', 'Oceanic Operetta', 'Pulverizing Pancake', 'Searing Sunraze Smash',
    'Sinister Arrow Raid', 'Soul-Stealing 7-Star Strike', 'Splintered Stormshards', 'Stoked Sparksurfer', 'Extreme Evoboost', '10,000,000 Volt Thunderbolt',
    //Hidden Power
    'Hidden Power Fire', 'Hidden Power Water', 'Hidden Power Grass', 'Hidden Power Electric', 'Hidden Power Psychic',
    'Hidden Power Ice', 'Hidden Power Dragon', 'Hidden Power Dark', 'Hidden Power Fighting', 'Hidden Power Flying',
    'Hidden Power Poison', 'Hidden Power Ground', 'Hidden Power Rock', 'Hidden Power Bug', 'Hidden Power Ghost', 'Hidden Power Steel',
    //deleted SwSh and BDSP moves
    'Feint Attack', 'Frustration', 'Jump Kick', 'Mud Bomb', 'Natural Gift', 'Pursuit', 'Return', 'Signal Beam', 'Sky Drop',
    'Sky Uppercut', 'Synchronoise', 'Twineedle', 'Wake-Up Slap', 'Barrage', 'Bone Club', 'Bubble', 'Chip Away', 'Clamp',
    'Comet Punch', 'Constrict', 'Dizzy Punch', 'Double Slap', 'Dragon Rage', 'Egg Bomb', 'Flame Burst', 'Heart Stamp',
    'Ice Ball', 'Karate Chop', 'Magnet Bomb', 'Magnitude', 'Mirror Shot', 'Needle Arm', 'Ominous Wind', 'Psywave', 'Punishment',
    'Rage', 'Razor Wind', 'Rolling Kick', 'Secret Power', 'Silver Wind', 'Smelling Salts', 'Sonic Boom', 'Spike Cannon',
    'Steamroller', 'Trump Card', 'Wring Out', 'Meditate', 'Barrier', 'Bide', 'Mirror Move', 'Flash', 'Sharpen', 'Spider Web', 'Nightmare',
    'Foresight', 'Assist', 'Refresh', 'Snatch', 'Camouflage', 'Mud Sport', 'Odor Sleuth', 'Grass Whistle', 'Water Sport', 'Miracle Eye',
    'Embargo', 'Heal Block', 'Lucky Chant', 'Me First', 'Captivate', 'Heal Order', 'Telekinesis', 'Bestow', 'Rototiller', 'Ion Deluge',
    'Spotlight', 'Beak Blast', 'Ice Hammer', 'Light of Ruin', 'Powder', 'Revelation Dance', 'Hyper Fang', 'Relic Song',
    'Hyperspace Hole','Hyperspace Fury',
].forEach(e => delete MOVES_SS[e]);

var MOVES_SV_NATDEX = $.extend(true, {}, MOVES_SS_NATDEX, {
    //Past move changes
    'Cut': { isSlice: true, },
    'Razor Leaf': { isSlice: true, },
    'Slash': { isSlice: true, },
    'Fury Cutter': { isSlice: true, },
    'Air Cutter': {
        isSlice: true,
        isWind: true,
    },
    'Aerial Ace': { isSlice: true, },
    'Leaf Blade': { isSlice: true, },
    'Night Slash': { isSlice: true, },
    'Air Slash': { isSlice: true, },
    'X-Scissor': { isSlice: true, },
    'Psycho Cut': { isSlice: true, },
    'Cross Poison': { isSlice: true, },
    'Sacred Sword': { isSlice: true, },
    'Razor Shell': { isSlice: true, },
    'Solar Blade': { isSlice: true, },
    'Behemoth Blade': { isSlice: true, },
    'Gust': { isWind: true, },
    'Blizzard': { isWind: true, },
    'Icy Wind': { isWind: true, },
    'Twister': { isWind: true, },
    'Heat Wave': { isWind: true, },
    'Hurricane': { isWind: true, },
    'Petal Blizzard': { isWind: true, },
    'Fairy Wind': { isWind: true, },
    'Aeroblast': { isWind: true, },
    'Wicked Blow': { bp: 75, },
    'Grassy Glide': { bp: 55, },
    'Glacial Lance': { bp: 120, },
    'Luster Purge': { bp: 95, },
    'Mist Ball': { bp: 95, },

    //PLA moves
    'Dire Claw': {
        bp: 80,
        type: 'Poison',
        category: 'Physical',
        hasSecondaryEffect: true,
        makesContact: true,
    },
    'Psyshield Bash': {
        bp: 70,
        type: 'Psychic',
        category: 'Physical',
        hasSecondaryEffect: true,
        makesContact: true,
    },
    'Power Shift': {
        type: 'Normal',
        category: 'Status',
    },
    'Stone Axe': {
        bp: 65,
        type: 'Rock',
        category: 'Physical',
        makesContact: true,
        isSlice: true,
        hasSecondaryEffect: true,
    },
    'Springtide Storm': {
        bp: 100,
        type: 'Fairy',
        category: 'Special',
        hasSecondaryEffect: true,
        isWind: true,
        isSpread: true,
    },
    'Mystical Power': {
        bp: 70,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Raging Fury': {
        bp: 120,
        type: 'Fire',
        category: 'Physical',
    },
    'Wave Crash': {
        bp: 120,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true,
    },
    'Chloroblast': {
        bp: 150,
        type: 'Grass',
        category: 'Special',
        hasRecoil: true,
    },
    'Mountain Gale': {
        bp: 100,
        type: 'Ice',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Victory Dance': {
        type: 'Fighting',
        category: 'Status',
    },
    'Headlong Rush': {
        bp: 120,
        type: 'Ground',
        category: 'Physical',
        isPunch: true,
        makesContact: true,
    },
    'Barb Barrage': {
        bp: 60,
        type: 'Poison',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Esper Wing': {
        bp: 80,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Bitter Malice': {
        bp: 75,
        type: 'Ghost',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Shelter': {
        type: 'Steel',
        category: 'Status',
    },
    'Triple Arrows': {
        bp: 90,
        type: 'Fighting',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Infernal Parade': {
        bp: 60,
        type: 'Ghost',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Ceaseless Edge': {
        bp: 65,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        isSlice: true,
        hasSecondaryEffect: true,
    },
    'Bleakwind Storm': {
        bp: 100,
        type: 'Flying',
        category: 'Special',
        hasSecondaryEffect: true,
        isWind: true,
        isSpread: true,
    },
    'Wildbolt Storm': {
        bp: 100,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true,
        isWind: true,
        isSpread: true,
    },
    'Sandsear Storm': {
        bp: 100,
        type: 'Ground',
        category: 'Special',
        hasSecondaryEffect: true,
        isWind: true,
        isSpread: true,
    },
    'Lunar Blessing': {
        type: 'Psychic',
        category: 'Status',
        //isHealing: true,
    },
    'Take Heart': {
        type: 'Psychic',
        category: 'Status',
    },

    //SV moves
    'Tera Blast': {
        bp: 80,
        type: 'Normal',
        category: 'Special',
    },
    'Silk Trap': {
        type: 'Bug',
        category: 'Status',
    },
    'Axe Kick': {
        bp: 120,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        hasRecoil: true,
    },
    'Last Respects': {
        bp: 50,
        type: 'Ghost',
        category: 'Physical',
        linearAddBP: true,
    },
    'Lumina Crash': {
        bp: 80,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Order Up': {
        bp: 80,
        type: 'Dragon',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Jet Punch': {
        bp: 60,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        isPunch: true,
        isPriority: true,
    },
    'Spicy Extract': {
        type: 'Grass',
        category: 'Status',
    },
    'Spin Out': {
        bp: 100,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
    },
    'Population Bomb': {
        bp: 20,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        isSlice: true,
        hitRange: [1, 10]
    },
    'Ice Spinner': {
        bp: 80,
        type: 'Ice',
        category: 'Physical',
        makesContact: true,
    },
    'Glaive Rush': {
        bp: 120,
        type: 'Dragon',
        category: 'Physical',
        makesContact: true,
    },
    'Revival Blessing': {
        type: 'Normal',
        category: 'Status',
        //isHealing: true,
    },
    'Salt Cure': {
        bp: 40,
        type: 'Rock',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Triple Dive': {
        bp: 30,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        hitRange: 3,
    },
    'Mortal Spin': {
        bp: 30,
        type: 'Poison',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
        isSpread: true,
    },
    'Doodle': {
        type: 'Normal',
        category: 'Status',
    },
    'Fillet Away': {
        type: 'Normal',
        category: 'Status',
    },
    'Kowtow Cleave': {
        bp: 85,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        isSlice: true,
    },
    'Flower Trick': {
        bp: 70,
        type: 'Grass',
        category: 'Physical',
        alwaysCrit: true,
    },
    'Torch Song': {
        bp: 80,
        type: 'Fire',
        category: 'Special',
        isSound: true,
        hasSecondaryEffect: true,
    },
    'Aqua Step': {
        bp: 80,
        type: 'Water',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Raging Bull': {
        bp: 90,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
        ignoreScreens: true,
    },
    'Make It Rain': {
        bp: 120,
        type: 'Steel',
        category: 'Special',
        isSpread: true,
    },
    'Ruination': {
        bp: 1,
        type: 'Dark',
        category: 'Special',
    },
    'Collision Course': {
        bp: 100,
        type: 'Fighting',
        category: 'Physical',
        makesContact: true,
    },
    'Electro Drift': {
        bp: 100,
        type: 'Electric',
        category: 'Special',
        makesContact: true,
    },
    'Shed Tail': {
        type: 'Normal',
        category: 'Status',
    },
    'Chilly Reception': {
        type: 'Ice',
        category: 'Status',
    },
    'Tidy Up': {
        type: 'Normal',
        category: 'Status',
    },
    'Snowscape': {
        type: 'Ice',
        category: 'Status',
    },
    'Pounce': {
        bp: 50,
        type: 'Bug',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Trailblaze': {
        bp: 50,
        type: 'Grass',
        category: 'Physical',
        makesContact: true,
        hasSecondaryEffect: true,
    },
    'Chilling Water': {
        bp: 50,
        type: 'Water',
        category: 'Special',
        hasSecondaryEffect: true,
    },
    'Hyper Drill': {
        bp: 100,
        type: 'Normal',
        category: 'Physical',
        makesContact: true,
    },
    'Twin Beam': {
        bp: 40,
        type: 'Psychic',
        category: 'Special',
        hitRange: 2,
    },
    'Rage Fist': {
        bp: 50,
        type: 'Ghost',
        category: 'Physical',
        makesContact: true,
        isPunch: true,
        linearAddBP: true,
    },
    'Armor Cannon': {
        bp: 120,
        type: 'Fire',
        category: 'Special',
    },
    'Bitter Blade': {
        bp: 90,
        type: 'Fire',
        category: 'Physical',
        makesContact: true,
        isSlice: true,
        isHealing: true,
    },
    'Double Shock': {
        bp: 120,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
    },
    'Gigaton Hammer': {
        bp: 160,
        type: 'Steel',
        category: 'Physical',
    },
    'Comeuppance': {
        bp: 1,
        type: 'Dark',
        category: 'Physical',
        makesContact: true,
        usesOppMoves: true,
    },
    'Aqua Cutter': {
        bp: 70,
        type: 'Water',
        category: 'Physical',
        isSlice: true,
    },
    'Blazing Torque': {
        bp: 80,
        type: 'Fire',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Wicked Torque': {
        bp: 80,
        type: 'Dark',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Noxious Torque': {
        bp: 100,
        type: 'Poison',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Combat Torque': {
        bp: 100,
        type: 'Fighting',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Magical Torque': {
        bp: 100,
        type: 'Fairy',
        category: 'Physical',
        hasSecondaryEffect: true,
    },
    'Hydro Steam': {
        bp: 80,
        type: 'Water',
        category: 'Special',
    },
    'Psyblade': {
        bp: 80,
        type: 'Psychic',
        category: 'Physical',
        isSlice: true,
    },

    //Teal Mask new additions
    'Blood Moon': {
        bp: 140,
        type: 'Normal',
        category: 'Special',
    },
    'Matcha Gotcha': {
        bp: 80,
        type: 'Grass',
        category: 'Special',
        hasSecondaryEffect: true,
        isSpread: true,
        isHealing: true,
    },
    'Syrup Bomb': {
        bp: 60,
        type: 'Grass',
        category: 'Special',
        hasSecondaryEffect: true,
        isBullet: true,
    },
    'Ivy Cudgel': {
        bp: 100,
        type: 'Grass',
        category: 'Physical',
    },

    //Indigo Disk new additions
    'Electro Shot': {
        bp: 130,
        type: 'Electric',
        category: 'Special',
        hasSecondaryEffect: true,   //no downsides with Sheer Force
    },
    'Tera Starstorm': {
        bp: 120,
        type: 'Normal',
        category: 'Special',
    },
    'Fickle Beam': {
        bp: 80,
        type: 'Dragon',
        category: 'Special',
        canDouble: true,
    },
    'Burning Bulwark': {
        type: 'Fire',
        category: 'Status',
        isPriority: true,
    },
    'Thunderclap': {
        bp: 70,
        type: 'Electric',
        category: 'Special',
        isPriority: true,
    },
    'Mighty Cleave': {
        bp: 95,
        type: 'Rock',
        category: 'Physical',
        isSlice: true,
        makesContact: true,
    },
    'Tachyon Cutter': {
        bp: 50,
        type: 'Steel',
        category: 'Special',
        hitRange: 2,
        isSlice: true,
    },
    'Hard Press': {
        bp: 1,
        type: 'Steel',
        category: 'Physical',
        makesContact: true,
    },
    'Dragon Cheer': {
        type: 'Dragon',
        category: 'Status',
    },
    'Alluring Voice': {
        bp: 80,
        type: 'Fairy',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true,
    },
    'Temper Flare': {
        bp: 75,
        type: 'Fire',
        category: 'Physical',
        canDouble: true,
        makesContact: true,
    },
    'Supercell Slam': {
        bp: 100,
        type: 'Electric',
        category: 'Physical',
        makesContact: true,
        hasRecoil: true,
    },
    'Psychic Noise': {
        bp: 75,
        type: 'Psychic',
        category: 'Special',
        hasSecondaryEffect: true,
        isSound: true,
    },
    'Upper Hand': {
        bp: 65,
        type: 'Fighting',
        category: 'Physical',
        hasSecondaryEffect: true,
        makesContact: true,
        isPriority: true,
    },
    'Malignant Chain': {
        bp: 100,
        type: 'Poison',
        category: 'Special',
        hasSecondaryEffect: true,
    },
});

var MOVES_SV = $.extend(true, {}, MOVES_SV_NATDEX, {});

[   //Max Moves
    'Max Strike', 'Max Flare', 'Max Geyser', 'Max Lightning', 'Max Overgrowth',
    'Max Phantasm', 'Max Darkness', 'Max Mindstorm', 'Max Knuckle', 'Max Steelspike',
    'Max Hailstorm', 'Max Quake', 'Max Rockfall', 'Max Flutterby', 'Max Starfall',
    'Max Airstream', 'Max Wyrmwind', 'Max Ooze', 'G-Max Wildfire', 'G-Max Befuddle',
    'G-Max Volt Crash', 'G-Max Gold Rush', 'G-Max Chi Strike', 'G-Max Terror', 'G-Max Foam Burst',
    'G-Max Resonance', 'G-Max Cuddle', 'G-Max Replenish', 'G-Max Malodor', 'G-Max Meltdown',
    'G-Max Wind Rage', 'G-Max Gravitas', 'G-Max Stonesurge', 'G-Max Volcalith', 'G-Max Tartness',
    'G-Max Sweetness', 'G-Max Sandblast', 'G-Max Stun Shock', 'G-Max Centinferno', 'G-Max Smite',
    'G-Max Snooze', 'G-Max Finale', 'G-Max Steelsurge', 'G-Max Depletion', 'G-Max Vine Lash',
    'G-Max Cannonade', 'G-Max Drum Solo', 'G-Max Fireball', 'G-Max Hydrosnipe',
    'G-Max One Blow', 'G-Max Rapid Flow',
    //Z-moves
    'Breakneck Blitz', 'All-Out Pummeling', 'Supersonic Skystrike', 'Acid Downpour', 'Tectonic Rage',
    'Continental Crush', 'Savage Spin-Out', 'Never-Ending Nightmare', 'Corkscrew Crash', 'Inferno Overdrive',
    'Hydro Vortex', 'Bloom Doom', 'Gigavolt Havoc', 'Shattered Psyche', 'Subzero Slammer',
    'Devastating Drake', 'Black Hole Eclipse', 'Twinkle Tackle', 'Catastropika', 'Sinister Arrow Raid',
    'Malicious Moonsault', 'Oceanic Operetta', 'Guardian of Alola', 'Soul-Stealing 7-Star Strike', 'Stoked Sparksurfer',
    'Pulverizing Pancake', 'Extreme Evoboost', 'Genesis Supernova', '10,000,000 Volt Thunderbolt', 'Light That Burns the Sky',
    'Searing Sunraze Smash', 'Menacing Moonraze Maelstrom', "Let's Snuggle Forever", 'Splintered Stormshards', 'Clangorous Soulblaze',
    //Hidden Power
    'Hidden Power Fire', 'Hidden Power Water', 'Hidden Power Grass', 'Hidden Power Electric', 'Hidden Power Psychic',
    'Hidden Power Ice', 'Hidden Power Dragon', 'Hidden Power Dark', 'Hidden Power Fighting', 'Hidden Power Flying',
    'Hidden Power Poison', 'Hidden Power Ground', 'Hidden Power Rock', 'Hidden Power Bug', 'Hidden Power Ghost', 'Hidden Power Steel',
    //deleted SWSH moves
    'Karate Chop', 'Double Slap', 'Comet Punch', 'Razor Wind', 'Jump Kick', 'Rolling Kick', 'Twineedle', 'Sonic Boom',
    'Dragon Rage', 'Meditate', 'Rage', 'Barrier', 'Bide', 'Mirror Move', 'Egg Bomb', 'Bone Club',
    'Clamp', 'Spike Cannon', 'Constrict', 'Barrage', 'Bubble', 'Dizzy Punch', 'Flash', 'Psywave',
    'Sharpen', 'Spider Web', 'Nightmare', 'Feint Attack', 'Foresight', 'Return', 'Frustration', 'Magnitude',
    'Pursuit', 'Hidden Power', 'Smelling Salts', 'Assist', 'Refresh', 'Snatch', 'Secret Power', 'Camouflage',
    'Mud Sport', 'Ice Ball', 'Needle Arm', 'Odor Sleuth', 'Silver Wind', 'Grass Whistle', 'Signal Beam',
    'Sky Uppercut', 'Water Sport', 'Miracle Eye', 'Wake-Up Slap', 'Natural Gift', 'Embargo', 'Trump Card',
    'Heal Block', 'Wring Out', 'Lucky Chant', 'Me First', 'Punishment', 'Mud Bomb', 'Mirror Shot', 'Rock Climb',
    'Magnet Bomb', 'Captivate', 'Heal Order', 'Ominous Wind', 'Telekinesis', 'Flame Burst', 'Synchronoise', 'Chip Away',
    'Sky Drop', 'Bestow', 'Heart Stamp', 'Steamroller', 'Rototiller', 'Ion Deluge', 'Spotlight', 'Laser Focus', 'Gear Up',
    //deleted SV moves
    'Submission', 'Skull Bash', 'Hyper Fang', 'Mind Reader', 'Vital Throw', 'Hail', 'Nature Power', 'Magic Coat',
    'Revenge', 'Grudge', 'Aromatherapy', 'Psycho Shift', 'Autotomize', 'Dual Chop',
    'Leaf Tornado', 'Mat Block', 'Crafty Shield', 'Flower Shield', 'Venom Drench', 'Powder', 'Power-Up Punch',
    'Eternabeam', 'Gear Grind', 'Head Charge', 'Lovely Kiss', 'Trick-or-Treat', 'Bonemerang', 'Octazooka', "King's Shield",
    'Kinesis', 'Electrify', 'Light of Ruin', 'Anchor Shot', 'Bolt Beak', 'Chatter', 'Core Enforcer', 'Double Iron Bash',
    'Fishious Rend', 'Geomancy', 'Hold Hands', "Land's Wrath", 'Meteor Assault', 'Mind Blown', 'Multi-Attack',
    "Nature's Madness", 'Oblivion Wing', 'Octolock', 'Plasma Fists', 'Purify', 'Shadow Bone', 'Shell Trap',
    'Snap Trap', 'Spectral Thief', 'Storm Throw', 'Techno Blast', 'Thousand Arrows', 'Thousand Waves',
    //unusable SV moves
    'Blazing Torque', 'Wicked Torque', 'Noxious Torque', 'Combat Torque', 'Magical Torque', 'Power Shift',
].forEach(e => delete MOVES_SV[e]);