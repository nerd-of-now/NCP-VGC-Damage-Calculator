var showdownToCalcFormes = {
    "Pumpkaboo": "Pumpkaboo-Average",
    "Gourgeist": "Gourgeist-Average",
    "Groudon-Primal": "Groudon",
    "Kyogre-Primal": "Kyogre",
    "Zygarde-10": "Zygarde-10%",
    "Zygarde-Complete": "Zygarde",
    "Lycanroc": "Lycanroc-Midday",
    "Urshifu": "Urshifu-Single Strike",
    "Urshifu-Rapid-Strike": "Urshifu-Rapid Strike",
    "Calyrex-Ice": "Calyrex-Ice Rider",
    "Calyrex-Shadow": "Calyrex-Shadow Rider",
    "Pikachu-Rock-Star": "Pikachu",
    "Pikachu-Belle": "Pikachu",
    "Pikachu-Pop-Star": "Pikachu",
    "Pikachu-PhD": "Pikachu",
    "Pikachu-Libre": "Pikachu",
    "Shellos-East": "Shellos",
    "Gastrodon-East": "Gastrodon",
    "Basculin-Blue-Striped": "Basculin",
    "Deerling-Summer": "Deerling",
    "Deerling-Autumn": "Deerling",
    "Deerling-Winter": "Deerling",
    "Sawsbuck-Summer": "Sawsbuck",
    "Sawsbuck-Autumn": "Sawsbuck",
    "Sawsbuck-Winter": "Sawsbuck",
    "Keldeo-Resolute": "Keldeo",
    "Genesect-Burn": "Genesect",
    "Genesect-Chill": "Genesect",
    "Genesect-Douse": "Genesect",
    "Genesect-Shock": "Genesect",
    "Oricorio": "Oricorio-Baile",
    "Magearna-Original": "Magearna",
    "Toxtricity-Low-Key": "Toxtricity",
    "Sinistea-Antique": "Sinistea",
    "Polteageist-Antique": "Polteageist",
    "Zarude-Dada": "Zarude",
    "Tatsugiri-Droopy": "Tatsugiri",
    "Tatsugiri-Stretchy": "Tatsugiri",
    "Poltchageist-Artisan": "Poltchageist",
    'Sinistcha-Masterpiece': 'Sinistcha',
    'Terapagos-Terastal': 'Terapagos',
    'Terapagos-Stellar': 'Terapagos',
};

var calcToShowdownFormes = {
    //"Shellos": "Shellos-East",
    //"Gastrodon": "Gastrodon-East",
    "Pumpkaboo-Average": "Pumpkaboo",
    "Gourgeist-Average": "Gourgeist",
    "Zygarde-10%": "Zygarde-10",
    "Oricorio-Baile": "Oricorio",
    "Lycanroc-Midday": "Lycanroc",
    "Urshifu-Single Strike": "Urshifu",
    "Urshifu-Rapid Strike": "Urshifu-Rapid-Strike",
    "Calyrex-Ice Rider": "Calyrex-Ice",
    "Calyrex-Shadow Rider": "Calyrex-Shadow",
    "Palafin": "Palafin-Hero",
    "Terapagos":"Terapagos-Terastal",
};

//For importing Hidden Power sets since for some reason Showdown neither explicitly puts IVs in the import that matches their default NOR uses an algorithm for said defaults
var defaultHiddenPowerSD = {
    "Fighting": { "ivs": [31, 31, 30, 30, 30, 30], "dvs": [-1, 12, 12, -1, -1, -1] },
    "Flying": { "ivs": [30, 30, 30, 30, 30, 31], "dvs": [-1, 12, 13, -1, -1, -1] },
    "Poison": { "ivs": [31, 31, 30, 30, 30, 31], "dvs": [-1, 12, 14, -1, -1, -1] },
    "Ground": { "ivs": [31, 31, 31, 30, 30, 31], "dvs": [-1, 12, -1, -1, -1, -1] },
    "Rock": { "ivs": [31, 31, 30, 31, 30, 30], "dvs": [-1, 13, 12, -1, -1, -1] },
    "Bug": { "ivs": [31, 30, 30, 31, 30, 31], "dvs": [-1, 13, 13, -1, -1, -1] },
    "Ghost": { "ivs": [31, 31, 30, 31, 30, 31], "dvs": [-1, 13, 14, -1, -1, -1] },
    "Steel": { "ivs": [31, 31, 31, 31, 30, 31], "dvs": [-1, 13, -1, -1, -1, -1] },
    "Fire": { "ivs": [31, 30, 31, 30, 31, 30], "dvs": [-1, 14, 12, -1, -1, -1] },
    "Water": { "ivs": [31, 30, 30, 30, 31, 31], "dvs": [-1, 14, 13, -1, -1, -1] },
    "Grass": { "ivs": [31, 30, 31, 30, 31, 31], "dvs": [-1, 14, 14, -1, -1, -1] },
    "Electric": { "ivs": [31, 31, 31, 30, 31, 31], "dvs": [-1, 14, -1, -1, -1, -1] },
    "Psychic": { "ivs": [31, 30, 31, 31, 31, 30], "dvs": [-1, -1, 12, -1, -1, -1] },
    "Ice": { "ivs": [31, 30, 30, 31, 31, 31], "dvs": [-1, -1, 13, -1, -1, -1] },
    "Dragon": { "ivs": [31, 30, 31, 31, 31, 31], "dvs": [-1, -1, 14, -1, -1, -1] },
    "Dark": { "ivs": [31, 31, 31, 31, 31, 31], "dvs": [-1, -1, -1, -1, -1, -1] },
};

