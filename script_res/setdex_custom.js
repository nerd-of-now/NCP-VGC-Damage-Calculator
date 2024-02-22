var showdownToCalcFormes = [
    ["Pumpkaboo", "Pumpkaboo-Average"],
    ["Gourgeist", "Gourgeist-Average"],
    ["Groudon-Primal", "Groudon"],
    ["Kyogre-Primal", "Kyogre"],
    ["Zygarde-Complete", "Zygarde"],
    ["Zacian-Crowned", "Zacian"],
    ["Zamazenta-Crowned", "Zamazenta"],
    ["Urshifu", "Urshifu-Single Strike"],
    ["Urshifu-Rapid-Strike", "Urshifu-Rapid Strike"],
    ["Calyrex-Ice", "Calyrex-Ice Rider"],
    ["Calyrex-Shadow", "Calyrex-Shadow Rider"],
    ["Pikachu-Rock-Star", "Pikachu"],
    ["Pikachu-Belle", "Pikachu"],
    ["Pikachu-Pop-Star", "Pikachu"],
    ["Pikachu-PhD", "Pikachu"],
    ["Pikachu-Libre", "Pikachu"],
    ["Shellos-East", "Shellos"],
    ["Gastrodon-East", "Gastrodon"],
    ["Basculin-Blue-Striped", "Basculin"],
    ["Deerling-Summer", "Deerling"],
    ["Deerling-Autumn", "Deerling"],
    ["Deerling-Winter", "Deerling"],
    ["Sawsbuck-Summer", "Sawsbuck"],
    ["Sawsbuck-Autumn", "Sawsbuck"],
    ["Sawsbuck-Winter", "Sawsbuck"],
    ["Keldeo-Resolute", "Keldeo"],
    ["Genesect-Burn", "Genesect"],
    ["Genesect-Chill", "Genesect"],
    ["Genesect-Douse", "Genesect"],
    ["Genesect-Shock", "Genesect"],
    ["Magearna-Original", "Magearna"],
    ["Toxtricity-Low-Key", "Toxtricity"],
    ["Toxtricity-Low-Key-Gmax", "Toxtricity-Gmax"],
    ["Sinistea-Antique", "Sinistea"],
    ["Polteageist-Antique", "Polteageist"],
    ["Indeedee", "Indeedee-M"],
    ["Zarude-Dada", "Zarude"],
    ["Dudunsparce-Three-Segment", "Dudunsparce-Big"],
    ["Tatsugiri-Droopy", "Tatsugiri"],
    ["Tatsugiri-Stretchy", "Tatsugiri"],
    ["Poltchageist-Artisan", "Poltchageist"],
    ['Sinistcha-Masterpiece', 'Sinistcha'],
    ['Terapagos-Terastal', 'Terapagos'],
    ['Terapagos-Stellar', 'Terapagos'],
];

var calcToShowdownFormes = [
    ["Pumpkaboo", "Pumpkaboo-Average"],
    ["Gourgeist", "Gourgeist-Average"],
    ["Urshifu", "Urshifu-Single Strike"],
    ["Urshifu-Rapid-Strike", "Urshifu-Rapid Strike"],
    ["Calyrex-Ice", "Calyrex-Ice Rider"],
    ["Calyrex-Shadow", "Calyrex-Shadow Rider"],
    ["Shellos-East", "Shellos"],
    ["Gastrodon-East", "Gastrodon"],
    ["Dudunsparce-Three-Segment", "Dudunsparce-Big"],
    ["Indeedee", "Indeedee-M"],
];

var saveToCalcFormes = [
    ["Darmanitan-Zen", "Darmanitan"],
    ["Darmanitan-Galar-Zen", "Darmanitan-Galar"],
    ["Zygarde-Complete", "Zygarde"],
    ["Zacian-Crowned", "Zacian"],
    ["Zamazenta-Crowned", "Zamazenta"],
    ["Palafin-Hero", "Palafin"],
    ['Terapagos-Terastal', 'Terapagos'],
    ['Terapagos-Stellar', 'Terapagos'],
];

