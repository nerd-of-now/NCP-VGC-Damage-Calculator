/* Damage calculation for the Generation VIII games: Sword, Shield, Isle of Armor, and Crown Tundra; 
 * and for the Generation VII games: Sun, Moon, Ultra Sun, and Ultra Moon*/

function GET_DAMAGE_HANDLER(attacker, defender, move, field) {
    switch (gen) {
        case 1:
            return CALCULATE_DAMAGE_RBY(attacker, defender, move, field);
        case 2:
            return CALCULATE_DAMAGE_GSC(attacker, defender, move, field);
        case 3:
            return CALCULATE_DAMAGE_ADV(attacker, defender, move, field);
        case 4:
            return CALCULATE_DAMAGE_DPP(attacker, defender, move, field);
        case 5:
        case 6:
            return GET_DAMAGE_XY(attacker, defender, move, field);
        case 7:
        case 8:
        case 9:
            return GET_DAMAGE_SV(attacker, defender, move, field);
        default:
            return -1;
    }
}

function numericSort(a, b) {
    return a - b;
}

function buildDescription(description) {
    var output = "";
    if (description.attackBoost) {
        if (description.attackBoost > 0) {
            output += "+";
        }
        output += description.attackBoost + " ";
    }
    if (description.attackerLevel) {
        output = output + 'Lv. ' + description.attackerLevel + ' ';
    }
    if (!description.usesOppAtkStat) {
        output = appendIfSet(output, description.attackEVs);
    }
    output = appendIfSet(output, description.attackerItem);
    output = appendIfSet(output, description.attackerAbility);
    if (description.ruinSwordBeads) {
        output += description.ruinSwordBeads + " of Ruin ";
    }
    if (description.attackerTera) {
        output += "Tera-" + description.attackerTera + " ";
    }
    if (description.isBurned) {
        output += "burned ";
    }
    output += description.attackerName + " ";
    if (description.isHelpingHand) {
        output += "Helping Hand ";
    }
    if (description.isPowerSpot) {
        output += "Power Spot ";
    }
    if (description.isBattery) {
        output += "Battery ";
    }
    if (description.isSteelySpirit) {
        output += "Ally Steely Spirit ";
    }
    if (description.isFlowerGiftAtk) {
        output += "Flower Gift ";
    }
    if (description.meFirst) {
        output += "Me First ";
    }
    output += description.moveName + " ";
    if (description.moveBP && description.moveType) {
        output += "(" + description.moveBP + " BP " + description.moveType + ") ";
    } else if (description.moveBP) {
        output += "(" + description.moveBP + " BP) ";
    } else if (description.moveType) {
        output += "(" + description.moveType + ") ";
    }
    if (description.hits) {
        output += "(" + description.hits + " hits) ";
    }
    if (description.courseDriftSE) {
        output += "(Super Effective) ";
    }
    if (description.teraBPBoost) {
        output += "(Tera 60 BP Boost) ";
    }
    if (description.maskBoost) {
        output += "(1.2x Mask Boost) ";
    }
    if (description.stellarBoost) {
        output += "(1st Use) ";
    }
    output += "vs. ";
    if (description.defenseBoost) {
        if (description.defenseBoost > 0) {
            output += "+";
        }
        output += description.defenseBoost + " ";
    }
    if (description.defenderLevel) {
        output = output + 'Lv. ' + description.defenderLevel + ' ';
    }
    output = appendIfSet(output, description.HPEVs);
    if (description.usesOppAtkStat && description.attackEVs) {
        output += "/ " + description.attackEVs + " ";
    }
    if (description.defenseEVs) {
        output += "/ " + description.defenseEVs + " ";
    }
    if (description.isForesight) {
        output += "revealed ";
    }
    output = appendIfSet(output, description.defenderItem);
    if (description.isFlowerGiftSpD) {
        output += " Flower Gift ";
    }
    output = appendIfSet(output, description.defenderAbility);
    if (description.ruinTabletsVessel) {
        output += description.ruinTabletsVessel + " of Ruin ";
    }
    if (description.isDynamax) output += " Dynamax ";
    if (description.defenderTera) {
        output += "Tera-" + description.defenderTera + " ";
    }
    output += description.defenderName;
    if (description.weather) {
        output += " in " + description.weather;
    } else if (description.terrain) {
        output += " in " + description.terrain + " Terrain";
    }
    if (description.isAuroraVeil) {
        output += " through Aurora Veil";
    } else if (description.isReflect) {
        output += " through Reflect";
    } else if (description.isLightScreen) {
        output += " through Light Screen";
    }
    if (description.isCritical) {
        output += " on a critical hit";
    }
    if (description.isGravity) {
        output += " under Gravity";
    }
    if (description.isGlaiveMod) {
        output += " after using Glaive Rush";
    }
    if (description.isFriendGuard) {
        output += " with Friend Guard";
    }
    if (description.isQuarteredByProtect) {
        output += " through Protect";
    }

    return output;
}

function appendIfSet(str, toAppend) {
    if (toAppend) {
        return str + toAppend + " ";
    }
    return str;
}

function toSmogonStat(stat) {
    return stat === AT ? "Atk"
            : stat === DF ? "Def"
            : stat === SA ? "SpA"
            : stat === SD ? "SpD"
            : stat === SP ? "Spe"
            : "wtf";
}

function chainMods(mods) {
    var M = 0x1000;
    for(var i = 0; i < mods.length; i++) {
        if(mods[i] !== 0x1000) {
            M = Math.round((M * mods[i]) / 0x1000);
        }
    }
    return M;
}

function addLevelDesc(attacker, defender, description) {
    autoLevel = $('#douswitch').is(':checked') ? 50 : 100;
    if (attacker.level !== autoLevel)
        description.attackerLevel = attacker.level;
    if (defender.level !== autoLevel)
        description.defenderLevel = defender.level;
}

function getMoveEffectiveness(move, type, otherType, description, isForesight, isScrappy, isGravity, defItem, isStrongWinds, isTeraShell, defIsTera) {
    if (isTeraShell && typeChart[move.type][type] >= 0.5) {
        description.defenderAbility = 'Tera Shell';
        return 0.5;
    }
    else if (move.type == "Stellar" && defIsTera) {
        return 2;
    }
    else if ((isForesight || isScrappy) && type === "Ghost" && (move.type === "Normal" || move.type === "Fighting")) {
        if (isScrappy)
            description.attackerAbility = isScrappy;
        else
            description.isForesight = true;
        return 1;
    } else if ((isGravity || defItem == "Iron Ball" || move.name == "Thousand Arrows") && type === "Flying" && move.type === "Ground") {
        if (isGravity)
            description.isGravity = true;
        else if (defItem == "Iron Ball")
            description.defenderItem = "Iron Ball";
        return 1;
    } else if (otherType == "Flying" && move.type === "Ground" && (move.name == "Thousand Arrows" || defItem == "Iron Ball") && !isGravity && gen >= 5) {
        return 1;
    } else if (move.name === "Freeze-Dry" && type === "Water") {
        return 2;
    } else if (move.name === "Flying Press") {
        return typeChart["Fighting"][type] * typeChart["Flying"][type];
    } else if (isStrongWinds && type == "Flying" && typeChart[move.type][type] > 1) {
        return 1;
    } else if (defItem == "Ring Target" && typeChart[move.type][type] == 0) {
        description.defenderItem = "Ring Target";
        return 1;
    } else {
        return typeChart[move.type][type];
    }
}

function getModifiedStat(stat, mod) {
    return mod > 0 ? Math.floor(stat * (2 + mod) / 2)
            : mod < 0 ? Math.floor(stat * 2 / (2 - mod))
            : stat;
}

function getHPInfo(description, defender) {
    description.HPEVs = defender.HPEVs + " HP " + (defender.HPIVs < 31 ? defender.HPIVs + " IVs" : "");
}

//Speed Mods
function getFinalSpeed(pokemon, weather, tailwind, swamp, terrain) {

    //1. Speed boosts and drops
    var speed = getModifiedStat(pokemon.rawStats[SP], pokemon.boosts[SP]);
    //2. Other Speed mods
    var otherSpeedMods = 1;
    //a. Scarf
    if (pokemon.item === "Choice Scarf" && !pokemon.isDynamax) {
        otherSpeedMods *= 1.5;
    } //b. Macho Brace, Iron Ball, Power items
    else if (["Macho Brace", "Iron Ball", "Power Anklet", "Power Band", "Power Belt", "Power Bracer", "Power Lens", "Power Weight", "Klutz Iron Ball"].indexOf(pokemon.item) !== -1) {
        otherSpeedMods *= 0.5;
    } //c. Quick Powder
    else if (pokemon.name === "Ditto" && pokemon.item === "Quick Powder") {
        otherSpeedMods *= 2;
    }
    //d. Quick Feet
    if (pokemon.ability === "Quick Feet" && pokemon.status !== "Healthy")
    {
        otherSpeedMods *= 1.5;
    } //e. Slow Start
    else if (pokemon.ability === "Slow Start")
    {
        otherSpeedMods *= 0.5;
    } //f. 2x Abilities
    else if ((((pokemon.ability === "Chlorophyll" && weather.indexOf("Sun") > -1) ||
            (pokemon.ability === "Swift Swim" && weather.indexOf("Rain") > -1)) && pokemon.item !== 'Utility Umbrella') ||
            (pokemon.ability === "Sand Rush" && weather === "Sand") ||
            (pokemon.ability === "Slush Rush" && ["Hail", "Snow"].indexOf(weather) > -1) ||
            (pokemon.ability === "Surge Surfer" && terrain === "Electric") ||
            (pokemon.ability === "Unburden" && pokemon.item === "")) {
        otherSpeedMods *= 2;
    }
    //g. Tailwind
    if (tailwind) otherSpeedMods *= 2;
    //h. Grass/Water Pledge Swamp
    if (swamp) otherSpeedMods *= 0.25;
    //i. Protosynthesis, Quark Drive
    if (pokemon.paradoxAbilityBoost && pokemon.highestStat === 'sp')
        otherSpeedMods *= 1.5;

    speed = pokeRound(speed * otherSpeedMods);

    //3. Paralysis
    if (pokemon.status === "Paralyzed" && pokemon.ability !== "Quick Feet") {
        if (gen >= 7)
            speed = Math.floor(speed / 2);
        else speed = Math.floor(speed / 4);
    }
    //4. 65536 Speed check
    if (speed > 65535) { speed %= 65536; }
    //5. 10000 Speed check
    if (speed > 10000) { speed = 10000; }
    return speed;
}

//Currently used for determining Protosynthesis/Quark Drive boost, may be expanded upon depending on future releases
function setHighestStat(pokemon, pPosition) {
    if (pokemon.highestStat == -1) {
        allStats = [pokemon.stats[AT], pokemon.stats[DF], pokemon.stats[SA], pokemon.stats[SD], pokemon.stats[SP]];
        pokemon.highestStat = allStats.indexOf(Math.max(...allStats));
    }
    lastHighestStat[pPosition] = pokemon.highestStat;
    pokemon.highestStat = pokemon.highestStat == 0 ? 'at'
        : pokemon.highestStat == 1 ? 'df'
            : pokemon.highestStat == 2 ? 'sa'
                : pokemon.highestStat == 3 ? 'sd'
                    : pokemon.highestStat == 4 ? 'sp'
                        : 'oh dear this should not happen';
}

function usesPhysicalAttack(attacker, defender, move) {
    var userStatsMove = move.name == "Photon Geyser" || move.name == "Light That Burns the Sky"
        || (move.name == "Tera Blast" && attacker.isTerastalize) || (move.name == "Tera Starstorm" && attacker.name == "Terapagos-Stellar");
    var smartMove = move.name == "Shell Side Arm";

    return (userStatsMove && attacker.stats[AT] > attacker.stats[SA]) || (smartMove && (attacker.stats[AT] / defender.stats[DF]) > (attacker.stats[SA] / defender.stats[SD]));
}