function verifyHiddenPowerType(hpName, ivs) {
    return calcHiddenPower(ivs).type == hpName.substring(hpName.lastIndexOf(" ") + 1, hpName.length);
}

//The IV ordering is: HP, Attack, Defense, Speed, Special Attack, Special Defense
function calcHiddenPower(ivs) {
    var typeOrder = ['Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'];
    var typeIndex = Math.floor(((ivs[0] & 1) + (ivs[1] & 1) * 2 + (ivs[2] & 1) * 4 + (ivs[5] & 1) * 8 + (ivs[3] & 1) * 16 + (ivs[4] & 1) * 32) * 15 / 63);
    var basePower = gen >= 6 ? 60 : Math.floor((secondLeastSigBit(ivs[0]) + (secondLeastSigBit(ivs[1]) * 2) + (secondLeastSigBit(ivs[2]) * 4) + (secondLeastSigBit(ivs[5]) * 8) + (secondLeastSigBit(ivs[3]) * 16) + (secondLeastSigBit(ivs[4]) * 32)) * 40 / 63) + 30;

    return { type: typeOrder[typeIndex], bp: basePower};
}

//For games that standard competitive is played on
for (var i = 1; i <= 9; i++) {
    if (localStorage["custom_gen_" + i] != null)
        ALL_SETDEX_CUSTOM[i] = JSON.parse(localStorage["custom_gen_" + i]);
    else
        ALL_SETDEX_CUSTOM[i] = {};
}

//For Legends Z-A, Let's Go Pikachu/Eevee (and potenitally other games)
for (var i = 7.5; i <= 9.5; i += 2) {
    if (localStorage["custom_gen_" + i] != null)
        ALL_SETDEX_CUSTOM[i] = JSON.parse(localStorage["custom_gen_" + i]);
    else
        ALL_SETDEX_CUSTOM[i] = {};
}

var deletecustom = function () {
    if (confirm("Warning: ALL custom sets from this generation will be deleted, including sidebar teams. This cannot be undone. Proceed?")) {
        gen = parseInt($('input[name="gen"]:checked').val());
        removeSidebarTeam(1);
        removeSidebarTeam(2);
        localStorage.removeItem("custom_gen_" + gen);
        ALL_SETDEX_CUSTOM[gen] = {};
        loadSetdexScript();
        alert("Custom set deletion successful.");
    }
}

function saveSets(gen, customFormat, species, spreadName) {
    if (ALL_SETDEX_CUSTOM[gen][species] == null)
        ALL_SETDEX_CUSTOM[gen][species] = {};
    ALL_SETDEX_CUSTOM[gen][species][spreadName] = customFormat;
    localStorage['custom_gen_' + gen] = JSON.stringify(ALL_SETDEX_CUSTOM[gen]);
}

function handleAjax(strURL){
    return $.ajax({
        type: 'GET',
        url: strURL
    });
}

var savecustom = function (sidebarUsed = 0) {
    //first, to parse it all from the PS format
    var string = document.getElementById('customMon').value;
    var spreadName = document.getElementById('spreadName').value;
    if (spreadName == '')
        spreadName = "My Custom Set";
    if (string.trim() == "https://pokepast.es/a78c282608ad27df") {
        alert("Did you just try to stickbug the Damage Calc? lol");
        document.getElementById("customMon").value = "";
    }
    else if (string.trim().indexOf('https://pokepast.es/') === 0) {
        handleAjax(string.trim() + '/json')
            .done(function (data) {
                var setGen = gen;
                console.log(data);
                if (data['title'].length && spreadName == 'My Custom Set')
                    spreadName = data['title'];
                if (data['notes'].length && data['notes'].indexOf("Format: gen") == 0 && !isNaN(1 * data['notes'][11])) {
                    if (isNaN(1 * data['notes'][12]))   //check for double digits
                        setGen = 1 * data['notes'][11];
                    else    //if this code is somehow still used when we reach gen 100 then y'all in the future can code it yourselves lol
                        setGen = 1 * (data['notes'][11] + data['notes'][12]);
                }
                string = data['paste'];
                string = string.replaceAll('\r', '');
                processSave(string, spreadName, sidebarUsed, setGen);
            })
            .fail(function () {
                alert("PokePaste link is invalid.");
            });
    }
    else
        processSave(string, spreadName, sidebarUsed);
};

