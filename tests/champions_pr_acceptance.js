const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const repo = path.resolve(__dirname, '..');

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function cloneValue(value) {
    if (Array.isArray(value)) return value.map(cloneValue);
    if (!isPlainObject(value)) return value;
    const result = {};
    for (const [key, child] of Object.entries(value)) result[key] = cloneValue(child);
    return result;
}

function deepExtend(...args) {
    let deep = false;
    if (args[0] === true) {
        deep = true;
        args.shift();
    }
    const target = args.shift() || {};
    for (const source of args) {
        if (source == null) continue;
        for (const [key, value] of Object.entries(source)) {
            if (deep && isPlainObject(value)) {
                target[key] = deepExtend(true, isPlainObject(target[key]) ? target[key] : {}, value);
            }
            else if (deep) {
                target[key] = cloneValue(value);
            }
            else {
                target[key] = value;
            }
        }
    }
    return target;
}

const context = vm.createContext({
    console: { log() {}, warn() {}, error() {} },
    Math,
    JSON,
    gen: 10,
    move: { makesContact: false },
    $: { extend: deepExtend },
});

function load(relativePath) {
    const source = fs.readFileSync(path.join(repo, relativePath), 'utf8');
    vm.runInContext(source, context, { filename: relativePath });
    return source;
}

load('script_res/pokedex.js');
const moveDataSource = load('script_res/move_data.js');
load('script_res/ability_data.js');
load('script_res/item_data.js');
load('script_res/damage_MASTER.js');
load('script_res/ko_chance.js');

function protect(attacker, move) {
    return context.setIsQuarteredByProtect(
        { isDynamax: false, ...attacker },
        {},
        { isProtect: true },
        { isZ: false, isSignatureZ: false, ...move },
        {},
    );
}

assert.equal(protect({ ability: 'Unseen Fist' }, { name: 'Close Combat', makesContact: true }), true);
assert.equal(protect({ ability: 'Unseen Fist' }, { name: 'Dark Pulse', makesContact: false }), false);

for (const attacker of [
    { ability: 'Unseen Fist', item: 'Protective Pads' },
    { ability: 'Unseen Fist', item: 'Punching Glove' },
    { ability: 'Long Reach', item: '' },
]) {
    const move = { name: 'Drain Punch', makesContact: true, isPunch: true };
    context.checkContactOverride(move, attacker);
    assert.equal(move.makesContact, false);
    assert.equal(protect(attacker, move), false);
}

assert.equal(protect({ ability: 'Piercing Drill' }, { name: 'Dark Pulse', makesContact: false }), true);
assert.equal(protect({ ability: '' }, { name: 'Hydro Vortex', makesContact: false, isZ: true }), true);
assert.equal(protect({ ability: '', isDynamax: true }, { name: 'Max Geyser', makesContact: false }), true);

assert.ok(context.POKEDEX_CHAMPIONS.Grapploct);
assert.equal(Object.values(context.POKEDEX_CHAMPIONS).includes(undefined), false);
assert.deepEqual(
    [context.POKEDEX_CHAMPIONS['Mega Chandelure'].t1, context.POKEDEX_CHAMPIONS['Mega Chandelure'].t2],
    ['Ghost', 'Fire'],
);

assert.equal(context.MOVES_CHAMPIONS.Overdrive, context.MOVES_CHAMPIONS_NATDEX.Overdrive);
assert.equal(context.MOVES_CHAMPIONS['Spit Up'], context.MOVES_CHAMPIONS_NATDEX['Spit Up']);
assert.equal(context.MOVES_CHAMPIONS.Pound.bp, 40);
assert.equal(context.MOVES_CHAMPIONS.Octazooka, undefined);
assert.equal(context.MOVES_CHAMPIONS['Eerie Spell'].isSound, true);
assert.equal(Object.keys(context.MOVES_CHAMPIONS).length, 513);
assert.equal(context.ABILITIES_CHAMPIONS.length, new Set(context.ABILITIES_CHAMPIONS).size);
assert.equal((moveDataSource.match(/'Snipe Shot': \{ bp: 85 \}/g) || []).length, 1);

const spitUp = context.MOVES_CHAMPIONS['Spit Up'];
assert.equal(spitUp.stockpileBP, true);
assert.equal(spitUp.bp, 1);
for (const [stockpiles, expectedBP] of [[0, 0], [1, 100], [2, 200], [3, 300]]) {
    const move = { name: 'Spit Up', bp: spitUp.bp, stockpiles };
    const [actualBP] = context.basePowerFunc(move, {}, '', {}, {}, {}, false, false, '');
    assert.equal(actualBP, expectedBP);

    const fixedDamage = context.setDamage(move, { ability: '' }, {}, {}, false, {});
    if (stockpiles === 0) assert.equal(fixedDamage.damage[0], 0);
    else assert.equal(fixedDamage, -1);
}

const eerieSpell = context.MOVES_CHAMPIONS['Eerie Spell'];
const soundproofResult = context.immunityChecks(
    eerieSpell,
    {},
    {},
    {},
    { attackerName: '', moveName: 'Eerie Spell', defenderName: '' },
    'Soundproof',
    1,
);
assert.deepEqual(Array.from(soundproofResult.damage), [0]);

const [punkRockMods] = context.calcFinalMods(
    eerieSpell,
    { ability: '', item: '', hasCustomModifiers: false },
    { isDynamax: false, curHP: 1, maxHP: 1, item: '' },
    { format: 'Singles', isFriendGuard: false },
    {},
    false,
    1,
    'Punk Rock',
);
assert.deepEqual(Array.from(punkRockMods), [0x800]);

function saltCure(types) {
    const defender = {
        maxHP: 160,
        ability: '',
        status: 'Healthy',
        item: '',
        hasType(...wanted) { return wanted.some(type => types.includes(type)); },
    };
    const field = {
        isSaltCure: true,
        weather: '',
        terrain: '',
        isGMaxField: false,
        isAquaRing: false,
        isIngrain: false,
        isLeechSeed: false,
        isNightmare: false,
        isCurse: false,
        isBinding: false,
    };
    return context.getAllEndOfTurnEffects(defender, field, false, false, false).saltCure.val;
}

assert.equal(saltCure(['Normal']), -10);
assert.equal(saltCure(['Water']), -20);
assert.equal(saltCure(['Steel']), -20);

for (const filename of ['index.html', 'za-calc.html']) {
    const html = fs.readFileSync(path.join(repo, filename), 'utf8');
    assert.equal((html.match(/class="move-stockpiles calc-trigger hide"/g) || []).length, 8);
}

process.stdout.write('Champions PR acceptance checks passed.\n');
