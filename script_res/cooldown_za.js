function getMoveCooldown(attacker, move) {
    let moveCooldown = move.plusEffects && move.plusEffects.cooldown && move.isPlusMove ? move.plusEffects.cooldown : move.cooldown;
    let speedUsed = attacker.rawStats[SP] > 25 ? attacker.rawStats[SP] : 25;
    let isDrowsy = attacker.status == "Drowsy";
    let speedPower = attacker.speedPower ? attacker.speedPower : 1;
    let drowsyMod = isDrowsy ? 2 : 1;
    let calculatedCooldown = Math.max(3, Math.fround(Math.fround((Math.floor(speedUsed * speedPower) - 25) / -100) * 3) + moveCooldown);
    let cooldownFrames = Math.ceil(calculatedCooldown / Math.fround(1 / (30 * drowsyMod)));
    let cooldownTime = Math.round(100 * cooldownFrames / 30) / 100;

    return getCooldownText(isDrowsy, speedPower, cooldownFrames, cooldownTime, move.name);
}

function getCooldownText(isDrowsy, speedPower, cooldownFrames, cooldownTime, moveName) {
    if (moveName == '(No Move)') {
        return 'Cooldown not applicable.';
    }

    let cooldownStr = 'Cooldown time for ' + moveName;
    if (isDrowsy) {
        cooldownStr += ' with Drowsy status';
    }
    if (speedPower != 1) {
        if (isDrowsy) {
            cooldownStr += ' and';
        }
        else {
            cooldownStr += ' with';
        }
        cooldownStr += ' Speed Power Lv. ' + (speedPower == 1.1 ? '1' : speedPower == 1.25 ? '2' : speedPower == 1.5 ? '3' : '???');
    }
    cooldownStr += ": " + cooldownTime + " seconds (" + cooldownFrames + " frames)";
    return cooldownStr;
}