function processSave(string, spreadName, sidebarUsed, setGen = gen) {
    if (string == "") {
        alert("Paste is empty.");
        return;
    }
    var sidebarCleared = false;
    //numPokemon separates individual Pokemon so user can add multiple Pokemon at once under the same set name
    var numPokemon = string.split('\n\n');
    numPokemon = numPokemon.filter(element => element);

    try {
        for (var a = 0; a < numPokemon.length; a++) {
            var lines = numPokemon[a].split('\n');
            var species = "";
            var item = "";
            var ability = "";
            var level = 50;
            var EVs = [0, 0, 0, 0, 0, 0];
            var IVs = [31, 31, 31, 31, 31, 31];
            var nature = "Serious";
            var moves = [];
            var gmax_factor = false;

            /*	Pokemon Showdown Export Format
        0	Nickname (Species) @ Item
        1	Ability: Name
        2	Level: #
        3	Tera Type: #
        4	EVs: # Stat / # Stat / # Stat
        5	Serious Nature
        6	IVs: # Stat
        7	- Move Name
        8	- Move Name
        9	- Move Name
        10	- Move Name
            */

            //The calc won't save gender until there's a new viable, calc-relevant thing in the games. Or Rivalry has a niche again
            if (lines[0].indexOf('(M)') != -1) {
                lines[0] = lines[0].substring(0, lines[0].indexOf('(M)') - 1) +
                    lines[0].substring(lines[0].indexOf('(M)') + 3, lines[0].length);
            }
            else if (lines[0].indexOf('(F)') != -1) {
                lines[0] = lines[0].substring(0, lines[0].indexOf('(F)')) +
                    lines[0].substring(lines[0].indexOf('(F)') + 3, lines[0].length);
            }
            if (lines[0].indexOf('(') != -1) {
                firstParenth = lines[0].lastIndexOf('(');
                lastParenth = lines[0].lastIndexOf(')');
                species = lines[0].substring(firstParenth + 1, lastParenth).trim();
            }
            else
                species = lines[0].split('@')[0].trim(); //species is always first

            checkGmax = species.indexOf("-Gmax", 0);
            checkMega = species.indexOf("-Mega", 0);
            checkPrimal = species.indexOf("-Primal", 0);
            if (checkGmax != -1) {
                species = species.substring(0, checkGmax);
                gmax_factor = true;
            }
            if (checkMega != -1) {
                if (species == "Floette-Mega") {
                    species = "Floette-Eternal";
                }
                else {
                    species = species.substring(0, checkMega);
                }
            }
            if (checkPrimal != -1)
                species = species.substring(0, checkPrimal);
            if (species in showdownToCalcFormes) {
                species = showdownToCalcFormes[species];
            }

            var tera_type = setGen == 9 ? POKEDEX_SV_NATDEX[species].t1 : '';

            if (lines[0].indexOf('@') != -1)
                item = lines[0].substring(lines[0].indexOf('@') + 1).trim(); //item is always after @
            ability = lines[1].substring(lines[1].indexOf(' ') + 1).trim(); //ability is always second
            if (ability.indexOf('As One (') != -1)
                ability = 'As One';
            if (lines.length > 2) {
                for (var i = 2; i < lines.length; ++i) {
                    if (lines[i].indexOf("Level") != -1) {
                        level = parseInt(lines[2].split(' ')[1].trim()); //level is sometimes third but uh not always
                    }
                    if (lines[i].indexOf("Tera Type") != -1) {
                        tera_type = lines[i].split(' ')[2].trim(); //
                    }
                    if (lines[i].includes("Gigantamax: Yes")) {
                        gmax_factor = true;
                    }
                    if (lines[i].indexOf("EVs") != -1) //if EVs are in this line
                    {
                        evList = lines[i].split(':')[1].split('/'); //splitting it into a list of " # Stat "
                        for (var j = 0; j < evList.length; ++j) {
                            evList[j] = evList[j].trim();
                            evListElements = evList[j].split(' ');
                            if (evListElements[1] == "HP")
                                EVs[0] = parseInt(evListElements[0])
                            else if (evListElements[1] == "Atk")
                                EVs[1] = parseInt(evListElements[0])
                            else if (evListElements[1] == "Def")
                                EVs[2] = parseInt(evListElements[0])
                            else if (evListElements[1] == "SpA")
                                EVs[3] = parseInt(evListElements[0])
                            else if (evListElements[1] == "SpD")
                                EVs[4] = parseInt(evListElements[0])
                            else if (evListElements[1] == "Spe")
                                EVs[5] = parseInt(evListElements[0])
                        }

                    }
                    if (lines[i].indexOf("IVs") != -1) //if EVs are in this line
                    {
                        ivList = lines[i].split(':')[1].split('/'); //splitting it into a list of " # Stat "
                        for (var j = 0; j < ivList.length; ++j) {
                            ivList[j] = ivList[j].trim();
                            ivListElements = ivList[j].split(' ');
                            if (ivListElements[1] == "HP")
                                IVs[0] = parseInt(ivListElements[0])
                            else if (ivListElements[1] == "Atk")
                                IVs[1] = parseInt(ivListElements[0])
                            else if (ivListElements[1] == "Def")
                                IVs[2] = parseInt(ivListElements[0])
                            else if (ivListElements[1] == "SpA")
                                IVs[3] = parseInt(ivListElements[0])
                            else if (ivListElements[1] == "SpD")
                                IVs[4] = parseInt(ivListElements[0])
                            else if (ivListElements[1] == "Spe")
                                IVs[5] = parseInt(ivListElements[0])
                        }

                    }
                    if (lines[i].indexOf("Nature") != -1) //if nature is in this line
                    {
                        nature = lines[i].split(' ')[0].trim()
                    }
                    if (lines[i].indexOf("- ") != -1) { //if there is a move in this line
                        var nextMove = lines[i].substring(lines[i].indexOf(' ') + 1).trim()
                        nextMove = nextMove.replace('[', '')
                        nextMove = nextMove.replace(']', '')
                        if (nextMove.indexOf("Hidden Power") !== -1) {
                            if (nextMove == "Hidden Power") {
                                nextMove = "Hidden Power " + calcHiddenPower(IVs);
                            }
                            else if (nextMove.indexOf("Hidden Power ") !== -1 && gen <= 6 && !verifyHiddenPowerType(nextMove, IVs)) {
                                var typeHidden = nextMove.substring(nextMove.lastIndexOf(" ") + 1, nextMove.length);
                                for (var j = 0; j < defaultHiddenPowerSD[typeHidden]['ivs'].length; j++) {
                                    IVs[j] = defaultHiddenPowerSD[typeHidden]['ivs'][j];
                                }
                            }
                        }
                        moves.push(nextMove)
                    }

                }
            }

            //now, to save it
            /* Sample Calculator Format:
          "Yanmega": {
            "Common Showdown": {
              "level": 50,
              "evs": {
                "hp": 0,
                "at": 0,
                "df": 0,
                "sa": 252,
                "sd": 4,
                "sp": 252
              },
              "nature": "Modest",
              "ability": "",
              "item": "",
              "moves": [
                "Air Slash",
                "Bug Buzz",
                "Giga Drain",
                "Hidden Power Ice"
              ]
            }
          }
          */


            customFormat = {
                "level": level,
                "evs": {
                    "hp": EVs[0],
                    "at": EVs[1],
                    "df": EVs[2],
                    "sa": EVs[3],
                    "sd": EVs[4],
                    "sp": EVs[5],
                },
                "ivs": {
                    "hp": IVs[0],
                    "at": IVs[1],
                    "df": IVs[2],
                    "sa": IVs[3],
                    "sd": IVs[4],
                    "sp": IVs[5],
                },
                "nature": nature,
                "ability": ability,
                "item": item,
                "moves": moves,
            }
            if (setGen == 9)
                customFormat["tera_type"] = tera_type;
            else if (setGen == 8 && GMAX_LIST.includes(species)) {
                customFormat["gmax_factor"] = gmax_factor;
            }
            saveSets(setGen, customFormat, species, spreadName);
            if (sidebarUsed && a < 6) {
                if (!sidebarCleared && CURRENT_SIDEBARS[sidebarUsed - 1].length) {
                    removeSidebarTeam(sidebarUsed);
                }
                sidebarCleared = true;
                sidebarNames = sidebarUsed == 1 ? LEFT_SIDEBAR_NAMES : RIGHT_SIDEBAR_NAMES;
                CURRENT_SIDEBARS[sidebarUsed - 1].push(species);
                localStorage['g' + setGen + '_sidebars'] = JSON.stringify(CURRENT_SIDEBARS);
                saveSets(setGen, customFormat, species, sidebarNames[a]);
            }
        }
        if (setGen == gen)
            loadSetdexScript();
        if (sidebarUsed) {
            reloadSidebar(sidebarUsed);
            checkVisibleButtons(sidebarUsed);
        }
        alert("Set(s) saved.");
    }
    catch (x) {
        alert("Paste couldn't be processed. Please make sure that the contents are only Pokemon.");
    }
    document.getElementById("customMon").value = "";
}

