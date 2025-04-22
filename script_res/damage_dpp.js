function CALCULATE_ALL_MOVES_DPP(p1, p2, field) {
    checkTrace(p1, p2);
    checkTrace(p2, p1);
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkKlutz(p1);
    checkKlutz(p2);
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    checkDownload(p1, p2);
    checkDownload(p2, p1);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather(), field.getTailwind(0));
    $(".p1-speed-mods").text(p1.stats[SP]);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather(), field.getTailwind(1));
    $(".p2-speed-mods").text(p2.stats[SP]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    var results = [[], []];
    for (var i = 0; i < 4; i++) {
        results[0][i] = CALCULATE_DAMAGE_DPP(p1, p2, p1.moves[i], side1);
        results[1][i] = CALCULATE_DAMAGE_DPP(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function CALCULATE_DAMAGE_DPP(attacker, defender, move, field) {
    var moveDescName = move.name;
    var isMeFirst = false;

    var attIsGrounded = pIsGrounded(attacker, field);
    var defIsGrounded = pIsGrounded(defender, field);

    if (move.name == 'Me First')
        [move, moveDescName, isMeFirst] = checkMeFirst(move, moveDescName);

    checkMoveTypeChange(move, field, attacker);

    if (move.name == "Nature Power")
        [move, moveDescName] = NaturePower(move, field, moveDescName);

    var description = {
        "attackerName": attacker.name,
        "moveName": moveDescName,
        "defenderName": defender.name
    };

    addLevelDesc(attacker, defender, description);

    if (move.bp === 0 || move.category === "Status") {
        return statusMoves(move, attacker, defender, description);
    }
    
    var defAbility = defender.ability;
    [defAbility, description] = abilityIgnore(attacker, move, defAbility, description, defender.item);

    var isCritical = critMove(move, defAbility);

    if (attacker.ability == 'Normalize') {
        [move, description, unused] = ateIzeTypeChange(move, attacker, description);
    }
    
    var typeEffect1 = getMoveEffectiveness(move, defender.type1, defender.type2, description, field.isForesight, attacker.ability == "Scrappy" ? attacker.ability : false, field.isGravity, defender.item);
    var typeEffect2 = defender.type2 && defender.type2 !== defender.type1 ? getMoveEffectiveness(move, defender.type2, defender.type1, description, field.isForesight, attacker.ability == "Scrappy" ? attacker.ability : false, field.isGravity, defender.item) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;
    immuneBuildDesc = immunityChecks(move, attacker, defender, field, description, defAbility, typeEffectiveness);
    if (immuneBuildDesc !== -1) return immuneBuildDesc;

    getHPInfo(description, defender);

    setDamageBuildDesc = setDamage(move, attacker, defender, description, false, field);
    if (setDamageBuildDesc !== -1) return setDamageBuildDesc;
    
    if (move.hitRange) {
        description.hits = move.hits;
    }
    var turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";
    
    ////////////////////////////////
    ////////// BASE POWER //////////
    ////////////////////////////////
    var basePower;
    [basePower, description] = basePowerFunc(move, description, turnOrder, attacker, defender, field, attIsGrounded, defIsGrounded, defAbility, isMeFirst);

    var isPhysical = move.category === "Physical";
    [basePower, description] = calcBPModsGen4(attacker, field, move, description, basePower, defAbility, isPhysical);

    var attack, defense;

    if (move.name !== 'Beat Up') {
        ////////////////////////////////
        ////////// (SP)ATTACK //////////
        ////////////////////////////////
        [attack, description] = calcAttackAtModsGen4(isPhysical, attacker, description, isCritical, defAbility, field);

        ////////////////////////////////
        ///////// (SP)DEFENSE //////////
        ////////////////////////////////
        [defense, description] = calcDefenseDfModsGen4(isPhysical, defender, description, isCritical, defAbility, field, attacker, move);
    }
    else {
        attack = pokedex[attacker.name].bs.at;
        defense = pokedex[defender.name].bs.df;
    }
    
    ////////////////////////////////
    //////////// DAMAGE ////////////
    ////////////////////////////////
    var baseDamage = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * basePower * attack / 50) / defense);
    
    return calcOtherModsGen4(baseDamage, attacker, defender, defAbility, move, field, description, typeEffectiveness, typeEffect1, typeEffect2, isPhysical, isCritical);
}

//Gen 4 only functions below
//Syntax of #.1 indicates that it is related to # in damage_MASTER.js
//Most functions named but not found in this file can be located in damage_MASTER.js

function getSimpleModifiedStat(stat, mod) {
    var simpleMod = Math.min(6, Math.max(-6, mod * 2));
    return simpleMod > 0 ? Math.floor(stat * (2 + simpleMod) / 2)
            : simpleMod < 0 ? Math.floor(stat * 2 / (2 - simpleMod))
            : stat;
}

//2.1. BP Mods (Gen 4)
function calcBPModsGen4(attacker, field, move, description, basePower, defAbility, isPhysical) {
    //a. Helping Hand
    if (field.isHelpingHand) {
        basePower = Math.floor(basePower * 1.5);
        description.isHelpingHand = true;
    }

    //b. Items
    if ((attacker.item === "Muscle Band" && isPhysical) || (attacker.item === "Wise Glasses" && !isPhysical)) {
        basePower = Math.floor(basePower * 1.1);
        description.attackerItem = attacker.item;
    }
    else if (getItemBoostType(attacker.item) === move.type ||
        getItemDualTypeBoost(attacker.item, attacker.name).includes(move.type)) {
        basePower = Math.floor(basePower * 1.2);
        description.attackerItem = attacker.item;
    }

    //c. Charge
    //d. Mud Sport (floored)
    //e. Water Sport (floored)

    //f. User Abilities
    if (attacker.ability == "Rivalry" && attacker.rivalryGender != '') {
        if (attacker.rivalryGender == 'Same') {
            basePower = Math.floor(basePower * 1.25);
            description.attackerAbility = 'Rivalry (1.25x)';
        }
        else if (attacker.rivalryGender == 'Opposite') {
            basePower = Math.floor(basePower * 0.75);
            description.attackerAbility = 'Rivalry (0.75x)';
        }
    }
    else if ((attacker.ability === "Reckless" && move.hasRecoil) ||
        (attacker.ability === "Iron Fist" && move.isPunch)) {
        basePower = Math.floor(basePower * 1.2);
        description.attackerAbility = attacker.ability;
    }
    else if ((attacker.curHP <= attacker.maxHP / 3 &&
        ((attacker.ability === "Overgrow" && move.type === "Grass") ||
            (attacker.ability === "Blaze" && move.type === "Fire") ||
            (attacker.ability === "Torrent" && move.type === "Water") ||
            (attacker.ability === "Swarm" && move.type === "Bug"))) ||
        (attacker.ability === "Technician" && move.bp <= 60 && ['Struggle', 'Beat Up'].indexOf(move.name) === -1)) {
        basePower = Math.floor(basePower * 1.5);
        description.attackerAbility = attacker.ability;
    }

    //g. Opponent Abilities
    if ((defAbility === "Thick Fat" && (move.type === "Fire" || move.type === "Ice")) ||
        (defAbility === "Heatproof" && move.type === "Fire")) {
        basePower = Math.floor(basePower * 0.5);
        description.defenderAbility = defAbility;
    }
    else if (defAbility === "Dry Skin" && move.type === "Fire") {
        basePower = Math.floor(basePower * 1.25);
        description.defenderAbility = defAbility;
    }

    return [basePower, description];
}

//3.1/4.1 Attack + Mods (Gen 4)
function calcAttackAtModsGen4(isPhysical, attacker, description, isCritical, defAbility, field) {
    var attackStat = isPhysical ? AT : SA;
    description.attackEVs = attacker.evs[attackStat] +
        (NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
        toSmogonStat(attackStat);
    var attack;
    var attackBoost = attacker.boosts[attackStat];
    var rawAttack = attacker.rawStats[attackStat];
    if (attackBoost === 0 || (isCritical && attackBoost < 0)) {
        attack = rawAttack;
    }
    else if (defAbility === "Unaware") {
        attack = rawAttack;
        description.defenderAbility = defAbility;
    }
    else if (attacker.ability === "Simple") {
        attack = getSimpleModifiedStat(rawAttack, attackBoost);
        description.attackerAbility = attacker.ability;
        description.attackBoost = attackBoost;
    }
    else {
        attack = getModifiedStat(rawAttack, attackBoost);
        description.attackBoost = attackBoost;
    }

    if (isPhysical && (attacker.ability === "Pure Power" || attacker.ability === "Huge Power")) {
        attack *= 2;
        description.attackerAbility = attacker.ability;
    }
    else if (field.weather === "Sun" && (isPhysical ? attacker.ability === "Flower Gift" : attacker.ability === "Solar Power")) {
        attack = Math.floor(attack * 1.5);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    }
    else if (field.isFlowerGiftAtk && field.weather === "Sun" && isPhysical) {
        attack = Math.floor(attack * 1.5);
        description.isFlowerGiftAtk = true;
        description.weather = field.weather;
    }
    else if (isPhysical ? (attacker.ability === "Hustle" || (attacker.ability === "Guts" && attacker.status !== "Healthy")) :
        (['Plus', 'Minus'].indexOf(attacker.ability) !== -1 && attacker.abilityOn)) {
        attack = Math.floor(attack * 1.5);
        description.attackerAbility = attacker.ability;
    }
    else if (attacker.ability === 'Slow Start' && isPhysical) {
        attack = Math.floor(attack * 0.5);
        description.attackerAbility = attacker.ability;
    }

    if ((isPhysical ? attacker.item === "Choice Band" : attacker.item === "Choice Specs") ||
        (attacker.item === "Soul Dew" && (attacker.name === "Latios" || attacker.name === "Latias") && !isPhysical)) {
        attack = Math.floor(attack * 1.5);
        description.attackerItem = attacker.item;
    }
    else if ((attacker.item === "Light Ball" && attacker.name === "Pikachu") ||
        (attacker.item === "Thick Club" && (attacker.name === "Cubone" || attacker.name === "Marowak") && isPhysical) ||
        (attacker.item === "DeepSeaTooth" && attacker.name === "Clamperl" && !isPhysical)) {
        attack *= 2;
        description.attackerItem = attacker.item;
    }
    return [attack, description];
}

//5.1/6.1 Defense + Mods (Gen 4)
function calcDefenseDfModsGen4(isPhysical, defender, description, isCritical, defAbility, field, attacker, move) {
    var defenseStat = isPhysical ? DF : SD;
    description.defenseEVs = defender.evs[defenseStat] +
        (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
        toSmogonStat(defenseStat);
    var defense;
    var defenseBoost = defender.boosts[defenseStat];
    var rawDefense = defender.rawStats[defenseStat];
    if (defenseBoost === 0 || (isCritical && defenseBoost > 0)) {
        defense = rawDefense;
    }
    else if (attacker.ability === "Unaware") {
        defense = rawDefense;
        description.attackerAbility = attacker.ability;
    }
    else if (defAbility === "Simple") {
        defense = getSimpleModifiedStat(rawDefense, defenseBoost);
        description.defenderAbility = defAbility;
        description.defenseBoost = defenseBoost;
    }
    else {
        defense = getModifiedStat(rawDefense, defenseBoost);
        description.defenseBoost = defenseBoost;
    }

    if (defAbility === "Marvel Scale" && defender.status !== "Healthy" && isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.defenderAbility = defAbility;
    }
    else if (defAbility === "Flower Gift" && field.weather === "Sun" && !isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.defenderAbility = defAbility;
        description.weather = field.weather;
    }
    else if (field.isFlowerGiftSpD && field.weather === "Sun" && !isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.isFlowerGiftSpD = true;
        description.weather = field.weather;
    }

    if ((defender.item === "Soul Dew" && (defender.name === "Latios" || defender.name === "Latias") && !isPhysical) ||
        (defender.item === "Metal Powder" && defender.name === "Ditto")) {
        defense = Math.floor(defense * 1.5);
        description.defenderItem = defender.item;
    }
    else if (defender.item === "DeepSeaScale" && defender.name === "Clamperl" && !isPhysical) {
        defense *= 2;
        description.defenderItem = defender.item;
    }

    if (field.weather === "Sand" && (defender.type1 === "Rock" || defender.type2 === "Rock") && !isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.weather = field.weather;
    }

    if (move.name === "Explosion" || move.name === "Self-Destruct") {
        defense = Math.floor(defense * 0.5);
    }

    if (defense < 1) {
        defense = 1;
    }

    return [defense, description]
}

//8.1/9.1 Final Mods (Gen 4)
function calcOtherModsGen4(baseDamage, attacker, defender, defAbility, move, field, description, typeEffectiveness, typeEffect1, typeEffect2, isPhysical, isCritical) {
    //a. Mod1
    //i. Burn
    if (attacker.status === "Burned" && isPhysical && attacker.ability !== "Guts") {
        baseDamage = Math.floor(baseDamage * 0.5);
        description.isBurned = true;
    }

    //ii. Screens
    if (!isCritical) {
        var screenMultiplier = field.format !== "Singles" ? (2 / 3) : (1 / 2);
        if (isPhysical && field.isReflect) {
            baseDamage = Math.floor(baseDamage * screenMultiplier);
            description.isReflect = true;
        }
        else if (!isPhysical && field.isLightScreen) {
            baseDamage = Math.floor(baseDamage * screenMultiplier);
            description.isLightScreen = true;
        }
    }

    //iii. Spread
    if (field.format !== "Singles" && move.isSpread) {
        baseDamage = Math.floor(baseDamage * 3 / 4);
    }

    //iv. Weather
    if ((field.weather === "Sun" && move.type === "Fire") || (field.weather === "Rain" && move.type === "Water")) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.weather = field.weather;
    }
    else if ((field.weather === "Sun" && move.type === "Water") || (field.weather === "Rain" && move.type === "Fire") ||
        (["Rain", "Sand", "Hail"].indexOf(field.weather) !== -1 && move.name === "Solar Beam")) {
        baseDamage = Math.floor(baseDamage * 0.5);
        description.weather = field.weather;
    }

    //v. Flash Fire
    if (attacker.ability === "Flash Fire" && attacker.abilityOn && move.type === "Fire") {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.attackerAbility = "Flash Fire";
    }

    baseDamage += 2;

    //b. Critical hits
    if (isCritical) {
        if (attacker.ability === "Sniper") {
            baseDamage *= 3;
            description.attackerAbility = attacker.ability;
        }
        else {
            baseDamage *= 2;
        }
        description.isCritical = isCritical;
    }

    //c. Mod2
    //i. Life Orb/Metronome
    if (attacker.item === "Life Orb") {
        baseDamage = Math.floor(baseDamage * 1.3);
        description.attackerItem = attacker.item;
    }
    //ii. Me First
    if (move.isMeFirst) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.meFirst = true;
        move.isMeFirst = false;
    }

    //d. STAB
    // everything below isn't applied until after the random number
    var stabMod = 1;
    if (move.type === attacker.type1 || move.type === attacker.type2) {
        if (attacker.ability === "Adaptability") {
            stabMod = 2;
            description.attackerAbility = attacker.ability;
        }
        else {
            stabMod = 1.5;
        }
    }

    //e. Mod3
    //i. Solid Rock/Filter
    var filterMod = 1;
    if ((defAbility === "Filter" || defAbility === "Solid Rock") && typeEffectiveness > 1) {
        filterMod = 0.75;
        description.defenderAbility = defAbility;
    }
    //ii. Expert Belt
    var ebeltMod = 1;
    if (attacker.item === "Expert Belt" && typeEffectiveness > 1) {
        ebeltMod = 1.2;
        description.attackerItem = attacker.item;
    }
    //iii. Tinted Lens
    var tintedMod = 1;
    if (attacker.ability === "Tinted Lens" && typeEffectiveness < 1) {
        tintedMod = 2;
        description.attackerAbility = attacker.ability;
    }
    //iv. Resist Berries
    var berryMod = 1;
    if ((getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.type === "Normal"))
        || (defender.item === 'Chilan Berry' && move.name === 'Struggle')) {
        berryMod = 0.5;
        description.defenderItem = defender.item;
        defender.consumeResistBerry = true;
    }

    return calcFinalDamageGen4(baseDamage, attacker, defender, field, move, description, stabMod, typeEffect1, typeEffect2, filterMod, ebeltMod, tintedMod, berryMod);
}

