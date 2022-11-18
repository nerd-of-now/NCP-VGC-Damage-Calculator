var showdownToCalcFormes = [//["Kyurem-White", "Kyurem-W"],
//["Kyurem-Black", "Kyurem-B"],
//["Rotom-Wash", "Rotom-W"],
//["Rotom-Heat", "Rotom-H"],
//["Rotom-Frost", "Rotom-F"],
//["Rotom-Mow", "Rotom-C"],
//["Rotom-Fan", "Rotom-S"],
//["Giratina-Origin", "Giratina-O"],
//["Landorus-Therian", "Landorus-T"],
//["Thundurus-Therian", "Thundurus-T"],
//["Tornadus-Therian", "Tornadus-T"],
//["Floette-Eternal", "Floette-E"],
["Pumpkaboo", "Pumpkaboo-Average"],
["Gourgeist", "Gourgeist-Average"],
["Wormadan-Sandy", "Wormadan-G"],
["Wormadan-Trash", "Wormadan-S"],
["Groudon-Primal", "Groudon"],
["Kyogre-Primal", "Kyogre"],
    ["Zygarde-10%", "Zygarde"],
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
    ["Basculin-White-Striped", "Basculin"],
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
    ["Zarude-Dada", "Zarude"],];

var calcToShowdownFormes = [//["Kyurem-White", "Kyurem-W"],
//["Kyurem-Black", "Kyurem-B"],
//["Rotom-Wash", "Rotom-W"],
//["Rotom-Heat", "Rotom-H"],
//["Rotom-Frost", "Rotom-F"],
//["Rotom-Mow", "Rotom-C"],
//["Rotom-Fan", "Rotom-S"],
//["Giratina-Origin", "Giratina-O"],
//["Landorus-Therian", "Landorus-T"],
//["Thundurus-Therian", "Thundurus-T"],
//["Tornadus-Therian", "Tornadus-T"],
//["Floette-Eternal", "Floette-E"],
["Pumpkaboo", "Pumpkaboo-Average"],
["Gourgeist", "Gourgeist-Average"],
//["Wormadan-Sandy", "Wormadan-G"],
//["Wormadan-Trash", "Wormadan-S"],
["Urshifu", "Urshifu-Single Strike"],
["Urshifu-Rapid-Strike", "Urshifu-Rapid Strike"],
["Calyrex-Ice", "Calyrex-Ice Rider"],
    ["Calyrex-Shadow", "Calyrex-Shadow Rider"],
    ["Shellos-East", "Shellos"],
    ["Gastrodon-East", "Gastrodon"],];

var saveToCalcFormes = [["Darmanitan-Z", "Darmanitan"],
["Darmanitan-Z-Galar", "Darmanitan-Galar"],
["Zygarde 50%", "Zygarde"],
["Zygarde 10%", "Zygarde"],
["Zygarde Complete", "Zygarde"],
["Zacian-Crowned", "Zacian"],
["Zamazenta-Crowned", "Zamazenta"],];

if (readCookie("custom_gen_5") != null) {
    SETDEX_CUSTOM_BW = JSON.parse(readCookie("custom_gen_5"));
    reloadBWScript();
}
if (readCookie("custom_gen_6") != null) {
    SETDEX_CUSTOM_XY = JSON.parse(readCookie("custom_gen_6"));
    reloadXYScript();
}
if (readCookie("custom_gen_7") != null) {
    SETDEX_CUSTOM_SM = JSON.parse(readCookie("custom_gen_7"));
    reloadSMScript();
}
if (readCookie("custom_gen_8") != null) {
    SETDEX_CUSTOM_SS = JSON.parse(readCookie("custom_gen_8"));
    reloadSSScript();
}
if (readCookie("custom_gen_84") != null) {
    SETDEX_CUSTOM_BDSP = JSON.parse(readCookie("custom_gen_84"));
    reloadBDSPScript();
}
if (readCookie("custom_gen_9") != null) {
    SETDEX_CUSTOM_SV = JSON.parse(readCookie("custom_gen_9"));
    reloadSVScript();
}