function checkTrace(source, target) {
    var cannotCopy = ["As One", "Battle Bond", "Comatose", "Commander", "Disguise", "Flower Gift", "Forecast", "Gulp Missile",
        "Ice Face", "Illusion", "Imposter", "Multitype", "Power of Alchemy", 'Protosynthesis', 'Quark Drive', "Receiver", "RKS System", "Schooling",
        "Shields Down", "Stance Change", "Trace", "Wonder Guard", "Zen Mode", "Zero to Hero"];
    if (gen <= 4) {
        if (gen == 3) {
            cannotCopy.splice(cannotCopy.indexOf('Forecast'), 1);
            cannotCopy.splice(cannotCopy.indexOf('Trace'), 1);
        }
        else cannotCopy.splice(cannotCopy.indexOf('Flower Gift'), 1);
    }
    if (source.ability === "Trace" && source.abilityOn && cannotCopy.indexOf(target.ability) === -1 && source.item !== "Ability Shield") {
        source.ability = target.ability;
    }
}

function checkNeutralGas(p1, p2, isNGas) {
    var cannotSupress = ['As One', 'Battle Bond', 'Comatose', 'Disguise', 'Gulp Missile', 'Ice Face', 'Multitype',
        'Power Construct', 'RKS System', 'Schooling', 'Shields Down', 'Stance Change', 'Tera Shift', 'Zen Mode', 'Zero to Hero'];
    if (isNGas) {
        if (cannotSupress.indexOf(p1.ability) == -1 && p1.item !== 'Ability Shield') p1.ability = '';
        if (cannotSupress.indexOf(p2.ability) == -1 && p2.item !== 'Ability Shield') p2.ability = '';
    }
}
function checkAirLock(pokemon, field) {
    if (['Air Lock', 'Cloud Nine'].indexOf(pokemon.ability) !== -1) {
        field.clearWeather();
    }
}
function checkForecast(pokemon, weather) {
    if (pokemon.ability === "Forecast" && pokemon.name === "Castform") {
        if (weather.indexOf("Sun") > -1) {
            pokemon.type1 = "Fire";
        } else if (weather.indexOf("Rain") > -1) {
            pokemon.type1 = "Water";
        } else if (["Hail", "Snow"].indexOf(weather) > -1) {
            pokemon.type1 = "Ice";
        } else {
            pokemon.type1 = "Normal";
        }
        pokemon.type2 = "";
    }
}
function checkMimicry(pokemon, terrain) {
    if (pokemon.ability === "Mimicry" && terrain !== "") {
        pokemon.type1 = terrain === "Electric" ? 'Electric'
            : terrain === "Grassy" ? 'Grass'
                : terrain === "Misty" ? 'Fairy'
                    : 'Psychic';
        pokemon.type2 = '';
    }
}
function checkTerastal(pokemon) {
    if (pokemon.isTerastalize && pokemon.tera_type !== 'Stellar') {
        pokemon.teraSTAB1 = pokemon.type1;
        pokemon.teraSTAB2 = pokemon.type2;
        pokemon.type1 = pokemon.tera_type;
        pokemon.type2 = '';
    }
}

function checkKlutz(pokemon) {
    if (pokemon.ability === "Klutz") {
        if (['Macho Brace', 'Power Anklet', 'Power Band', 'Power Belt', 'Power Bracer', 'Power Lens', 'Power Weight'].indexOf(pokemon.item) === -1) {
            if (gen == 4) {
                if (pokemon.item === 'Iron Ball') {
                    pokemon.item = "Klutz Iron Ball";
                }
                else {
                    pokemon.item = getFlingPower(pokemon.item).toString();
                }
            }
            else {
                pokemon.item = "Klutz";
            }
        }
    }
}

function checkSeeds(pokemon, terrain) {
    if (pokemon.item === terrain + ' Seed') {
        if (['Electric', 'Grassy'].indexOf(terrain) !== -1)
            pokemon.boosts[DF] = Math.min(6, pokemon.boosts[DF] + 1);
        else
            pokemon.boosts[SD] = Math.min(6, pokemon.boosts[SD] + 1);
        pokemon.item = '';
    }
}

function checkParadoxAbilities(pokemon, terrain, weather) {
    if (['Protosynthesis', 'Quark Drive'].indexOf(pokemon.ability) !== -1) {
        if ((pokemon.ability === 'Protosynthesis' && weather === 'Sun')
            || (pokemon.ability === 'Quark Drive' && terrain === 'Electric')
            || (manualProtoQuark && pokemon.item !== 'Booster Energy'))
            pokemon.paradoxAbilityBoost = true;
        else if (pokemon.item === 'Booster Energy') {
            pokemon.paradoxAbilityBoost = true;
            pokemon.item = '';
        }
    }
}

function checkSupersweetSyrup(source, target) {
    if (source.ability === 'Supersweet Syrup' && source.abilityOn && target.item !== 'Clear Amulet') {
        if (target.ability === "Defiant") {
            target.boosts[AT] = Math.min(6, target.boosts[AT] + 2);
        }
        else if (target.ability === "Competitive") {
            target.boosts[AT] = Math.min(6, target.boosts[SA] + 2);
        }
    }
}

function checkIntimidate(source, target) {
    if (source.ability === "Intimidate" && source.abilityOn) {
        var checkSimple = target.ability === "Simple" ? 1 : 0;

        //Contrary & Guard Dog need to be first; these abilities supersede Clear Amulet but not Mirror Armor for some reason
        if (["Contrary", "Guard Dog"].indexOf(target.ability) !== -1) {
            target.boosts[AT] = Math.min(6, target.boosts[AT] + 1);
        }
        else if (["Clear Body", "White Smoke", "Hyper Cutter", "Full Metal Body"].indexOf(target.ability) !== -1
            || (["Inner Focus", "Oblivious", "Own Tempo", "Scrappy"].indexOf(target.ability) !== -1 && gen >= 8)
            || target.item === "Clear Amulet") {
            // no effect
        }
        else if (target.ability === "Mirror Armor") {
            source.boosts[AT] = Math.max(-6, source.boosts[AT] - 1);
        }
        else {
            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 1 * (1 + checkSimple));
            if (target.ability === "Defiant") {
                target.boosts[AT] = Math.min(6, target.boosts[AT] + 2);
            }
            else if (target.ability === "Competitive") {
                target.boosts[SA] = Math.min(6, target.boosts[SA] + 2);
            }
        }
        if (target.item === "Adrenaline Orb" && target.ability !== "Mirror Armor") {
            target.boosts[SP] = Math.min(6, target.boosts[SP] + 1 * (1 + checkSimple));
            target.item = '';
        }
        if (target.ability === "Rattled" && gen >= 8 && target.item !== "Clear Amulet") {
            target.boosts[SP] = Math.min(6, target.boosts[SP] + 1);
        }
    }
}

function checkSwordShield(pokemon) {
    if (pokemon.ability === "Intrepid Sword" && (gen !== 9 || pokemon.abilityOn)) {
        pokemon.boosts[AT] = Math.min(6, pokemon.boosts[AT] + 1);
    }
    else if (pokemon.ability === "Dauntless Shield" && (gen !== 9 || pokemon.abilityOn)) {
        pokemon.boosts[DF] = Math.min(6, pokemon.boosts[DF] + 1);
    }
}

function checkWindRider(pokemon, tailwind) {
    if (pokemon.ability === "Wind Rider" && tailwind)
        pokemon.boosts[AT] = Math.min(6, pokemon.boosts[AT] + 1);
}

function checkEvo(p1, p2){
    if ($('#evoL').prop("checked") || $('#tatsuL').prop("checked")){
        p1.boosts[AT] = Math.min(6, p1.boosts[AT] + 2);
        p1.boosts[DF] = Math.min(6, p1.boosts[DF] + 2);
        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2);
        p1.boosts[SD] = Math.min(6, p1.boosts[SD] + 2);
        p1.boosts[SP] = Math.min(6, p1.boosts[SP] + 2);
    }
    if ($('#evoR').prop("checked") || $('#tatsuR').prop("checked")){
        p2.boosts[AT] = Math.min(6, p2.boosts[AT] + 2);
        p2.boosts[DF] = Math.min(6, p2.boosts[DF] + 2);
        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2);
        p2.boosts[SD] = Math.min(6, p2.boosts[SD] + 2);
        p2.boosts[SP] = Math.min(6, p2.boosts[SP] + 2);
    }

    if($('#clangL').prop("checked")){
        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2);
        p1.boosts[SD] = Math.min(6, p1.boosts[SD] + 2);
        p1.boosts[SP] = Math.min(6, p1.boosts[SP] + 2);
    }
    if($('#clangR').prop("checked")){
        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2);
        p2.boosts[SD] = Math.min(6, p2.boosts[SD] + 2);
        p2.boosts[SP] = Math.min(6, p2.boosts[SP] + 2);
    }
    if ($('#weakL').prop("checked")) {
        p1.boosts[AT] = Math.min(6, p1.boosts[AT] + 2);
        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2);
    }
    if ($('#weakR').prop("checked")) {
        p2.boosts[AT] = Math.min(6, p2.boosts[AT] + 2);
        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2);
    }

}

function checkDownload(source, target) {
    if (source.ability === "Download") {
        if (target.stats[DF] && target.stats[SD]) {
            if (target.stats[SD] <= target.stats[DF]) {
                source.boosts[SA] = Math.min(6, source.boosts[SA] + 1);
            } else {
                source.boosts[AT] = Math.min(6, source.boosts[AT] + 1);
            }
        }
        else {
            if (getModifiedStat(target.rawStats[SD], target.boosts[SD]) <= getModifiedStat(target.rawStats[DF], target.boosts[DF])) {
                source.boosts[SA] = Math.min(6, source.boosts[SA] + 1);
            } else {
                source.boosts[AT] = Math.min(6, source.boosts[AT] + 1);
            }
        }
    }
}

function checkEmbodyAspect(pokemon) {
    if (pokemon.ability === 'Embody Aspect') {
        if (pokemon.name === 'Ogerpon') {
            pokemon.boosts[SP] = Math.min(6, pokemon.boosts[SP] + 1);
        }
        else if (pokemon.name === 'Ogerpon-Wellspring' && pokemon.item === 'Wellspring Mask') {
            pokemon.boosts[SD] = Math.min(6, pokemon.boosts[SD] + 1);
        }
        else if(pokemon.name === 'Ogerpon-Hearthflame' && pokemon.item === 'Hearthflame Mask') {
            pokemon.boosts[AT] = Math.min(6, pokemon.boosts[AT] + 1);
        }
        else if (pokemon.name === 'Ogerpon-Cornerstone' && pokemon.item === 'Cornerstone Mask') {
            pokemon.boosts[DF] = Math.min(6, pokemon.boosts[DF] + 1);
        }
    }
}

//CONSIDER AN ALL ENCOMPASSING FUNCTION FOR BOOSTS

function checkInfiltrator(attacker, affectedSide) {
    if (attacker.ability === "Infiltrator") {
        affectedSide.isAuroraVeil = false;
        affectedSide.isReflect = false;
        affectedSide.isLightScreen = false;
    }
}

function countBoosts(boosts) {
    var sum = 0;
    for (var i = 0; i < STATS.length; i++) {
        if (boosts[STATS[i]] > 0) {
            sum += boosts[STATS[i]];
        }
    }
    return sum;
}

// GameFreak rounds DOWN on .5
function pokeRound(num) {
    return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
}

function getWeightMods(p1, p2) {
    if (p1.ability == "Heavy Metal") p1.weight *= 2;
    else if (p1.ability == "Light Metal") p1.weight /= 2;

    if (p2.ability == "Heavy Metal") p2.weight *= 2;
    else if (p2.ability == "Light Metal") p2.weight /= 2;

    if (p1.item == "Float Stone") p1.weight /= 2;
    if (p2.item == "Float Stone") p2.weight /= 2;
}

