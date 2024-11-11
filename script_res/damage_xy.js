/* Damage calculation for the Generation VI games: X, Y, Omega Ruby, and Alpha Sapphire;
 * and for the Generation V games: Black, White, Black 2, and White 2 */

function CALCULATE_ALL_MOVES_XY(p1, p2, field) {
    checkTrace(p1, p2);
    checkTrace(p2, p1);
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkKlutz(p1);
    checkKlutz(p2);
    checkEvo(p1, p2);
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    checkDownload(p1, p2);
    checkDownload(p2, p1);
    p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT]);
    p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF]);
    p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA]);
    p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD]);
    p1.stats[SP] = getModifiedStat(p1.rawStats[SP], p1.boosts[SP]);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather(), field.getTailwind(0), field.getSwamp(0), field.getTerrain());
    $(".p1-speed-mods").text(p1.stats[SP]);
    p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT]);
    p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF]);
    p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA]);
    p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD]);
    p2.stats[SP] = getModifiedStat(p2.rawStats[SP], p2.boosts[SP]);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather(), field.getTailwind(1), field.getSwamp(1), field.getTerrain());
    $(".p2-speed-mods").text(p2.stats[SP]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    checkInfiltrator(p1, side1);
    checkInfiltrator(p2, side2);
    getWeightMods(p1, p2);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = GET_DAMAGE_XY(p1, p2, p1.moves[i], side1);
        results[1][i] = GET_DAMAGE_XY(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function GET_DAMAGE_XY(attacker, defender, move, field) {
    var moveDescName = move.name;

    checkMoveTypeChange(move, field, attacker);

    if (move.name == "Nature Power" && attacker.item !== 'Assault Vest')
        [move, moveDescName] = NaturePower(move, field, moveDescName);
    else if (move.name == 'Me First' && !move.isMeFirst)
        [move, moveDescName] = checkMeFirst(move, moveDescName);

    attacker_name = attacker.name;
    defender_name = defender.name;
    var description = {
        "attackerName": attacker_name,
        "moveName": moveDescName,
        "defenderName": defender_name
    };

    addLevelDesc(attacker, defender, description);

    if (move.bp === 0 || move.category === "Status") {
        return statusMoves(move, attacker, defender, description);
    }

    var defAbility = defender.ability;
    [defAbility, description] = abilityIgnore(attacker, move, defAbility, description, defender.item);

    var isCritical = critMove(move, defAbility);

    var ateIzeAbility = ATE_IZE_ABILITIES.indexOf(attacker.ability);    //Confirms abilities like Normalize and Pixilate
    var ateIzeBoosted;
    if (ateIzeAbility !== -1 && ['Hidden Power', 'Weather Ball', 'Natural Gift', 'Judgement', 'Techno Blast'].indexOf(move.name) === -1) {
        [move, description, ateIzeBoosted] = ateIzeTypeChange(move, attacker, description);
    }

    var typeEffect1 = getMoveEffectiveness(move, defender.type1, defender.type2, description, field.isForesight, attacker.ability == "Scrappy" ? attacker.ability : false, field.isGravity, defender.item, field.weather === "Strong Winds");
    var typeEffect2 = defender.type2 && defender.type2 !== defender.type1 ? getMoveEffectiveness(move, defender.type2, defender.type1, description, field.isForesight, attacker.ability == "Scrappy" ? attacker.ability : false, field.isGravity, defender.item, field.weather === "Strong Winds") : 1;
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

    var attack;
    [attack, description] = calcAttack(move, attacker, defender, description, isCritical, defAbility);

    var atMods;
    [atMods, description] = calcAtMods(move, attacker, defAbility, description, field);

    attack = Math.max(1, pokeRound(attack * chainMods(atMods) / 0x1000));

    ////////////////////////////////
    ///////// (SP)DEFENSE //////////
    ////////////////////////////////
    var hitsPhysical = move.category === "Physical" || move.dealsPhysicalDamage;

    var defense;
    [defense, description] = calcDefense(move, attacker, defender, description, hitsPhysical, isCritical, field);

    var dfMods;
    [dfMods, description] = calcDefMods(move, defender, field, description, hitsPhysical, defAbility);

    defense = Math.max(1, pokeRound(defense * chainMods(dfMods) / 0x1000));

    ////////////////////////////////
    //////////// DAMAGE ////////////
    ////////////////////////////////
    var baseDamage = calcBaseDamage(attacker, basePower, attack, defense);


    return calcGeneralMods(baseDamage, move, attacker, defender, defAbility, field, description, isCritical, typeEffectiveness, false, hitsPhysical);
}
