function getKOChanceText(damageIn, move, defender, field, isBadDreams, isItemlessAttacker = false) {
    if (isNaN(damageIn[0]) && !Array.isArray(damageIn[0])) {
        return 'something broke; please tell nerd of now';
    }
    if (move.name == "Pain Split" && !move.painMax) {
        return 'The battlers shared their pain!';
    }
    if (move.category == "Status" && ['Me First', '(No Move)'].indexOf(move.name) == -1) {
        return "It's a status move, it won't deal damage.";
    }
    if (damageIn[damageIn.length - 1] === 0) {
        if (field.weather === "Harsh Sun" && move.type === "Water") {
            return 'the Water-Type attack evaporated in the harsh sunlight';
        } else if (field.weather === "Heavy Rain" && move.type === "Fire") {
            return 'the Fire-Type attack fizzled out in the heavy rain';
        }
        return 'No damage for you';
    }
    let preventsHeal = move.name == 'Psychic Noise';
    let preventsHealItem = ['Knock Off', 'Psychic Noise'].includes(move.name) || (['Thief', 'Covet'].includes(move.name) && isItemlessAttacker);
    let preventsRestoreHP = preventsHealItem || (defender.item.includes(' Berry') && ['Bug Bite', 'Pluck', 'Incinerate'].includes(move.name));
    var restoreHP = getRestoreHP(defender.item, defender.maxHP, preventsRestoreHP);
    var isRipen = applyRipen(defender.ability == "Ripen", defender.item, restoreHP);
    if (isRipen) {
        restoreHP *= 2;
    }
    var isGluttony, restoreThreshold;
    [restoreThreshold, isGluttony] = getRestoreThreshold(defender.item, restoreHP, defender.maxHP, defender.ability == "Gluttony");
    if (defender.isDynamax) {
        restoreThreshold *= 0.5;
    }
    let tempHits = 0;   //exists specifically for the damage results text in gen 1

    if (gen == 1 && move.hits > 1) {
        damageIn = handleMultiHitGen1(damageIn, move.hits);
        tempHits = move.hits;
        move.hits = 1;
    }
    var multihit = move.hits > 1 || (damageIn.length > 1 && Array.isArray(damageIn[0]));

    //convert each array to a dictionary here
    var damage = damageArrToDict(damageIn, move.hits, defender.curHP, restoreHP, restoreThreshold), damageNums = [];
    if (tempHits) {
        move.hits = tempHits;
    }
    for (eachVal in damage) {
        damageNums.push(parseInt(eachVal));
    }

    if ((!multihit || !restoreHP) && damage[damageNums[0]] >= defender.curHP) {
        return 'guaranteed OHKO';
    }
    else if (multihit && restoreHP && damage[damageNums[0]] >= defender.curHP + restoreHP) {
        return 'guaranteed OHKO';
    }

    var hazards = 0;
    var hazardText = [];
    if (field.isSR && defender.ability !== 'Magic Guard' && defender.item !== "Heavy-Duty Boots") {
        var effectiveness = typeChart['Rock'][defender.type1] * (defender.type2 ? typeChart['Rock'][defender.type2] : 1);
        hazards += Math.max(1, Math.floor(effectiveness * defender.maxHP / 8));
        hazardText.push('Stealth Rock');
    }
    if (field.isSteelsurge && defender.ability !== 'Magic Guard' && defender.item !== "Heavy-Duty Boots") {
        var effectiveness = typeChart['Steel'][defender.type1] * (defender.type2 ? typeChart['Steel'][defender.type2] : 1);
        hazards += Math.max(1, Math.floor(effectiveness * defender.maxHP / 8));
        hazardText.push('Steelsurge');
    }
    if (pIsGrounded(defender, field) && defender.ability !== 'Magic Guard' && defender.item !== "Heavy-Duty Boots") {
        if (field.spikes === 1) {
            hazards += Math.max(1, Math.floor(defender.maxHP / 8));
            if (gen === 2 || gen == 9.5) {
                hazardText.push('Spikes');
            } else {
                hazardText.push('1 layer of Spikes');
            }
        } else if (field.spikes === 2) {
            hazards += Math.floor(defender.maxHP / 6);
            hazardText.push('2 layers of Spikes');
        } else if (field.spikes === 3) {
            hazards += Math.floor(defender.maxHP / 4);
            hazardText.push('3 layers of Spikes');
        }
    }
    if (isNaN(hazards)) {
        hazards = 0;
    }

    var eot = 0;
    var eotText = [];
    var toxicCounter = 0;
    var eotDict = getAllEndOfTurnEffects(defender, field, isBadDreams, preventsHeal, preventsHealItem, preventsRestoreHP);
    let maxChip = defender.isDynamax ? 0.5 : 1;
    for (eotType in eotDict) {
        if (eotDict[eotType].val != 0) {
            if (eotDict[eotType].isToxic) {
                toxicCounter = eotDict[eotType].val;
                eot -= Math.floor(Math.floor(toxicCounter * defender.maxHP / 16) * maxChip);
            }
            else {
                eot += eotDict[eotType].val;
            }
            eotText.push(eotDict[eotType].text);
        }
    }

    var c = getKOChance(damage, multihit, defender.curHP - hazards, 0, 1, defender.maxHP, toxicCounter, restoreHP, restoreThreshold);
    var afterText = hazardText.length > 0 ? ' after ' + serializeText(hazardText) : '';
    var percNumText = '';
    if (c === 1) {
        return 'guaranteed OHKO' + afterText;
    }
    else if (c > 0 && eot >= 0) {
        if (c < 0.0001)
            percNumText = '<0.01';
        else if (c > 0.9999)
            percNumText = '>99.99';
        else
            percNumText = Math.round(c * 10000) / 100;
        return percNumText + '% chance to OHKO' + afterText;
    }

    if (restoreHP) {
        let eotTemp = '';
        if (isRipen) eotTemp += 'Ripen ';
        else if (isGluttony) eotTemp += 'Gluttony ';
        eotTemp += defender.item + ' recovery';
        eotText.push(eotTemp);
    }

    c = getKOChance(damage, multihit, defender.curHP - hazards, eot, 1, defender.maxHP, toxicCounter, restoreHP, restoreThreshold, maxChip, eotDict);
    afterText = hazardText.length > 0 || eotText.length > 0 ? ' after ' + serializeText(hazardText.concat(eotText)) : '';
    if (c === 1) {
        return 'guaranteed OHKO' + afterText;
    }
    else if (c > 0) {
        if (c < 0.0001)
            percNumText = '<0.01';
        else if (c > 0.9999)
            percNumText = '>99.99';
        else
            percNumText = Math.round(c * 10000) / 100;
        return percNumText + '% chance to OHKO' + afterText;
    }

    var i;
    for (i = 2; i <= 4; i++) {
        c = getKOChance(damage, multihit, defender.curHP - hazards, eot, i, defender.maxHP, toxicCounter, restoreHP, restoreThreshold, maxChip, eotDict);
        if (c === 1) {
            return 'guaranteed ' + i + 'HKO' + afterText;
        }
        else if (c > 0) {
            if (c < 0.0001)
                percNumText = '<0.01';
            else if (c > 0.9999)
                percNumText = '>99.99';
            else
                percNumText = Math.round(c * 10000) / 100;
            return percNumText + '% chance to ' + i + 'HKO' + afterText;
        }
    }

    for (i = 5; i <= 9; i++) {
        if (predictTotal(damageNums[0], eot, i, toxicCounter, defender.curHP - hazards, defender.maxHP, restoreHP, restoreThreshold) >= defender.curHP - hazards) {
            return 'guaranteed ' + i + 'HKO' + afterText;
        }
        else if (predictTotal(damageNums[damageNums.length - 1], eot, i, toxicCounter, defender.curHP - hazards, defender.maxHP, restoreHP, restoreThreshold) >= defender.curHP - hazards) {
            return 'possible ' + i + 'HKO' + afterText;
        }
    }

    return 'possibly the worst move ever';
}

