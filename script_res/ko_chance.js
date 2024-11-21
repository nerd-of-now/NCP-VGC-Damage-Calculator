function getKOChanceText(damageIn, move, defender, field, isBadDreams) {
    if (isNaN(damageIn[0]) && !Array.isArray(damageIn[0])) {
       return 'something broke; please tell nerd of now';
    }
    if (move.name == "Pain Split" && !move.painMax) {
        return 'The battlers shared their pain!';
    }
    if (move.category == "Status" && ['Me First', '(No Move)'].indexOf(move.name) == -1) {
        return "It's a status move, it won't deal damage.";
    }
    if (damageIn[damageIn.length-1] === 0) {
        if (field.weather === "Harsh Sun" && move.type === "Water") {
            return 'the Water-Type attack evaporated in the harsh sunlight';
        } else if (field.weather === "Heavy Rain" && move.type === "Fire") {
            return 'the Fire-Type attack fizzled out in the heavy rain';
        }
        return 'No damage for you';
    }
    var hasSitrus = defender.item === 'Sitrus Berry';
    var hasFigy = defender.item === 'Figy Berry' || defender.item === 'Aguav Berry' || defender.item === 'Iapapa Berry' || defender.item === 'Mago Berry' || defender.item === 'Wiki Berry';
    var gluttony = defender.ability === "Gluttony";
    var ripen = (defender.ability === "Ripen") ? 2 : 1;
    var figyDiv = gen <= 6 ? 8 : gen == 7 ? 2 : 3;
    var multihit = move.hits > 1 || (damageIn.length > 1 && Array.isArray(damageIn[0]));

    //convert each array to a dictionary here
    var damage = damageArrToDict(damageIn, move.hits), damageNums = [];
    for (eachVal in damage) {
        damageNums.push(parseInt(eachVal));
    }

    if ((!multihit || (!hasSitrus && !hasFigy)) && damage[damageNums[0]] >= defender.curHP) {
        return 'guaranteed OHKO';
    } else if (multihit && hasSitrus && damage[damageNums[0]] >= defender.curHP + Math.floor(ripen * defender.maxHP / 4)) {
        return 'guaranteed OHKO';
    } else if (multihit && hasFigy && damage[damageNums[0]] >= defender.curHP + Math.floor(ripen * defender.maxHP / figyDiv)) {
        return 'guaranteed OHKO';
    }

    var hazards = 0;
    var hazardText = [];
    if (field.isSR && defender.ability !== 'Magic Guard' && defender.item !== "Heavy-Duty Boots") {
        var effectiveness = typeChart['Rock'][defender.type1] * (defender.type2 ? typeChart['Rock'][defender.type2] : 1);
        hazards += Math.floor(effectiveness * defender.maxHP / 8);
        hazardText.push('Stealth Rock');
    }
    if (pIsGrounded(defender, field) && defender.ability !== 'Magic Guard' && defender.item !== "Heavy-Duty Boots") {
        if (field.spikes === 1) {
            hazards += Math.floor(defender.maxHP / 8);
            if (gen === 2) {
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
    var maxChip = defender.isDynamax ? 0.5 : 1;
    if (field.weather === 'Sun') {
        if (defender.ability === 'Dry Skin' || defender.ability === 'Solar Power') {
            eot -= Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push(defender.ability + ' damage');
        }
    } else if (field.weather === 'Rain') {
        if (defender.ability === 'Dry Skin') {
            eot += Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push('Dry Skin recovery');
        } else if (defender.ability === 'Rain Dish') {
            eot += Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
            eotText.push('Rain Dish recovery');
        }
    } else if (field.weather === 'Sand') {
        if (['Rock', 'Ground', 'Steel'].indexOf(defender.type1) === -1 &&
            ['Rock', 'Ground', 'Steel'].indexOf(defender.type2) === -1 &&
            ['Magic Guard', 'Overcoat', 'Sand Force', 'Sand Rush', 'Sand Veil'].indexOf(defender.ability) === -1 &&
            defender.item !== 'Safety Goggles') {
            eot -= Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
            eotText.push('sandstorm damage');
        }
    } else if (field.weather === 'Hail') {
        if (defender.ability === 'Ice Body') {
            eot += Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
            eotText.push('Ice Body recovery');
        } else if (defender.type1 !== 'Ice' && defender.type2 !== 'Ice' &&
            ['Magic Guard', 'Overcoat', 'Snow Cloak'].indexOf(defender.ability) === -1 &&
            defender.item !== 'Safety Goggles') {
            eot -= Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
            eotText.push('hail damage');
        }
    }
    else if (field.weather === 'Snow' && defender.ability === 'Ice Body') {
        eot += Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
        eotText.push('Ice Body recovery');
    }
    if (defender.item === 'Leftovers') {
        eot += Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
        eotText.push('Leftovers recovery');
    } else if (defender.item === 'Black Sludge') {
        if (defender.type1 === 'Poison' || defender.type2 === 'Poison') {
            eot += Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
            eotText.push('Black Sludge recovery');
        } else if (defender.ability !== 'Magic Guard' && defender.ability !== 'Klutz') {
            eot -= Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push('Black Sludge damage');
        }
    }
    if (field.terrain === "Grassy") {
        if (pIsGrounded(defender, field)) {
            eot += Math.floor(Math.floor(defender.maxHP / 16) * maxChip);
            eotText.push('Grassy Terrain recovery');
        }
    }
    var toxicCounter = 0;
    if (defender.status === 'Poisoned') {
        if (defender.ability === 'Poison Heal') {
            eot += Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push('Poison Heal');
        } else if (defender.ability !== 'Magic Guard') {
            eot -= Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push('poison damage');
        }
    } else if (defender.status === 'Badly Poisoned') {
        if (defender.ability === 'Poison Heal') {
            eot += Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push('Poison Heal');
        } else if (defender.ability !== 'Magic Guard') {
            eotText.push('toxic damage');
            toxicCounter = defender.toxicCounter;
        }
    } else if (defender.status === 'Burned') {
        var burnDmgDivider = (gen >= 7) ? 16 : 8;
        if (defender.ability === 'Heatproof') {
            eot -= Math.floor(Math.floor(defender.maxHP / burnDmgDivider / 2) * maxChip);
            eotText.push('reduced burn damage');
        } else if (defender.ability !== 'Magic Guard') {
            eot -= Math.floor(Math.floor(defender.maxHP / burnDmgDivider) * maxChip);
            eotText.push('burn damage');
        }
    } else if (defender.status === 'Asleep' && isBadDreams && defender.ability !== 'Magic Guard') {
        eot -= Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
        eotText.push('Bad Dreams');
    }

    if (field.isSeaFire && defender.ability !== 'Magic Guard' && [defender.type1, defender.type2].indexOf('Fire') === -1) {
        eot -= Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
        eotText.push('Sea of Fire damage');
    }

    if (field.isGMaxField && defender.ability !== 'Magic Guard') {
        eot -= Math.floor(Math.floor(defender.maxHP / 6) * maxChip);
        eotText.push('G-Max field damage');
    }

    if (field.isSaltCure && defender.ability !== 'Magic Guard') {
        if (["Water", "Steel"].indexOf(defender.type1) === -1 && ["Water", "Steel"].indexOf(defender.type2) === -1) {
            eot -= Math.floor(Math.floor(defender.maxHP / 8) * maxChip);
            eotText.push('Salt Cure damage');
        }
        else {
            eot -= Math.floor(Math.floor(defender.maxHP / 4) * maxChip);
            eotText.push('extra Salt Cure damage');
        }
    }

    //// multi-hit moves have too many possibilities for brute-forcing to work, so reduce it to an approximate distribution
    //// ...is what would be the case if not for using dictionaries to simulate probability combinations
    //var qualifier = '';
    //if (move.hits > 1 && !move.isTripleHit) {
    //    qualifier = 'approx. ';
    //    damage = squashMultihit(damage, move.hits);
    //}

    var c = getKOChance(damage, multihit, defender.curHP - hazards, 0, 1, defender.maxHP, toxicCounter, hasSitrus, hasFigy, figyDiv, gluttony, ripen);
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

    if (hasSitrus && move.name !== 'Knock Off') {
        if (ripen == 2) eotText.push('Ripen Sitrus Berry recovery');
        else eotText.push('Sitrus Berry recovery');
    }

    if (hasFigy && move.name !== 'Knock Off') {
        if (gluttony) eotText.push('Gluttony pinch berry recovery');
        else if (ripen == 2) eotText.push('Ripen pinch berry recovery');
        else eotText.push('pinch berry recovery');
    }

    c = getKOChance(damage, multihit, defender.curHP - hazards + eot, eot, 1, defender.maxHP, toxicCounter, hasSitrus, hasFigy, figyDiv, gluttony, ripen);
    afterText = hazardText.length > 0 || eotText.length > 0 ? ' after ' + serializeText(hazardText.concat(eotText)) : '';
    if (c === 1) {
        return 'guaranteed OHKO' + afterText;
    } else if (c > 0) {
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
        c = getKOChance(damage, multihit, defender.curHP - hazards, eot, i, defender.maxHP, toxicCounter, hasSitrus, hasFigy, figyDiv, gluttony, ripen);
        if (c === 1) {
            return 'guaranteed ' + i + 'HKO' + afterText;
        } else if (c > 0) {
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
        if (predictTotal(damageNums[0], eot, i, toxicCounter, defender.curHP - hazards, defender.maxHP, hasSitrus, hasFigy, figyDiv, gluttony, ripen) >= defender.curHP - hazards) {
            return 'guaranteed ' + i + 'HKO' + afterText;
        } else if (predictTotal(damageNums[damageNums.length-1], eot, i, toxicCounter, defender.curHP - hazards, defender.maxHP, hasSitrus, hasFigy, figyDiv, gluttony, ripen) >= defender.curHP - hazards) {
            return 'possible ' + i + 'HKO' + afterText;
        }
    }

    return 'possibly the worst move ever';
}

function damageArrToDict(damageArr, hits) {
    var pivotSpread = {}, addedSpread = {}, tempSpread = {}, totalSpread = {};
    var tempKey = 0, is2dArr = Array.isArray(damageArr[0]), damageArrL = damageArr.length;
    var divisor = Math.pow(16, hits);
    if (!is2dArr) {
        pivotSpread = arrayToInstanceDict(damageArr);
        addedSpread = pivotSpread;
    }
    else {
        pivotSpread = arrayToInstanceDict(damageArr[1]);
        addedSpread = arrayToInstanceDict(damageArr[0]);
    }
    for (var i = 0; i < hits - 1; i++) {
        if (is2dArr && i != 0) {
            //this if-else statement assumes that, if the number of 2D arrays is less than the number of hits, all of the remaining hits use the last array calculated
            if (damageArrL - 1 >= i + 1)
                pivotSpread = arrayToInstanceDict(damageArr[i + 1]);
            else
                pivotSpread = arrayToInstanceDict(damageArr[damageArrL - 1]);
        }
        for (pivotNum in pivotSpread) {
            for (addedNum in addedSpread) {
                tempKey = parseInt(pivotNum) + parseInt(addedNum);
                if (tempKey in tempSpread)
                    tempSpread[tempKey] = tempSpread[tempKey] + (pivotSpread[pivotNum] * addedSpread[addedNum]);
                else
                    tempSpread[tempKey] = pivotSpread[pivotNum] * addedSpread[addedNum];
            }
        }
        addedSpread = sortByKeys(tempSpread);
        tempSpread = {};
    }
    for (finalNum in addedSpread) {
        totalSpread[finalNum] = addedSpread[finalNum] / divisor;
    }
    return totalSpread;
}

function arrayToInstanceDict(arr) {
    var returnArr = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] in returnArr)
            returnArr[arr[i]] = returnArr[arr[i]] + 1;
        else
            returnArr[arr[i]] = 1;
    }
    return returnArr;
}

function sortByKeys(dict) {
    var sorted = [], tempDict = {};

    for (key in dict)
        sorted[sorted.length] = key;
    sorted.sort(numericSort);

    for (var i = 0; i < sorted.length; i++)
        tempDict[sorted[i]] = dict[sorted[i]];

    return tempDict;
}

//Note: hits !== move.hits, hits refers to the number of times an attack is used in a row
function getKOChance(damage, multihit, hp, eot, hits, maxHP, toxicCounter, hasSitrus, hasFigy, figyDiv, gluttony, ripen) {
    var damageKeys = Object.keys(damage);
    var minDamage = parseInt(damageKeys[0]);
    var maxDamage = parseInt(damageKeys[damageKeys.length - 1]);
    if (hits === 1) {
        if ((!multihit || !hasSitrus) && maxDamage < hp) {
            return 0;
        } else if (multihit && hasSitrus && maxDamage < hp + Math.floor(ripen * maxHP / 4)) {
            return 0;
        } else if (multihit && hasFigy && maxDamage < hp + Math.floor(ripen * maxHP / figyDiv)) {
            return 0;
        }

        var returnChance = 1;
        for (damageNum in damage) {
            damageNum = parseInt(damageNum);
            if ((!multihit || (!hasSitrus && !hasFigy)) && damageNum >= hp) {
                return returnChance;
            } else if (multihit && hasSitrus && damageNum >= hp + Math.floor(ripen * maxHP / 4)) {
                return returnChance;
            } else if (multihit && hasFigy && damageNum >= hp + Math.floor(ripen * maxHP / figyDiv)) {
                return returnChance;
            }
            returnChance -= damage[damageNum];
        }
    }
    var sum = verifyKOChance(damage, hp, eot, hits, maxHP, toxicCounter, hasSitrus, hasFigy, figyDiv, gluttony, ripen);
    return sum;
}

function verifyKOChance(damage, targetHP, eot, hits, maxHP, toxicCounter, hasSitrus, hasFigy, figyDiv, gluttony, ripen) {
    var pivotSpread = {}, addedSpread = {}, tempSpread = {}, totalSpread = {};
    var tempKey = 0, finalNum = 0;
    pivotSpread = damage;
    addedSpread = pivotSpread;
    toxicCounter++;
    for (var i = 0; i < hits - 1; i++) {
        for (pivotNum in pivotSpread) {
            for (addedNum in addedSpread) {
                tempKey = parseInt(pivotNum) + parseInt(addedNum) - eot;
                if (toxicCounter > 1) {
                    tempKey += Math.floor(toxicCounter * maxHP / 16);
                    if (i == 0)
                        tempKey += Math.floor((toxicCounter - 1) * maxHP / 16);
                    toxicCounter++;
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
    for (spreadNum in addedSpread) {
        finalNum = parseInt(spreadNum);
        if (hits > 1) {
            if (hasSitrus && (finalNum <= maxHP / 2)) {
                finalNum -= Math.floor(ripen * maxHP / 4);
            }
            else if (hasFigy && (finalNum <= maxHP / (gen >= 7 && !gluttony ? 4 : 2))) {
                finalNum -= Math.floor(ripen * maxHP / figyDiv);
            }
        }
        totalSpread[finalNum] = addedSpread[spreadNum];
    }
    var returnSum = 0, probabilitySum = 0;
    for (finalNum in totalSpread) {
        if (finalNum >= targetHP)
            returnSum += totalSpread[finalNum];
        probabilitySum += totalSpread[finalNum];
    }
    if (returnSum === probabilitySum)
        returnSum = 1;
    return returnSum;
}

function predictTotal(damage, eot, hits, toxicCounter, hp, maxHP, hasSitrus, hasFigy, figyDiv, gluttony, ripen) {
    var total = 0;
    for (var i = 0; i < hits; i++) {
        total += damage;
        if ((hp - total <= maxHP / 2) && hasSitrus) {
            total -= Math.floor(ripen * maxHP / 4);
            hasSitrus = false;
        }
        else if ((hp - total <= maxHP / (gen >= 7 && !gluttony ? 4 : 2)) && hasFigy) {
            hp += Math.floor(ripen * maxHP / figyDiv);
            hasFigy = false;
        }
        if (i < hits - 1) {
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



//squashMultihit should be obsolete, but the code will stay in case something goes wrong with the new implementation and it needs to have something to fall back on
function squashMultihit(d, hits) {
    if (d.length === 1) {
        return [d[0] * hits];
    } else if (gen === 1) {
        var r = [];
        for (var i = 0; i < d.length; i++) {
            r[i] = d[i] * hits;
        }
        return r;
    } else if (d.length === 16) {
        switch (hits) {
            case 2:
                return [
                    2*d[0], d[2]+d[3], d[4]+d[4], d[4]+d[5],
                    d[5]+d[6], d[6]+d[6], d[6]+d[7], d[7]+d[7],
                    d[8]+d[8], d[8]+d[9], d[9]+d[9], d[9]+d[10],
                    d[10]+d[11], d[11]+d[11], d[12]+d[13], 2*d[15]
                ];
            case 3:
                return [
                    3*d[0], d[3]+d[3]+d[4], d[4]+d[4]+d[5], d[5]+d[5]+d[6],
                    d[5]+d[6]+d[6], d[6]+d[6]+d[7], d[6]+d[7]+d[7], d[7]+d[7]+d[8],
                    d[7]+d[8]+d[8], d[8]+d[8]+d[9], d[8]+d[9]+d[9], d[9]+d[9]+d[10],
                    d[9]+d[10]+d[10], d[10]+d[11]+d[11], d[11]+d[12]+d[12], 3*d[15]
                ];
            case 4:
                return [
                    4*d[0], 4*d[4], d[4]+d[5]+d[5]+d[5], d[5]+d[5]+d[6]+d[6],
                    4*d[6], d[6]+d[6]+d[7]+d[7], 4*d[7], d[7]+d[7]+d[7]+d[8],
                    d[7]+d[8]+d[8]+d[8], 4*d[8], d[8]+d[8]+d[9]+d[9], 4*d[9],
                    d[9]+d[9]+d[10]+d[10], d[10]+d[10]+d[10]+d[11], 4*d[11], 4*d[15]
                ];
            case 5:
                return [
                    5*d[0], d[4]+d[4]+d[4]+d[5]+d[5], d[5]+d[5]+d[5]+d[5]+d[6], d[5]+d[6]+d[6]+d[6]+d[6],
                    d[6]+d[6]+d[6]+d[6]+d[7], d[6]+d[6]+d[7]+d[7]+d[7], 5*d[7], d[7]+d[7]+d[7]+d[8]+d[8],
                    d[7]+d[7]+d[8]+d[8]+d[8], 5*d[8], d[8]+d[8]+d[8]+d[9]+d[9], d[8]+d[9]+d[9]+d[9]+d[9],
                    d[9]+d[9]+d[9]+d[9]+d[10], d[9]+d[10]+d[10]+d[10]+d[10], d[10]+d[10]+d[11]+d[11]+d[11], 5*d[15]
                ];
            case 6:       //PAY ATTENTION TO WHAT SMOGON DOES, THEY MIGHT HANDLE THIS DIFFERENTLY
                return [
                    6*d[0], 2*d[4]+4*d[5], 3*d[5]+3*d[6], 6*d[6],
                    3*d[6]+3*d[7], 6*d[7], 5*d[7]+d[8], 4*d[7]+2*d[8], 
                    2*d[7]+4*d[8], d[7]+5*d[8], 6*d[8], 3*d[8]+3*d[9],
                    6*d[9],3*d[9]+3*d[10], 4*d[10]+2*d[11], 6*d[15]
                ];
            case 7:
                return [
                    7*d[0], 5*d[5]+2*d[6], 2*d[5]+5*d[6], 5*d[6]+2*d[7],
                    3*d[6]+4*d[7], 7*d[7], 5*d[7]+2*d[8], 4*d[7]+3*d[8],
                    3*d[7]+4*d[8], 2*d[7]+5*d[8], 7*d[8], 4*d[8]+3*d[9],
                    5*d[9]+2*d[10], 5*d[10]+2*d[11], 2*d[10]+5*d[11], 7*d[15]
                ];
            case 8:
                return [
                    8*d[0], 4*d[5]+4*d[6], 8*d[6], 4*d[6]+4*d[7], 
                    8*d[7], 7*d[7]+d[8], 6*d[7]+2*d[8], 5*d[7]+3*d[8],
                    3*d[7]+5*d[8], 2*d[7]+6*d[8], d[7]+7*d[8], 8*d[8], 
                    4*d[8]+4*d[9], 8*d[9], 4*d[9]+4*d[10], 8*d[15]
                ];
            case 9:
                return [
                    9*d[0], 2*d[5]+7*d[6], 7*d[6]+2*d[7], 4*d[6]+5*d[7], 
                    9*d[7], 7*d[7]+2*d[8], 6*d[7]+3*d[8], 5*d[7]+4*d[8],
                    4*d[7]+5*d[8], 3*d[7]+6*d[8], 2*d[7]+7*d[8], 9*d[8], 
                    5*d[8]+4*d[9], 7*d[9]+2*d[10], 7*d[10]+2*d[11], 9*d[15]
                ];
            case 10:
                return [
                    10*d[0], 10*d[6], 5*d[6]+5*d[7], 10*d[7], 
                    9*d[7]+d[8], 8*d[7]+2*d[8], 7*d[7]+3*d[8], 6*d[7]+4*d[8],
                    4*d[7]+6*d[8], 3*d[7]+7*d[8], 2*d[7]+8*d[8], d[7]+9*d[8], 
                    10*d[8],  5*d[8]+5*d[9], 10*d[9], 10*d[15]
                ];
            default:
                console.log("Unexpected # of hits: " + hits);
                return d;
        }
    } else if (d.length === 39) {
        switch (hits) {
            case 2:
                return [
                    2*d[0], 2*d[7], 2*d[10], 2*d[12],
                    2*d[14], d[15]+d[16], 2*d[17], d[18]+d[19],
                    d[19]+d[20], 2*d[21], d[22]+d[23], 2*d[24],
                    2*d[26], 2*d[28], 2*d[31], 2*d[38]
                ];
            case 3:
                return [
                    3*d[0], 3*d[9], 3*d[12], 3*d[13],
                    3*d[15], 3*d[16], 3*d[17], 3*d[18],
                    3*d[20], 3*d[21], 3*d[22], 3*d[23],
                    3*d[25], 3*d[26], 3*d[29], 3*d[38]
                ];
            case 4:
                return [
                    4*d[0], 2*d[10]+2*d[11], 4*d[13], 4*d[14],
                    2*d[15]+2*d[16], 2*d[16]+2*d[17], 2*d[17]+2*d[18], 2*d[18]+2*d[19],
                    2*d[19]+2*d[20], 2*d[20]+2*d[21], 2*d[21]+2*d[22], 2*d[22]+2*d[23],
                    4*d[24], 4*d[25], 2*d[27]+2*d[28], 4*d[38]
                ];
            case 5:
                return [
                    5*d[0], 5*d[11], 5*d[13], 5*d[15],
                    5*d[16], 5*d[17], 5*d[18], 5*d[19],
                    5*d[19], 5*d[20], 5*d[21], 5*d[22],
                    5*d[23], 5*d[25], 5*d[27], 5*d[38]
                ];
            default:
                console.log("Unexpected # of hits: " + hits);
                return d;
        }
    } else {
        console.log("Unexpected # of possible damage values: " + d.length);
        return d;
    }
}