if (localStorage.custom_gen_3 != null) {
    SETDEX_CUSTOM_ADV = JSON.parse(localStorage.custom_gen_3);
    reloadADVScript();
}
if (localStorage.custom_gen_4 != null) {
    SETDEX_CUSTOM_DPP = JSON.parse(localStorage.custom_gen_4);
    reloadDPPScript();
}
if (localStorage.custom_gen_5 != null) {
    SETDEX_CUSTOM_BW = JSON.parse(localStorage.custom_gen_5);
    reloadBWScript();
}
if (localStorage.custom_gen_6 != null) {
    SETDEX_CUSTOM_XY = JSON.parse(localStorage.custom_gen_6);
    reloadXYScript();
}
if (localStorage.custom_gen_7 != null) {
    SETDEX_CUSTOM_SM = JSON.parse(localStorage.custom_gen_7);
    reloadSMScript();
}
if (localStorage.custom_gen_8 != null) {
    SETDEX_CUSTOM_SS = JSON.parse(localStorage.custom_gen_8);
    reloadSSScript();
}
if (localStorage.custom_gen_9 != null) {
    SETDEX_CUSTOM_SV = JSON.parse(localStorage.custom_gen_9);
    reloadSVScript();
}

if (readCookie("custom_gen_3") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_3"));
    cookiesToLocalStorage(custom_cookies, 4);
    eraseCookie("custom_gen_3");
    reloadADVScript();
}
if (readCookie("custom_gen_4") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_4"));
    cookiesToLocalStorage(custom_cookies, 4);
    eraseCookie("custom_gen_4");
    reloadDPPScript();
}
if (readCookie("custom_gen_5") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_5"));
    cookiesToLocalStorage(custom_cookies, 5);
    eraseCookie("custom_gen_5");
    reloadBWScript();
}
if (readCookie("custom_gen_6") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_6"));
    cookiesToLocalStorage(custom_cookies, 6);
    eraseCookie("custom_gen_6");
    reloadXYScript();
}
if (readCookie("custom_gen_7") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_7"));
    cookiesToLocalStorage(custom_cookies, 7);
    eraseCookie("custom_gen_7");
    reloadSMScript();
}
if (readCookie("custom_gen_8") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_8"));
    cookiesToLocalStorage(custom_cookies, 8);
    eraseCookie("custom_gen_8");
    reloadSSScript();
}
if (readCookie("custom_gen_84") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_84"));
    cookiesToLocalStorage(custom_cookies, 8);
    eraseCookie("custom_gen_84");
    reloadSSScript();
}
if (readCookie("custom_gen_9") != null) {
    custom_cookies = JSON.parse(readCookie("custom_gen_9"));
    cookiesToLocalStorage(custom_cookies, 9);
    eraseCookie("custom_gen_9");
    reloadSVScript();
}

function cookiesToLocalStorage(custom_cookies, generation) {
    for (p in custom_cookies) {
        for (set in custom_cookies[p]) {
            var customFormat = {
                "level": custom_cookies[p][set].level,
                "evs": {
                    "hp": custom_cookies[p][set].evs.hp,
                    "at": custom_cookies[p][set].evs.at,
                    "df": custom_cookies[p][set].evs.df,
                    "sa": custom_cookies[p][set].evs.sa,
                    "sd": custom_cookies[p][set].evs.sd,
                    "sp": custom_cookies[p][set].evs.sp,
                },
                "ivs": {
                    "hp": custom_cookies[p][set].ivs.hp,
                    "at": custom_cookies[p][set].ivs.at,
                    "df": custom_cookies[p][set].ivs.df,
                    "sa": custom_cookies[p][set].ivs.sa,
                    "sd": custom_cookies[p][set].ivs.sd,
                    "sp": custom_cookies[p][set].ivs.sp,
                },
                "nature": custom_cookies[p][set].nature,
                "ability": custom_cookies[p][set].ability,
                "item": custom_cookies[p][set].item,
                "moves": custom_cookies[p][set].moves,
                "tera_type": custom_cookies[p][set].tera_type,
            }

            saveSets(generation, customFormat, p, set);
        }
    }
}