function damageArrToDict(damageArr, hits, currHP, restoreHP, restoreThreshold) {
    var pivotSpread = {}, addedSpread = {}, tempSpread = {};
    var tempKey = 0, is2dArr = Array.isArray(damageArr[0]), damageArrL = damageArr.length;
    if (!(is2dArr && damageArrL > 1)) {
        pivotSpread = arrayToProbabilityDict(damageArr, currHP, restoreHP, restoreThreshold);
        addedSpread = pivotSpread;
    }
    else {
        pivotSpread = arrayToProbabilityDict(damageArr[1], currHP, restoreHP, restoreThreshold);
        addedSpread = arrayToProbabilityDict(damageArr[0], currHP, restoreHP, restoreThreshold);
    }
    for (var i = 0; i < hits - 1; i++) {
        if (is2dArr && i != 0) {
            //this if-else statement assumes that, if the number of 2D arrays is less than the number of hits, all of the remaining hits use the last array calculated
            if (damageArrL - 1 >= i + 1)
                pivotSpread = arrayToProbabilityDict(damageArr[i + 1], currHP, restoreHP, restoreThreshold);
            else
                pivotSpread = arrayToProbabilityDict(damageArr[damageArrL - 1], currHP, restoreHP, restoreThreshold);
        }
        for (addedNum in addedSpread) {
            let tempAddedNum = parseInt(addedNum);
            for (pivotNum in pivotSpread) {
                let tempPivotNum = parseInt(pivotNum);
                tempKey = tempPivotNum + tempAddedNum;
                if (checkThresholdCriteria(currHP, tempPivotNum, restoreHP, restoreThreshold, addedNum)) {
                    tempKey = tempKey + '*';
                }
                if (tempKey in tempSpread)
                    tempSpread[tempKey] = tempSpread[tempKey] + (pivotSpread[pivotNum] * addedSpread[addedNum]);
                else
                    tempSpread[tempKey] = pivotSpread[pivotNum] * addedSpread[addedNum];
            }
        }
        addedSpread = sortByKeys(tempSpread);
        tempSpread = {};
    }
    return addedSpread;
}