var deletecustom = function () {
    gen = parseInt($('input[name="gen"]:checked').val());
    switch (gen) {
        case 5:
            SETDEX_CUSTOM_BW = {};
            eraseCookie("custom_gen_" + gen);
            reloadBWScript();
            break;
        case 6:
            SETDEX_CUSTOM_XY = {};
            eraseCookie("custom_gen_" + gen);
            reloadXYScript();
            break;
        case 7:
            SETDEX_CUSTOM_SM = {};
            eraseCookie("custom_gen_" + gen);
            reloadSMScript();
            break;
        case 8:
            SETDEX_CUSTOM_SS = {};
            eraseCookie("custom_gen_" + gen);
            reloadSSScript();
            break;
        case 84:
            SETDEX_CUSTOM_BDSP = {};
            eraseCookie("custom_gen_" + gen);
            reloadBDSPScript();
            break;
        case 9:
            SETDEX_CUSTOM_SV = {};
            eraseCookie("custom_gen_" + gen);
            reloadSVScript();
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
        var lines = numPokemon[a].split('\n')
        var species = "";
        var item = "";
        var ability = ""
        var level = 50;
        var EVs = [0, 0, 0, 0, 0, 0];
        var IVs = [31, 31, 31, 31, 31, 31]
        var nature = "Serious"
        var moves = []

        /*	Pokemon Showdown Export Format
    0	Nickname (Species) @ Item
    1	Ability: Name
    2	Level: #
    3	EVs: # Stat / # Stat / # Stat
    4	Serious Nature
    5	IVs: # Stat
    6	- Move Name
    7	- Move Name
    8	- Move Name
    9	- Move Name
        */

        //geting rid of gender identities (lel)
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

        if (lines[0].indexOf('@') != -1)
            item = lines[0].substring(lines[0].indexOf('@') + 1).trim(); //item is always after @
        ability = lines[1].substring(lines[1].indexOf(' ') + 1).trim(); //ability is always second
        if (lines.length > 2) {
            for (var i = 2; i < lines.length; ++i) {
                if (lines[i].indexOf("Level") != -1) {
                    level = lines[2].split(' ')[1].trim(); //level is sometimes third but uh not always
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
            "item": item,
            "moves": moves,
        }
        switch (gen) {
            case 5:
                if (SETDEX_CUSTOM_BW[species] == null)
                    SETDEX_CUSTOM_BW[species] = {}
                SETDEX_CUSTOM_BW[species][spreadName] = customFormat
                createCookie("custom_gen_5", JSON.stringify(SETDEX_CUSTOM_BW), 365)
                break;
            case 6:
                if (SETDEX_CUSTOM_XY[species] == null)
                    SETDEX_CUSTOM_XY[species] = {}
                SETDEX_CUSTOM_XY[species][spreadName] = customFormat
                createCookie("custom_gen_6", JSON.stringify(SETDEX_CUSTOM_XY), 365)
                break;
            case 7:
                if (SETDEX_CUSTOM_SM[species] == null)
                    SETDEX_CUSTOM_SM[species] = {}
                SETDEX_CUSTOM_SM[species][spreadName] = customFormat
                createCookie("custom_gen_7", JSON.stringify(SETDEX_CUSTOM_SM), 365)
                break;
            case 8:
                if (SETDEX_CUSTOM_SS[species] == null)
                    SETDEX_CUSTOM_SS[species] = {}
                SETDEX_CUSTOM_SS[species][spreadName] = customFormat
                createCookie("custom_gen_8", JSON.stringify(SETDEX_CUSTOM_SS), 365)
                break;
            case 84:
                if (SETDEX_CUSTOM_BDSP[species] == null)
                    SETDEX_CUSTOM_BDSP[species] = {}
                SETDEX_CUSTOM_BDSP[species][spreadName] = customFormat
                createCookie("custom_gen_84", JSON.stringify(SETDEX_CUSTOM_BDSP), 365)
                break;
            case 9:
                if (SETDEX_CUSTOM_SV[species] == null)
                    SETDEX_CUSTOM_SV[species] = {}
                SETDEX_CUSTOM_SV[species][spreadName] = customFormat
                createCookie("custom_gen_9", JSON.stringify(SETDEX_CUSTOM_SV), 365)
                break;
            default:
                console.log("THIS SHOULDN\'T HAPPEN LOL");
        }
    }
    switch (gen) {
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
        default:
            console.log("THIS SHOULDN\'T HAPPEN LOL");
    }
    document.getElementById("customMon").value = ""

}


//Saves a custom set from within the calc
var savecalc = function (set, spreadName, accessIVs) {
    gen = parseInt($('input[name="gen"]:checked').val());
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
    }

    switch (gen) {
        case 5:
            if (SETDEX_CUSTOM_BW[species] == null)
                SETDEX_CUSTOM_BW[species] = {}
            SETDEX_CUSTOM_BW[species][spreadName] = customFormat
            createCookie("custom_gen_5", JSON.stringify(SETDEX_CUSTOM_BW), 365)
            reloadBWScript()
            break;
        case 6:
            if (SETDEX_CUSTOM_XY[species] == null)
                SETDEX_CUSTOM_XY[species] = {}
            SETDEX_CUSTOM_XY[species][spreadName] = customFormat
            createCookie("custom_gen_6", JSON.stringify(SETDEX_CUSTOM_XY), 365)
            reloadXYScript()
            break;
        case 7:
            if (SETDEX_CUSTOM_SM[species] == null)
                SETDEX_CUSTOM_SM[species] = {}
            SETDEX_CUSTOM_SM[species][spreadName] = customFormat
            createCookie("custom_gen_7", JSON.stringify(SETDEX_CUSTOM_SM), 365)
            reloadSMScript()
            break;
        case 8:
            if (SETDEX_CUSTOM_SS[species] == null)
                SETDEX_CUSTOM_SS[species] = {}
            SETDEX_CUSTOM_SS[species][spreadName] = customFormat
            createCookie("custom_gen_8", JSON.stringify(SETDEX_CUSTOM_SS), 365)
            reloadSSScript()
            break;
        case 84:
            if (SETDEX_CUSTOM_BDSP[species] == null)
                SETDEX_CUSTOM_BDSP[species] = {}
            SETDEX_CUSTOM_BDSP[species][spreadName] = customFormat
                createCookie("custom_gen_84", JSON.stringify(SETDEX_CUSTOM_BDSP), 365)
            reloadBDSPScript()
            break;
        case 9:
            if (SETDEX_CUSTOM_SV[species] == null)
                SETDEX_CUSTOM_SV[species] = {}
            SETDEX_CUSTOM_SV[species][spreadName] = customFormat
            createCookie("custom_gen_9", JSON.stringify(SETDEX_CUSTOM_SV), 365)
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
    exAbility = "Ability: " + set.ability;
    if (set.ability === "As One") {
        exAbility = exSpecies === "Calyrex-Ice" ? exAbility + " (Glastrier)"
            : exSpecies === "Calyrex-Shadow" ? exAbility + " (Spectrier)"
                : exAbility;
    }
    exLevel = "Level: " + set.level;
    if (gen == 9)
        exTera = "Tera Type: " + set.tera_type;

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
        exEVs = "EVs: " + exEVs;
    }
    exNature = set.nature + " Nature";

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
        exIVs = "IVs: " + exIVs;
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

    exportText = exSpecies + exItem + "\n" + exAbility + "\n" + exLevel + "\n" + exEVs + "\n" + exNature + "\n" + exIVs + "\n" +
        exMoveset;
    if (gen == 9)
        exportText = exSpecies + exItem + "\n" + exAbility + "\n" + exLevel + "\n" + exTera + "\n" + exEVs + "\n" + exNature + "\n" +
            exIVs + "\n" + exMoveset;
    Clipboard_CopyTo(exportText);
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