function saveCustomSidebar(pnum) {
    var confirmSave = true;
    if (CURRENT_SIDEBARS[pnum - 1].length)
        confirmSave = confirm("The " + (pnum == 1 ? "left" : "right") + " panel has a team loaded already. Saving to that panel will delete the team. Continue?");
    if (confirmSave)
        savecustom(pnum);
}


//Saves a custom set from within the calc
var savecalc = function (set, spreadName, p, species) {
    var moves = [];
    var needsBaseAb = false;

    checkMega = species.indexOf("Mega ", 0);
    checkPrimal = species.indexOf("Primal ", 0);

    if (checkMega != -1) {
        if (species == "Mega Floette") {
            species = "Floette-Eternal";
        }
        else {
            species = species.substring(5);
            let checkMegaXYZ = species.indexOf(" ");
            if (checkMegaXYZ != -1)
                species = species.substring(0, checkMegaXYZ);
        }
    }
    else if (checkPrimal != -1) {
        species = species.substring(6);
    }

    if ($(p).find('.forme').is(':visible') && saveBaseAb[p.substring(1)] != '') {
        needsBaseAb = true;
    }

    moves.push(set.moves[0].name);
    moves.push(set.moves[1].name);
    moves.push(set.moves[2].name);
    moves.push(set.moves[3].name);

    if (spreadName == '')
        spreadName = "My Calc Set";
    customFormat = {
        "level": set.level,
        "evs": {
            "hp": set.HPEVs,
            "at": set.evs[STATS[0]],
            "df": set.evs[STATS[1]],
            "sa": set.evs[STATS[2]],
            "sd": set.evs[STATS[3]],
            "sp": set.evs[STATS[4]],
        },
        "ivs": {
            "hp": set.HPIVs,
            "at": set.ivs[STATS[0]],
            "df": set.ivs[STATS[1]],
            "sa": set.ivs[STATS[2]],
            "sd": set.ivs[STATS[3]],
            "sp": set.ivs[STATS[4]],
        },
        "nature": set.nature,
        "ability": needsBaseAb ? saveBaseAb[p.substring(1)] : set.ability,
        "item": set.item,
        "moves": moves,
    };
    if (gen == 9)
        customFormat["tera_type"] = set.tera_type;
    else if (gen == 8 && GMAX_LIST.includes(species)) {
        customFormat["gmax_factor"] = set.gmax_factor;
    }
    else if (gen == 7.5) {
        if (set.friendship != 70)
            customFormat["friendship"] = set.friendship;
        if (set.avs) {
            customFormat["avs"] = {
                "hp": set.HPAVs,
                "at": set.avs[STATS[0]],
                "df": set.avs[STATS[1]],
                "sa": set.avs[STATS[2]],
                "sd": set.avs[STATS[3]],
                "sp": set.avs[STATS[4]],
            };
        }
    }

    saveSets(gen, customFormat, species, spreadName);
    loadSetdexScript();
    //load set that was just saved
    loadPreset(p, species + " (" + spreadName + ")");
}