function arrayToProbabilityDict(arr, currHP, restoreHP, restoreThreshold) {
    let returnArr = {};
    let instanceUnit = 1 / (gen >= 3 ? 16 : 39);
    for (let i = 0; i < arr.length; i++) {
        let returnArrKey = arr[i];
        if (checkThresholdCriteria(currHP, returnArrKey, restoreHP, restoreThreshold)) {
            returnArrKey = returnArrKey + '*';
        }
        if (returnArrKey in returnArr)
            returnArr[returnArrKey] = returnArr[returnArrKey] + instanceUnit;
        else
            returnArr[returnArrKey] = instanceUnit;
    }
    return returnArr;
}

function numericSortParseInt(a, b) {
    return parseInt(a) - parseInt(b);
}

function sortByKeys(dict) {
    var sorted = [], tempDict = {};

    sorted = Object.keys(dict).sort(numericSortParseInt);
    for (let i = 0; i < sorted.length; i++)
        tempDict[sorted[i]] = dict[sorted[i]];

    return tempDict;
}

function getKOChance(damage, multihit, hp, eotSum, timesUsed, maxHP, toxicCounter, restoreHP, restoreThreshold, maxChip = 1, eotDict = {}) {
    var damageKeys = Object.keys(damage).sort(numericSortParseInt);
    let firstDamage = damageKeys[0];
    let lastDamage = damageKeys[damageKeys.length - 1];
    var minDamage = parseInt(firstDamage);
    var maxDamage = parseInt(lastDamage);
    var activateHealItem = false;
    let tempSpread = {};
    if (timesUsed === 1) {
        if (((!multihit && lastDamage[lastDamage.length - 1] != '*') || !restoreHP) && maxDamage - eotSum < hp) {
            return 0;
        }
        else if ((multihit || lastDamage[lastDamage.length - 1] == '*') && restoreHP && maxDamage - eotSum < hp + restoreHP) {
            return 0;
        }
        else if (((!multihit && firstDamage[firstDamage.length - 1] != '*') || !restoreHP) && minDamage - eotSum >= hp) {
            return 1;
        }
        else if ((multihit || firstDamage[firstDamage.length - 1] == '*') && restoreHP && minDamage - eotSum >= hp + restoreHP) {
            return 1;
        }
    }
    for (damageNum of damageKeys) {
        let tempDamageNum = parseInt(damageNum);
        activateHealItem = damageNum[damageNum.length - 1] == '*';
        if (eotSum) {
            [tempDamageNum, activateHealItem] = eotProcess(eotDict, tempDamageNum, toxicCounter, hp, restoreHP, restoreThreshold, maxHP, activateHealItem, maxChip);
        }
        if (activateHealItem) {
            tempDamageNum = tempDamageNum + '*';
        }
        if (tempDamageNum in tempSpread)
            tempSpread[tempDamageNum] = tempSpread[tempDamageNum] + damage[damageNum];
        else
            tempSpread[tempDamageNum] = damage[damageNum];
    }
    toxicCounter++;
    if (timesUsed == 1) {
        let tempSpreadKeysSorted = Object.keys(tempSpread).sort(numericSortParseInt);
        if (parseInt(tempSpreadKeysSorted[tempSpreadKeysSorted.length - 1]) >= hp) {
            let earlyTotalSpread = {};
            let returnSum = 0, probabilitySum = 0;
            for (spreadNum of tempSpreadKeysSorted) {
                let earlyItemConsumed = spreadNum[spreadNum.length - 1] == '*';
                let earlyFinalNum = parseInt(spreadNum);
                if (earlyItemConsumed) {
                    earlyFinalNum -= restoreHP;
                    if (hp - earlyFinalNum > maxHP) {
                        earlyFinalNum = hp - maxHP;    //conditional always fails if earlyFinalNum >= 0
                    }
                }
                if (earlyItemConsumed && earlyFinalNum in earlyTotalSpread) {
                    earlyTotalSpread[earlyFinalNum] += tempSpread[spreadNum];
                }
                else {
                    earlyTotalSpread[earlyFinalNum] = tempSpread[spreadNum];
                }
            }
            for (finalNum in earlyTotalSpread) {
                if (parseInt(finalNum) >= hp)
                    returnSum += earlyTotalSpread[finalNum];
                probabilitySum += earlyTotalSpread[finalNum];
            }
            if (returnSum === probabilitySum)
                returnSum = 1;
            return returnSum;
        }
        return 0;
    }
    tempSpread = sortByKeys(tempSpread);
    var sum = verifyKOChance(damage, hp, eotSum, timesUsed, maxHP, toxicCounter, restoreHP, restoreThreshold, eotDict, maxChip, tempSpread);
    return sum;
}