//Check for any sets that have the old naming convention
if (SETDEX_CUSTOM_SV["Tauros-Paldea"]) {
    for (set in SETDEX_CUSTOM_SV["Tauros-Paldea"]) {
        saveSets(9, SETDEX_CUSTOM_SV["Tauros-Paldea"][set], "Tauros-Paldea-Combat", set);
    }
    delete SETDEX_CUSTOM_SV["Tauros-Paldea"];
}
if (SETDEX_CUSTOM_SV["Tauros-Paldea-Water"]) {
    for (set in SETDEX_CUSTOM_SV["Tauros-Paldea-Water"]) {
        saveSets(9, SETDEX_CUSTOM_SV["Tauros-Paldea-Water"][set], "Tauros-Paldea-Aqua", set);
    }
    delete SETDEX_CUSTOM_SV["Tauros-Paldea-Water"];
}
if (SETDEX_CUSTOM_SV["Tauros-Paldea-Fire"]) {
    for (set in SETDEX_CUSTOM_SV["Tauros-Paldea-Fire"]) {
        saveSets(9, SETDEX_CUSTOM_SV["Tauros-Paldea-Fire"][set], "Tauros-Paldea-Blaze", set);
    }
    delete SETDEX_CUSTOM_SV["Tauros-Paldea-Fire"];
}

var deletecustom = function () {
    if (confirm("Warning: ALL custom sets from this generation will be deleted. This cannot be undone. Proceed?")) {
        gen = parseInt($('input[name="gen"]:checked').val());
        localStorage.removeItem("custom_gen_" + gen);
        switch (gen) {
            case 3:
                SETDEX_CUSTOM_ADV = {};
                reloadADVScript();
                break;
            case 4:
                SETDEX_CUSTOM_DPP = {};
                reloadDPPScript();
                break;
            case 5:
                SETDEX_CUSTOM_BW = {};
                reloadBWScript();
                break;
            case 6:
                SETDEX_CUSTOM_XY = {};
                reloadXYScript();
                break;
            case 7:
                SETDEX_CUSTOM_SM = {};
                reloadSMScript();
                break;
            case 8:
                SETDEX_CUSTOM_SS = {};
                reloadSSScript();
                break;
            case 9:
                SETDEX_CUSTOM_SV = {};
                reloadSVScript();
                break;
            default:
                console.log("THIS SHOULDN\'T HAPPEN LOL");
        }
        alert("Custom set deletion successful.");
    }
}

function saveSets(gen, customFormat, species, spreadName) {
    switch (gen) {
        case 3:
            if (SETDEX_CUSTOM_ADV[species] == null)
                SETDEX_CUSTOM_ADV[species] = {}
            SETDEX_CUSTOM_ADV[species][spreadName] = customFormat
            localStorage.custom_gen_3 = JSON.stringify(SETDEX_CUSTOM_ADV);
            break;
        case 4:
            if (SETDEX_CUSTOM_DPP[species] == null)
                SETDEX_CUSTOM_DPP[species] = {}
            SETDEX_CUSTOM_DPP[species][spreadName] = customFormat
            localStorage.custom_gen_4 = JSON.stringify(SETDEX_CUSTOM_DPP);
            break;
        case 5:
            if (SETDEX_CUSTOM_BW[species] == null)
                SETDEX_CUSTOM_BW[species] = {}
            SETDEX_CUSTOM_BW[species][spreadName] = customFormat
            localStorage.custom_gen_5 = JSON.stringify(SETDEX_CUSTOM_BW);
            break;
        case 6:
            if (SETDEX_CUSTOM_XY[species] == null)
                SETDEX_CUSTOM_XY[species] = {}
            SETDEX_CUSTOM_XY[species][spreadName] = customFormat
            localStorage.custom_gen_6 = JSON.stringify(SETDEX_CUSTOM_XY);
            break;
        case 7:
            if (SETDEX_CUSTOM_SM[species] == null)
                SETDEX_CUSTOM_SM[species] = {}
            SETDEX_CUSTOM_SM[species][spreadName] = customFormat
            localStorage.custom_gen_7 = JSON.stringify(SETDEX_CUSTOM_SM);
            break;
        case 8:
            if (SETDEX_CUSTOM_SS[species] == null)
                SETDEX_CUSTOM_SS[species] = {}
            SETDEX_CUSTOM_SS[species][spreadName] = customFormat
            localStorage.custom_gen_8 = JSON.stringify(SETDEX_CUSTOM_SS);
            break;
        case 9:
            if (SETDEX_CUSTOM_SV[species] == null)
                SETDEX_CUSTOM_SV[species] = {}
            SETDEX_CUSTOM_SV[species][spreadName] = customFormat
            localStorage.custom_gen_9 = JSON.stringify(SETDEX_CUSTOM_SV);
            break;
        default:
            console.log("THIS SHOULDN\'T HAPPEN LOL");
    }
}

function createCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
	}
    document.cookie = name + "=" + value + expires + "; path=/NCP-VGC-Damage-Calculator";
    // !!! CHANGE PATH IF YOU TAKE THE CODE, OTHERWISE COOKIES WON'T BE PROPERLY DELETED !!!
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

var savecustom = function()
{
    gen = parseInt($('input[name="gen"]:checked').val());
	//first, to parse it all from the PS format
	var string = document.getElementById('customMon').value
	var spreadName = document.getElementById('spreadName').value
	if(spreadName == '')
        spreadName = "My Custom Set";
    //if ('https://pokepast.es/'.indexOf(string) !== -1) {
    //    $.ajax({ url: 'string', success: function (data) { alert(data); } });
    //}

    //numPokemon separates individual Pokemon so user can add multiple Pokemon at once under the same set name
    var numPokemon = string.split('\n\n')
    numPokemon = numPokemon.filter(element => element)

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
        if (checkGmax != -1)
            species = species.substring(0, checkGmax);
        if (checkMega != -1)
            species = species.substring(0, checkMega);
        if (checkPrimal != -1)
            species = species.substring(0, checkPrimal);
        for (var i = 0; i < showdownToCalcFormes.length; ++i) {
            if (species == showdownToCalcFormes[i][0])
                species = showdownToCalcFormes[i][1]
        }

        var tera_type = pokedex[species].t1;

        if (lines[0].indexOf('@') != -1)
            item = lines[0].substring(lines[0].indexOf('@') + 1).trim(); //item is always after @
        ability = lines[1].substring(lines[1].indexOf(' ') + 1).trim(); //ability is always second
        if (lines.length > 2) {
            for (var i = 2; i < lines.length; ++i) {
                if (lines[i].indexOf("Level") != -1) {
                    level = lines[2].split(' ')[1].trim(); //level is sometimes third but uh not always
                }
                if (lines[i].indexOf("Tera Type") != -1) {
                    tera_type = lines[i].split(' ')[2].trim(); //
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
            "tera_type": tera_type,
            "item": item,
            "moves": moves,
        }
        saveSets(gen, customFormat, species, spreadName);
    }
    switch (gen) {
        case 3:
            reloadADVScript();
            break;
        case 4:
            reloadDPPScript();
            break;
        case 5:
            reloadBWScript();
            break;
        case 6:
            reloadXYScript();
            break;
        case 7:
            reloadSMScript();
            break;
        case 8:
            reloadSSScript();
            break;
        case 84:
            reloadBDSPScript();
            break;
        case 9:
            reloadSVScript();
            break;
        default:
            console.log("THIS SHOULDN\'T HAPPEN LOL");
    }
    document.getElementById("customMon").value = ""

}


//Saves a custom set from within the calc
var savecalc = function (set, spreadName, accessIVs) {
    var moves=[]
    species = set.name;

    checkGmax = species.indexOf("-Gmax", 0);
    checkMega = species.indexOf("Mega ", 0);
    checkPrimal = species.indexOf("Primal ", 0);

    if (checkGmax == -1 && checkMega == -1 && checkPrimal == -1) {
        for (var i = 0; i < saveToCalcFormes.length; ++i) {
            if (species == saveToCalcFormes[i][0])
                species = saveToCalcFormes[i][1];
        }
    }
    else if (checkGmax != -1)
        species = species.substring(0, checkGmax);
    else if (checkMega != -1)
        species = species.substring(5);
    else
        species = species.substring(6);

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
            "hp": parseInt(accessIVs.find(".hp .ivs").val()),
            "at": parseInt(accessIVs.find(".at .ivs").val()),
            "df": parseInt(accessIVs.find(".df .ivs").val()),
            "sa": parseInt(accessIVs.find(".sa .ivs").val()),
            "sd": parseInt(accessIVs.find(".sd .ivs").val()),
            "sp": parseInt(accessIVs.find(".sp .ivs").val()),
        },
        "nature": set.nature,
        "ability": set.ability,
        "item": set.item,
        "moves": moves,
        "tera_type": set.tera_type,
    };

    saveSets(gen, customFormat, species, spreadName);
    switch (gen) {
        case 3:
            reloadADVScript();
            break;
        case 4:
            reloadDPPScript();
            break;
        case 5:
            reloadBWScript()
            break;
        case 6:
            reloadXYScript()
            break;
        case 7:
            reloadSMScript()
            break;
        case 8:
            reloadSSScript()
            break;
        case 9:
            reloadSVScript()
            break;
        default:
            console.log("THIS SHOULDN\'T HAPPEN LOL");
    }
}