function runSaveCalc(pnum) {
    var setName = document.getElementById('setName' + pnum).value;
    var monSet = new Pokemon($('#p' + pnum));
    var actualName = $('#p' + pnum + " input.set-selector").val();
    actualName = actualName.substring(0, actualName.indexOf(' ('));
    if (actualName in setdex && setName in setdex[actualName] && !(actualName in setdexCustom && setName in setdexCustom[actualName]))
        alert("Set names for Pokemon cannot match one of the calc's presets.\nPlease rename this set and try again.");
    else if ((LEFT_SIDEBAR_NAMES.indexOf(setName) != -1/* && CURRENT_SIDEBARS[0].length <= parseInt(setName.slice(-1))*/)
        || (RIGHT_SIDEBAR_NAMES.indexOf(setName) != -1/* && CURRENT_SIDEBARS[1].length <= parseInt(setName.slice(-1))*/))
        alert("Set name matches naming convention for sidebars. Please use the sidebar buttons to add, save, and delete.");
    else
        savecalc(monSet, document.getElementById('setName' + pnum).value, "#p" + pnum, actualName);
}

//Looked this up online, copies to clipboard without any input
function Clipboard_CopyTo(value) {
    var tempText = document.createElement("textarea");
    tempText.value = value;
    document.body.appendChild(tempText);
    tempText.select();
    document.execCommand("copy");   //technically deprecated but everything still supports it and not everything supports the new function that copies
    document.body.removeChild(tempText);
}