function verifyKOChance(damage, targetHP, eotSum, timesUsed, maxHP, toxicCounter, restoreHP, restoreThreshold, eotDict, maxChip, inSpread = damage) {
    var pivotSpread = {}, addedSpread = {}, tempSpread = {}, totalSpread = {};
    var tempKey = 0, finalNum = 0;
    var returnSum = 0, probabilitySum = 0;
    let activateHealItem = false;
    pivotSpread = damage;
    addedSpread = inSpread;
    for (var i = 0; i < timesUsed - 1; i++) {
        for (addedNum in addedSpread) {
            let tempAddedNum = parseInt(addedNum);
            for (pivotNum in pivotSpread) {
                let tempPivotNum = parseInt(pivotNum);
                tempKey = tempPivotNum + tempAddedNum;
                if (checkThresholdCriteria(targetHP, tempPivotNum, restoreHP, restoreThreshold, addedNum)) {
                    activateHealItem = true;
                }
                if (eotSum) {
                    [tempKey, activateHealItem] = eotProcess(eotDict, tempKey, toxicCounter, targetHP, restoreHP, restoreThreshold, maxHP, activateHealItem, maxChip);
                }
                if (activateHealItem) {
                    tempKey = tempKey + '*';
                }
                activateHealItem = false;

                if (tempKey in tempSpread)
                    tempSpread[tempKey] = tempSpread[tempKey] + (pivotSpread[pivotNum] * addedSpread[addedNum]);
                else
                    tempSpread[tempKey] = pivotSpread[pivotNum] * addedSpread[addedNum];
            }
        }
        addedSpread = sortByKeys(tempSpread);
        tempSpread = {};
    }
    for (spreadNum in addedSpread) {
        let itemConsumed = spreadNum[spreadNum.length - 1] == '*';
        finalNum = parseInt(spreadNum);
        if (itemConsumed && timesUsed > 1) {
            finalNum -= restoreHP;
            if (targetHP - finalNum > maxHP) {
                finalNum = targetHP - maxHP;    //conditional always fails if finalNum >= 0
            }
        }
        if (itemConsumed && finalNum in totalSpread) {
            totalSpread[finalNum] += addedSpread[spreadNum];
        }
        else {
            totalSpread[finalNum] = addedSpread[spreadNum];
        }
    }
    for (finalNum in totalSpread) {
        if (finalNum >= targetHP)
            returnSum += totalSpread[finalNum];
        probabilitySum += totalSpread[finalNum];
    }
    if (returnSum === probabilitySum)
        returnSum = 1;
    return returnSum;
}