function checkMoveTypeChange(move, field, attacker) {
    if (move.name == "Weather Ball") {
        move.type = field.weather.indexOf("Sun") > -1 && attacker.item !== 'Utility Umbrella' ? "Fire"
            : field.weather.indexOf("Rain") > -1 && attacker.item !== 'Utility Umbrella' ? "Water"
                : field.weather === "Sand" ? "Rock"
                    : ["Hail", "Snow"].indexOf(field.weather) > -1 ? "Ice"
                        : "Normal";
    }
    else if (move.name == "Terrain Pulse" || move.name == "Nature Power") {
        move.type = field.terrain === "Electric" ? "Electric"
            : field.terrain === "Grassy" ? "Grass"
                : field.terrain === "Misty" ? "Fairy"
                    : field.terrain === "Psychic" ? "Psychic"
                        : "Normal";
    }
    else if (move.name == "Techno Blast") {
        move.type = attacker.item === "Burn Drive" ? "Fire"
            : attacker.item === "Chill Drive" ? "Ice"
                : attacker.item === "Douse Drive" ? "Water"
                    : attacker.item === "Shock Drive" ? "Electric"
                        : "Normal";
    }
    else if (move.name === "Multi-Attack" && attacker.item.indexOf("Memory") !== -1) {
        move.type = getMemoryType(attacker.item);
    }
    else if (move.name === "Judgment" && attacker.item.indexOf("Plate") !== -1) {
        move.type = getItemBoostType(attacker.item);
    }
    else if (move.name === "Revelation Dance") {
        move.type = attacker.type1 !== 'Typeless' ? attacker.type1
            : attacker.type2 !== 'Typeless' && attacker.type2 !== "" ? attacker.type2
                : 'Typeless';
    }
    else if (move.isPledge && move.name !== move.combinePledge) {
        var bothPledgeNames = move.name + " " + move.combinePledge;
        move.type = bothPledgeNames.includes("Grass") && bothPledgeNames.includes("Fire") ? 'Fire'
            : bothPledgeNames.includes("Grass") && bothPledgeNames.includes("Water") ? 'Grass'
                : bothPledgeNames.includes("Water") && bothPledgeNames.includes("Fire") ? 'Water'
                    : 'Typeless';   //last case should never happen, just there to help with debugging
    }
    else if (move.name === 'Aura Wheel' && attacker.name === 'Morpeko-Hangry') {
        move.type = 'Dark';
    }
    else if (move.name === "Tera Blast" && attacker.isTerastalize) {
        move.type = attacker.tera_type;
    }
    else if (move.name === "Raging Bull") {
        switch (attacker.name) {
            case "Tauros-Paldea-Combat":
                move.type = "Fighting";
                break;
            case "Tauros-Paldea-Blaze":
                move.type = "Fire";
                break;
            case "Tauros-Paldea-Aqua":
                move.type = "Water";
                break;
            default:
                move.type = "Normal";
        }
    }
    else if (move.name === "Ivy Cudgel") {
        switch (attacker.name) {
            case "Ogerpon-Wellspring":
                move.type = "Water";
                break;
            case "Ogerpon-Hearthflame":
                move.type = "Fire";
                break;
            case "Ogerpon-Cornerstone":
                move.type = "Rock";
                break;
            default:
                move.type = "Grass";
        }
    }
    else if ((move.name == "Struggle" && gen >= 2) || (['Beat Up', 'Future Sight', 'Doom Desire'].indexOf(move.name) != -1 && gen <= 4)) {
        move.type = 'Typeless';
    }
    else if (move.name === 'Tera Starstorm' && attacker.name === 'Terapagos-Stellar') {
        move.type = 'Stellar';
    }
}

function checkConditionalPriority(move, terrain, attackerAbility) {
    if ((move.isHealing && attackerAbility == "Triage") || (move.name == "Grassy Glide" && terrain == "Grassy"))
        move.isPriority = true;
}

function checkConditionalSpread(move, terrain, attacker, attIsGrounded) {
    if ((move.name == "Expanding Force" && terrain == "Psychic" && attIsGrounded) || (move.name == "Tera Starstorm" && attacker.name == "Terapagos-Stellar"))
        move.isSpread = true;
}

function checkContactOverride(move, attacker) {
    if (move.makesContact && (attacker.item === 'Protective Pads' || (attacker.item === 'Punching Glove' && move.isPunch) || attacker.ability === "Long Reach"))
        move.makesContact = false;
}

function ZMoves(move, field, attacker, isQuarteredByProtect, moveDescName) {
    if (move.isSignatureZ) {
        move.isZ = true;
        if (field.isProtect) {
            isQuarteredByProtect = true;
        }
    }
    else if (move.isZ) {
        var tempMove = move;

        if (move.name.includes("Hidden Power") || move.name === 'Revelation Dance') {
            move.type = "Normal";
        }
        else move.type = tempMove.type;

        var ZName = ZMOVES_LOOKUP[tempMove.type];
        var SigZ;
        if (attacker.isTransformed) {
            var tempSpecies = $("#p1").find(".transform").prop("checked") ? transformSpecies["p1"] : transformSpecies["p2"];
            SigZ = getSignatureZMove(attacker.item, tempSpecies, move.name);
        }
        else
            SigZ = getSignatureZMove(attacker.item, attacker.name, tempMove.name);
        if (SigZ !== -1) ZName = SigZ;
        //turning it into a generic single-target Z-move
        move = moves[ZName];
        if (move == undefined) move = tempMove;
        move.name = ZName;
        if (SigZ == -1) {
            if (tempMove.zp) move.bp = tempMove.zp; //for any moves that don't fit into the bracketed z-move bp
            else if (tempMove.bp <= 55) move.bp = 100;
            else if (tempMove.bp <= 65) move.bp = 120;
            else if (tempMove.bp <= 75) move.bp = 140;
            else if (tempMove.bp <= 85) move.bp = 160;
            else if (tempMove.bp <= 95) move.bp = 175;
            else if (tempMove.bp <= 100) move.bp = 180;
            else if (tempMove.bp <= 110) move.bp = 185;
            else if (tempMove.bp <= 125) move.bp = 190;
            else if (tempMove.bp <= 130) move.bp = 195;
            else move.bp = 200;
            move.name = "Z-" + tempMove.name;
            move.isZ = true;
            move.category = tempMove.category;
            moveDescName = ZName + " (" + move.bp + " BP)";
        }
        else
            moveDescName = ZName;
        move.isCrit = tempMove.isCrit;
        move.hits = 1;
        if (field.isProtect) {
            isQuarteredByProtect = true;
        }
    }
    return [move, isQuarteredByProtect, moveDescName];
}

function MaxMoves(move, attacker, isQuarteredByProtect, moveDescName, field) {
    var exceptions_100_fight = ["Low Kick", "Reversal", "Final Gambit"];
    var exceptions_80_fight = ["Double Kick", "Triple Kick"];
    var exceptions_75_fight = ["Counter", "Seismic Toss"];
    var exceptions_140 = ["Crush Grip", "Wring Out", "Magnitude", "Double Iron Bash", "Rising Voltage", "Triple Axel"];
    var exceptions_130 = ["Pin Missile", "Power Trip", "Punishment", "Dragon Darts", "Dual Chop", "Electro Ball", "Heat Crash",
        "Bullet Seed", "Grass Knot", "Bonemerang", "Bone Rush", "Fissure", "Icicle Spear", "Sheer Cold", "Weather Ball", "Tail Slap", "Guillotine", "Horn Drill",
        "Flail", "Return", "Frustration", "Endeavor", "Natural Gift", "Trump Card", "Stored Power", "Rock Blast", "Gear Grind", "Gyro Ball", "Heavy Slam",
        "Dual Wingbeat", "Terrain Pulse", "Surging Strikes", "Scale Shot"];
    var exceptions_120 = ["Double Hit", "Spike Cannon"];
    var exceptions_100 = ["Twineedle", "Beat Up", "Fling", "Dragon Rage", "Nature's Madness", "Night Shade", "Comet Punch", "Fury Swipes", "Sonic Boom", "Bide",
        "Super Fang", "Present", "Spit Up", "Psywave", "Mirror Coat", "Metal Burst"];
    var tempMove = move;
    var maxName = MAXMOVES_LOOKUP[tempMove.type];
    if (G_MAXMOVES_TYPE[attacker.name] == tempMove.type) {
        maxName = G_MAXMOVES_LOOKUP[attacker.name];
    }
    move = moves[maxName];
    if (move == undefined) move = tempMove; //prevents crashing when switching between Gen VII and VIII, as well as for Typeless Max Moves
    else {
        move.type = tempMove.type;
        move.name = maxName;
    }
    if (['G-Max Drum Solo', 'G-Max Fireball', 'G-Max Hydrosnipe'].indexOf(maxName) == -1) {
        if (move.type == "Fighting" || move.type == "Poison") {
            if (tempMove.bp >= 150 || exceptions_100_fight.includes(tempMove.name)) move.bp = 100;
            else if (tempMove.bp >= 110) move.bp = 95;
            else if (tempMove.bp >= 75) move.bp = 90;
            else if (tempMove.bp >= 65) move.bp = 85;
            else if (tempMove.bp >= 55 || exceptions_80_fight.includes(tempMove.name)) move.bp = 80;
            else if (tempMove.bp >= 45 || exceptions_75_fight.includes(tempMove.name)) move.bp = 75;
            else move.bp = 70;
        }
        else {
            if (tempMove.bp >= 150) move.bp = 150;
            else if (tempMove.bp >= 110 || exceptions_140.includes(tempMove.name)) move.bp = 140;
            else if (tempMove.bp >= 75 || exceptions_130.includes(tempMove.name)) move.bp = 130;
            else if (tempMove.bp >= 65 || exceptions_120.includes(tempMove.name)) move.bp = 120;
            else if (tempMove.bp >= 55 || exceptions_100.includes(tempMove.name)) move.bp = 110;
            else if (tempMove.bp >= 45) move.bp = 100;
            else move.bp = 90;
        }
    }
    if (move.name === "G-Max Wind Rage")
        move.ignoreScreens = true;
    if (maxName != undefined)
        moveDescName = maxName + " (" + move.bp + " BP)";
    if (tempMove.name == "(No Move)") {
        moveDescName = "(No Move)";
        move.bp = 0;
        move.isCrit = false;
    }
    else if (tempMove.category == "Status") {
        moveDescName = "Max Guard";
        move.name = moveDescName;
        move.bp = 0;
        move.isCrit = false;
    }
    else move.isCrit = tempMove.isCrit;
    move.category = tempMove.category;
    move.hits = 1;
    if (field.isProtect && ["G-Max One Blow", "G-Max Rapid Flow"].indexOf(maxName) == -1) isQuarteredByProtect = true;

    return [move, isQuarteredByProtect, moveDescName];
}

function NaturePower(move, field, moveDescName) {         //Rename Nature Power to its appropriately called moves; needs to be done after Max Moves since Nature Power becomes Max Guard
    move.category = "Special";
    var natureZ = move.isZ;
    var npMove = gen == 3 ? "Swift" : gen == 5 ? "Earthquake"
        : (field.terrain == "Electric") ? "Thunderbolt"
            : (field.terrain == "Grassy") ? "Energy Ball"
                : (field.terrain == "Psychic") ? "Psychic"
                    : (field.terrain == "Misty") ? "Moonblast"
                        : "Tri Attack";
    move.name = npMove;
    move = moves[npMove];
    move.isZ = natureZ;
    move.hits = 1;
    moveDescName = npMove;
    return [move, moveDescName];
}

function checkMeFirst(move, moveDescName) {
    var meFirstZ = move.isZ;
    moveName = move.usedOppMove;
    move = moves[move.usedOppMove];
    move.name = moveName;
    move.isMeFirst = true;
    move.isZ = meFirstZ;
    moveDescName = move.name;
    return [move, moveDescName];
}

function statusMoves(move, attacker, defender, description) {
    if (move.name === "Pain Split" && attacker.item !== "Assault Vest") {
        return { "damage": [Math.floor((defender.curHP - attacker.curHP) / 2)], "description": buildDescription(description) };
    }
    else if (move.bp === 0 || move.category === "Status") {
        return { "damage": [0], "description": buildDescription(description) };
    }
}

