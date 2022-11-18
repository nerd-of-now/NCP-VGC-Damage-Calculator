/* Damage calculation for the Generation VIII games: Sword, Shield, Isle of Armor, and Crown Tundra; 
 * and for the Generation VII games: Sun, Moon, Ultra Sun, and Ultra Moon*/

function CALCULATE_ALL_MOVES_SS(p1, p2, field) {
    checkTrace(p1, p2);
    checkTrace(p2, p1);
    checkNeutralGas(p1, p2, field.getNeutralGas());
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkMimicry(p1, field.getTerrain());
    checkMimicry(p2, field.getTerrain());
    checkKlutz(p1);
    checkKlutz(p2);
    checkEvo(p1, p2);
    checkSeeds(p1, field);
    checkSeeds(p2, field);
    checkSwordShield(p1);
    checkSwordShield(p2);
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF]);
    p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD]);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather(), field.getTerrain(), field.getTailwind(0));
    $(".p1-speed-mods").text(p1.stats[SP]);
    p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF]);
    p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD]);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather(), field.getTerrain(), field.getTailwind(1));
    $(".p2-speed-mods").text(p2.stats[SP]);
    checkDownload(p1, p2);
    checkDownload(p2, p1);
    p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT]);
    p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA]);
    p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT]);
    p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    checkInfiltrator(p1, side1);
    checkInfiltrator(p2, side2);
    getWeightMods(p1, p2);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = GET_DAMAGE_SS(p1, p2, p1.moves[i], side1);
        results[1][i] = GET_DAMAGE_SS(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function GET_DAMAGE_SS(attacker, defender, move, field) {
    var moveDescName = move.name;
    var isQuarteredByProtect = false;

    checkMoveTypeChange(move, field, attacker);

    if (attacker.isDynamax)
        [move, isQuarteredByProtect, moveDescName] = MaxMoves(move, attacker, isQuarteredByProtect, moveDescName, field);

    if (move.name == "Nature Power")
        [move, moveDescName] = NaturePower(move, field, moveDescName);

    if (move.isZ || move.isSignatureZ)
        [move, isQuarteredByProtect, moveDescName] = ZMoves(move, field, attacker, isQuarteredByProtect, moveDescName);

    attacker_name = attacker.name;
    if (attacker_name && attacker_name.includes("-Gmax")) attacker_name = attacker_name.substring(0, attacker_name.indexOf('-Gmax'));
    defender_name = defender.name;
    if (defender_name && defender_name.includes("-Gmax")) defender_name = defender_name.substring(0, defender_name.indexOf('-Gmax'));
    var description = {
        "attackerName": attacker_name,
        "moveName": moveDescName,
        "defenderName": defender_name
    };

    if (move.bp === 0 || move.category === "Status") {
        return statusMoves(move, attacker, defender, description);
    }

    var defAbility = defender.ability;
    [defAbility, description] = abilityIgnore(attacker, move, defAbility, description);

    var isCritical = critMove(move, defAbility);

    if (move.name == "Aura Wheel" && attacker.name == "Morpeko-Hangry") {
        move.type = AuraWheel(move, attacker);
    }

    var ateIzeAbility = ATE_IZE_ABILITIES.indexOf(attacker.ability);    //Confirms abilities like Normalize and Pixilate but not Liquid Voice
    var ateIzeBoosted;
    if (!move.isZ && (ateIzeAbility !== -1 || attacker.ability == "Liquid Voice")
        && (gen <= 4 || ['Hidden Power', 'Weather Ball', 'Natural Gift', 'Judgement', 'Techno Blast', 'Revelation Dance', 'Multi-Attack', 'Terrain Pulse'].indexOf(move.name) === -1)) {
        [move, description, ateIzeBoosted] = ateIzeTypeChange(move, attacker, description);
    }

    var typeEffect1 = getMoveEffectiveness(move, defender.type1, defender.type2, attacker.ability === "Scrappy" || field.isForesight, field.isGravity, field.weather === "Strong Winds");
    var typeEffect2 = defender.type2 ? getMoveEffectiveness(move, defender.type2, defender.type1, attacker.ability === "Scrappy" || field.isForesight, field.isGravity, field.weather === "Strong Winds") : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;
    immuneBuildDesc = immunityChecks(move, attacker, defender, field, description, defAbility, typeEffectiveness);
    if (immuneBuildDesc !== -1) return immuneBuildDesc;

    description.HPEVs = defender.HPEVs + " HP";

    setDamageBuildDesc = setDamage(move, attacker, defender, description, isQuarteredByProtect);
    if (setDamageBuildDesc !== -1) return setDamageBuildDesc;

    if (move.hits > 1) {
        description.hits = move.hits;
    }
    var turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";
    var attIsGrounded = pIsGrounded(attacker, field);
    var defIsGrounded = pIsGrounded(defender, field);

    ////////////////////////////////
    ////////// BASE POWER //////////
    ////////////////////////////////
    var basePower;
    [basePower, description] = basePowerFunc(move, description, turnOrder, attacker, defender, field, attIsGrounded, defIsGrounded, defAbility);

    var bpMods;
    [bpMods, description, move] = calcBPMods(attacker, defender, field, move, description, ateIzeBoosted, basePower, attIsGrounded, defIsGrounded, turnOrder, defAbility);

    basePower = Math.max(1, pokeRound(basePower * chainMods(bpMods) / 0x1000));

    ////////////////////////////////
    ////////// (SP)ATTACK //////////
    ////////////////////////////////

    var necrozmaMove = move.name == "Photon Geyser" || move.name == "Light That Burns the Sky";
    var smartMove = move.name == "Shell Side Arm";

    var attack;
    [attack, description] = calcAttack(move, attacker, defender, description, necrozmaMove, smartMove, isCritical, defAbility);

    var atMods;
    [atMods, description] = calcAtMods(move, attacker, defAbility, description, field);

    attack = Math.max(1, pokeRound(attack * chainMods(atMods) / 0x1000));

    ////////////////////////////////
    ///////// (SP)DEFENSE //////////
    ////////////////////////////////
    var hitsPhysical = move.category === "Physical" || move.dealsPhysicalDamage || (necrozmaMove && attacker.stats[AT] >= attacker.stats[SA]) || (smartMove && (attacker.stats[AT] / defender.stats[DF]) >= (attacker.stats[SA] / defender.stats[SD]));

    var defense;
    [defense, description] = calcDefense(move, attacker, defender, description, hitsPhysical, isCritical, field);

    var dfMods;
    [dfMods, description] = calcDefMods(move, defender, field, description, hitsPhysical, defAbility);

    defense = Math.max(1, pokeRound(defense * chainMods(dfMods) / 0x1000));

    ////////////////////////////////
    //////////// DAMAGE ////////////
    ////////////////////////////////
    var baseDamage = calcBaseDamage(attacker, basePower, attack, defense);


    return calcGeneralMods(baseDamage, move, attacker, defender, defAbility, field, description, isCritical, typeEffectiveness, isQuarteredByProtect);
}

//function numericSort(a, b) {
//    return a - b;
//}

//function buildDescriptionSS(description) {
//    var output = "";
//    if (description.attackBoost) {
//        if (description.attackBoost > 0) {
//            output += "+";
//        }
//        output += description.attackBoost + " ";
//    }
//    output = appendIfSet(output, description.attackEVs);
//    output = appendIfSet(output, description.attackerItem);
//    output = appendIfSet(output, description.attackerAbility);

//    if (description.isBurned) {
//        output += "burned ";
//    }
//    output += description.attackerName + " ";
//    if (description.isHelpingHand) {
//        output += "Helping Hand ";
//    }
//    if (description.isPowerSpot) {
//        output += "Power Spot ";
//    }
//    if (description.isBattery) {
//        output += "Battery ";
//    }
//    if (description.isSteelySpirit) {
//        output += "Ally Steely Spirit ";
//    }
//    if (description.isFlowerGiftAtk) {
//        output += "Flower Gift ";
//    }
//    output += description.moveName + " ";
//    if (description.moveBP && description.moveType) {
//        output += "(" + description.moveBP + " BP " + description.moveType + ") ";
//    } else if (description.moveBP) {
//        output += "(" + description.moveBP + " BP) ";
//    } else if (description.moveType) {
//        output += "(" + description.moveType + ") ";
//    }
//    if (description.hits) {
//        output += "(" + description.hits + " hits) ";
//    }
//    output += "vs. ";
//    if (description.defenseBoost) {
//        if (description.defenseBoost > 0) {
//            output += "+";
//        }
//        output += description.defenseBoost + " ";
//    }
//    output = appendIfSet(output, description.HPEVs);
//    if (description.defenseEVs) {
//        output += " / " + description.defenseEVs + " ";
//    }
//    output = appendIfSet(output, description.defenderItem);
//    if (description.isFlowerGiftSpD) {
//        output += " Flower Gift ";
//    }
//    output = appendIfSet(output, description.defenderAbility);
//    if (description.isDynamax) output += " Dynamax ";
//    output += description.defenderName;
//    if (description.weather) {
//        output += " in " + description.weather;
//    } else if (description.terrain) {
//        output += " in " + description.terrain + " Terrain";
//    }
//    if (description.isReflect) {
//        output += " through Reflect";
//    } else if (description.isLightScreen) {
//        output += " through Light Screen";
//    }
//    if (description.isCritical) {
//        output += " on a critical hit";
//    }
//    if (description.isFriendGuard) {
//        output += " with Friend Guard";
//    }
//    if(description.isQuarteredByProtect) {
//        output += " through Protect";
//    }

//    return output;
//}

//function appendIfSet(str, toAppend) {
//    if (toAppend) {
//        return str + toAppend + " ";
//    }
//    return str;
//}

//function toSmogonStat(stat) {
//    return stat === AT ? "Atk"
//            : stat === DF ? "Def"
//            : stat === SA ? "SpA"
//            : stat === SD ? "SpD"
//            : stat === SP ? "Spe"
//            : "wtf";
//}

//function chainMods(mods) {
//    var M = 0x1000;
//    for(var i = 0; i < mods.length; i++) {
//        if(mods[i] !== 0x1000) {
//            M = Math.round((M * mods[i]) / 0x1000);
//        }
//    }
//    return M;
//}

//function getMoveEffectiveness(move, type, otherType, isGhostRevealed, isGravity, isStrongWinds) {
//    if (isGhostRevealed && type === "Ghost" && (move.type === "Normal" || move.type === "Fighting")) {
//        return 1;
//    } else if (isGravity && type === "Flying" && move.type === "Ground") {
//        return 1;
//    } else if(!isGravity && type== "Flying" && move.type === "Ground" && move.name == "Thousand Arrows") {
//        return 1;
//    } else if(!isGravity && otherType == "Flying" && move.type === "Ground" && move.name == "Thousand Arrows") {
//        return 1;
//    } else if (move.name === "Freeze-Dry" && type === "Water") {
//        return 2;
//    } else if (move.name === "Flying Press") {
//        return typeChart["Fighting"][type] * typeChart["Flying"][type];
//    } else if (isStrongWinds && type == "Flying" && typeChart[move.type][type] > 1) {
//        return 1;
//    } else {
//        return typeChart[move.type][type];
//    }
//}

//function getModifiedStat(stat, mod) {
//    return mod > 0 ? Math.floor(stat * (2 + mod) / 2)
//            : mod < 0 ? Math.floor(stat * 2 / (2 - mod))
//            : stat;
//}

////Speed Mods
//function getFinalSpeedSS(pokemon, weather, terrain, tailwind) {
//    //1. Speed boosts and drops
//    var speed = getModifiedStat(pokemon.rawStats[SP], pokemon.boosts[SP]);
//    //2. Other Speed mods
//    var otherSpeedMods = 1;
//    //a. Scarf
//    if (pokemon.item === "Choice Scarf" && !pokemon.isDynamax) {
//        otherSpeedMods *= 1.5;
//    } //b. Macho Brace, Iron Ball, Power items
//    else if (["Macho Brace", "Iron Ball", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight"].indexOf(pokemon.item) !== -1) {
//        otherSpeedMods *= 0.5;
//    } //c. Quick Powder
//    else if (pokemon.name === "Ditto" && pokemon.item === "Quick Powder") {
//        otherSpeedMods *= 2;
//    }
//    //d. Quick Feet
//    if (pokemon.ability === "Quick Feet" && pokemon.status !== "Healthy")
//    {
//        otherSpeedMods *= 1.5;
//    } //e. Slow Start
//    else if (pokemon.ability === "Slow Start")
//    {
//        otherSpeedMods *= 0.5;
//    } //f. 2x Abilities
//    else if ((((pokemon.ability === "Chlorophyll" && weather.indexOf("Sun") > -1) ||
//            (pokemon.ability === "Swift Swim" && weather.indexOf("Rain") > -1)) && pokemon.item !== 'Utility Umbrella') ||
//            (pokemon.ability === "Sand Rush" && weather === "Sand") ||
//            (pokemon.ability === "Slush Rush" && weather.indexOf("Hail") > -1) ||
//            (pokemon.ability === "Surge Surfer" && terrain === "Electric") ||
//            (pokemon.ability === "Unburden" && pokemon.item === "")) {
//        otherSpeedMods *= 2;
//    }
//    //g. Tailwind
//    if (tailwind) otherSpeedMods *= 2;

//    speed = pokeRound(speed * otherSpeedMods);

//    //3. Paralysis
//    if (pokemon.status === "Paralyzed" && pokemon.ability !== "Quick Feet") {
//        speed = Math.floor(speed / 2);
//    }
//    //4. 65536 Speed check
//    if (speed > 65535) { speed %= 65536; }
//    //5. 10000 Speed check
//    if (speed > 10000) { speed = 10000; }
//    return speed;
//}

//function checkTrace(source, target) {
//    if (source.ability === "Trace" && source.abilityOn) {
//        source.ability = target.ability;
//    }
//}

//function checkNeutralGas(p1, p2, isNGas) {
//    if (isNGas) {
//        if (p1.ability != "As One" || p1.ability != "RKS System" || p1.ability != "Multitype") p1.ability = "";
//        if (p2.ability != "As One" || p2.ability != "RKS System" || p2.ability != "Multitype") p2.ability = "";
//    }
//}
//function checkAirLock(pokemon, field) {
//    if (pokemon.ability === "Air Lock" || pokemon.ability === "Cloud Nine") {
//        field.clearWeather();
//    }
//}
//function checkForecast(pokemon, weather) {
//    if (pokemon.ability === "Forecast" && pokemon.name === "Castform") {
//        if (weather.indexOf("Sun") > -1) {
//            pokemon.type1 = "Fire";
//        } else if (weather.indexOf("Rain") > -1) {
//            pokemon.type1 = "Water";
//        } else if (weather === "Hail") {
//            pokemon.type1 = "Ice";
//        } else {
//            pokemon.type1 = "Normal";
//        }
//        pokemon.type2 = "";
//    }
//}
//function checkMimicry(pokemon, terrain) {
//    if (pokemon.ability === "Mimicry" && terrain !== "") {
//        pokemon.type1 = terrain === "Electric" ? 'Electric'
//            : terrain === "Grassy" ? 'Grass'
//                : terrain === "Misty" ? 'Fairy'
//                    : 'Psychic';
//        pokemon.type2 = '';
//    }
//}
//function checkKlutz(pokemon) {
//    if (pokemon.ability === "Klutz") {
//        pokemon.item = "";
//    }
//}

//function checkSeeds(pokemon, field) {
//    if ((pokemon.item === "Psychic Seed" && field.terrain === "Psychic") || (pokemon.item === "Misty Seed" && field.terrain === "Misty")){
//        pokemon.boosts[SD] = Math.min(6, pokemon.boosts[SD] + 1);
//    }
//    else if ((pokemon.item === "Electric Seed" && field.terrain === "Electric") || (pokemon.item === "Grassy Seed" && field.terrain === "Grassy")) {
//        pokemon.boosts[DF] = Math.min(6, pokemon.boosts[DF] + 1);
//    }
//}
//function checkIntimidateSS(source, target) {    //temporary solution
//    if (source.ability === "Intimidate" && source.abilityOn) {
//        if (target.ability === "Contrary" || target.ability === "Defiant") {
//            target.boosts[AT] = Math.min(6, target.boosts[AT] + 1);
//        } else if (["Clear Body", "White Smoke", "Hyper Cutter", "Full Metal Body"].indexOf(target.ability) !== -1 ||
//            (["Inner Focus", "Oblivious", "Own Tempo", "Scrappy"].indexOf(target.ability) !== -1 && gen >= 8)) {
//            // no effect
//        } else if (target.ability === "Simple") {
//            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 2);
//        } else if (target.ability === "Mirror Armor") {
//            source.boosts[AT] = Math.max(-6, source.boosts[AT] - 1);
//        } else {
//            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 1);
//            if (target.ability === "Competitive") {
//                target.boosts[SA] = Math.min(6, target.boosts[SA] + 2);
//            }
//        }
//        if (target.item === "Adrenaline Orb")
//            target.boosts[SP] = Math.min(6, target.boosts[SP] + 1);
//    }
//}
//function checkSwordShield(pokemon) {
//    if (pokemon.ability === "Intrepid Sword") {
//        pokemon.boosts[AT] = Math.min(6, pokemon.boosts[AT] + 1);
//    }
//    else if (pokemon.ability === "Dauntless Shield") {
//        pokemon.boosts[DF] = Math.min(6, pokemon.boosts[DF] + 1);
//    }
//}
//function checkEvo(p1, p2){
//    if($('#evoL').prop("checked")){
//        p1.boosts[AT] = Math.min(6, p1.boosts[AT] + 2);
//        p1.boosts[DF] = Math.min(6, p1.boosts[DF] + 2);
//        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2);
//        p1.boosts[SD] = Math.min(6, p1.boosts[SD] + 2);
//        p1.boosts[SP] = Math.min(6, p1.boosts[SP] + 2);
//    }
//    if($('#evoR').prop("checked")){
//        p2.boosts[AT] = Math.min(6, p2.boosts[AT] + 2);
//        p2.boosts[DF] = Math.min(6, p2.boosts[DF] + 2);
//        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2);
//        p2.boosts[SD] = Math.min(6, p2.boosts[SD] + 2);
//        p2.boosts[SP] = Math.min(6, p2.boosts[SP] + 2);
//    }

//    if($('#clangL').prop("checked")){
//        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2);
//        p1.boosts[SD] = Math.min(6, p1.boosts[SD] + 2);
//        p1.boosts[SP] = Math.min(6, p1.boosts[SP] + 2);
//    }
//    if($('#clangR').prop("checked")){
//        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2);
//        p2.boosts[SD] = Math.min(6, p2.boosts[SD] + 2);
//        p2.boosts[SP] = Math.min(6, p2.boosts[SP] + 2);
//    }
//    if ($('#weakL').prop("checked")) {
//        p1.boosts[AT] = Math.min(6, p1.boosts[AT] + 2);
//        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2);
//    }
//    if ($('#weakR').prop("checked")) {
//        p2.boosts[AT] = Math.min(6, p2.boosts[AT] + 2);
//        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2);
//    }

//}

//function checkDownload(source, target) {
//    if (source.ability === "Download") {
//        if (target.stats[SD] <= target.stats[DF]) {
//            source.boosts[SA] = Math.min(6, source.boosts[SA] + 1);
//        } else {
//            source.boosts[AT] = Math.min(6, source.boosts[AT] + 1);
//        }
//    }
//}
//function checkInfiltrator(attacker, affectedSide) {
//    if (attacker.ability === "Infiltrator") {
//        affectedSide.isReflect = false;
//        affectedSide.isLightScreen = false;
//    }
//}

//function countBoosts(boosts) {
//    var sum = 0;
//    for (var i = 0; i < STATS.length; i++) {
//        if (boosts[STATS[i]] > 0) {
//            sum += boosts[STATS[i]];
//        }
//    }
//    return sum;
//}

//// GameFreak rounds DOWN on .5
//function pokeRound(num) {
//    return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
//}

//function getWeightMods(p1, p2) {
//    if (p1.ability == "Heavy Metal") p1.weight *= 2;
//    else if (p1.ability == "Light Metal") p1.weight /= 2;

//    if (p2.ability == "Heavy Metal") p2.weight *= 2;
//    else if (p2.ability == "Light Metal") p2.weight /= 2;

//    if (p1.item == "Float Stone") p1.weight /= 2;
//    if (p2.item == "Float Stone") p2.weight /= 2;
//}

//function checkMoveTypeChange(move, field, attacker) {
//    if (move.name == "Weather Ball") {
//        move.type = field.weather.indexOf("Sun") > -1 && attacker.item !== 'Utility Umbrella' ? "Fire"
//            : field.weather.indexOf("Rain") > -1 && attacker.item !== 'Utility Umbrella' ? "Water"
//                : field.weather === "Sand" ? "Rock"
//                    : field.weather === "Hail" ? "Ice"
//                        : "Normal";
//    }
//    else if (move.name == "Terrain Pulse" || move.name == "Nature Power") {
//        move.type = field.terrain === "Electric" ? "Electric"
//            : field.terrain === "Grassy" ? "Grass"
//                : field.terrain === "Misty" ? "Fairy"
//                    : field.terrain === "Psychic" ? "Psychic"
//                        : "Normal";
//    }
//    else if (move.name == "Techno Blast") {
//        move.type = attacker.item === "Burn Drive" ? "Fire"
//            : attacker.item === "Chill Drive" ? "Ice"
//                : attacker.item === "Douse Drive" ? "Water"
//                    : attacker.item === "Shock Drive" ? "Electric"
//                        : "Normal";
//    }
//    else if (move.name === "Multi-Attack" && attacker.item.indexOf("Memory") !== -1) {
//        move.type = getMemoryType(attacker.item);
//    }
//    else if (move.name === "Judgment" && attacker.item.indexOf("Plate") !== -1) {
//        move.type = getItemBoostType(attacker.item);
//    }
//    else if (move.name === "Revelation Dance") {
//        move.type = attacker.type1 !== 'Typeless' ? attacker.type1
//            : attacker.type2 !== 'Typeless' && attacker.type2 !== "" ? attacker.type2
//                : 'Typeless';
//    }
//    else if (move.name.includes(" Pledge") && move.name !== move.combinePledge) {
//        var bothPledgeNames = move.name + " " + move.combinePledge;
//        move.type = bothPledgeNames.includes("Grass") && bothPledgeNames.includes("Fire") ? 'Fire'
//            : bothPledgeNames.includes("Grass") && bothPledgeNames.includes("Water") ? 'Grass'
//                : bothPledgeNames.includes("Water") && bothPledgeNames.includes("Fire") ? 'Water'
//                    : 'Typeless';   //last case should never happen, just there to help with debugging
//    }
//}

//function ZMoves(move, field, attacker, isQuarteredByProtect, moveDescName) {
//    if (move.isSignatureZ) {
//        move.isZ = true;
//        if (field.isProtect) {
//            isQuarteredByProtect = true;
//        }
//    }
//    else if (move.isZ) {
//        var tempMove = move;

//        if (move.name.includes("Hidden Power") || move.name === 'Revelation Dance') {
//            move.type = "Normal";
//        }
//        else move.type = tempMove.type;

//        var ZName = ZMOVES_LOOKUP[tempMove.type];
//        var SigZ = getSignatureZMove(attacker.item, attacker.name, tempMove.name);
//        if (SigZ !== -1) ZName = SigZ;
//        //turning it into a generic single-target Z-move
//        move = moves[ZName];
//        if (move == undefined) move = tempMove;
//        move.name = ZName;
//        if (SigZ == -1) {
//            move.bp = tempMove.zp;
//            move.name = "Z-" + tempMove.name;
//            move.isZ = true;
//            move.category = tempMove.category;
//            moveDescName = ZName + " (" + move.bp + " BP)";
//        }
//        else
//            moveDescName = ZName;
//        move.isCrit = tempMove.isCrit;
//        move.hits = 1;
//        if (field.isProtect) {
//            isQuarteredByProtect = true;
//        }
//    }
//    return [move, isQuarteredByProtect, moveDescName];
//}

//function MaxMoves(move, attacker, isQuarteredByProtect, moveDescName, field) {
//    var exceptions_100_fight = ["Low Kick", "Reversal", "Final Gambit"];
//    var exceptions_80_fight = ["Double Kick", "Triple Kick"];
//    var exceptions_75_fight = ["Counter", "Seismic Toss"];
//    var exceptions_140 = ["Crush Grip", "Wring Out", "Magnitude", "Double Iron Bash", "Rising Voltage", "Triple Axel"];
//    var exceptions_130 = ["Pin Missile", "Power Trip", "Punishment", "Dragon Darts", "Dual Chop", "Electro Ball", "Heat Crash",
//        "Bullet Seed", "Grass Knot", "Bonemerang", "Bone Rush", "Fissure", "Icicle Spear", "Sheer Cold", "Weather Ball", "Tail Slap", "Guillotine", "Horn Drill",
//        "Flail", "Return", "Frustration", "Endeavor", "Natural Gift", "Trump Card", "Stored Power", "Rock Blast", "Gear Grind", "Gyro Ball", "Heavy Slam",
//        "Dual Wingbeat", "Terrain Pulse", "Surging Strikes", "Scale Shot"];
//    var exceptions_120 = ["Double Hit", "Spike Cannon"];
//    var exceptions_100 = ["Twineedle", "Beat Up", "Fling", "Dragon Rage", "Nature\'s Madness", "Night Shade", "Comet Punch", "Fury Swipes", "Sonic Boom", "Bide",
//        "Super Fang", "Present", "Spit Up", "Psywave", "Mirror Coat", "Metal Burst"];
//    var tempMove = move;
//    var maxName = MAXMOVES_LOOKUP[tempMove.type];
//    if (G_MAXMOVES_TYPE[attacker.name] == tempMove.type) {
//        maxName = G_MAXMOVES_LOOKUP[attacker.name];
//    }
//    move = moves[maxName];
//    move.type = tempMove.type;
//    if (move == undefined) move = tempMove; //prevents crashing when switching between Gen VII and VIII, only used for such a case
//    move.name = maxName;
//    if (['G-Max Drum Solo', 'G-Max Fireball', 'G-Max Hydrosnipe'].indexOf(maxName) == -1) {
//        if (move.type == "Fighting" || move.type == "Poison") {
//            if (tempMove.bp >= 150 || exceptions_100_fight.includes(tempMove.name)) move.bp = 100;
//            else if (tempMove.bp >= 110) move.bp = 95;
//            else if (tempMove.bp >= 75) move.bp = 90;
//            else if (tempMove.bp >= 65) move.bp = 85;
//            else if (tempMove.bp >= 55 || exceptions_80_fight.includes(tempMove.name)) move.bp = 80;
//            else if (tempMove.bp >= 45 || exceptions_75_fight.includes(tempMove.name)) move.bp = 75;
//            else move.bp = 70;
//        }
//        else {
//            if (tempMove.bp >= 150) move.bp = 150;
//            else if (tempMove.bp >= 110 || exceptions_140.includes(tempMove.name)) move.bp = 140;
//            else if (tempMove.bp >= 75 || exceptions_130.includes(tempMove.name)) move.bp = 130;
//            else if (tempMove.bp >= 65 || exceptions_120.includes(tempMove.name)) move.bp = 120;
//            else if (tempMove.bp >= 55 || exceptions_100.includes(tempMove.name)) move.bp = 110;
//            else if (tempMove.bp >= 45) move.bp = 100;
//            else move.bp = 90;
//        }
//    }
//    moveDescName = maxName + " (" + move.bp + " BP)";
//    if (tempMove.category == "Status") {
//        moveDescName = "Max Guard";
//        move.name = moveDescName;
//        move.bp = 0;
//        move.isCrit = false;
//    }
//    else if (tempMove.name == "(No Move)") {
//        moveDescName = "(No Move)";
//        move.bp = 0;
//        move.isCrit = false;
//    }
//    else move.isCrit = tempMove.isCrit;
//    move.category = tempMove.category;
//    move.hits = 1;
//    if (field.isProtect && ["G-Max One Blow", "G-Max Rapid Flow"].indexOf(maxName) == -1) isQuarteredByProtect = true;

//    return [move, isQuarteredByProtect, moveDescName];
//}

//function NaturePower(move, field, moveDescName) {         //Rename Nature Power to its appropriately called moves; needs to be done after Max Moves since Nature Power becomes Max Guard
//    move.category = "Special";
//    var natureZ = move.isZ;
//    var npMove = (field.terrain == "Electric") ? "Thunderbolt"
//        : (field.terrain == "Grassy") ? "Energy Ball"
//            : (field.terrain == "Psychic") ? "Psychic"
//                : (field.terrain == "Misty") ? "Moonblast"
//                    : "Tri Attack";
//    move.name = npMove;
//    move = moves[npMove];
//    move.isZ = natureZ;
//    move.hits = 1;
//    moveDescName = npMove;
//    return [move, moveDescName];
//}

//function statusMoves(move, attacker, defender, description) {
//    if (move.name === "Pain Split") {
//        return { "damage": [Math.floor((defender.curHP - attacker.curHP) / 2)], "description": buildDescriptionSS(description) };
//    }
//    else if (move.bp === 0 || move.category === "Status") {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//}

//function abilityIgnore(attacker, move, defAbility, description) {
//    if (defAbility != "Shadow Shield" && defAbility != "Full Metal Body" && defAbility != "Prism Armor") {
//        if (["Mold Breaker", "Teravolt", "Turboblaze"].indexOf(attacker.ability) !== -1) {
//            defAbility = "";
//            description.attackerAbility = attacker.ability;
//        }
//        else if (["Moongeist Beam", "Sunsteel Strike", "Photon Geyser", "Searing Sunraze Smash", "Menacing Moonraze Maelstrom",
//            "Light That Burns the Sky", 'G-Max Drum Solo', 'G-Max Fireball', 'G-Max Hydrosnipe'].indexOf(move.name) !== -1)
//            defAbility = ""; //works as a mold breaker
//    }

//    return [defAbility, description];
//}

//function critMove(move, defAbility) {
//    return move.isCrit && ["Battle Armor", "Shell Armor"].indexOf(defAbility) === -1;
//}


//function NaturalGift(move, attacker, description) {
//        var gift = getNaturalGift(attacker.item);
//        move.type = gift.t;
//        move.bp = gift.p;
//        description.attackerItem = attacker.item;
//        description.moveBP = move.bp;
//        description.moveType = move.type;
    
//    return [move, description];
//}

//function AuraWheel(move, attacker) {
//    return (attacker.name == "Morpeko-Hangry") ? "Dark" : move.type;
//}

//function ateIzeTypeChange(move, attacker, description) {
//    var isBoosted = false;
//    if (attacker.ability === "Liquid Voice" && move.isSound) {
//        move.type = "Water";
//        description.attackerAbility = attacker.ability;
//    }
//    else {
//        if (attacker.ability !== "Normalize" && move.type === "Normal") { //Z-Moves don't receive -ate type changes
//            switch (attacker.ability) {
//                case "Aerilate":
//                    move.type = "Flying";
//                    break;
//                case "Pixilate":
//                    move.type = "Fairy";
//                    break;
//                case "Refrigerate":
//                    move.type = "Ice";
//                    break;
//                default:    //Galvanize
//                    move.type = "Electric";
//            }
//            if (attacker.isDynamax)
//                description.moveName = MAXMOVES_LOOKUP[move.type] + " (" + move.bp + " BP)";
//            isBoosted = true;     //indicates whether the move gets the boost or not
//        }
//        else if(attacker.ability === "Normalize") {  //Normalize
//            move.type = "Normal";
//            if (attacker.isDynamax)
//                description.moveName = "Max Strike (" + move.bp + " BP)";
//            isBoosted = true;     //indicates whether the move gets the boost or not
//        }
//    }

//    return [move, description, isBoosted];
//}

//function immunityChecks(move, attacker, defender, field, description, defAbility, typeEffectiveness) {
//    if (typeEffectiveness === 0) {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if ((defAbility === "Wonder Guard" && typeEffectiveness <= 1) ||
//        (move.type === "Grass" && defAbility === "Sap Sipper") ||
//        (move.type === "Fire" && defAbility.indexOf("Flash Fire") !== -1) ||
//        (move.type === "Water" && ["Dry Skin", "Storm Drain", "Water Absorb"].indexOf(defAbility) !== -1) ||
//        (move.type === "Electric" && ["Lightning Rod", "Motor Drive", "Volt Absorb"].indexOf(defAbility) !== -1) ||
//        (move.type === "Ground" && !field.isGravity && defAbility === "Levitate") ||
//        (move.isBullet && defAbility === "Bulletproof") ||
//        (move.isSound && defAbility === "Soundproof")) {
//        description.defenderAbility = defAbility;
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if (move.type === "Ground" && !field.isGravity && defender.item === "Air Balloon" && move.name !== "Thousand Arrows") {
//        description.defenderItem = defender.item;
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if ((field.weather === "Harsh Sun" && move.type === "Water") || (field.weather === "Heavy Rain" && move.type === "Fire")) {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if (move.name === "Sky Drop" &&
//        ([defender.type1, defender.type2].indexOf("Flying") !== -1 ||
//            (gen >= 6 && defender.weight >= 200.0) || field.isGravity)) {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if (move.name === "Synchronoise" &&
//        [defender.type1, defender.type2].indexOf(attacker.type1) === -1 && [defender.type1, defender.type2].indexOf(attacker.type2) === -1) {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if (defender.isDynamax && ["Grass Knot", "Low Kick", "Heat Crash", "Heavy Slam"].indexOf(move.name) !== -1) {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if ((defAbility === "Damp" || attacker.ability === "Damp") && ["Self-Destruct", "Explosion", "Mind Blown", "Misty Explosion"].indexOf(move.name) !== -1) {
//        description.defenderAbility = defAbility;
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if (move.name === "Fling" && cantFlingItem(attacker.item, attacker.name, defAbility)) {
//        description.attackerItem = attacker.item;
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }
//    if (move.name === "Natural Gift" && attacker.item.indexOf(" Berry") === -1) {
//        return { "damage": [0], "description": buildDescriptionSS(description) };
//    }

//    return -1;
//}

////Special Cases
//function setDamage(move, attacker, defender, description, isQuarteredByProtect) {
//    var isParentBond = attacker.ability === "Parental Bond";
//    //a. Counterattacks (Counter, Mirror Coat, Metal Burst, Bide)

//    //b. Defender HP Dependent (Super Fang/Nature's Madness, Guardian of Alola)
//    var def_curHP;
//    if (move.name === "Super Fang" || move.name === "Nature\'s Madness") {
//        def_curHP = Math.floor(defender.curHP / 2);
//        if (isParentBond) {
//            def_curHP = Math.floor(def_curHP * 3 / 2);
//        }
//        if (defender.isDynamax) {
//            def_curHP = Math.floor(def_curHP / 2);
//        }
//        return { "damage": [def_curHP], "description": buildDescriptionSS(description) };
//    }
//    else if (move.name === "Guardian of Alola") {
//        if (!isQuarteredByProtect) {
//            def_curHP = Math.floor(defender.curHP * 3 / 4);
//        }
//        else {
//            def_curHP = Math.floor(defender.curHP * 3 / 16);
//        }
//        return { "damage": [def_curHP], "description": buildDescriptionSS(description) };
//    }

//    //c. Attacker HP Dependent (Endeavor, Final Gambit)
//    if (move.name === "Endeavor") {
//        var endvr_dmg = 0;
//        if (attacker.curHP < defender.curHP) endvr_dmg = defender.curHP - attacker.curHP;
//        return { "damage": [endvr_dmg], "description": buildDescriptionSS(description) };
//    }
//    if (move.name === "Final Gambit") {
//        var at_curHP = attacker.curHP;
//        return { "damage": [at_curHP], "description": buildDescriptionSS(description) };
//    }

//    //d. Set Damage (Sonic Boom, Dragon Rage)
//    if (move.name === "Sonic Boom") {
//        return !isParentBond
//            ? { "damage": [20], "description": buildDescriptionSS(description) }
//            : { "damage": [40], "description": buildDescriptionSS(description) };
//    }
//    if (move.name === "Dragon Rage") {
//        return !isParentBond
//            ? { "damage": [40], "description": buildDescriptionSS(description) }
//            : { "damage": [80], "description": buildDescriptionSS(description) };
//    }

//    //e. Level Dependent Damage (Seismic Toss, Night Shade)
//    if (move.name === "Seismic Toss" || move.name === "Night Shade") {
//        var lv = attacker.level;
//        if (isParentBond) {
//            lv *= 2;
//        }
//        return { "damage": [lv], "description": buildDescriptionSS(description) };
//    }

//    //f. OHKO moves

//    //g. Psywave

//    return -1;
//}

//function pIsGrounded(mon, field) {
//    return (mon.item == "Iron Ball" || field.isGravity || (mon.type1 !== "Flying" && mon.type2 !== "Flying" &&
//        mon.item !== "Air Balloon" && mon.ability !== "Levitate"));
//}

////1. Custom BP
//function basePowerFunc(move, description, turnOrder, attacker, defender, field, attIsGrounded, defIsGrounded, defAbility) {
//    var basePower;
//    switch (move.name) {
//        //a. Speed based
//        //a.i. Gyro Ball
//        case "Gyro Ball":
//            basePower = Math.min(150, Math.floor(25 * defender.stats[SP] / attacker.stats[SP]));
//            description.moveBP = basePower;
//            break;
//        //a.ii. Electro Ball
//        case "Electro Ball":
//            var r = (defender.stats[SP] == 0) ? 0 : Math.floor(attacker.stats[SP] / defender.stats[SP]);
//            basePower = r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : r >= 1 ? 60 : 40;
//            description.moveBP = basePower;
//            break;

//        //b. Weight based
//        //b.i. Low Kick, Grass Knot
//        case "Low Kick":
//        case "Grass Knot":
//            var w = defender.weight;
//            basePower = w >= 200 ? 120 : w >= 100 ? 100 : w >= 50 ? 80 : w >= 25 ? 60 : w >= 10 ? 40 : 20;
//            description.moveBP = basePower;
//            if (defAbility == "Heavy Metal" || defAbility == "Light Metal")
//                description.defenderAbility = defAbility;
//            if (defender.item == "Float Stone")
//                description.defenderItem = defender.item;
//            break;
//        //b.ii. Heavy Slam, Heat Crash
//        case "Heavy Slam":
//        case "Heat Crash":
//            var wr = attacker.weight / defender.weight;
//            basePower = wr >= 5 ? 120 : wr >= 4 ? 100 : wr >= 3 ? 80 : wr >= 2 ? 60 : 40;
//            description.moveBP = basePower;
//            if (defAbility == "Heavy Metal" || defAbility == "Light Metal")
//                description.defenderAbility = defAbility;
//            if (defender.item == "Float Stone")
//                description.defenderItem = defender.item;
//            if (attacker.ability == "Heavy Metal" || attacker.ability == "Light Metal")
//                description.attackerAbility = attacker.ability;
//            if (attacker.item == "Float Stone")
//                description.attackerItem = attacker.item;
//            break;

//        //c. HP based
//        //c.i. Eruption, Water Spout, Dragon Energy
//        case "Eruption":
//        case "Water Spout":
//        case "Dragon Energy":
//            basePower = Math.max(1, Math.floor(150 * attacker.curHP / attacker.maxHP));
//            description.moveBP = basePower;
//            break;
//        //c.ii. Flail, Reversal
//        case "Flail":
//        case "Reversal":
//            var p = Math.floor(48 * attacker.curHP / attacker.maxHP);
//            basePower = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
//            description.moveBP = basePower;
//            break;
//        //c.iii. Crush Grip, Wring Out
//        case "Crush Grip":
//        case "Wring Out":
//            basePower = floor(pokeRound(120 * 100 * floor(attacker.curHP * 0x1000 / attacker.maxHP) / 0x1000) / 100);
//            description.moveBP = basePower;
//            break;

//        //d. Friendship based   (not done under the assumption that it will always deal max damage)
//        //d.i. Return
//        //d.ii. Frustration

//        //e. Counter based
//        //e.i. Fury Cutter
//        //e.ii. Rollout, Ice Ball
//        //e.iii. Spit Up

//        //f. Boost based
//        //f.i. Stored Power, Power Trip
//        case "Stored Power":
//        case "Power Trip":
//            basePower = 20 + 20 * countBoosts(attacker.boosts);
//            description.moveBP = basePower;
//            break;
//        //f.ii. Punishment
//        case "Punishment":
//            basePower = Math.min(200, 60 + 20 * countBoosts(defender.boosts));
//            description.moveBP = basePower;
//            break;

//        //g. Dichotomous BP
//        //g.i. Acrobatics
//        case "Acrobatics":
//            basePower = attacker.item === "Flying Gem" || attacker.item === "" ? 110 : 55;
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.ii. Hex
//        case "Hex":
//            basePower = move.bp * (defender.status !== "Healthy" ? 2 : 1);
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.iii. Smelling Salts
//        case "Smelling Salts":
//            basePower = move.bp * (defender.status === "Paralyzed" ? 2 : 1);
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.iv. Wake-Up Slap
//        case "Wake-Up Slap":
//            basePower = move.bp * (defender.status === "Asleep" ? 2 : 1);
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.v. Weather Ball
//        case "Weather Ball":
//            basePower = ["", "Strong Winds"].indexOf(field.weather) === -1 ? 100 : 50;
//            if (basePower !== move.bp) {
//                description.moveBP = basePower;
//                description.weather = field.weather;
//                description.moveType = move.type;
//            }
//            break;
//        //g.vi. Water Shuriken
//        case "Water Shuriken":
//            basePower = (attacker.name === "Ash-Greninja" && attacker.ability === "Battle Bond") ? 20 : 15;
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.vii. Terrain Pulse
//        case "Terrain Pulse":
//            basePower = (field.terrain !== "" && attIsGrounded) ? move.bp * 2 : move.bp;
//            if (basePower !== move.bp) {
//                description.moveBP = basePower;
//                description.terrain = field.terrain;
//                description.moveType = move.type;
//            }
//            break;
//        //g.viii. Rising Voltage
//        case "Rising Voltage":
//            basePower = (field.terrain === "Electric" && defIsGrounded) ? move.bp * 2 : move.bp;
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.ix. Grass Pledge, Fire Pledge, Water Pledge combined
//        case "Grass Pledge":
//        case "Fire Pledge":
//        case "Water Pledge":
//            basePower = move.combinePledge !== move.name ? 150 : move.bp;
//            description.moveBP = basePower;
//            if (move.combinePledge !== move.name)
//                description.moveType = move.type;
//            break;
//        //g.x. Payback, Fisheous Rend, Bolt Beak                                            CONSIDER ISDOUBLE
//        case "Payback":
//            basePower = turnOrder === "LAST" ? 100 : 50;
//            if (basePower !== move.bp) description.moveBP = basePower;
//            break;
//        //g.xi. Everything else (Assurance, Avalanche, Revenge, Gust, Twister, Pursuit, Round, Stomping Tantrum)    CHECK DEFAULT; CURRENTLY ALSO HAS FISHEOUS REND AND BOLT BEAK

//        //h. Item based
//        //h.i. Fling
//        case "Fling":
//            basePower = getFlingPower(attacker.item);
//            description.moveBP = basePower;
//            description.attackerItem = attacker.item;
//            break;
//        //h.ii. Natural Gift
//        case "Natural Gift":
//            if (attacker.item.indexOf(" Berry") !== -1)
//                [move, description] = NaturalGift(move, attacker, description);
//            break;

//        //i. Other
//        //i.i. Beat Up
//        //i.ii. Echoed Voice
//        //i.iii. Hidden Power (I think it's for pre Gen VI?)
//        //i.iv. Magnitude
//        //i.v. Present
//        //i.vi. Triple Kick, Triple Axel 
//        case "Triple Kick":
//        case "Triple Axel":
//            if (move.tripleHit3)
//                basePower = move.bp * 3;
//            else if (move.tripleHit2)
//                basePower = move.bp * 2;
//            else
//                basePower = move.bp;
//            break;
//        //i.vii. Trump Card

//        default:
//            if (move.isDouble && ['Retaliate', 'Fusion Bolt', 'Fusion Flare', 'Lash Out'].indexOf(move.name) === -1) {
//                basePower = 2 * move.bp;
//                if (basePower !== move.bp) description.moveBP = basePower;
//            }
//            else basePower = move.bp;
//    }

//    return [basePower, description];
//}

////2. BP Mods
//function calcBPMods(attacker, defender, field, move, description, ateIzeBoosted, basePower, attIsGrounded, defIsGrounded, turnOrder, defAbility) {
//    var bpMods = [];
//    var isAttackerAura = (attacker.ability === (move.type + " Aura"));
//    var isDefenderAura = defAbility === (move.type + " Aura");
//    var auraActive = ($("input:checkbox[id='" + move.type.toLowerCase() + "-aura']:checked").val() != undefined);
//    var auraBreak = ($("input:checkbox[id='aura-break']:checked").val() != undefined);

//    //a. Aura Break
//    if (auraActive && auraBreak && !field.isNeutralizingGas) {
//        bpMods.push(0x0C00);
//        if (isAttackerAura || attacker.ability == "Aura Break") {
//            description.attackerAbility = attacker.ability;
//        }
//        else if (isDefenderAura || defAbility == "Aura Break") {
//            description.defenderAbility = defAbility;
//        }
//    }
//    //b. Rivalry

//    //c. 1.2x Abilities
//    //c.i. Galvanize, Aerilate, Pixilate, Refrigerate, Normalize        (Technically Normalize is separate but it doesn't hurt to handle it where it is now)
//    if (!move.isZ && !attacker.isDynamax && ateIzeBoosted) {     //function ateIzeTypeChange sets this value
//        var ateIzeMultiplier = gen > 6 ? 0x1333 : 0x14CD;
//        bpMods.push(ateIzeMultiplier);
//        description.attackerAbility = attacker.ability;
//    }
//    //c.ii Reckless, Iron Fist                                          (Same deal)
//    else if ((attacker.ability === "Reckless" && move.hasRecoil) || (attacker.ability === "Iron Fist" && move.isPunch)) {
//        bpMods.push(0x1333);
//        description.attackerAbility = attacker.ability;
//    }

//    //d. Field Abilities
//    //d.i. Battery
//    if (field.isBattery && move.category === "Special") {
//        bpMods.push(0x14CD);
//        description.isBattery = true;
//    }
//    //d.ii. Power Spot
//    if (field.isPowerSpot) {
//        bpMods.push(0x14CD);
//        description.isPowerSpot = true;
//    }
//    //d.iii. Ally Steely Spirit (probably doesn't go here but Smogon makes Doubles research a pain to find)
//    if (field.isSteelySpirit && move.type === "Steel") {
//        bpMods.push(0x1800);
//        description.isSteelySpirit = true;
//    }

//    //e. 1.3x Abilities
//    //e.i. Sheer Force
//    if (attacker.ability === "Sheer Force" && move.hasSecondaryEffect) {
//        bpMods.push(0x14CD);
//        description.attackerAbility = attacker.ability;
//    }
//    //e.ii. Sand Force
//    else if (attacker.ability === "Sand Force" && field.weather === "Sand" && ["Rock", "Ground", "Steel"].indexOf(move.type) !== -1) {
//        bpMods.push(0x14CD);
//        description.attackerAbility = attacker.ability;
//        description.weather = field.weather;
//    }
//    //e.iii. Analytic
//    else if (attacker.ability === "Analytic" && turnOrder !== "FIRST") {
//        bpMods.push(0x14CD);
//        description.attackerAbility = attacker.ability;
//    }
//    //e.iv. Tough Claws
//    else if (attacker.ability === "Tough Claws" && move.makesContact) {
//        bpMods.push(0x14CD);
//        description.attackerAbility = attacker.ability;
//    }
//    //e.v. Punk Rock
//    else if (attacker.ability == "Punk Rock" && move.isSound) {
//        bpMods.push(0x14CD);
//        description.attackerAbility = attacker.ability;
//    }

//    //f. Fairy Aura, Dark Aura
//    if (auraActive && !auraBreak && !field.isNeutralizingGas) {
//        bpMods.push(0x1548);
//        if (isAttackerAura) {
//            description.attackerAbility = attacker.ability;
//        }
//        else if (isDefenderAura) {
//            description.defenderAbility = defAbility;
//        }
//    }

//    //If the BP before this point would trigger Technician, don't apply it
//    var tempBP = pokeRound(basePower * chainMods(bpMods) / 0x1000);

//    //g. 1.5x Abilities (Technician, Flare Boost, Toxic Boost, Strong Jaw, Mega Launcher, Steely Spirit)
//    if ((attacker.ability === "Technician" && tempBP <= 60) ||
//        (attacker.ability === "Flare Boost" && attacker.status === "Burned" && move.category === "Special") ||
//        (attacker.ability === "Toxic Boost" && (attacker.status === "Poisoned" || attacker.status === "Badly Poisoned") && move.category === "Physical") ||
//        (attacker.ability === "Mega Launcher" && move.isPulse) ||
//        (attacker.ability === "Strong Jaw" && move.isBite) ||
//        (attacker.ability === "Steely Spirit" && move.type === "Steel")) {
//        bpMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//    }

//    //h. Heatproof
//    if (defAbility === "Heatproof" && move.type === "Fire") {
//        bpMods.push(0x800);
//        description.defenderAbility = defAbility;
//    }

//    //i. Dry Skin
//    else if (defAbility === "Dry Skin" && move.type === "Fire") {
//        bpMods.push(0x1400);
//        description.defenderAbility = defAbility;
//    }

//    //j. 1.1x Items
//    if ((attacker.item === "Muscle Band" && move.category === "Physical") ||
//        (attacker.item === "Wise Glasses" && move.category === "Special")) {
//        bpMods.push(0x1199);
//        description.attackerItem = attacker.item;
//    }

//    //k. 1.2x Items
//    else if (getItemBoostType(attacker.item) === move.type) {
//        var itemTypeMultiplier = gen > 3 ? 0x1333 : 0x1199;
//        bpMods.push(itemTypeMultiplier);
//        description.attackerItem = attacker.item;
//    }
//    else if (getItemDualTypeBoost(attacker.item, attacker.name).includes(move.type)) {
//        bpMods.push(0x1333);
//        description.attackerItem = attacker.item;
//    }

//    //l. Gems
//    else if (attacker.item === move.type + " Gem") {
//        var gemMultiplier = gen > 5 ? 0x14CD : 0x1800;
//        bpMods.push(gemMultiplier);
//        description.attackerItem = attacker.item;
//    }

//    //m. Solar Beam, Solar Blade
//    if ((move.name === "Solar Beam" || move.name === "SolarBeam" || move.name === "Solar Blade") && ["None", "Sun", "Harsh Sun", "Strong Winds", ""].indexOf(field.weather) === -1 && attacker.item !== 'Utility Umbrella') {
//        bpMods.push(0x800);
//        description.moveBP = move.bp / 2;
//        description.weather = field.weather;
//    }

//    //n. Me First

//    //o. Knock Off
//    else if (gen > 5 && move.name === "Knock Off" && defender.name !== null && !cantRemoveItem(defender.item, defender.name, field.terrain)) {
//        bpMods.push(0x1800);
//        description.moveBP = move.bp * 1.5;
//    }//p. Misty Explosion
//    else if ((move.name === "Misty Explosion" && field.terrain == "Misty" && attIsGrounded) ||
//        (move.name === "Grav Apple" && field.isGravity)) {
//        bpMods.push(0x1800);
//        description.moveBP = move.bp * 1.5;
//    }//q. Expanding Force
//    else if (move.name === "Expanding Force" && field.terrain == "Psychic" && attIsGrounded) {
//        move.isSpread = true;
//        bpMods.push(0x1800);
//        description.moveBP = move.bp * 1.5;
//    }

//    //r. Helping Hand
//    if (field.isHelpingHand) {  //calculated differently in gen 3
//        bpMods.push(0x1800);
//        description.isHelpingHand = true;
//    }

//    //s. Charge, Electromorphosis
//    if (attacker.ability === "Electromorphosis" && attacker.abilityOn && move.type === "Electric") {
//        bpMods.push(0x2000);
//        description.attackerAbility = attacker.ability;
//    }

//    //t. Double power (Facade, Brine, Venoshock, Retaliate, Fusion Bolt, Fusion Flare, Lash Out)
//    if ((move.name === "Facade" && ["Burned", "Paralyzed", "Poisoned", "Badly Poisoned"].indexOf(attacker.status) !== -1) ||
//        (move.name === "Brine" && defender.curHP <= defender.maxHP / 2) ||
//        (move.name === "Venoshock" && (defender.status === "Poisoned" || defender.status === "Badly Poisoned")) ||
//        (['Retaliate', 'Fusion Bolt', 'Fusion Flare', 'Lash Out'].indexOf(move.name) !== -1 && move.isDouble)) {
//        bpMods.push(0x2000);
//        description.moveBP = move.bp * 2;
//    }

//    //u. Offensive Terrain
//    if (attIsGrounded) {
//        var terrainMultiplier = gen > 7 ? 0x14CD : 0x1800;
//        if (field.terrain === "Electric" && move.type === "Electric") {
//            bpMods.push(terrainMultiplier);
//            description.terrain = field.terrain;
//        } else if (field.terrain === "Grassy" && move.type == "Grass") {
//            bpMods.push(terrainMultiplier);
//            description.terrain = field.terrain;
//        } else if (field.terrain === "Psychic" && move.type == "Psychic") {
//            bpMods.push(terrainMultiplier);
//            description.terrain = field.terrain;
//        }
//    }//v. Defensive Terrain
//    if (defIsGrounded) {
//        if ((field.terrain === "Misty" && move.type === "Dragon") ||
//            (field.terrain === "Grassy" && (move.name === "Earthquake" || move.name === "Bulldoze"))) {
//            bpMods.push(0x800);
//            description.terrain = field.terrain;
//        }
//    }

//    //w. Mud Sport, Water Sport
//    return [bpMods, description, move];
//}

////3. Attack
//function calcAttack(move, attacker, defender, description, necrozmaMove, smartMove, isCritical, defAbility) {
//    //a. Foul Play, Photon Geyser, Light That Burns The Sky, Shell Side Arm, Body Press
//    var attack;
//    var attackSource = move.name === "Foul Play" ? defender : attacker;
//    var usesPhysicalAttackStat = move.category === "Physical" || (necrozmaMove && attacker.stats[AT] >= attacker.stats[SA]) || (smartMove && (attacker.stats[AT] / defender.stats[DF]) >= (attacker.stats[SA] / defender.stats[SD]));
//    var usesDefenseStat = move.name === "Body Press";
//    var attackStat = usesDefenseStat ? DF : usesPhysicalAttackStat ? AT : SA;
//    description.attackEVs = attacker.evs[attackStat] +
//        (NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
//        toSmogonStat(attackStat);
//    //b. Unaware
//    if (defAbility === "Unaware") {
//        attack = attackSource.rawStats[attackStat];
//        description.defenderAbility = defAbility;
//    }
//    //Spectral Thief and Meteor Beam aren't part of the calculations but are instead here to properly account for the boosts they give
//    else if (move.name === "Spectral Thief" && defender.boosts[attackStat] > 0) {
//        description.attackBoost = Math.min(6, attacker.boosts[attackStat] + defender.boosts[attackStat]);
//        attack = getModifiedStat(attackSource.rawStats[attackStat], Math.min(6, attacker.boosts[attackStat] + defender.boosts[attackStat]));
//    }
//    else if (move.name === "Meteor Beam") {
//        description.attackBoost = Math.min(6, attackSource.boosts[attackStat] + 1);
//        attack = getModifiedStat(attackSource.rawStats[attackStat], Math.min(6, attackSource.boosts[attackStat] + 1));
//    } //c. Crit
//    else if (attackSource.boosts[attackStat] === 0 || (isCritical && attackSource.boosts[attackStat] < 0)) {
//        attack = attackSource.rawStats[attackStat];
//    } //d. Attack boosts and drops
//    else {
//        attack = attackSource.stats[attackStat];
//        description.attackBoost = attackSource.boosts[attackStat];
//    }

//    //e. Hustle
//    // unlike all other attack modifiers, Hustle gets applied directly
//    if (attacker.ability === "Hustle" && move.category === "Physical") {
//        attack = pokeRound(attack * 3 / 2);
//        description.attackerAbility = attacker.ability;
//    }

//    return [attack, description];
//}

////4. Attack Mods
//function calcAtMods(move, attacker, defAbility, description, field) {
//    atMods = [];

//    //a. 0.5x Abilities
//    //Slow Start also halves damage with special Z-moves
//    if ((attacker.ability === "Slow Start" && attacker.abilityOn && (move.category === "Physical" || (move.category === "Special" && move.isZ))) ||
//        (attacker.ability === "Defeatist" && attacker.curHP <= attacker.maxHP / 2)) {
//        atMods.push(0x800);
//        description.attackerAbility = attacker.ability;
//    }
//    //b. Flower Gift
//    if (attacker.ability === "Flower Gift" && attacker.name ==="Cherrim" && field.weather.indexOf("Sun") > -1 && move.category === "Physical" && attacker.item !== 'Utility Umbrella') {
//        atMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//        description.weather = field.weather;
//    }
//    else if (field.isFlowerGiftAtk && field.weather.indexOf("Sun") > -1 && move.category === "Physical" && attacker.item !== 'Utility Umbrella') {
//        atMods.push(0x1800);
//        description.isFlowerGiftAtk = true;
//        description.weather = field.weather;
//    }
//    //c. 1.5x Offensive Abilities
//    if ((attacker.ability === "Guts" && attacker.status !== "Healthy" && move.category === "Physical") ||
//        (attacker.ability === "Overgrow" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Grass") ||
//        (attacker.ability === "Blaze" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Fire") ||
//        (attacker.ability === "Torrent" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Water") ||
//        (attacker.ability === "Swarm" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Bug") ||
//        (attacker.ability === "Transistor" && move.type === "Electric") ||
//        (attacker.ability === "Dragon\'s Maw" && move.type === "Dragon")) {     //Overgrow/Blaze/Torrent/Swarm work differently in gen 3
//        atMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//    } else if (attacker.ability === "Flash Fire" && attacker.abilityOn && move.type === "Fire") {   //Flash Fire works differently in gen 3
//        atMods.push(0x1800);
//        description.attackerAbility = "Flash Fire";
//    } else if ((attacker.ability === "Steelworker") && move.type === "Steel") {
//        atMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//    } else if (attacker.ability === "Solar Power" && field.weather.indexOf("Sun") > -1 && move.category === "Special" && attacker.item !== 'Utility Umbrella') {
//        atMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//        description.weather = field.weather;
//    } else if (attacker.ability === "Gorilla Tactics" && move.category === "Physical" && !attacker.isDynamax) {
//        atMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//    }else if (["Plus", "Minus"].indexOf(attacker.ability) !== -1 && attacker.abilityOn){
//    atMods.push(0x1800);
//    description.attackerAbility = attacker.ability;
//    }

//    //d. 2.0x Offensive Abilities
//    //Add Stakeout here as well
//    if ((attacker.ability === "Water Bubble" && move.type === "Water") ||
//        ((attacker.ability === "Huge Power" || attacker.ability === "Pure Power") && move.category === "Physical")) {
//        atMods.push(0x2000);
//        description.attackerAbility = attacker.ability;
//    }
//    //e. 0.5x Defensive Abilities
//    if ((defAbility === "Thick Fat" && (move.type === "Fire" || move.type === "Ice")) || (defAbility === "Water Bubble" && move.type === "Fire")) {
//        atMods.push(0x800);
//        description.defenderAbility = defAbility;
//    }
//    //f. 2.0x Items
//    if ((attacker.item === "Thick Club" && (attacker.name === "Cubone" || attacker.name === "Marowak" || attacker.name === "Marowak-Alola") && move.category === "Physical") ||
//        (attacker.item === "Deep Sea Tooth" && attacker.name === "Clamperl" && move.category === "Special") ||
//        (attacker.item === "Light Ball" && (attacker.name === "Pikachu" || attacker.name === "Pikachu-Gmax"))) {
//        atMods.push(0x2000);
//        description.attackerItem = attacker.item;
//    } //g. 1.5x Items
//    else if ((attacker.item === "Choice Band" && move.category === "Physical" && !attacker.isDynamax) ||
//        (attacker.item === "Choice Specs" && move.category === "Special" && !attacker.isDynamax)) {
//        atMods.push(0x1800);
//        description.attackerItem = attacker.item;
//    }
//    return [atMods, description];
//}

////5. Defense
//function calcDefense(move, attacker, defender, description, hitsPhysical, isCritical, field) {
//    //a. Psyshock, Psystrike, Secret Sword (handled in hitsPhysical declaration)
//    var defenseStat = hitsPhysical ? DF : SD;
//    description.defenseEVs = defender.evs[defenseStat] +
//        (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
//        toSmogonStat(defenseStat);
//    //b. Wonder Room

//    //Spectral Thief isn't part of the calculations but is instead here to properly account for the boosts it takes
//    if (move.name === "Spectral Thief" && defender.boosts[defenseStat] > 0) {
//        defense = defender.rawStats[defenseStat];
//    }//c. Chip Away, Sacred Sword; d. Crits
//    else if (defender.boosts[defenseStat] === 0 || (isCritical && defender.boosts[defenseStat] > 0) || move.ignoresDefenseBoosts) {
//        defense = defender.rawStats[defenseStat];
//    }//e. Unaware
//    else if (attacker.ability === "Unaware") {
//        defense = defender.rawStats[defenseStat];
//        description.attackerAbility = attacker.ability;
//    }//f. Defense drops and boosts
//    else {
//        defense = defender.stats[defenseStat];
//        description.defenseBoost = defender.boosts[defenseStat];
//    }

//    //g. Sandstorm Rock types
//    // unlike all other defense modifiers, Sandstorm SpD boost gets applied directly
//    if (field.weather === "Sand" && gen > 3 && (defender.type1 === "Rock" || defender.type2 === "Rock") && !hitsPhysical) {
//        defense = pokeRound(defense * 3 / 2);
//        description.weather = field.weather;
//    }
//    return [defense, description];
//}

////6. Defense Mods
//function calcDefMods(move, defender, field, description, hitsPhysical, defAbility) {
//    var dfMods = [];
//    //a. Flower Gift
//    if (defAbility === "Flower Gift" && defender.name === "Cherrim" && field.weather.indexOf("Sun") > -1 && !hitsPhysical && defender.item !== 'Utility Umbrella') {
//        dfMods.push(0x1800);
//        description.defenderAbility = defAbility;
//        description.weather = field.weather;
//    }
//    else if (field.isFlowerGiftSpD && field.weather.indexOf("Sun") > -1 && !hitsPhysical && defender.item !== 'Utility Umbrella') {
//        dfMods.push(0x1800);
//        description.isFlowerGiftSpD = true;
//        description.weather = field.weather;
//    }
//    //b. 1.5x Abilities
//    if ((defAbility === "Marvel Scale" && defender.status !== "Healthy" && hitsPhysical) ||
//        (defAbility === "Grass Pelt" && field.terrain === "Grassy" && hitsPhysical)) {
//        dfMods.push(0x1800);
//        description.defenderAbility = defAbility;
//    } //c. 2x Abilities
//    else if ((defAbility === "Fur Coat" && hitsPhysical) ||
//        (defAbility === "Ice Scales" && ((!hitsPhysical && !move.makesContact) || move.dealsPhysicalDamage))) {
//        dfMods.push(0x2000);
//        description.defenderAbility = defAbility;
//    }
//    //d. 1.5x Items
//    if ((defender.item === "Assault Vest" && !hitsPhysical) ||
//        (defender.item === "Eviolite" && defender.canEvolve)) {
//        dfMods.push(0x1800);
//        description.defenderItem = defender.item;
//    } //e. 2.0x Items
//    else if ((defender.item === "Deep Sea Scale" && defender.name === "Clamperl" && !hitsPhysical) ||
//        (defender.item === "Metal Powder" && defender.name === "Ditto")) {
//        dfMods.push(0x2000);
//        description.defenderItem = defender.item;
//    }
//    return [dfMods, description];
//}

////7. Base Damage
//function calcBaseDamage(attacker, basePower, attack, defense) {
//    return Math.floor(Math.floor((Math.floor((2 * attacker.level) / 5 + 2) * basePower * attack) / defense) / 50 + 2);
//}

////8. General Damage Mods
//function calcGeneralMods(baseDamage, move, attacker, defender, defAbility, field, description, isCritical, typeEffectiveness, isQuarteredByProtect) {
//    //a. Spread Move mod
//    if (field.format !== "Singles" && move.isSpread) {
//        baseDamage = pokeRound(baseDamage * 0xC00 / 0x1000);
//    }
//    //b. Parental Bond mod
//    baseDamage = attacker.isChild ? pokeRound(baseDamage * 0x0400 / 0x1000) : baseDamage;    //should be accurate based on implementation
//    //c. Weather mod
//    if (((field.weather.indexOf("Sun") > -1 && move.type === "Fire") || (field.weather.indexOf("Rain") > -1 && move.type === "Water")) && defender.item !== 'Utility Umbrella') {
//        baseDamage = pokeRound(baseDamage * 0x1800 / 0x1000);
//        description.weather = field.weather;
//    } else if ((field.weather === "Strong Winds" && (defender.type1 === "Flying" || defender.type2 === "Flying") &&
//        typeChart[move.type]["Flying"] > 1)) {
//        description.weather = field.weather;        //not actually a mod, just adding the description here
//    } else if ((((field.weather === "Sun" && move.type === "Water") || (field.weather === "Rain" && move.type === "Fire")) && defender.item !== 'Utility Umbrella')) {
//        baseDamage = pokeRound(baseDamage * 0x800 / 0x1000);
//        description.weather = field.weather;
//    }
//    //d. Crit mod
//    if (isCritical) {
//        baseDamage = Math.floor(baseDamage * 1.5);
//        description.isCritical = isCritical;
//    }
//    // the random factor is applied between the crit mod and the stab mod, so don't apply anything below this until we're inside the loop
//    //see GENERAL MODS CONTINUED for further comments

//    var stabMod = 0x1000;
//    if (move.type === attacker.type1 || move.type === attacker.type2) {
//        if (attacker.ability === "Adaptability") {
//            stabMod = 0x2000;
//            description.attackerAbility = attacker.ability;
//        } else {
//            stabMod = 0x1800;
//        }
//    } else if (attacker.ability === "Protean" || attacker.ability == "Libero") {
//        stabMod = 0x1800;
//        description.attackerAbility = attacker.ability;
//    }
//    var applyBurn = (attacker.status === "Burned" && move.category === "Physical" && attacker.ability !== "Guts" && !move.ignoresBurn);
//    description.isBurned = applyBurn;
//    var finalMod;
//    [finalMod, description] = calcFinalMods(move, attacker, defender, field, description, isCritical, typeEffectiveness, defAbility);
//    finalMods = chainMods(finalMod);

//    var damage = [], pbDamage = [];
//    var child, childDamage, j;
//    var childMove, child2Damage, tripleDamage = [];

//    if (typeof (move.tripleHit2) === 'undefined') {
//        if (move.isTripleHit) {
//            if (move.tripleHits > 1) {
//                childMove = move;
//                childMove.tripleHit2 = true;
//                childDamage = GET_DAMAGE_SS(attacker, defender, childMove, field).damage;
//                if (move.tripleHits > 2) {
//                    childMove.tripleHit3 = true;
//                    child2Damage = GET_DAMAGE_SS(attacker, defender, childMove, field).damage;
//                    childMove.tripleHit3 = false;
//                }
//                childMove.tripleHit2 = false;
//            }
//            description.hits = move.tripleHits;
//        }
//        else if (attacker.ability === "Parental Bond" && move.hits === 1 && (field.format === "Singles" || !move.isSpread)) {
//            child = JSON.parse(JSON.stringify(attacker));
//            child.ability = '';
//            child.isChild = true;
//            childMove = move;
//            if (move.name === 'Power-Up Punch') {
//                child.boosts[AT]++;
//                child.stats[AT] = getModifiedStat(child.rawStats[AT], child.boosts[AT]);
//            }
//            else if (move.name === 'Assurance') {
//                childMove.isDouble = 1;
//            }
//            childDamage = GET_DAMAGE_SS(child, defender, childMove, field).damage;
//            description.attackerAbility = attacker.ability;
//        }
//    }
//    //GENERAL MODS CONTINUED
//    for (var i = 0; i < 16; i++) { //e. Rand mod
//        damage[i] = Math.floor(baseDamage * (85 + i) / 100);
//        //f. STAB mod
//        damage[i] = pokeRound(damage[i] * stabMod / 0x1000);
//        //g. Type Effect mod
//        damage[i] = Math.floor(damage[i] * typeEffectiveness);
//        //h. Burn mod
//        if (applyBurn) {
//            damage[i] = Math.floor(damage[i] / 2);
//        }
//        //i. Final mods
//        damage[i] = pokeRound(damage[i] * finalMods / 0x1000);
//        //j. Z-move and Max move protecting mod
//        if (isQuarteredByProtect) {
//            damage[i] = pokeRound(damage[i] * 0x400 / 0x1000);
//            description.isQuarteredByProtect = true;
//        }
//        //k. Min Damage Check
//        damage[i] = Math.max(1, damage[i]);
//        //l. Max Damage Check
//        if (damage[i] > 65535)
//            damage[i] %= 65536;

//        //Parental Bond child hit and Triple Kick/Axel second/third hit logic
//        if (typeof (move.tripleHit2) !== 'undefined' && move.tripleHit2 === false && move.isTripleHit) {
//            for (j = 0; j < 16; j++) {
//                if (typeof (move.tripleHit3) !== 'undefined' && move.tripleHit3 === false) {
//                    for (k = 0; k < 16; k++) {
//                        tripleDamage[(16 * i) + (16 * j) + k] = damage[i] + childDamage[j] + child2Damage[k];
//                    }
//                }
//                else {
//                    tripleDamage[(16 * i) + j] = damage[i] + childDamage[j];
//                }
//            }
//        }
//        else if (attacker.ability === "Parental Bond" && move.hits === 1 && !move.isTripleHit && (field.format === "Singles" || !move.isSpread)) {
//            for (j = 0; j < 16; j++) {
//                pbDamage[(16 * i) + j] = damage[i] + childDamage[j];
//            }
//        }
//    }
//    // Return a bit more info if this is a Parental Bond usage.
//    if (pbDamage.length) {
//        return {
//            "damage": pbDamage.sort(numericSort),
//            "parentDamage": damage,
//            "childDamage": childDamage,
//            "description": buildDescriptionSS(description)
//        };
//    }

//    if (tripleDamage.length) {
//        return {
//            "damage": tripleDamage.sort(numericSort),
//            "parentDamage": damage,
//            "childDamage": childDamage,
//            "child2Damage": move.tripleHits > 2 ? child2Damage : -1,
//            "description": buildDescriptionSS(description)
//        };
//    }

//    return {
//        "damage": pbDamage.length ? pbDamage.sort(numericSort) :
//            tripleDamage.length ? tripleDamage.sort(numericSort) :
//                damage,
//        "description": buildDescriptionSS(description)
//    };
//}

////9. Finals Damage Mods
//function calcFinalMods(move, attacker, defender, field, description, isCritical, typeEffectiveness, defAbility) {
//    var finalMods = [];
//    //a. Screens
//    //There's no Aurora Veil because it affects damage identically and can't stack with Reflect and Light Screen but it can always be added later
//    if (field.isReflect && move.category === "Physical" && !isCritical && move.name !== "Brick Break" && move.name !== "Psychic Fangs") {
//        finalMods.push(field.format !== "Singles" ? 0xAAC : 0x800);
//        description.isReflect = true;
//    } else if (field.isLightScreen && move.category === "Special" && !isCritical) {
//        finalMods.push(field.format !== "Singles" ? 0xAAC : 0x800);
//        description.isLightScreen = true;
//    }
//    if (defender.isDynamax) description.isDynamax = true;
//    //b. Neuroforce
//    if (attacker.ability === "Neuroforce" && typeEffectiveness > 1) {
//        finalMods.push(0x1400);
//        description.attackerAbility = attacker.ability;
//    }
//    //c. Sniper
//    if (attacker.ability === "Sniper" && isCritical) {
//        finalMods.push(0x1800);
//        description.attackerAbility = attacker.ability;
//    }
//    //d. Tinted Lens
//    if (attacker.ability === "Tinted Lens" && typeEffectiveness < 1) {
//        finalMods.push(0x2000);
//        description.attackerAbility = attacker.ability;
//    }
//    //e. Dynamax Cannon, Behemoth Blade, Behemoth Bash
//    if ((move.name === "Dynamax Cannon" || move.name === "Behemoth Blade" || move.name === "Behemoth Bash") && defender.isDynamax) {
//        finalMods.push(0x2000);
//    }
//    //f. Multiscale, Shadow Shield
//    if ((defAbility === "Multiscale" || defAbility == "Shadow Shield") && defender.curHP === defender.maxHP) {
//        finalMods.push(0x800);
//        description.defenderAbility = defAbility;
//    }
//    //g. Fluffy (contact)
//    if (defAbility === "Fluffy" && move.makesContact) {
//        finalMods.push(0x800);
//        description.defenderAbility = defAbility;
//    }
//    //h. Punk Rock
//    if (defAbility === "Punk Rock" && move.isSound) {
//        finalMods.push(0x800);
//        description.defenderAbility = defAbility;
//    }
//    //i. Friend Guard
//    if (field.isFriendGuard) {
//        finalMods.push(0xC00);
//        description.isFriendGuard = true;
//    }
//    //j. Solid Rock, Filter, Prism Armor
//    if ((defAbility === "Solid Rock" || defAbility === "Filter" || defAbility === "Prism Armor") && typeEffectiveness > 1) {
//        finalMods.push(0xC00);
//        description.defenderAbility = defAbility;
//    }
//    //k. Metronome item
//    //l. Fluffy (fire moves)
//    if (defAbility === "Fluffy" && move.type === "Fire") {
//        finalMods.push(0x2000);
//        description.defenderAbility = defAbility;
//    }
//    //m. Expert Belt
//    if (attacker.item === "Expert Belt" && typeEffectiveness > 1) {
//        finalMods.push(0x1333);
//        description.attackerItem = attacker.item;
//    } //n. Life Orb
//    else if (attacker.item === "Life Orb") {
//        finalMods.push(0x14CC);
//        description.attackerItem = attacker.item;
//    }
//    //o. Resist Berries
//    if (getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.type === "Normal") &&
//        attacker.ability !== "Unnerve" && attacker.ability !== "As One") {
//        if (defAbility === "Ripen") {
//            finalMods.push(0x400);
//            description.defenderAbility = defAbility;
//        }
//        else {
//            finalMods.push(0x800);
//        }
//        description.defenderItem = defender.item;
//    }
//    //p. Doubled damage
//    //p.i. Body Slam, Stomp, Dragon Rush, Steamroller, Heat Crash, Heavy Slam, Flying Press, Malicious Moonsault
//    //p.ii. Earthquake
//    //p.iii. Surf, Whirlpool
//    return [finalMods, description];
//}