//Exports sets by copying them to clipboard. Might adjust later depending on how successful it is
var exportset = function (set) {
    /* Formatting Example:
     *Rillaboom-Gmax @ Assault Vest
     *Ability: Grassy Surge
     *Level: 50
     *Tera Type: Fire
     *EVs: 172 HP / 252 Atk / 4 Def / 0 SpA / 4 SpD / 76 Spe
     *Adamant Nature
     *IVs: 31 HP / 31 Atk / 31 Def / 31 SpA / 31 SpD / 31 Spe
     * - Grassy Glide
     * - Wood Hammer
     * - High Horsepower
     * - Knock Off
     */

    //exMoves is up here because it makes things easier when checking for Mega Rayquaza
    exMoves = ["- " + (set.moves[0].name ? set.moves[0].name : set.moves[0]),
    "- " + (set.moves[1].name ? set.moves[1].name : set.moves[1]),
    "- " + (set.moves[2].name ? set.moves[2].name : set.moves[2]),
    "- " + (set.moves[3].name ? set.moves[3].name : set.moves[3])];

    exSpecies = getExportSpecies(set, exMoves);

    exItem = set.item != "" ? " @ " + set.item : "";
    if (set.ability === "As One") {
        set.ability = exSpecies === "Calyrex-Ice" ? set.ability + " (Glastrier)"
            : exSpecies === "Calyrex-Shadow" ? set.ability + " (Spectrier)"
                : set.ability;
    }
    exAbility = "Ability: " + set.ability + "\n";
    exLevel = "Level: " + set.level + "\n";
    if (gen == 9)
        exTera = "Tera Type: " + set.tera_type + "\n";
    else
        exTera = "";

    //MORE OPTIMAL VERSION OF EV EXPORT IF READABILITY ISN'T A CONCERN
    //
    //exEVs = "EVs: " + set.HPEVs.toString() + " HP / " +
    //    set.evs[STATS[0]].toString() + " Atk / " +
    //    set.evs[STATS[1]].toString() + " Def / " +
    //    set.evs[STATS[2]].toString() + " SpA / " +
    //    set.evs[STATS[3]].toString() + " SpD / " +
    //    set.evs[STATS[4]].toString() + " Spe ";

    var HPEVs = set.HPEVs != undefined ? set.HPEVs : set.evs["hp"] != undefined ? set.evs["hp"] : -1;
    var HPIVs = set.HPIVs != undefined ? set.HPIVs : set.ivs["hp"] != undefined ? set.ivs["hp"] : -1;

    exEVs = "";
    hasEVs = false;
    if (HPEVs) {
        hasEVs = true;
        exEVs = exEVs + HPEVs.toString() + " HP ";
    }
    if (set.evs[STATS[0]]) {
        if (hasEVs)
            exEVs = exEVs + "/ ";
        exEVs = exEVs + set.evs[STATS[0]].toString() + " Atk ";
        hasEVs = true;
    }
    if (set.evs[STATS[1]]) {
        if (hasEVs)
            exEVs = exEVs + "/ ";
        exEVs = exEVs + set.evs[STATS[1]].toString() + " Def ";
        hasEVs = true;
    }
    if (set.evs[STATS[2]]) {
        if (hasEVs)
            exEVs = exEVs + "/ ";
        exEVs = exEVs + set.evs[STATS[2]].toString() + " SpA ";
        hasEVs = true;
    }
    if (set.evs[STATS[3]]) {
        if (hasEVs)
            exEVs = exEVs + "/ ";
        exEVs = exEVs + set.evs[STATS[3]].toString() + " SpD ";
        hasEVs = true;
    }
    if (set.evs[STATS[4]]) {
        if (hasEVs)
            exEVs = exEVs + "/ ";
        exEVs = exEVs + set.evs[STATS[4]].toString() + " Spe ";
        hasEVs = true;
    }
    if (hasEVs) {
        exEVs = "EVs: " + exEVs + "\n";
    }
    exNature = set.nature + " Nature\n";

    //SAME DEAL WITH EVS, OPTIMIZED IV EXPORT IF READABILITY ISN'T A CONCERN
    //
    //exIVs = "IVs: " + accessIVs.find(".hp .ivs").val().toString() + " HP / " +
    //    accessIVs.find(".at .ivs").val().toString() + " Atk / " +
    //    accessIVs.find(".df .ivs").val().toString() + " Def / " +
    //    accessIVs.find(".sa .ivs").val().toString() + " SpA / " +
    //    accessIVs.find(".sd .ivs").val().toString() + " SpD / " +
    //    accessIVs.find(".sp .ivs").val().toString() + " Spe ";

    exIVs = "";
    hasIVs = false;
    if (HPIVs != 31) {
        hasIVs = true;
        exIVs = exIVs + HPIVs.toString() + " HP ";
    }
    if (set.ivs[STATS[0]] != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + set.ivs[STATS[0]].toString() + " Atk ";
        hasIVs = true;
    }
    if (set.ivs[STATS[1]] != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + set.ivs[STATS[1]].toString() + " Def ";
        hasIVs = true;
    }
    if (set.ivs[STATS[2]] != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + set.ivs[STATS[2]].toString() + " SpA ";
        hasIVs = true;
    }
    if (set.ivs[STATS[3]] != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + set.ivs[STATS[3]].toString() + " SpD ";
        hasIVs = true;
    }
    if (set.ivs[STATS[4]] != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + set.ivs[STATS[4]].toString() + " Spe ";
        hasIVs = true;
    }
    if (hasIVs) {
        exIVs = "IVs: " + exIVs + "\n";
    }
    exMoveset = "";
    for (i = 0; i < exMoves.length; i++) {
        if (exMoves[i] !== "- (No Move)") {
            exMoveset = exMoveset + exMoves[i] + "\n";
        }
    }

    exSpeciesAndItem = exSpecies + exItem + "\n";

    exportText = exSpeciesAndItem + exAbility + exLevel + exTera + exEVs + exNature + exIVs + exMoveset;
    return exportText;
}