function abilityIgnore(attacker, move, defAbility, description, defItem = "") {
    var isIgnoreable = ['Shadow Shield', 'Full Metal Body', 'Prism Armor', 'As One', 'Protosynthesis', 'Quark Drive',
        'Tablets of Ruin', 'Vessel of Ruin', 'Sword of Ruin', 'Beads of Ruin'].indexOf(defAbility) == -1 && defItem !== "Ability Shield";
    var isMoldBreaker = ["Mold Breaker", "Teravolt", "Turboblaze"].indexOf(attacker.ability) !== -1;
    var isIgnoreMove = ["Moongeist Beam", "Sunsteel Strike", "Photon Geyser", "Searing Sunraze Smash", "Menacing Moonraze Maelstrom",
        "Light That Burns the Sky", 'G-Max Drum Solo', 'G-Max Fireball', 'G-Max Hydrosnipe'].indexOf(move.name) !== -1;

    if (isMoldBreaker || isIgnoreMove) {
        move.ignoresFriendGuard = true;
        if (isIgnoreable) {
            defAbility = "[ignored]";
            if (isMoldBreaker)
                description.attackerAbility = attacker.ability;
        }
    }

    return [defAbility, description];
}

function critMove(move, defAbility) {
    return move.isCrit && ["Battle Armor", "Shell Armor"].indexOf(defAbility) === -1;
}

//UNUSED CURRENTLY
function HiddenPower(move, attacker, description) {
    var typeOrder = ['Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'];
    var typeIndex = Math.floor(((attacker.ivs['hp'] & 1) + (attacker.ivs[AT] & 1) * 2 + (attacker.ivs[DF] & 1) * 4 + (attacker.ivs[SP] & 1) * 8 + (attacker.ivs[SA] & 1) * 16 + (attacker.ivs[SD] & 1) * 32) * 15 / 63);
    move.type = typeOrder[typeIndex];
    if (gen < 6) {
        move.bp = Math.floor((secondLeastSigBit(attacker.ivs['hp']) + (secondLeastSigBit(attacker.ivs[AT]) * 2) + (secondLeastSigBit(attacker.ivs[DF]) * 4) + (secondLeastSigBit(attacker.ivs[SP]) * 8) + (secondLeastSigBit(attacker.ivs[SA]) * 16) + (secondLeastSigBit(attacker.ivs[SD]) * 32)) * 40 / 63) + 30;
        description.moveBP = move.bp;
    }
    description.moveType = move.type;

    return [move, description];
}

function secondLeastSigBit(val) {
    if (val & 2) {
        return true;
    }
    return false;
}

function NaturalGift(move, attacker, description) {
        var gift = getNaturalGift(attacker.item);
        move.type = gift.t;
        move.bp = gift.p;
        description.attackerItem = attacker.item;
        description.moveBP = move.bp;
        description.moveType = move.type;
    
    return [move, description];
}

function ateIzeTypeChange(move, attacker, description) {
    var isBoosted = false;
    if (attacker.ability === "Liquid Voice" && move.isSound) {
        move.type = "Water";
        description.attackerAbility = attacker.ability;
    }
    else {
        if (attacker.ability !== "Normalize" && move.type === "Normal") { //Z-Moves don't receive -ate type changes
            switch (attacker.ability) {
                case "Aerilate":
                    move.type = "Flying";
                    break;
                case "Pixilate":
                    move.type = "Fairy";
                    break;
                case "Refrigerate":
                    move.type = "Ice";
                    break;
                default:    //Galvanize
                    move.type = "Electric";
            }
            if (attacker.isDynamax)
                description.moveName = MAXMOVES_LOOKUP[move.type] + " (" + move.bp + " BP)";
            isBoosted = true;     //indicates whether the move gets the boost or not
        }
        else if(attacker.ability === "Normalize") {
            move.type = "Normal";
            if (attacker.isDynamax)
                description.moveName = "Max Strike (" + move.bp + " BP)";
            isBoosted = gen >= 7 ? true : false;     //indicates whether the move gets the boost or not
        }
    }

    return [move, description, isBoosted];
}