var savecalc1 = function () {
    var p1 = new Pokemon($("#p1"));
    var spreadName = document.getElementById('setName1').value;
    accessIVs = $('#p1 input.ivs.calc-trigger').closest(".poke-info"); 
    savecalc(p1, spreadName, accessIVs);
}
var savecalc2 = function () {
    var p2 = new Pokemon($("#p2"));
    var spreadName = document.getElementById('setName2').value;
    accessIVs = $('#p2 input.ivs.calc-trigger').closest(".poke-info");
    savecalc(p2, spreadName, accessIVs);
}

//Looked this up online, copies to clipboard without any input
function Clipboard_CopyTo(value) {
    var tempText = document.createElement("textarea");
    tempText.value = value;
    document.body.appendChild(tempText);
    tempText.select();
    document.execCommand("copy");
    document.body.removeChild(tempText);
}

//Exports sets by copying them to clipboard. Might adjust later depending on how successful it is
var exportset = function (set, accessIVs) {
    /* Formatting Example:
     *Rillaboom-Gmax @ Assault Vest
     *Ability: Grassy Surge
     *Level: 50
     *EVs: 172 HP / 252 Atk / 4 Def / 0 SpA / 4 SpD / 76 Spe
     *Adamant Nature
     *IVs: 31 HP / 31 Atk / 31 Def / 31 SpA / 31 SpD / 31 Spe
     * - Grassy Glide
     * - Wood Hammer
     * - High Horsepower
     * - Knock Off
     */

    exSpecies = set.name;

    for (var i = 0; i < calcToShowdownFormes.length; ++i) {
        if (exSpecies == calcToShowdownFormes[i][1])
            exSpecies = calcToShowdownFormes[i][0];
    }

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

    exEVs = "";
    hasEVs = false;
    if (set.HPEVs) {
        hasEVs = true;
        exEVs = exEVs + set.HPEVs.toString() + " HP ";
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
    if (accessIVs.find(".hp .ivs").val() != 31) {
        hasIVs = true;
        exIVs = exIVs + accessIVs.find(".hp .ivs").val().toString() + " HP ";
    }
    if (accessIVs.find(".at .ivs").val() != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + accessIVs.find(".at .ivs").val().toString() + " Atk ";
        hasIVs = true;
    }
    if (accessIVs.find(".df .ivs").val() != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + accessIVs.find(".df .ivs").val().toString() + " Def ";
        hasIVs = true;
    }
    if (accessIVs.find(".sa .ivs").val() != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + accessIVs.find(".sa .ivs").val().toString() + " SpA ";
        hasIVs = true;
    }
    if (accessIVs.find(".sd .ivs").val() != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + accessIVs.find(".sd .ivs").val().toString() + " SpD ";
        hasIVs = true;
    }
    if (accessIVs.find(".sp .ivs").val() != 31) {
        if (hasIVs)
            exIVs = exIVs + "/ ";
        exIVs = exIVs + accessIVs.find(".sp .ivs").val().toString() + " Spe ";
        hasIVs = true;
    }
    if (hasIVs) {
        exIVs = "IVs: " + exIVs + "\n";
    }
    exMoves = ["- " + set.moves[0].name,
        "- " + set.moves[1].name,
        "- " + set.moves[2].name,
        "- " + set.moves[3].name,];
    exMoveset = "";
    for (i = 0; i < exMoves.length; i++) {
        if (exMoves[i] !== "- (No Move)") {
            exMoveset = exMoveset + exMoves[i] + "\n";
        }
    }

    exSpeciesAndItem = exSpecies + exItem + "\n";

    exportText = exSpeciesAndItem + exAbility + exLevel + exTera + exEVs + exNature + exIVs + exMoveset;
    Clipboard_CopyTo(exportText);
    //tempCSV();
}

var exportset1 = function () {
    var p1 = new Pokemon($("#p1"));
    accessIVs = $('#p1 input.ivs.calc-trigger').closest(".poke-info");
    exportset(p1, accessIVs);
}
var exportset2 = function () {
    var p2 = new Pokemon($("#p2"));
    accessIVs = $('#p2 input.ivs.calc-trigger').closest(".poke-info");
    exportset(p2, accessIVs);
}