function predictTotal(damage, eot, timesUsed, toxicCounter, hp, maxHP, restoreHP, restoreThreshold) {
    var total = 0;
    for (var i = 0; i < timesUsed; i++) {
        total += damage;
        if ((hp - total <= restoreThreshold) && restoreHP) {
            total -= restoreHP;
            if (hp - total > maxHP) {
                total = hp - maxHP;
            }
            restoreHP = 0;
        }
        if (i < timesUsed - 1) {
            total -= eot;
            if (toxicCounter > 0) {
                total += Math.floor((toxicCounter + i) * maxHP / 16);
            }
        }
    }
    return total;
}

function serializeText(arr) {
    if (arr.length === 0) {
        return '';
    }
    else if (arr.length === 1) {
        return arr[0];
    }
    else if (arr.length === 2) {
        return arr[0] + " and " + arr[1];
    }
    else {
        var text = '';
        for (var i = 0; i < arr.length - 1; i++) {
            text += arr[i] + ', ';
        }
        return text + 'and ' + arr[arr.length - 1];
    }
}

function getRestoreHP(item, maxHP, preventsRestoreHP) {
    return preventsRestoreHP ? 0 :
        ["Berry", "Oran Berry"].includes(item) ? 10 :
            item == "Berry Juice" ? 20 :
                ["Gold Berry", "Sitrus Berry"].includes(item) && gen <= 3 ? 30 :
                    item == "Sitrus Berry" ? Math.floor(maxHP / 4) :    //Enigma Berry can also apply if the attack is super effective
                        ["Figy Berry", "Iapapa Berry", "Wiki Berry", "Aguav Berry", "Mago Berry"].includes(item) ? Math.floor(maxHP / (gen <= 6 ? 8 : gen == 7 ? 2 : 3)) :
                            0;
}

function applyRipen(isRipen, item, restoreHP) {
    return isRipen && item.includes(" Berry") && restoreHP;
}