function runExportSet(pnum) {
    var set = new Pokemon($('#p' + pnum));
    var tempName = $('#p' + pnum + ' input.set-selector').val();
    set.name = tempName.substring(0, tempName.indexOf(" ("));
    var exportText = exportset(set);
    Clipboard_CopyTo(exportText);
    //tempCSV();
}

function deleteSet(species, spreadName) {
    delete ALL_SETDEX_CUSTOM[gen][species][spreadName];
    if (!(Object.keys(ALL_SETDEX_CUSTOM[gen][species]).length))
        delete ALL_SETDEX_CUSTOM[gen][species];
    localStorage["custom_gen_" + gen] = JSON.stringify(ALL_SETDEX_CUSTOM[gen]);
    loadSetdexScript();
}

function runDeleteSet(pnum) {
    var p = '#p' + pnum;
    var fullSetName = $(p + ' input.set-selector').val();
    var species = fullSetName.substring(0, fullSetName.indexOf(" (")), setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));
    if (confirm("The following set will be deleted:\n" + fullSetName + "\n\nContinue?")) {
        deleteSet(species, setName);
        $(p).closest(".poke-info").find(".delset").hide();
    }
}

function storedSetFixes() {
    var changesMade = false;
    var nameChange = {
        'Indeedee-M': 'Indeedee',
        'Dudunsparce-Big': 'Dudunsparce-Three-Segment',
    };
    var nameChangeItemRequired = {
        'Zacian': {
            'nameChange': 'Zacian-Crowned',
            'item': 'Rusted Sword',
        },
        'Zamazenta': {
            'nameChange': 'Zamazenta-Crowned',
            'item': 'Rusted Shield',
        },
    };
    var needsNameChangeItem = false;
    var mustLoadSidebar = false;
    for (var i = 9; i >= 1; i--) {
        if (localStorage["custom_gen_" + i] != null) {
            tempCustom = JSON.parse(localStorage["custom_gen_" + i]);
            for (mon in tempCustom) {
                needsNameChangeItem = false;
                if (mon in nameChangeItemRequired) {
                    needsNameChangeItem = true;
                }
                for (set in tempCustom[mon]) {
                    if (tempCustom[mon][set]["level"] && typeof tempCustom[mon][set]["level"] !== "number") {
                        tempCustom[mon][set]["level"] = parseInt(tempCustom[mon][set]["level"]);
                        changesMade = true;
                    }
                    if (tempCustom[mon][set]["ability"] && tempCustom[mon][set]["ability"].indexOf("As One (") != -1) {
                        tempCustom[mon][set]["ability"] = "As One";
                        changesMade = true;
                    }
                    if (needsNameChangeItem && nameChangeItemRequired[mon]['item'] == tempCustom[mon][set]['item']) {
                        if (!(nameChangeItemRequired[mon]['nameChange'] in tempCustom)) {
                            tempCustom[nameChangeItemRequired[mon]['nameChange']] = {};
                        }
                        tempCustom[nameChangeItemRequired[mon]['nameChange']][set] = tempCustom[mon][set];

                        if (set.includes(" Sidebar Slot ")) {
                            let sidebarSide = set.includes("Left Sidebar Slot ") ? 0 : set.includes("Right Sidebar Slot ") ? 1 : -1;
                            let sidebarNum = parseInt(set[set.length - 1]) - 1;
                            let tempCurrentSidebars = JSON.parse(localStorage['g' + i + '_sidebars']);

                            tempCurrentSidebars[sidebarSide][sidebarNum] = nameChangeItemRequired[mon]['nameChange'];
                            localStorage['g' + i + '_sidebars'] = JSON.stringify(tempCurrentSidebars);
                            if (i == gen) mustLoadSidebar = true;
                        }

                        delete tempCustom[mon][set];

                        changesMade = true;
                    }
                }
                if ($.isEmptyObject(tempCustom[mon])) {
                    delete tempCustom[mon];
                }

                if (mon in nameChange) {
                    if (!(nameChange[mon] in tempCustom)) {
                        tempCustom[nameChange[mon]] = {};
                    }
                    for (set in tempCustom[mon]) {
                        tempCustom[nameChange[mon]][set] = tempCustom[mon][set];

                        if (set.includes(" Sidebar Slot ")) {
                            let sidebarSide = set.includes("Left Sidebar Slot ") ? 0 : set.includes("Right Sidebar Slot ") ? 1 : -1;
                            let sidebarNum = parseInt(set[set.length - 1]) - 1;
                            let tempCurrentSidebars = JSON.parse(localStorage['g' + i + '_sidebars']);

                            tempCurrentSidebars[sidebarSide][sidebarNum] = nameChange[mon];
                            localStorage['g' + i + '_sidebars'] = JSON.stringify(tempCurrentSidebars);
                            if (i == gen) mustLoadSidebar = true;
                        }
                    }
                    delete tempCustom[mon];

                    changesMade = true;
                }
            }
            if (changesMade) {
                localStorage["custom_gen_" + i] = JSON.stringify(tempCustom);
                ALL_SETDEX_CUSTOM[i] = tempCustom;
                changesMade = false;
            }
        }
    }
    if (mustLoadSidebar) {
        loadSidebar();
    }
    loadSetdexScript();
}