function calcFinalDamageGen4(baseDamage, attacker, defender, field, move, description, stabMod, typeEffect1, typeEffect2, filterMod, ebeltMod, tintedMod, berryMod) {
    var damage = [], additionalDamage = [], allDamage = [];

    for (var i = 0; i < 16; i++) {
        damage[i] = Math.floor(baseDamage * (85 + i) / 100);
        damage[i] = Math.floor(damage[i] * stabMod);
        damage[i] = Math.floor(damage[i] * typeEffect1);
        damage[i] = Math.floor(damage[i] * typeEffect2);
        damage[i] = Math.floor(damage[i] * filterMod);
        damage[i] = Math.floor(damage[i] * ebeltMod);
        damage[i] = Math.floor(damage[i] * tintedMod);
        damage[i] = Math.floor(damage[i] * berryMod);
        damage[i] = Math.max(1, damage[i]);
    }

    if (!move.isNextMove) {
        var addQualList = checkAddCalcQualifications(attacker, defender, move, field, hitsPhysical);
        var addCalcQualified = false;
        for (check in addQualList) {
            if (addQualList[check]) {
                addCalcQualified = true;
                break;
            }
        }
        if (addCalcQualified) {
            additionalDamage = additionalDamageCalcs(attacker, defender, move, field, description);
            allDamage[0] = damage;
        }
        else
            allDamage = damage;
        if (additionalDamage.length) {
            for (var i = 0; i < additionalDamage.length; i++) {
                allDamage[i + 1] = additionalDamage[i];
            }
        }
    }
    else
        allDamage = damage;

    return { "damage": allDamage, "description": buildDescription(description) };
}