function getRestoreThreshold(item, restoreHP, maxHP, isGluttony) {
    if (restoreHP) {
        if (gen <= 6 || ["Berry", "Oran Berry", "Berry Juice", "Gold Berry", "Sitrus Berry"].includes(item)) {
            return [maxHP / 2, false];
        }
        else if (["Figy Berry", "Iapapa Berry", "Wiki Berry", "Aguav Berry", "Mago Berry"].includes(item)) {
            if (isGluttony) {
                return [maxHP / 2, true];
            }
            else {
                return [maxHP / 4, false];
            }
        }
    }
    return [0, false];
}

/**
 * Converts multihit moves into one Array (In Gen 1, each hit uses the same damage roll, and only the first hit can crit)
 * @param {var} damage Array containing either each damage roll or multiple Arrays that contain each damage roll
 * @param {var} hits Number of times a move hits
 * @returns the sum of all hits with each damage roll
 */
function handleMultiHitGen1(damage, hits) {
    let is2dArr = Array.isArray(damage[0]);
    var firstHit = is2dArr ? damage[0] : damage;
    var laterHits = is2dArr ? damage[1] : damage;
    var allHitsDamage = [];
    for (randIndex in firstHit) {
        allHitsDamage.push(firstHit[randIndex] + laterHits[randIndex] * (hits - 1));
    }
    return allHitsDamage;
}