function getExportSpecies(set, setMoves) {
    /*
    * if species and mega stone match, change to mega evolution corresponding to mega stone
    * if Rayquaza and has Dragon Ascent, change to Rayquaza-Mega
    * if Battle Bond Greninja and gen < 9, change to Greninja-Ash
    * if gmax_factor, add -Gmax suffix
    * if Palafin, change to Palafin-Hero
    * if Terapagos, change to Terapagos-Terastal
    */
    var exportSpecies = set.name;

    if (exportSpecies in calcToShowdownFormes) {
        exportSpecies = calcToShowdownFormes[exportSpecies];
    }

    if (set.item in MEGA_STONE_USER_LOOKUP && MEGA_STONE_USER_LOOKUP[set.item].includes(set.name)) {
        if (set.item.includes(" Orb")) {
            exportSpecies = set.name + '-Primal';
        }
        else if (set.name == "Floette-Eternal") {
            exportSpecies = "Floette-Mega";
        }
        else if (!(set.name.includes("Zygarde"))) {
            exportSpecies = set.name + "-Mega";
            let checkMegaXYZ = set.item.indexOf(" ");
            if (checkMegaXYZ != -1) {
                exportSpecies = exportSpecies + "-" + set.item.substring(checkMegaXYZ + 1);
            }
        }
    }
    else if (set.name == "Rayquaza" && setMoves.includes("- Dragon Ascent") && "Mega Rayquaza" in pokedex) {
        exportSpecies = "Rayquaza-Mega";
    }
    else if (set.name == "Keldeo" && setMoves.includes("- Secret Sword")) {
        exportSpecies = "Keldeo-Resolute";
    }
    else if (set.name == "Greninja" && set.ability == "Battle Bond" && "Ash-Greninja" in pokedex) {
        exportSpecies = "Greninja-Ash";
    }
    else if (gen == 8 && GMAX_LIST.includes(set.name)) {
        if (set.gmax_factor) {
            exportSpecies = set.name + "-Gmax";
        }
    }
    return exportSpecies;
}