function immunityChecks(move, attacker, defender, field, description, defAbility, typeEffectiveness) {
    if (typeEffectiveness === 0 || (gen === 3 && move.type === '???')) {
        return { "damage": [0], "description": buildDescription(description) };
    }
    if ((defAbility === "Wonder Guard" && typeEffectiveness <= 1 && move.name !== 'Struggle' && (gen !== 4 || move.name !== 'Fire Fang')) ||
        (move.type === "Grass" && defAbility === "Sap Sipper") ||
        (move.type === "Fire" && ["Flash Fire", "Well-Baked Body"].indexOf(defAbility) !== -1) ||
        (move.type === "Water" && (["Dry Skin", "Water Absorb"].indexOf(defAbility) !== -1 || (defAbility === 'Storm Drain' && gen !== 4))) ||
        (move.type === "Electric" && (["Motor Drive", "Volt Absorb"].indexOf(defAbility) !== -1 || (defAbility === 'Lightning Rod' && gen > 4))) ||
        (move.type === "Ground" && ((!field.isGravity && defender.item !== "Iron Ball" && defAbility === "Levitate") || defAbility === "Earth Eater")) ||
        (move.isBullet && defAbility === "Bulletproof") ||
        (move.isSound && defAbility === "Soundproof") ||
        (move.isWind && defAbility === "Wind Rider")) {
        description.defenderAbility = defAbility;
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (move.type === "Ground" && !field.isGravity && defender.item === "Air Balloon" && move.name !== "Thousand Arrows") {
        description.defenderItem = defender.item;
        return { "damage": [0], "description": buildDescription(description) };
    }
    if ((field.weather === "Harsh Sun" && move.type === "Water") || (field.weather === "Heavy Rain" && move.type === "Fire")) {
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (move.name === "Sky Drop" &&
        ([defender.type1, defender.type2].indexOf("Flying") !== -1 ||
            (gen >= 6 && defender.weight >= 200.0) || field.isGravity)) {
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (move.name === "Synchronoise" &&
        [defender.type1, defender.type2].indexOf(attacker.type1) === -1 && [defender.type1, defender.type2].indexOf(attacker.type2) === -1) {
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (defender.isDynamax && ["Grass Knot", "Low Kick", "Heat Crash", "Heavy Slam"].indexOf(move.name) !== -1) {
        return { "damage": [0], "description": buildDescription(description) };
    }
    if ((defAbility === "Damp" || attacker.ability === "Damp") && ["Self-Destruct", "Explosion", "Mind Blown", "Misty Explosion"].indexOf(move.name) !== -1) {
        if (defAbility === "Damp")
            description.defenderAbility = defAbility;
        if (attacker.ability === "Damp")
            description.attackerAbility = attacker.ability;
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (move.name === "Fling" && cantFlingItem(attacker.item, attacker.name, defAbility)) {
        description.attackerItem = attacker.item;
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (move.name === "Natural Gift" && attacker.item.indexOf(" Berry") === -1) {
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (["Queenly Majesty", "Dazzling", "Armor Tail"].indexOf(defAbility) !== -1 && move.isPriority) {
        description.defenderAbility = defAbility;
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (field.terrain === "Psychic" && move.isPriority && pIsGrounded(defender, field)) {
        description.terrain = field.terrain;
        return { "damage": [0], "description": buildDescription(description) };
    }
    if (move.name === 'Dream Eater' && defender.status !== 'Asleep') {
        return { "damage": [0], "description": buildDescription(description) };
    }

    return -1;
}

//Special Cases
function setDamage(move, attacker, defender, description, isQuarteredByProtect, field) {
    var isParentBond = attacker.ability === "Parental Bond";
    //a. Counterattacks (Counter, Mirror Coat, Metal Burst, Comeuppance, Bide)
    if (['Counter', 'Mirror Coat', 'Metal Burst', 'Comeuppance'].indexOf(move.name) !== -1) {
        var moveName = move.usedOppMove ? move.usedOppMove : '(No Move)';
        var counteredMove = moves[moveName];
        counteredMove.name = moveName;
        counteredMove.hits = 1;
        if (counteredMove.isTripleHit)
            counteredMove.tripleHit3 = true;
        else if (defender.ability === 'Parental Bond' && (field.format === "Singles" || !counteredMove.isSpread))
            defender.isChild = true;
        if (counteredMove.category !== 'Status') {
            if (gen <= 3) counteredMove.category = typeChart[counteredMove.type].category;
            counteredResult = GET_DAMAGE_HANDLER(defender, attacker, counteredMove, field);
            if (gen > 3 || counteredMove.name.indexOf('Hidden Power') === -1) {
                if (['Counter', 'Mirror Coat'].indexOf(move.name) !== -1 && move.category == counteredMove.category) {
                    for (i = 0; i < counteredResult.damage.length; i++) {
                        counteredResult.damage[i] *= 2;
                    }
                    counteredResult.description = '2x ' + move.name + ' (' + counteredResult.description + ') vs. ' + description.HPEVs + ' ' + description.defenderName;
                }
                else if (['Metal Burst', 'Comeuppance'].indexOf(move.name) !== -1) {
                    for (i = 0; i < counteredResult.damage.length; i++) {
                        counteredResult.damage[i] = Math.floor(counteredResult.damage[i] * 1.5);
                    }
                    counteredResult.description = '1.5x ' + move.name + ' (' + counteredResult.description + ') vs. ' + description.HPEVs + ' ' + description.defenderName;
                }
                else {
                    return { "damage": [0], "description": buildDescription(description) };
                }
            }
            else if (move.name === 'Counter') {
                for (i = 0; i < counteredResult.damage.length; i++) {
                    counteredResult.damage[i] *= 2;
                }
                counteredResult.description = '2x ' + move.name + ' (' + counteredResult.description + ') vs. ' + description.HPEVs + ' ' + description.defenderName;
            }
            else {
                return { "damage": [0], "description": buildDescription(description) };
            }
            return counteredResult;
        }
        else {
            return { "damage": [0], "description": buildDescription(description) };
        }
        //Bide ain't being added it's too niche
    }

    //b. Defender HP Dependent (Super Fang/Nature's Madness/Ruination, Guardian of Alola)
    var def_curHP;
    if (["Super Fang", "Nature's Madness", "Ruination"].indexOf(move.name) !== -1) {
        def_curHP = Math.floor(defender.curHP / 2);
        if (isParentBond) {
            def_curHP = Math.floor(def_curHP * 3 / 2);
        }
        if (defender.isDynamax) {
            def_curHP = Math.floor(def_curHP / 2);
        }
        return { "damage": [def_curHP], "description": buildDescription(description) };
    }
    else if (move.name === "Guardian of Alola") {
        if (!isQuarteredByProtect) {
            def_curHP = Math.floor(defender.curHP * 3 / 4);
        }
        else {
            def_curHP = Math.floor(defender.curHP * 3 / 16);
        }
        return { "damage": [def_curHP], "description": buildDescription(description) };
    }

    //c. Attacker HP Dependent (Endeavor, Final Gambit)
    if (move.name === "Endeavor") {
        var endvr_dmg = 0;
        if (attacker.curHP < defender.curHP) endvr_dmg = defender.curHP - attacker.curHP;
        return { "damage": [endvr_dmg], "description": buildDescription(description) };
    }
    if (move.name === "Final Gambit") {
        var at_curHP = attacker.curHP;
        return { "damage": [at_curHP], "description": buildDescription(description) };
    }

    //d. Set Damage (Sonic Boom, Dragon Rage)
    if (move.name === "Sonic Boom") {
        return !isParentBond
            ? { "damage": [20], "description": buildDescription(description) }
            : { "damage": [40], "description": buildDescription(description) };
    }
    if (move.name === "Dragon Rage") {
        return !isParentBond
            ? { "damage": [40], "description": buildDescription(description) }
            : { "damage": [80], "description": buildDescription(description) };
    }

    //e. Level Dependent Damage (Seismic Toss, Night Shade)
    if (move.name === "Seismic Toss" || move.name === "Night Shade") {
        var lv = attacker.level;
        if (isParentBond) {
            lv *= 2;
        }
        return { "damage": [lv], "description": buildDescription(description) };
    }

    //f. OHKO moves
    if (move.isMLG) {
        if (move.name == 'Sheer Cold' && [defender.type1, defender.type2].indexOf('Ice') !== -1)
            return { "damage": [0], "description": buildDescription(description) };
        else
            return { "damage": [defender.curHP], "description": buildDescription(description) };
    }
    //g. Psywave

    return -1;
}

function pIsGrounded(mon, field) {
    return (mon.item == "Iron Ball" || field.isGravity || (mon.type1 !== "Flying" && mon.type2 !== "Flying" &&
        mon.item !== "Air Balloon" && mon.ability !== "Levitate"));
}

//1. Custom BP
function basePowerFunc(move, description, turnOrder, attacker, defender, field, attIsGrounded, defIsGrounded, defAbility) {
    var basePower;
    switch (move.name) {
        //a. Speed based
        //a.i. Gyro Ball
        case "Gyro Ball":
            basePower = Math.min(150, Math.floor(25 * defender.stats[SP] / attacker.stats[SP]));
            description.moveBP = basePower;
            break;
        //a.ii. Electro Ball
        case "Electro Ball":
            var r = (defender.stats[SP] == 0) ? 0 : Math.floor(attacker.stats[SP] / defender.stats[SP]);
            basePower = r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : r >= 1 ? 60 : 40;
            description.moveBP = basePower;
            break;

        //b. Weight based
        //b.i. Low Kick, Grass Knot
        case "Low Kick":
        case "Grass Knot":
            if (gen >= 3) {
                var w = defender.weight;
                basePower = w >= 200 ? 120 : w >= 100 ? 100 : w >= 50 ? 80 : w >= 25 ? 60 : w >= 10 ? 40 : 20;
                description.moveBP = basePower;
                if (defAbility == "Heavy Metal" || defAbility == "Light Metal")
                    description.defenderAbility = defAbility;
                if (defender.item == "Float Stone")
                    description.defenderItem = defender.item;
            }
            else basePower = move.bp;
            break;
        //b.ii. Heavy Slam, Heat Crash
        case "Heavy Slam":
        case "Heat Crash":
            var wr = attacker.weight / defender.weight;
            basePower = wr >= 5 ? 120 : wr >= 4 ? 100 : wr >= 3 ? 80 : wr >= 2 ? 60 : 40;
            description.moveBP = basePower;
            if (defAbility == "Heavy Metal" || defAbility == "Light Metal")
                description.defenderAbility = defAbility;
            if (defender.item == "Float Stone")
                description.defenderItem = defender.item;
            if (attacker.ability == "Heavy Metal" || attacker.ability == "Light Metal")
                description.attackerAbility = attacker.ability;
            if (attacker.item == "Float Stone")
                description.attackerItem = attacker.item;
            break;

        //c. HP based
        //c.i. Eruption, Water Spout, Dragon Energy
        case "Eruption":
        case "Water Spout":
        case "Dragon Energy":
            basePower = Math.max(1, Math.floor(150 * attacker.curHP / attacker.maxHP));
            description.moveBP = basePower;
            break;
        //c.ii. Flail, Reversal
        case "Flail":
        case "Reversal":
            var p = Math.floor(48 * attacker.curHP / attacker.maxHP);
            basePower = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
            description.moveBP = basePower;
            break;
        //c.iii. Crush Grip, Wring Out, Hard Press
        case "Crush Grip":
        case "Wring Out":
            basePower = Math.floor(pokeRound(120 * 100 * Math.floor(defender.curHP * 0x1000 / defender.maxHP) / 0x1000) / 100);
            description.moveBP = basePower;
            break;
        case "Hard Press":
            basePower = Math.floor(pokeRound(100 * 100 * Math.floor(defender.curHP * 0x1000 / defender.maxHP) / 0x1000) / 100);
            description.moveBP = basePower;
            break;

        //d. Friendship based   (not done under the assumption that it will always deal max damage)
        //d.i. Return
        //d.ii. Frustration

        //e. Counter based
        //e.i. Fury Cutter
        //e.ii. Rollout, Ice Ball
        //e.iii. Spit Up

        //f. Boost based
        //f.i. Stored Power, Power Trip
        case "Stored Power":
        case "Power Trip":
            basePower = 20 + 20 * countBoosts(attacker.boosts);
            description.moveBP = basePower;
            break;
        //f.ii. Punishment
        case "Punishment":
            basePower = Math.min(200, 60 + 20 * countBoosts(defender.boosts));
            description.moveBP = basePower;
            break;

        //g. Dichotomous BP
        //g.i. Acrobatics
        case "Acrobatics":
            basePower = attacker.item === 'Flying Gem'
                || attacker.item === "" ? 110 : 55;
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.ii. Hex
        case "Hex":
        case "Infernal Parade":
            basePower = move.bp * (defender.status !== "Healthy" ? 2 : 1);
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.iii. Smelling Salts
        case "Smelling Salts":
            basePower = move.bp * (defender.status === "Paralyzed" ? 2 : 1);
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.iv. Wake-Up Slap
        case "Wake-Up Slap":
            basePower = move.bp * (defender.status === "Asleep" ? 2 : 1);
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.v. Weather Ball
        case "Weather Ball":
            basePower = move.bp * (["", "Strong Winds"].indexOf(field.weather) === -1 ? 2 : 1);
            if (basePower !== move.bp) {
                description.moveBP = basePower;
                description.weather = field.weather;
                description.moveType = move.type;
            }
            break;
        //g.vi. Water Shuriken
        case "Water Shuriken":
            basePower = (attacker.name === "Ash-Greninja" && attacker.ability === "Battle Bond") ? 20 : 15;
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.vii. Terrain Pulse
        case "Terrain Pulse":
            basePower = (field.terrain !== "" && attIsGrounded) ? move.bp * 2 : move.bp;
            if (basePower !== move.bp) {
                description.moveBP = basePower;
                description.terrain = field.terrain;
                description.moveType = move.type;
            }
            break;
        //g.viii. Rising Voltage
        case "Rising Voltage":
            basePower = (field.terrain === "Electric" && defIsGrounded) ? move.bp * 2 : move.bp;
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.ix. Grass Pledge, Fire Pledge, Water Pledge combined
        case "Grass Pledge":
        case "Fire Pledge":
        case "Water Pledge":
            basePower = move.combinePledge !== move.name ? 150 : move.bp;
            description.moveBP = basePower;
            if (move.combinePledge !== move.name)
                description.moveType = move.type;
            break;
        //g.x. Tera Blast Tera-Stellar
        case "Tera Blast":
            basePower = move.type == 'Stellar' ? 100 : 80;
            if (basePower !== move.bp) description.moveBP = basePower;
            break;
        //g.xi. Brine (Gen 4)
        case "Brine":
            if (gen == 4 && defender.curHP <= (defender.maxHP / 2)) {
                basePower = move.bp * 2;
                description.moveBP = basePower;
            }
            else basePower = move.bp;
            break;
        //g.xii. Facade (Gens 3-4)
        case "Facade":
            if (gen <= 4 && ["Burned", "Paralyzed", "Poisoned", "Badly Poisoned"].indexOf(attacker.status) !== -1) {
                basePower = move.bp * 2;
                description.moveBP = basePower;
            }
            else basePower = move.bp;
            break;
        //g.xiii. Payback, Fisheous Rend, Bolt Beak                                            CURRENTLY USING ISDOUBLE IN DEFAULT
        //case "Payback":
        //case "Fisheous Rend":
        //case "Bolt Beak":
        //    basePower = turnOrder === "LAST" ? move.bp * 2 : move.bp;
        //    if (basePower !== move.bp) description.moveBP = basePower;
        //    break;
        //g.xvi. Everything else (Assurance, Avalanche, Revenge, Gust, Twister, Pursuit, Round, Stomping Tantrum, Temper Flare)    CHECK DEFAULT

        //h. Item based
        //h.i. Fling
        case "Fling":
            basePower = getFlingPower(attacker.item);
            description.moveBP = basePower;
            if (gen !== 4 || attacker.ability !== "Klutz")
                description.attackerItem = attacker.item;
            break;
        //h.ii. Natural Gift
        case "Natural Gift":
            if (attacker.item.indexOf(" Berry") !== -1)
                [move, description] = NaturalGift(move, attacker, description);
            break;

        //i. Other
        //i.i. Beat Up
        //i.ii. Echoed Voice
        //i.iii. Hidden Power (I think it's for pre Gen VI?)
        //i.iv. Magnitude
        //i.v. Present
        //i.vi. Triple Kick, Triple Axel 
        case "Triple Kick":
        case "Triple Axel":
            if (move.tripleHit3)
                basePower = move.bp * 3;
            else if (move.tripleHit2)
                basePower = move.bp * 2;
            else
                basePower = move.bp;
            break;
        //i.vii. Trump Card
        //i.viii. Last Respects, Rage Fist
        case "Last Respects":
        case "Rage Fist":
            basePower = move.bp * (move.timesAffected + 1);
            if (move.timesAffected)
                description.moveBP = basePower;
            break;
        default:
            if (move.isDouble && ['Retaliate', 'Fusion Bolt', 'Fusion Flare', 'Lash Out'].indexOf(move.name) === -1) {
                basePower = 2 * move.bp;
                if (basePower !== move.bp) description.moveBP = basePower;
            }
            else {
                basePower = move.bp;
                if (!move.isZ && basePower !== moves[move.name].bp && !description.moveBP)
                    description.moveBP = basePower;
            }
    }

    return [basePower, description];
}

//2. BP Mods
function calcBPMods(attacker, defender, field, move, description, ateIzeBoosted, basePower, attIsGrounded, defIsGrounded, turnOrder, defAbility) {
    var bpMods = [];
    var isAttackerAura = attacker.ability === (move.type + " Aura");
    var isDefenderAura = defAbility === (move.type + " Aura");
    var auraActive = ($("input:checkbox[id='" + move.type.toLowerCase() + "-aura']:checked").val() != undefined);
    var auraBreak = ($("input:checkbox[id='aura-break']:checked").val() != undefined);

    //a. Aura Break
    if (auraActive && auraBreak && !field.isNeutralizingGas && defAbility !== '[ignored]') {
        bpMods.push(0x0C00);
        if (isAttackerAura || attacker.ability == "Aura Break") {
            description.attackerAbility = attacker.ability;
        }
        else if (isDefenderAura || defAbility == "Aura Break") {
            description.defenderAbility = defAbility;
        }
    }

    //b. Rivalry

    //c. 1.2x Abilities
    //c.i. Galvanize, Aerilate, Pixilate, Refrigerate, Normalize        (Technically Normalize is separate but it doesn't hurt to handle it where it is now)
    if (!move.isZ && !attacker.isDynamax && ateIzeBoosted) {     //function ateIzeTypeChange sets this value
        var ateIzeMultiplier = gen > 6 ? 0x1333 : 0x14CD;
        bpMods.push(ateIzeMultiplier);
        description.attackerAbility = attacker.ability;
    }
    //c.ii Reckless, Iron Fist                                          (Same deal)
    else if ((attacker.ability === "Reckless" && move.hasRecoil) || (attacker.ability === "Iron Fist" && move.isPunch)) {
        bpMods.push(0x1333);
        description.attackerAbility = attacker.ability;
    }

    //d. Field Abilities
    //d.i. Battery
    if (field.isBattery && move.category === "Special") {
        bpMods.push(0x14CD);
        description.isBattery = true;
    }
    //d.ii. Power Spot
    if (field.isPowerSpot) {
        bpMods.push(0x14CD);
        description.isPowerSpot = true;
    }
    //d.iii. Ally Steely Spirit (probably doesn't go here but Smogon makes Doubles research a pain to find)
    if (field.isSteelySpirit && move.type === "Steel") {
        bpMods.push(0x1800);
        description.isSteelySpirit = true;
    }

    //e. 1.3x Abilities
    //e.i. Sheer Force
    if (attacker.ability === "Sheer Force" && move.hasSecondaryEffect) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    }
    //e.ii. Sand Force
    else if (attacker.ability === "Sand Force" && field.weather === "Sand" && ["Rock", "Ground", "Steel"].indexOf(move.type) !== -1) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    }
    //e.iii. Analytic
    else if (attacker.ability === "Analytic" && turnOrder !== "FIRST") {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    }
    //e.iv. Tough Claws
    else if (attacker.ability === "Tough Claws" && move.makesContact) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    }
    //e.v. Punk Rock
    else if (attacker.ability == "Punk Rock" && move.isSound) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    }

    //f. Fairy Aura, Dark Aura
    if (auraActive && !auraBreak && !field.isNeutralizingGas && (gen > 7 || defAbility !== '[ignored]')) {
        bpMods.push(0x1548);
        if (isAttackerAura) {
            description.attackerAbility = attacker.ability;
        }
        else if (isDefenderAura) {
            description.defenderAbility = defAbility;
        }
    }

    //If the BP before this point would trigger Technician, don't apply it
    var tempBP = pokeRound(basePower * chainMods(bpMods) / 0x1000);

    //g. 1.5x Abilities (Technician, Flare Boost, Toxic Boost, Strong Jaw, Mega Launcher, Steely Spirit)
    if ((attacker.ability === "Technician" && tempBP <= 60) ||
        (attacker.ability === "Flare Boost" && attacker.status === "Burned" && move.category === "Special") ||
        (attacker.ability === "Toxic Boost" && (attacker.status === "Poisoned" || attacker.status === "Badly Poisoned") && move.category === "Physical") ||
        (attacker.ability === "Mega Launcher" && move.isPulse) ||
        (attacker.ability === "Strong Jaw" && move.isBite) ||
        (attacker.ability === "Steely Spirit" && move.type === "Steel")) {
        bpMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    }

    //h. Heatproof (pre Gen 9)
    if (defAbility === "Heatproof" && move.type === "Fire" & gen < 9) {
        bpMods.push(0x800);
        description.defenderAbility = defAbility;
    }

    //i. Dry Skin
    else if (defAbility === "Dry Skin" && move.type === "Fire") {
        bpMods.push(0x1400);
        description.defenderAbility = defAbility;
    }

    //j. 1.1x Items
    if ((attacker.item === "Muscle Band" && move.category === "Physical")
        || (attacker.item === "Wise Glasses" && move.category === "Special")) {
        bpMods.push(0x1199);
        description.attackerItem = attacker.item;
    }

    //k. 1.2x Items
    else if (getItemBoostType(attacker.item) === move.type) {
        var itemTypeMultiplier = 0x1333;
        bpMods.push(itemTypeMultiplier);
        description.attackerItem = attacker.item;
    }
    else if (getItemDualTypeBoost(attacker.item, attacker.name).indexOf(move.type) !== -1) {
        bpMods.push(0x1333);
        description.attackerItem = attacker.item;
    }
    else if (attacker.item && attacker.item.indexOf(' Mask') !== -1 && attacker.name && attacker.name.indexOf('Ogerpon-') !== -1
        && attacker.item.substring(0, attacker.item.indexOf(' Mask')) === attacker.name.substring(8) && attacker.name.indexOf('(') === -1) {
        bpMods.push(0x1333);
        description.maskBoost = true;
    }

    //l. Gems
    else if (attacker.item === move.type + " Gem" && !move.isPledge) {
        var gemMultiplier = gen > 5 ? 0x14CD : 0x1800;
        bpMods.push(gemMultiplier);
        description.attackerItem = attacker.item;
    }

    //m. Solar Beam, Solar Blade
    if ((move.name === "Solar Beam" || move.name === "Solar Blade") && ["None", "Sun", "Harsh Sun", "Strong Winds", ""].indexOf(field.weather) === -1 && attacker.item !== 'Utility Umbrella') {
        bpMods.push(0x800);
        description.moveBP = move.bp / 2;
        description.weather = field.weather;
    }

    //n. Me First
    if (move.isMeFirst) {
        bpMods.push(0x1800);
        description.meFirst = true;
        move.isMeFirst = false;
    }

    //o. Knock Off
    if (gen > 5 && move.name === "Knock Off" && defender.name !== null && !cantRemoveItem(defender.item, defender.name, field.terrain)) {
        bpMods.push(0x1800);
        description.moveBP = move.bp * 1.5;
    }
    //p. Psyblade
    else if (field.terrain === "Electric" && move.name === "Psyblade") {
        bpMods.push(0x1800);
        description.moveBP = move.bp * 1.5;
        description.terrain = field.terrain;
    }
    //q. Misty Explosion
    else if ((move.name === "Misty Explosion" && field.terrain == "Misty" && attIsGrounded) ||
        (move.name === "Grav Apple" && field.isGravity)) {
        bpMods.push(0x1800);
        description.moveBP = move.bp * 1.5;
    }
    //r. Expanding Force
    else if (move.name === "Expanding Force" && field.terrain == "Psychic" && attIsGrounded) {
        bpMods.push(0x1800);
        description.moveBP = move.bp * 1.5;
    }

    //s. Helping Hand
    if (field.isHelpingHand) {
        bpMods.push(0x1800);
        description.isHelpingHand = true;
    }

    //t. Charge, Electromorphosis, Wind Power
    if ((attacker.ability === "Electromorphosis" || attacker.ability === "Wind Power") && attacker.abilityOn && move.type === "Electric") {
        bpMods.push(0x2000);
        description.attackerAbility = attacker.ability;
    }

    //u. Double power (Facade, Brine, Venoshock, Retaliate, Fusion Bolt, Fusion Flare, Lash Out)
    if ((move.name === "Facade" && ["Burned", "Paralyzed", "Poisoned", "Badly Poisoned"].indexOf(attacker.status) !== -1) ||
        (move.name === "Brine" && defender.curHP <= defender.maxHP / 2) ||
        (["Venoshock", "Barb Barrage"].indexOf(move.name) !== -1 && (defender.status === "Poisoned" || defender.status === "Badly Poisoned")) ||
        (['Retaliate', 'Fusion Bolt', 'Fusion Flare', 'Lash Out'].indexOf(move.name) !== -1 && move.isDouble)) {
        bpMods.push(0x2000);
        description.moveBP = move.bp * 2;
    }

    //v. Offensive Terrain
    if (attIsGrounded) {
        var terrainMultiplier = gen > 7 ? 0x14CD : 0x1800;
        if (field.terrain === "Electric" && move.type === "Electric") {
            bpMods.push(terrainMultiplier);
            description.terrain = field.terrain;
        } else if (field.terrain === "Grassy" && move.type == "Grass") {
            bpMods.push(terrainMultiplier);
            description.terrain = field.terrain;
        } else if (field.terrain === "Psychic" && move.type == "Psychic") {
            bpMods.push(terrainMultiplier);
            description.terrain = field.terrain;
        }
    }
    //w. Defensive Terrain
    if (defIsGrounded) {
        if ((field.terrain === "Misty" && move.type === "Dragon") ||
            (field.terrain === "Grassy" && (move.name === "Earthquake" || move.name === "Bulldoze"))) {
            bpMods.push(0x800);
            description.terrain = field.terrain;
        }
    }

    //x. Mud Sport, Water Sport

    //y. Supreme Overlord
    if (attacker.ability === "Supreme Overlord" && attacker.supremeOverlord > 0) {
        overlordBoost = [0x119A, 0x1333, 0x14CD, 0x1666, 0x1800];
        bpMods.push(overlordBoost[attacker.supremeOverlord - 1]);
        description.attackerAbility = attacker.supremeOverlord > 1 ? attacker.ability + " (" + attacker.supremeOverlord + " allies down)"
            : attacker.ability + " (1 ally down)";
    }
    //z. Punching Glove
    if (attacker.item === "Punching Glove" && move.isPunch) {
        bpMods.push(0x119A);
        description.attackerItem = attacker.item;
    }

    //If the BP before this point would exceed 60 BP, don't apply it
    tempBP = pokeRound(basePower * chainMods(bpMods) / 0x1000);

    //aa. Tera boost for moves with <60 BP
    if (attacker.isTerastalize && (move.type === attacker.tera_type || (attacker.tera_type === 'Stellar' && move.getsStellarBoost)) && tempBP < 60 && canTeraBoost60BP(move)) {
        bpMods.push(60 / tempBP * 0x1000);
        description.teraBPBoost = true;
    }

    return [bpMods, description, move];
}

function canTeraBoost60BP(move) {
    var priority = move.isPriority;
    var multiHit = move.hitRange ? true : false;
    var otherExceptions = ["Crush Grip", "Dragon Energy", "Electro Ball", "Eruption", "Flail", "Fling", "Grass Knot", "Gyro Ball",
        "Heat Crash", "Heavy Slam", "Low Kick", "Reversal", "Water Spout", "Hard Press"].indexOf(move.name) !== -1;
    return !priority && !multiHit && !otherExceptions;
}

//3. Attack
function calcAttack(move, attacker, defender, description, isCritical, defAbility) {
    //a. Foul Play, Photon Geyser, Light That Burns The Sky, Shell Side Arm, Body Press, Tera Blast
    var attack;
    var attackSource = move.name === "Foul Play" ? defender : attacker;
    var usesDefenseStat = move.name === "Body Press";
    var attackStat = usesDefenseStat ? DF : move.category === "Physical" ? AT : SA;
    var isMidMoveAtkBoost = false;
    var isContrary = attacker.ability === 'Contrary' ? -1 : 1;
    description.attackEVs = attackSource.evs[attackStat] +
        (NATURES[attackSource.nature][0] === attackStat ? "+" : NATURES[attackSource.nature][1] === attackStat ? "-" : "") + " " +
        toSmogonStat(attackStat) + (attackSource.ivs[attackStat] < 31 ? " " + attackSource.ivs[attackStat] + " IV" : "");
    description.usesOppAtkStat = move.name === "Foul Play";
    //Spectral Thief and Meteor Beam aren't part of the calculations but are instead here to properly account for the boosts they give
    if (move.name === "Spectral Thief" && defender.boosts[attackStat] > 0) {
        attacker.boosts[attackStat] = Math.min(6, attacker.boosts[attackStat] + defender.boosts[attackStat]);
        isMidMoveAtkBoost = true;
    }
    else if (["Meteor Beam", "Electro Shot"].indexOf(move.name) !== -1 && ((isContrary === -1 && attacker.boosts[attackStat] > -6) || attacker.boosts[attackStat] < 6)) {
        attacker.boosts[attackStat] += (1 * isContrary);
        isMidMoveAtkBoost = true;
    }
    //b. Unaware
    if (defAbility === "Unaware" && attackSource.boosts[attackStat] !== 0) {
        attack = attackSource.rawStats[attackStat];
        description.defenderAbility = defAbility;
        description.attackBoost = attackSource.boosts[attackStat];
    }
    else if (isMidMoveAtkBoost) {
        description.attackBoost = attacker.boosts[attackStat];
        attack = getModifiedStat(attackSource.rawStats[attackStat], attacker.boosts[attackStat]);
        attacker.boosts[attackStat] -= (1 * isContrary);
    }
    //c. Crit
    else if (attackSource.boosts[attackStat] === 0 || (isCritical && attackSource.boosts[attackStat] < 0)) {
        attack = attackSource.rawStats[attackStat];
    }
    //THIS IS NEEDED TO GUARANTEE CATCH ALL UNAWARE CONDITIONS, WITHOUT IT SOME WILL SLIP BY!!!
    else if (defAbility === "Unaware") {
        attack = attackSource.rawStats[attackStat];
    }
    //d. Attack boosts and drops
    else {
        attack = attackSource.stats[attackStat];
        description.attackBoost = attackSource.boosts[attackStat];
    }

    //e. Hustle
    // unlike all other attack modifiers, Hustle gets applied directly
    if (attacker.ability === "Hustle" && move.category === "Physical") {
        attack = pokeRound(attack * 3 / 2);
        description.attackerAbility = attacker.ability;
    }

    return [attack, description];
}

//4. Attack Mods
function calcAtMods(move, attacker, defAbility, description, field) {
    atMods = [];
    var ruinActive = {
        "Tablets of Ruin": $("input:checkbox[id='tablets-of-ruin']:checked").val() != undefined && !field.isNeutralizingGas,
        "Vessel of Ruin": $("input:checkbox[id='vessel-of-ruin']:checked").val() != undefined && !field.isNeutralizingGas,
    };

    //a. Tablets of Ruin, Vessel of Ruin
    if (ruinActive["Tablets of Ruin"] && move.category === "Physical" && attacker.ability !== "Tablets of Ruin") {
        atMods.push(0x0C00);
        description.ruinTabletsVessel = "Tablets";
    }
    else if (ruinActive["Vessel of Ruin"] && move.category === "Special" && attacker.ability !== "Vessel of Ruin") {
        atMods.push(0x0C00);
        description.ruinTabletsVessel = "Vessel";
    }

    //b. 0.5x Abilities
    //Slow Start also halves damage with special Z-moves
    if ((attacker.ability === "Slow Start" && attacker.abilityOn && (move.category === "Physical" || (move.category === "Special" && move.isZ))) ||
        (attacker.ability === "Defeatist" && attacker.curHP <= attacker.maxHP / 2)) {
        atMods.push(0x800);
        description.attackerAbility = attacker.ability;
    }
    //c. Flower Gift
    if (attacker.ability === "Flower Gift" && attacker.name === "Cherrim" && field.weather.indexOf("Sun") > -1 && move.category === "Physical" && attacker.item !== 'Utility Umbrella') {
        atMods.push(0x1800);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    }
    else if (field.isFlowerGiftAtk && field.weather.indexOf("Sun") > -1 && move.category === "Physical" && attacker.item !== 'Utility Umbrella') {
        atMods.push(0x1800);
        description.isFlowerGiftAtk = true;
        description.weather = field.weather;
    }
    //d. 1.5x Offensive Abilities
    if ((attacker.ability === "Guts" && attacker.status !== "Healthy" && move.category === "Physical")
        || (attacker.ability === "Overgrow" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Grass")
        || (attacker.ability === "Blaze" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Fire")
        || (attacker.ability === "Torrent" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Water")
        || (attacker.ability === "Swarm" && attacker.curHP <= attacker.maxHP / 3 && move.type === "Bug")
        || (attacker.ability === "Transistor" && move.type === "Electric" && gen == 8)
        || (attacker.ability === "Dragon's Maw" && move.type === "Dragon")
        || (attacker.ability === "Flash Fire" && attacker.abilityOn && move.type === "Fire")
        || (attacker.ability === "Steelworker" && move.type === "Steel")
        || (attacker.ability === "Gorilla Tactics" && move.category === "Physical" && !attacker.isDynamax)
        || (["Plus", "Minus"].indexOf(attacker.ability) !== -1 && attacker.abilityOn)
        || (attacker.ability === "Sharpness" && move.isSlice)
        || (attacker.ability === "Rocky Payload" && move.type === "Rock")) {
        atMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    }
    else if (attacker.ability === "Solar Power" && field.weather.indexOf("Sun") > -1 && move.category === "Special" && attacker.item !== 'Utility Umbrella') {
        atMods.push(0x1800);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    }
    //e. 1.3x Abilities
    else if (attacker.paradoxAbilityBoost && ((attacker.highestStat === 'at' && move.category === "Physical") || (attacker.highestStat === 'sa' && move.category === "Special"))
        || (attacker.ability === "Transistor" && move.type === "Electric" && gen >= 9)) {
        atMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    }
    //f. Orichalcum Pulse, Hadron Engine
    else if ((attacker.ability == "Orichalcum Pulse" && field.weather === "Sun" && move.category === "Physical" && attacker.item !== "Utility Umbrella")
        || (attacker.ability == "Hadron Engine" && field.terrain === "Electric" && move.category === "Special")) {
        atMods.push(0x1555);
        description.attackerAbility = attacker.ability;
    }

    //g. 2.0x Offensive Abilities
    if ((attacker.ability === "Water Bubble" && move.type === "Water") ||
        ((attacker.ability === "Huge Power" || attacker.ability === "Pure Power") && move.category === "Physical")
        || (attacker.ability === "Stakeout" && attacker.abilityOn)) {
        atMods.push(0x2000);
        description.attackerAbility = attacker.ability;
    }
    //h. 0.5x Defensive Abilities
    if ((defAbility === "Thick Fat" && (move.type === "Fire" || move.type === "Ice"))
        || (defAbility === "Water Bubble" && move.type === "Fire")
        || (defAbility === "Purifying Salt" && move.type === "Ghost")
        || (defAbility === 'Heatproof' && move.type === 'Fire' && gen >= 9)) {
        atMods.push(0x800);
        description.defenderAbility = defAbility;
    }

    //i. 2.0x Items
    if ((attacker.item === "Thick Club" && (attacker.name === "Cubone" || attacker.name === "Marowak" || attacker.name === "Marowak-Alola") && move.category === "Physical") ||
        (attacker.item === "Deep Sea Tooth" && attacker.name === "Clamperl" && move.category === "Special") ||
        (attacker.item === "Light Ball" && (attacker.name === "Pikachu" || attacker.name === "Pikachu-Gmax"))) {
        atMods.push(0x2000);
        description.attackerItem = attacker.item;
    } //j. 1.5x Items
    else if ((attacker.item === "Choice Band" && move.category === "Physical" && !attacker.isDynamax) ||
        (attacker.item === "Choice Specs" && move.category === "Special" && !attacker.isDynamax) ||
        (attacker.item === "Soul Dew" && ["Latias", "Latios"].indexOf(attacker.name) !== -1 && move.category === 'Special' && gen <= 6)) {
        atMods.push(0x1800);
        description.attackerItem = attacker.item;
    }
    return [atMods, description];
}

//5. Defense
function calcDefense(move, attacker, defender, description, hitsPhysical, isCritical, field) {
    //a. Psyshock, Psystrike, Secret Sword (handled in hitsPhysical declaration)
    var defenseStat = hitsPhysical ? DF : SD;
    description.defenseEVs = defender.evs[defenseStat] +
        (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
        toSmogonStat(defenseStat) + (defender.ivs[defenseStat] < 31 ? " " + defender.ivs[defenseStat] + " IV" : "");

    //b. Wonder Room

    //Spectral Thief isn't part of the calculations but is instead here to properly account for the boosts it takes
    if (move.name === "Spectral Thief" && defender.boosts[defenseStat] > 0) {
        defense = defender.rawStats[defenseStat];
    }
    //c. Unaware
    else if (attacker.ability === "Unaware" && defender.boosts[defenseStat] !== 0) {
        defense = defender.rawStats[defenseStat];
        description.attackerAbility = attacker.ability;
        description.defenseBoost = defender.boosts[defenseStat];
    }
    //d. Chip Away, Sacred Sword
    else if (move.ignoresDefenseBoosts && defender.boosts[defenseStat] !== 0) {
        defense = defender.rawStats[defenseStat];
        description.defenseBoost = defender.boosts[defenseStat];
    }
    //e. Crits
    else if (defender.boosts[defenseStat] === 0 || (isCritical && defender.boosts[defenseStat] > 0)) {
        defense = defender.rawStats[defenseStat];
    }
    //THIS IS NEEDED TO GUARANTEE CATCH ALL UNAWARE AND SACRED SWORD CONDITIONS, WITHOUT IT SOME WILL SLIP BY!!!
    else if (move.ignoresDefenseBoosts || attacker.ability === "Unaware") {
        defense = defender.rawStats[defenseStat];
    }
    // f. Defense drops and boosts
    else {
        defense = defender.stats[defenseStat];
        description.defenseBoost = defender.boosts[defenseStat];
    }

    //g. Sandstorm Rock types, Snowstorm Ice Types
    // unlike all other defense modifiers, Sandstorm SpD boost gets applied directly
    if ((field.weather === "Sand" && (defender.type1 === "Rock" || defender.type2 === "Rock") && !hitsPhysical)
        || (field.weather === "Snow" && (defender.type1 === "Ice" || defender.type2 === "Ice") && hitsPhysical)) {
        defense = pokeRound(defense * 3 / 2);
        description.weather = field.weather;
    }
    return [defense, description];
}

//6. Defense Mods
function calcDefMods(move, defender, field, description, hitsPhysical, defAbility) {
    var dfMods = [];
    var ruinActive = {
        "Sword of Ruin": $("input:checkbox[id='sword-of-ruin']:checked").val() != undefined && !field.isNeutralizingGas,
        "Beads of Ruin": $("input:checkbox[id='beads-of-ruin']:checked").val() != undefined && !field.isNeutralizingGas,
    };

    //a. Sword of Ruin, Beads of Ruin
    if (ruinActive["Sword of Ruin"] && hitsPhysical && defAbility !== "Sword of Ruin") {
        dfMods.push(0x0C00);
        description.ruinSwordBeads = "Sword";
    }
    else if (ruinActive["Beads of Ruin"] && !hitsPhysical && defAbility !== "Beads of Ruin") {
        dfMods.push(0x0C00);
        description.ruinSwordBeads = "Beads";
    }

    //b. Flower Gift
    if (defAbility === "Flower Gift" && defender.name === "Cherrim" && field.weather.indexOf("Sun") > -1 && !hitsPhysical && defender.item !== 'Utility Umbrella') {
        dfMods.push(0x1800);
        description.defenderAbility = defAbility;
        description.weather = field.weather;
    }
    else if (field.isFlowerGiftSpD && field.weather.indexOf("Sun") > -1 && !hitsPhysical && defender.item !== 'Utility Umbrella') {
        dfMods.push(0x1800);
        description.isFlowerGiftSpD = true;
        description.weather = field.weather;
    }
    //c. 1.5x Abilities
    if ((defAbility === "Marvel Scale" && defender.status !== "Healthy" && hitsPhysical) ||
        (defAbility === "Grass Pelt" && field.terrain === "Grassy" && hitsPhysical)) {
        dfMods.push(0x1800);
        description.defenderAbility = defAbility;
    }
    //d. 1.3x Abilities
    else if (defender.paradoxAbilityBoost && ((defender.highestStat === 'df' && hitsPhysical) || (defender.highestStat === 'sd' && !hitsPhysical))) {
        dfMods.push(0x14CD);
        description.defenderAbility = defAbility;
    }
    //e. 2x Abilities
    else if (defAbility === "Fur Coat" && hitsPhysical) {
        dfMods.push(0x2000);
        description.defenderAbility = defAbility;
    }
    //f. 1.5x Items
    if ((defender.item === "Assault Vest" && !hitsPhysical) ||
        (defender.item === "Eviolite" && defender.canEvolve) ||
        (defender.item === "Soul Dew" && ["Latias", "Latios"].indexOf(defender.name) !== -1 && !hitsPhysical && gen <= 6)) {
        dfMods.push(0x1800);
        description.defenderItem = defender.item;
    } //g. 2.0x Items
    else if ((defender.item === "Deep Sea Scale" && defender.name === "Clamperl" && !hitsPhysical) ||
        (defender.item === "Metal Powder" && defender.name === "Ditto" && hitsPhysical)) {
        dfMods.push(0x2000);
        description.defenderItem = defender.item;
    }
    return [dfMods, description];
}

//7. Base Damage
function calcBaseDamage(attacker, basePower, attack, defense) {
    return Math.floor(Math.floor((Math.floor((2 * attacker.level) / 5 + 2) * basePower * attack) / defense) / 50 + 2);
}

//8. General Damage Mods
function calcGeneralMods(baseDamage, move, attacker, defender, defAbility, field, description, isCritical, typeEffectiveness, isQuarteredByProtect, hitsPhysical) {
    //a. Spread Move mod
    if (field.format !== "Singles" && move.isSpread) {
        baseDamage = pokeRound(baseDamage * 0xC00 / 0x1000);
    }
    //b. Parental Bond mod
    var childMod = gen >= 7 ? 0x0400 : 0x0800;
    baseDamage = attacker.isChild ? pokeRound(baseDamage * childMod / 0x1000) : baseDamage;    //should be accurate based on implementation
    //c. Weather mod, Hydro Steam
    if ((((field.weather.indexOf("Sun") > -1 && move.type === "Fire") || (field.weather.indexOf("Rain") > -1 && move.type === "Water")) && defender.item !== 'Utility Umbrella')
        || (field.weather.indexOf("Sun") > -1 && move.name === "Hydro Steam" && attacker.item !== 'Utility Umbrella')) {
        baseDamage = pokeRound(baseDamage * 0x1800 / 0x1000);
        description.weather = field.weather;
    }
    else if (((field.weather === "Sun" && move.type === "Water") || (field.weather === "Rain" && move.type === "Fire")) && defender.item !== 'Utility Umbrella') {
        baseDamage = pokeRound(baseDamage * 0x800 / 0x1000);
        description.weather = field.weather;
    }
    else if ((field.weather === "Strong Winds" && (defender.type1 === "Flying" || defender.type2 === "Flying") &&
        typeChart[move.type]["Flying"] > 1)) {
        description.weather = field.weather;        //not actually a mod, just adding the description here
    }
    //d. Glaive Rush 2x mod
    if (defender.glaiveRushMod) {
        baseDamage = pokeRound(baseDamage * 0x2000 / 0x1000);
        description.isGlaiveMod = true;
    }
    //e. Crit mod
    if (isCritical) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.isCritical = isCritical;
    }
    // the random factor is applied between the crit mod and the stab mod, so don't apply anything below this until we're inside the loop
    //see GENERAL MODS CONTINUED for further comments

    var stabMod = 0x1000;
    if (move.type !== 'Typeless') {     //Typeless moves cannot get stab even if the user is Typeless
        if (attacker.isTerastalize && attacker.tera_type !== 'Stellar') {
            if (move.type === attacker.tera_type && [attacker.teraSTAB1, attacker.teraSTAB2].indexOf(attacker.tera_type) !== -1 ) {
                if (attacker.ability === "Adaptability") {
                    stabMod = 0x2400;
                    description.attackerAbility = attacker.ability;
                } else {
                    stabMod = 0x2000;
                }
            }
            else if ((move.type !== attacker.tera_type && [attacker.teraSTAB1, attacker.teraSTAB2].indexOf(move.type) !== -1) || move.type === attacker.tera_type) {
                if (attacker.ability === "Adaptability" && move.type === attacker.tera_type) {
                    stabMod = 0x2000;
                    description.attackerAbility = attacker.ability;
                } else {
                    stabMod = 0x1800;
                }
            }
        }
        else if (attacker.isTerastalize && (move.getsStellarBoost || attacker.name === 'Terapagos-Stellar')) { //Tera Type being Stellar is implicit
            if ([attacker.type1, attacker.type2].indexOf(move.type) !== -1 || (move.combinePledge && move.combinePledge !== move.name)) {
                stabMod = 0x2000;
            }
            else {
                stabMod = 0x1333;
            }
            if (attacker.name !== 'Terapagos-Stellar') description.stellarBoost = true;
        }
        else { //Covers for non-terastalized and Stellar being used up
            if ([attacker.type1, attacker.type2].indexOf(move.type) !== -1 || (move.combinePledge && move.combinePledge !== move.name)) {
                if (attacker.ability === "Adaptability") {
                    stabMod = 0x2000;
                    description.attackerAbility = attacker.ability;
                } else {
                    stabMod = 0x1800;
                }
            } else if (["Protean", "Libero"].indexOf(attacker.ability) !== -1 && (gen !== 9 || attacker.abilityOn)) {
                stabMod = 0x1800;
                description.attackerAbility = attacker.ability;
            }
        }
    }
    var applyBurn = (attacker.status === "Burned" && move.category === "Physical" && attacker.ability !== "Guts" && !move.ignoresBurn);
    description.isBurned = applyBurn;
    var finalMod;
    [finalMod, description] = calcFinalMods(move, attacker, defender, field, description, isCritical, typeEffectiveness, defAbility, hitsPhysical);
    finalMods = chainMods(finalMod);

    var damage = [], pbDamage = [];
    var child, childDamage, j;
    var childMove, child2Damage, tripleDamage = [];

    if (typeof (move.tripleHit2) === 'undefined') {
        if (move.isTripleHit) {
            if (move.tripleHits > 1) {
                childMove = move;
                childMove.tripleHit2 = true;
                childDamage = GET_DAMAGE_HANDLER(attacker, defender, childMove, field).damage;
                if (move.tripleHits > 2) {
                    childMove.tripleHit3 = true;
                    child2Damage = GET_DAMAGE_HANDLER(attacker, defender, childMove, field).damage;
                    childMove.tripleHit3 = false;
                }
                childMove.tripleHit2 = false;
            }
            description.hits = move.tripleHits;
        }
        else if (attacker.ability === "Parental Bond" && move.hits === 1 && (field.format === "Singles" || !move.isSpread)) {
            child = JSON.parse(JSON.stringify(attacker));
            child.ability = '';
            child.isChild = true;
            childMove = move;
            if (move.name === 'Power-Up Punch') {
                child.boosts[AT] = Math.min(6, child.boosts[AT] + 1);
                child.stats[AT] = getModifiedStat(child.rawStats[AT], child.boosts[AT]);
            }
            else if (move.name === 'Assurance') {
                childMove.isDouble = 1;
            }
            childDamage = GET_DAMAGE_HANDLER(child, defender, childMove, field).damage;
            description.attackerAbility = attacker.ability;
        }
    }
    //GENERAL MODS CONTINUED
    for (var i = 0; i < 16; i++) { //e. Rand mod
        damage[i] = Math.floor(baseDamage * (85 + i) / 100);
        //f. STAB mod (with Terastal changes)
        damage[i] = pokeRound(damage[i] * stabMod / 0x1000);
        //g. Type Effect mod
        damage[i] = Math.floor(damage[i] * typeEffectiveness);
        //h. Burn mod
        if (applyBurn) {
            damage[i] = Math.floor(damage[i] / 2);
        }
        //i. Final mods
        damage[i] = pokeRound(damage[i] * finalMods / 0x1000);
        //j. Z-move and Max move protecting mod
        if (isQuarteredByProtect) {
            damage[i] = pokeRound(damage[i] * 0x400 / 0x1000);
            description.isQuarteredByProtect = true;
        }
        //k. Min Damage Check
        damage[i] = Math.max(1, damage[i]);
        //l. Max Damage Check
        if (damage[i] > 65535)
            damage[i] %= 65536;

        //Parental Bond child hit and Triple Kick/Axel second/third hit logic
        if (typeof (move.tripleHit2) !== 'undefined' && move.tripleHit2 === false && move.isTripleHit) {
            for (j = 0; j < 16; j++) {
                if (typeof (move.tripleHit3) !== 'undefined' && move.tripleHit3 === false) {
                    for (k = 0; k < 16; k++) {
                        tripleDamage[(256 * i) + (16 * j) + k] = damage[i] + childDamage[j] + child2Damage[k];
                    }
                }
                else {
                    tripleDamage[(16 * i) + j] = damage[i] + childDamage[j];
                }
            }
        }
        else if (attacker.ability === "Parental Bond" && move.hits === 1 && !move.isTripleHit && (field.format === "Singles" || !move.isSpread)) {
            for (j = 0; j < 16; j++) {
                pbDamage[(16 * i) + j] = damage[i] + childDamage[j];
            }
        }
    }
    // Return a bit more info if this is a Parental Bond usage.
    if (pbDamage.length) {
        return {
            "damage": pbDamage.sort(numericSort),
            "parentDamage": damage,
            "childDamage": childDamage,
            "description": buildDescription(description)
        };
    }

    if (tripleDamage.length) {
        return {
            "damage": tripleDamage.sort(numericSort),
            "parentDamage": damage,
            "childDamage": childDamage,
            "child2Damage": move.tripleHits > 2 ? child2Damage : -1,
            "description": buildDescription(description)
        };
    }

    return {
        "damage": pbDamage.length ? pbDamage.sort(numericSort) :
            tripleDamage.length ? tripleDamage.sort(numericSort) :
                damage,
        "description": buildDescription(description)
    };
}

//9. Finals Damage Mods
function calcFinalMods(move, attacker, defender, field, description, isCritical, typeEffectiveness, defAbility, hitsPhysical) {
    var finalMods = [];
    //a. Screens/Aurora Veil
    if (field.isAuroraVeil && !isCritical && !move.ignoresScreens) {
        finalMods.push(field.format !== "Singles" ? 0xAAC : 0x800);
        description.isAuroraVeil = true;
    }
    else if (field.isReflect && hitsPhysical && !isCritical && !move.ignoresScreens) {
        finalMods.push(field.format !== "Singles" ? 0xAAC : 0x800);
        description.isReflect = true;
    } else if (field.isLightScreen && !hitsPhysical && !isCritical) {
        finalMods.push(field.format !== "Singles" ? 0xAAC : 0x800);
        description.isLightScreen = true;
    }
    if (defender.isDynamax) description.isDynamax = true;
    //b. Neuroforce
    if (attacker.ability === "Neuroforce" && typeEffectiveness > 1) {
        finalMods.push(0x1400);
        description.attackerAbility = attacker.ability;
    }
    //c. Collision Course/Electro Drift
    if (["Collision Course", "Electro Drift"].indexOf(move.name) !== -1 && typeEffectiveness > 1) {
        finalMods.push(0x1555);
        description.courseDriftSE = true;
    }
    //d. Sniper
    if (attacker.ability === "Sniper" && isCritical) {
        finalMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    }
    //e. Tinted Lens
    if (attacker.ability === "Tinted Lens" && typeEffectiveness < 1) {
        finalMods.push(0x2000);
        description.attackerAbility = attacker.ability;
    }
    //f. Dynamax Cannon, Behemoth Blade, Behemoth Bash
    if ((move.name === "Dynamax Cannon" || move.name === "Behemoth Blade" || move.name === "Behemoth Bash") && defender.isDynamax) {
        finalMods.push(0x2000);
    }
    //g. Multiscale, Shadow Shield
    if ((defAbility === "Multiscale" || defAbility == "Shadow Shield") && defender.curHP === defender.maxHP) {
        finalMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    //h. Fluffy (contact)
    if (defAbility === "Fluffy" && move.makesContact) {
        finalMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    //i. Punk Rock
    if (defAbility === "Punk Rock" && move.isSound) {
        finalMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    //j. Ice Scales
    if (defAbility === "Ice Scales" && ((!hitsPhysical && !move.makesContact) || move.dealsPhysicalDamage)) {
        finalMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    //k. Friend Guard
    if (field.isFriendGuard && !move.ignoresFriendGuard) {
        finalMods.push(0xC00);
        description.isFriendGuard = true;
    }
    //l. Solid Rock, Filter, Prism Armor
    if ((defAbility === "Solid Rock" || defAbility === "Filter" || defAbility === "Prism Armor") && typeEffectiveness > 1) {
        finalMods.push(0xC00);
        description.defenderAbility = defAbility;
    }
    //m. Metronome item
    //n. Fluffy (fire moves)
    if (defAbility === "Fluffy" && move.type === "Fire") {
        finalMods.push(0x2000);
        description.defenderAbility = defAbility;
    }
    //o. Expert Belt
    if (attacker.item === "Expert Belt" && typeEffectiveness > 1) {
        finalMods.push(0x1333);
        description.attackerItem = attacker.item;
    } //p. Life Orb
    else if (attacker.item === "Life Orb") {
        finalMods.push(0x14CC);
        description.attackerItem = attacker.item;
    }
    //q. Resist Berries
    if (getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.type === "Normal") &&
        attacker.ability !== "Unnerve" && attacker.ability !== "As One") {
        if (defAbility === "Ripen") {
            finalMods.push(0x400);
            description.defenderAbility = defAbility;
        }
        else {
            finalMods.push(0x800);
        }
        description.defenderItem = defender.item;
    }
    //r. Doubled damage (These likely won't be added since Minimize/Dig/Dive are hardly ever used)
    //r.i. Body Slam, Stomp, Dragon Rush, Steamroller, Heat Crash, Heavy Slam, Flying Press, Malicious Moonsault
    //r.ii. Earthquake
    //r.iii. Surf, Whirlpool
    return [finalMods, description];
}