function getAllEndOfTurnEffects(defender, field, isBadDreams, preventsHeal, preventsHealItem, preventsRestoreHP) {
        //IMPORTANT: THIS ISN'T THE ORDER FOR GEN 3 AND BEFORE. THIS IS WHAT I FOUND TO BE GEN 3 ORDER:
        //Wish, Weather, Ingrain, Sitrus/Oran/Berry Juice healing, Leftovers, burn, Leech Seed, Nightmare, Curse
        //THE SITRUS/ORAN/BERRY JUICE HEALING IS WHY preventsRestoreHP IS PASSED IN
    let weatherEffects = 0,
        //wish = 0,
        seaOfFire = 0,
        gMaxField = 0,
        grassyTerrain = 0,
        leftoversBlackSludge = 0,
        //aquaRing = 0,
        //ingrain = 0,
        //leechSeed = 0,
        poisonedPoisonHeal = 0,
        toxicCounter = 0,
        burn = 0,
        //nightmare = 0,
        //ghostCurse = 0,
        saltCure = 0,
        //bindingMove = 0,
        badDreams = 0;
        //stickyBarb = 0,
        //harvest = 0;
    let weatherEffectsText = '',
        leftoversBlackSludgeText = '',
        poisonedPoisonHealText = '',
        burnedText = '',
        saltCureText = '';
    let isToxicDamage = false;

    //EOT Order
    //1. Weather Effects
    if (field.weather == 'Sun') {
        if (['Dry Skin', 'Solar Power'].includes(defender.ability)) {
            weatherEffects -= Math.floor(defender.maxHP / 8);
            weatherEffectsText = defender.ability + ' damage';
        }
    }
    else if (field.weather == 'Rain') {
        if (!preventsHeal) {
            if (defender.ability === 'Dry Skin') {
                weatherEffects += Math.floor(defender.maxHP / 8);
                weatherEffectsText = 'Dry Skin recovery';
            }
            else if (defender.ability === 'Rain Dish') {
                weatherEffects += Math.floor(defender.maxHP / 16);
                weatherEffectsText = 'Rain Dish recovery';
            }
        }
    }
    else if (field.weather == 'Sand') {
        if (!(defender.hasType("Rock", "Ground", "Steel")) && !(['Magic Guard', 'Overcoat', 'Sand Force', 'Sand Rush', 'Sand Veil'].includes(defender.ability)) && defender.item !== 'Safety Goggles') {
            weatherEffects -= Math.floor(defender.maxHP / 16);
            weatherEffectsText = 'sandstorm damage';
        }
    }
    else if (field.weather == 'Hail') {
        if (defender.ability === 'Ice Body' && !preventsHeal) {
            weatherEffects += Math.floor(defender.maxHP / 16);
            weatherEffectsText = 'Ice Body recovery';
        }
        else if (!(defender.hasType('Ice')) && !(['Magic Guard', 'Overcoat', 'Snow Cloak'].includes(defender.ability)) && defender.item !== 'Safety Goggles') {
            weatherEffects -= Math.floor(defender.maxHP / 16);
            weatherEffectsText = 'hail damage';
        }
    }
    else if (field.weather === 'Snow' && defender.ability === 'Ice Body' && !preventsHeal) {
        weatherEffects += Math.floor(defender.maxHP / 16);
        weatherEffectsText = 'Ice Body recovery';
    }

    //2. Future Sight / Doom Desire (not yet implemented as such)
    //3. Wish (no plans for implementation)
    //4. Speed dependant block
    //a. Sea of Fire, G-Max Vinelash / Wildfire / Cannonade / Volcalith
    if (field.isSeaFire && defender.ability !== 'Magic Guard' && !(defender.hasType("Fire"))) {
        seaOfFire -= Math.floor(defender.maxHP / 8);
    }
    if (field.isGMaxField && defender.ability !== 'Magic Guard') {
        gMaxField -= Math.floor(defender.maxHP / 6);
    }
    //b. Grassy Terrain
    if (field.terrain === "Grassy") {
        if (!preventsHeal && pIsGrounded(defender, field)) {
            grassyTerrain += Math.floor(defender.maxHP / 16);
        }
    }
    //c. Hydration (not implemented, not that it's relevant within this block)
    //d. Leftovers / Black Sludge
    if (defender.item === 'Leftovers' && !preventsHealItem) {
        leftoversBlackSludge += Math.floor(defender.maxHP / 16);
        leftoversBlackSludgeText = 'Leftovers recovery';
    }
    else if (defender.item === 'Black Sludge') {
        if (defender.hasType('Poison') && !preventsHealItem) {
            leftoversBlackSludge += Math.floor(defender.maxHP / 16);
            leftoversBlackSludgeText = 'Black Sludge recovery';
        }
        else if (defender.ability !== 'Magic Guard' && defender.ability !== 'Klutz') {
            leftoversBlackSludge -= Math.floor(defender.maxHP / 8);
            leftoversBlackSludgeText = 'Black Sludge damage';
        }
    }

    //5. Aqua Ring (not implemented)
    //6. Ingrain (not implemented)
    //7. Leech Seed (not implemented)
    //8. Poisoned / Badly Poisoned / Poison Heal
    if (defender.status === 'Poisoned') {
        if (defender.ability === 'Poison Heal' && !preventsHeal) {
            poisonedPoisonHeal += Math.floor(defender.maxHP / 8);
            poisonedPoisonHealText = 'Poison Heal';
        }
        else if (defender.ability !== 'Magic Guard') {
            poisonedPoisonHeal -= Math.floor(defender.maxHP / 8);
            poisonedPoisonHealText = 'poison damage';
        }
    }
    else if (defender.status === 'Badly Poisoned') {
        if (defender.ability === 'Poison Heal' && !preventsHeal) {
            poisonedPoisonHeal += Math.floor(defender.maxHP / 8);
            poisonedPoisonHealText = 'Poison Heal';
        }
        else if (defender.ability !== 'Magic Guard') {
            toxicCounter = defender.toxicCounter;
            poisonedPoisonHealText = 'toxic damage';
            isToxicDamage = true;
        }
    }
    //9. Burned
    else if (defender.status === 'Burned') {
        var burnDmgDivider = (gen >= 7) ? 16 : 8;
        if (defender.ability === 'Heatproof') {
            burn -= Math.floor(defender.maxHP / burnDmgDivider / 2);
            burnedText = 'reduced burn damage';
        }
        else if (defender.ability !== 'Magic Guard') {
            burn -= Math.floor(defender.maxHP / burnDmgDivider);
            burnedText = 'burn damage';
        }
    }

    //10. Nightmare (not implemented)
    //11. Curse (not implemented)
    //12. Salt Cure
    if (field.isSaltCure && defender.ability !== 'Magic Guard') {
        if (!(defender.hasType("Water", "Steel"))) {
            let saltMult = gen == 10 ? 16 : 8;
            saltCure -= Math.floor(defender.maxHP / saltMult);
            saltCureText = 'Salt Cure damage';
        }
        else {
            let saltMult = gen == 10 ? 8 : 4;
            saltCure -= Math.floor(defender.maxHP / saltMult);
            saltCureText = 'extra Salt Cure damage';
        }
    }

    //13. Binding moves (not implemented)
    //14. Bad Dreams
    if ((defender.status === 'Asleep' || defender.ability === 'Comatose') && isBadDreams && defender.ability !== 'Magic Guard') {
        badDreams -= Math.floor(defender.maxHP / 8);
    }

    //15. Sticky Barb (not implemented)
    //16. Harvest (not implemented)

    let maxChip = defender.isDynamax ? 0.5 : 1;
    return {
        weatherEffects: {
            val: Math.floor(weatherEffects * maxChip),
            text: weatherEffectsText
        },
        seaOfFire: {
            val: Math.floor(seaOfFire * maxChip),
            text: 'Sea of Fire damage'
        },
        gMaxField: {
            val: Math.floor(gMaxField * maxChip),
            text: 'G-Max field damage'
        },
        grassyTerrain: {
            val: Math.floor(grassyTerrain * maxChip),
            text: 'Grassy Terrain recovery'
        },
        leftoversBlackSludge: {
            val: Math.floor(leftoversBlackSludge * maxChip),
            text: leftoversBlackSludgeText
        },
        poisonedToxicPoisonHeal: {
            val: isToxicDamage ? toxicCounter : Math.floor(poisonedPoisonHeal * maxChip),
            text: poisonedPoisonHealText,
            isToxic: isToxicDamage
        },
        burned: {
            val: Math.floor(burn * maxChip),
            text: burnedText
        },
        saltCure: {
            val: Math.floor(saltCure * maxChip),
            text: saltCureText
        },
        badDreams: {
            val: Math.floor(badDreams * maxChip),
            text: 'Bad Dreams'
        },
    };
}

