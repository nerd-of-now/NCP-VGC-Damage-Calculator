function CALCULATE_ALL_MOVES_ADV(p1, p2, field) {
    checkTrace(p1, p2);
    checkTrace(p2, p1);
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather());
    $(".p1-speed-mods").text(p1.stats[SP]);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather());
    $(".p2-speed-mods").text(p2.stats[SP]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = CALCULATE_DAMAGE_ADV(p1, p2, p1.moves[i], side1);
        results[1][i] = CALCULATE_DAMAGE_ADV(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function CALCULATE_DAMAGE_ADV(attacker, defender, move, field) {
    var moveDescName = move.name;

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
    
    var typeEffect1 = getMoveEffectiveness(move, defender.type1, defender.type2, description, field.isForesight);
    var typeEffect2 = defender.type2 && defender.type2 !== defender.type1 ? getMoveEffectiveness(move, defender.type2, defender.type1, description, field.isForesight) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;
    immuneBuildDesc = immunityChecks(move, attacker, defender, field, description, defender.ability, typeEffectiveness);
    if (immuneBuildDesc !== -1) return immuneBuildDesc;

    description.HPEVs = defender.HPEVs + " HP";

    setDamageBuildDesc = setDamage(move, attacker, defender, description, false, field);
    if (setDamageBuildDesc !== -1) return setDamageBuildDesc;
    
    if (move.hits > 1) {
        description.hits = move.hits;
    }

    var bp;
    [bp, description] = basePowerFunc(move, description, '', attacker, defender, field, false, false, defender.ability);

    var at, df;
    //Unlike the other gens, it's best to leave the Attack, Defense, general, and final modifiers all together. It best matches the decomp.
    if (move.name !== 'Beat Up') {
        var isPhysical = move.type === 'Typeless' ? typeChart[moves[move.name].type].category === 'Physical' : typeChart[move.type].category === "Physical";
        var attackStat = isPhysical ? AT : SA;
        description.attackEVs = attacker.evs[attackStat] +
            (NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
            toSmogonStat(attackStat);
        var defenseStat = isPhysical ? DF : SD;
        description.defenseEVs = defender.evs[defenseStat] +
            (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
            toSmogonStat(defenseStat);
        at = attacker.rawStats[attackStat];
        df = defender.rawStats[defenseStat];

        if (isPhysical && (attacker.ability === "Huge Power" || attacker.ability === "Pure Power")) {
            at *= 2;
            description.attackerAbility = attacker.ability;
        }

        if (getItemBoostType(attacker.item) === move.type) {
            if (attacker.item === "Sea Incense")
                at = Math.floor(at * 1.05);
            else
                at = Math.floor(at * 1.1);
            description.attackerItem = attacker.item;
        } else if ((isPhysical && attacker.item === "Choice Band") ||
            (!isPhysical && attacker.item === "Soul Dew" && (attacker.name === "Latios" || attacker.name === "Latias"))) {
            at = Math.floor(at * 1.5);
            description.attackerItem = attacker.item;
        } else if ((!isPhysical && attacker.item === "DeepSeaTooth" && attacker.name === "Clamperl") ||
            (!isPhysical && attacker.item === "Light Ball" && attacker.name === "Pikachu") ||
            (isPhysical && attacker.item === "Thick Club" && (attacker.name === "Cubone" || attacker.name === "Marowak"))) {
            at *= 2;
            description.attackerItem = attacker.item;
        }

        if ((!isPhysical && defender.item === "Soul Dew" && (defender.name === "Latios" || defender.name === "Latias")) ||
            (isPhysical && defender.item === "Metal Powder" && defender.name === "Ditto")) {
            df = Math.floor(df * 1.5);
            description.defenderItem = defender.item;
        } else if (!isPhysical && defender.item === "DeepSeaScale" && defender.name === "Clamperl") {
            df *= 2;
            description.defenderItem = defender.item;
        }

        if (defender.ability === "Thick Fat" && (move.type === "Fire" || move.type === "Ice")) {
            at = Math.floor(at / 2);
            description.defenderAbility = defender.ability;
        } else if (isPhysical && defender.ability === "Marvel Scale" && defender.status !== "Healthy") {
            df = Math.floor(df * 1.5);
            description.defenderAbility = defender.ability;
        }

        if ((isPhysical && (attacker.ability === "Hustle" || (attacker.ability === "Guts" && attacker.status !== "Healthy")))
            || (!isPhysical && ["Plus", "Minus"].indexOf(attacker.ability) !== -1 && attacker.abilityOn)) {
            at = Math.floor(at * 1.5);
            description.attackerAbility = attacker.ability;
        } else if (attacker.curHP <= attacker.maxHP / 3 &&
            ((attacker.ability === "Overgrow" && move.type === "Grass") ||
                (attacker.ability === "Blaze" && move.type === "Fire") ||
                (attacker.ability === "Torrent" && move.type === "Water") ||
                (attacker.ability === "Swarm" && move.type === "Bug"))) {
            bp = Math.floor(bp * 1.5);
            description.attackerAbility = attacker.ability;
        }

        if (move.name === "Explosion" || move.name === "Self-Destruct") {
            df = Math.floor(df / 2);
        }

        var isCritical = critMove(move, defender.ability);

        var attackBoost = attacker.boosts[attackStat];
        var defenseBoost = defender.boosts[defenseStat];
        if (attackBoost > 0 || (!isCritical && attackBoost < 0)) {
            at = getModifiedStat(at, attackBoost);
            description.attackBoost = attackBoost;
        }
        if (defenseBoost < 0 || (!isCritical && defenseBoost > 0)) {
            df = getModifiedStat(df, defenseBoost);
            description.defenseBoost = defenseBoost;
        }
    }
    else {
        at = pokedex[attacker.name].bs.at;
        df = pokedex[defender.name].bs.df;
    }
    
    var baseDamage = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * at * bp / df) / 50);
    
    if (attacker.status === "Burned" && isPhysical && attacker.ability !== "Guts") {
        baseDamage = Math.floor(baseDamage / 2);
        description.isBurned = true;
    }
    
    if (!isCritical) {
        var screenMultiplier = field.format !== "Singles" ? (2/3) : (1/2);
        if (isPhysical && field.isReflect) {
            baseDamage = Math.floor(baseDamage * screenMultiplier); 
            description.isReflect = true;
        } else if (!isPhysical && field.isLightScreen) {
            baseDamage = Math.floor(baseDamage * screenMultiplier); 
            description.isLightScreen = true;
        }
    }

    if (field.format !== "Singles" && move.isSpread && !move.isGen3Spread) {
        baseDamage = Math.floor(baseDamage * 1/2);
    }
    
    if ((field.weather === "Sun" && move.type === "Fire") || (field.weather === "Rain" && move.type === "Water")) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.weather = field.weather;
    } else if ((field.weather === "Sun" && move.type === "Water") || (field.weather === "Rain" && move.type === "Fire") ||
            (move.name === "Solar Beam" && ["Rain", "Sand", "Hail"].indexOf(field.weather) !== -1)) {
        baseDamage = Math.floor(baseDamage / 2);
        description.weather = field.weather;
    }

    if (attacker.ability === "Flash Fire" && attacker.abilityOn && move.type === "Fire") {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.attackerAbility = "Flash Fire";
    }
    
    baseDamage = Math.max(1, baseDamage) + 2;
    
    if (isCritical) {
        baseDamage *= 2;
        description.isCritical = true;
    }
    
    if (field.isHelpingHand) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.isHelpingHand = true;
    }
    
    if (move.type === attacker.type1 || move.type === attacker.type2) {
        baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    baseDamage = Math.floor(baseDamage * typeEffectiveness);
    
    var damage = [];
    var j, childDamage, childMove, child2Damage, tripleDamage = [];
    if (typeof (move.tripleHit2) === 'undefined' && move.isTripleHit) {
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
    for (var i = 85; i <= 100; i++) {
        damage[i - 85] = Math.max(1, Math.floor(baseDamage * i / 100));
        //Triple Kick second/third hit logic
        if (typeof (move.tripleHit2) !== 'undefined' && move.tripleHit2 === false && move.isTripleHit) {
            for (j = 0; j < 16; j++) {
                if (typeof (move.tripleHit3) !== 'undefined' && move.tripleHit3 === false) {
                    for (k = 0; k < 16; k++) {
                        tripleDamage[(16 * (i - 85)) + (16 * j) + k] = damage[i - 85] + childDamage[j] + child2Damage[k];
                    }
                }
                else {
                    tripleDamage[(16 * (i - 85)) + j] = damage[i - 85] + childDamage[j];
                }
            }
        }
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
    return {"damage":damage, "description":buildDescription(description)};
}