function checkThresholdCriteria(currHP, roll, restoreHP, restoreThreshold, prevCalcRolls = 0) {
    let usedPrevCalcRolls = parseInt(prevCalcRolls);
    return isNaN(prevCalcRolls) || (restoreHP && currHP - usedPrevCalcRolls - roll <= restoreThreshold && currHP - usedPrevCalcRolls - roll > 0);
}

function eotProcess(eotDict, damageRoll, toxicCounter, targetHP, restoreHP, restoreThreshold, maxHP, activateHealItem, maxChip) {
    for (eotType in eotDict) {
        if (eotDict[eotType].val != 0) {
            let eotApply = 0;
            if (!eotDict[eotType].isToxic) {
                eotApply = eotDict[eotType].val;
            }
            else {
                eotApply = Math.floor(Math.floor(toxicCounter * maxHP / 16) * maxChip) * -1;
            }
            if (!activateHealItem && checkThresholdCriteria(targetHP, eotApply * -1, restoreHP, restoreThreshold, damageRoll)) {
                activateHealItem = true;
            }
            if ((activateHealItem && targetHP - damageRoll + restoreHP > 0) || (!activateHealItem && targetHP - damageRoll > 0)) {
                damageRoll -= eotApply;     //Currently assumes to always check for a KO before applying the eot damage/healing, consider changing to allow for more lefties healing turns
            }
        }
    }
    return [damageRoll, activateHealItem];
}