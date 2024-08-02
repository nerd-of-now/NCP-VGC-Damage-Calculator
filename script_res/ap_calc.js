// input field validation
var bounds = {
    "level":[0,100],
    "base":[1,255],
    "evs":[0,252],
    "ivs":[0,31],
    "dvs":[0,15],
    "move-bp":[0,999]
};

//isCrit = false;
//center_images = ["image_res/toge_normal.png", "image_res/toge_crit.png"]
//function checkCrit(crit) {
//    if(crit != isCrit) {
//        isCrit = crit;
//        $("#toge").attr("src", center_images[+isCrit])
//    }
//}

for (var bounded in bounds) {
    if (bounds.hasOwnProperty(bounded)) {
        attachValidation(bounded, bounds[bounded][0], bounds[bounded][1]);
    }
}
function attachValidation(clazz, min, max) {
    $("." + clazz).keyup(function() {
        validate($(this), min, max);
    });
}
function validate(obj, min, max) {
    obj.val(Math.max(min, Math.min(max, ~~obj.val())));
}

// auto-calc stats and current HP on change
$(".level").keyup(function() {
    var poke = $(this).closest(".poke-info");
    calcHP(poke);
    calcStats(poke);
});

var preTransformVars = { 'p1': {}, 'p2': {} };
var transformSpecies = { 'p1': '', 'p2': '' };
$(".transform").bind("keyup change", function () {
    var pokeInfo = $(this).closest(".poke-info");
    var pokeID = pokeInfo.attr("id");
    if ($(this).prop("checked")) {
        var otherPokeInfo = pokeID == "p1" ? $("#p2").closest(".poke-info") : $("#p1").closest(".poke-info");
        var otherPokeName = otherPokeInfo.find("input.set-selector").val();
        otherPokeName = otherPokeName.substring(0, otherPokeName.indexOf(" ("));
        transformSpecies[pokeID] = otherPokeName;
        preTransformVars[pokeID][".type1"] = pokeInfo.find(".type1").val();
        preTransformVars[pokeID][".type2"] = pokeInfo.find(".type2").val();
        pokeInfo.find(".type1").val(otherPokeInfo.find(".type1").val());
        pokeInfo.find(".type2").val(otherPokeInfo.find(".type2").val());
        for (var i = 0; i < STATS.length;i++) {
            preTransformVars[pokeID]["." + STATS[i] + " .base"] = pokeInfo.find("." + STATS[i] + " .base").val();
            if (gen >= 3) {
                preTransformVars[pokeID]["." + STATS[i] + " .ivs"] = pokeInfo.find("." + STATS[i] + " .ivs").val();
                preTransformVars[pokeID]["." + STATS[i] + " .evs"] = pokeInfo.find("." + STATS[i] + " .evs").val();
            }
            else
                preTransformVars[pokeID]["." + STATS[i] + " .dvs"] = pokeInfo.find("." + STATS[i] + " .dvs").val();
            preTransformVars[pokeID]["." + STATS[i] + " .boost"] = pokeInfo.find("." + STATS[i] + " .boost").val();
            pokeInfo.find("." + STATS[i] + " .base").val(otherPokeInfo.find("." + STATS[i] + " .base").val());
            if (gen >= 3) {
                pokeInfo.find("." + STATS[i] + " .ivs").val(otherPokeInfo.find("." + STATS[i] + " .ivs").val());
                pokeInfo.find("." + STATS[i] + " .evs").val(otherPokeInfo.find("." + STATS[i] + " .evs").val());
            }
            else
                pokeInfo.find("." + STATS[i] + " .dvs").val(otherPokeInfo.find("." + STATS[i] + " .dvs").val());
            pokeInfo.find("." + STATS[i] + " .boost").val(otherPokeInfo.find("." + STATS[i] + " .boost").val());
        }
        preTransformVars[pokeID][".nature"] = pokeInfo.find(".nature").val();
        pokeInfo.find(".nature").val(otherPokeInfo.find(".nature").val());

        var abilityObj = pokeInfo.find("select.ability");
        preTransformVars[pokeID]["select.ability"] = abilityObj.val();
        abilityObj.val(otherPokeInfo.find("select.ability").val());
        abilityObj.change();

        var moveObj;
        for (var i = 0; i < 4; i++) {
            moveSyn = ".move" + (i + 1) + " select.move-selector";
            moveObj = pokeInfo.find(moveSyn);
            preTransformVars[pokeID][moveSyn] = moveObj.val();
            moveObj.val(otherPokeInfo.find(moveSyn).val());
            moveObj.change();
        }
        preTransformVars[pokeID][".weight"] = pokeInfo.find(".weight").val();
        pokeInfo.find(".weight").val(otherPokeInfo.find(".weight").val());
        calcStats(pokeInfo);

        pokeInfo.find(".editsc").prop("disabled", true);
        pokeInfo.find(".addsc").prop("disabled", true);
        pokeInfo.find(".setCalc").parent().children().prop("disabled", true);
        console.log(preTransformVars[pokeID]);
    }
    else {
        for (variable in preTransformVars[pokeID]) {
            pokeInfo.find(variable).val(preTransformVars[pokeID][variable]);
            if (variable.indexOf("ability") != -1 || variable.indexOf("move") != -1)
                pokeInfo.find(variable).change();
        }
        calcStats(pokeInfo);

        preTransformVars[pokeID] = {};
        transformSpecies[pokeID] = '';
        pokeInfo.find(".editsc").prop("disabled", false);
        pokeInfo.find(".addsc").prop("disabled", false);
        pokeInfo.find(".setCalc").parent().children().prop("disabled", false);
    }
    transformCheck($(this));
});

$(".max").bind("keyup change", function() {
    var poke = $(this).closest(".poke-info");
    calcHP(poke);
    calcStats(poke);
});
$(".tera").bind("keyup change", function () {
    var pokeInfo = $(this).closest(".poke-info");
    var pokeName = pokeInfo.find("input.set-selector").val();
    pokeName = pokeName.substring(0, pokeName.indexOf(" ("));
    pokeName = (pokedex[pokeName] && pokedex[pokeName].formes) ? pokeInfo.find(".forme").val() : pokeName;
    var isTera = $(this).prop("checked");
    if (pokeName.indexOf("Ogerpon") !== -1) {
        if (isTera) {
            pokeInfo.find(".type1").val(pokedex[pokeName].t1);
            pokeInfo.find(".type2").val(pokedex[pokeName].t2);
            pokeInfo.find("select.ability").val("Embody Aspect");
            pokeInfo.find("select.ability").trigger('change.select2');
        }
        else {
            pokeInfo.find("select.ability").val(pokedex[pokeName].ab);
            pokeInfo.find("select.ability").trigger('change.select2');
        }
    }
    else if (pokeName.indexOf("Terapagos-") !== -1) {
        var notMaxHP = pokeInfo.find(".percent-hp").val() != "100";
        if (notMaxHP) {
            var prevCurrHP = pokeInfo.find(".current-hp").val();
            var prevMaxHP = pokeInfo.find(".max-hp").text();
        }
        if (isTera) {
            pokeInfo.find(".type1").val(pokedex['Terapagos-Stellar'].t1);
            pokeInfo.find(".type2").val(pokedex['Terapagos-Stellar'].t2);
            pokeInfo.find(".hp .base").val(pokedex['Terapagos-Stellar'].bs.hp);
            pokeInfo.find(".at .base").val(pokedex['Terapagos-Stellar'].bs.at);
            pokeInfo.find(".df .base").val(pokedex['Terapagos-Stellar'].bs.df);
            pokeInfo.find(".sa .base").val(pokedex['Terapagos-Stellar'].bs.sa);
            pokeInfo.find(".sd .base").val(pokedex['Terapagos-Stellar'].bs.sd);
            pokeInfo.find(".sp .base").val(pokedex['Terapagos-Stellar'].bs.sp);
            calcHP(pokeInfo);
            calcStats(pokeInfo);
            pokeInfo.find(".weight").val(pokedex['Terapagos-Stellar'].w);
            pokeInfo.find("select.ability").val(pokedex['Terapagos-Stellar'].ab);
            pokeInfo.find("select.ability").trigger('change.select2');
            removeWeather();
            removeTerrain();
            pokeInfo.find(".forme").prop("disabled", true);
        }
        else {
            pokeInfo.find(".type1").val(pokedex['Terapagos-Terastal'].t1);
            pokeInfo.find(".type2").val(pokedex['Terapagos-Terastal'].t2);
            pokeInfo.find(".hp .base").val(pokedex['Terapagos-Terastal'].bs.hp);
            pokeInfo.find(".at .base").val(pokedex['Terapagos-Terastal'].bs.at);
            pokeInfo.find(".df .base").val(pokedex['Terapagos-Terastal'].bs.df);
            pokeInfo.find(".sa .base").val(pokedex['Terapagos-Terastal'].bs.sa);
            pokeInfo.find(".sd .base").val(pokedex['Terapagos-Terastal'].bs.sd);
            pokeInfo.find(".sp .base").val(pokedex['Terapagos-Terastal'].bs.sp);
            calcHP(pokeInfo);
            calcStats(pokeInfo);
            pokeInfo.find(".weight").val(pokedex['Terapagos-Terastal'].w);
            pokeInfo.find("select.ability").val(pokedex['Terapagos-Terastal'].ab);
            pokeInfo.find("select.ability").trigger('change.select2');
            pokeInfo.find(".forme").prop("disabled", false);
        }
        if (notMaxHP) {
            var max = parseInt(pokeInfo.find(".max-hp").text());
            var current = parseInt(prevCurrHP) + (max - parseInt(prevMaxHP));
            pokeInfo.find(".current-hp").val(Math.max(0, current));
            pokeInfo.find(".hp-bar").val(current);
            calcPercentHP(pokeInfo, max, current);
            changeHPBarColor(pokeInfo.find(".hp-bar"), max, current);
        }
    }
    else
        teraStellarBtns(pokeInfo, isTera, pokeInfo.find(".tera-type").val() === 'Stellar');
    transformCheck(pokeInfo.attr("id") == "p1" ? $("#p2") : $("#p1"));
});
$(".nature").bind("keyup change", function() {
    calcStats($(this).closest(".poke-info"));
});
$(".hp .base, .hp .evs, .hp .ivs").bind("keyup change", function() {
    calcHP($(this).closest(".poke-info"));
});
$(".at .base, .at .evs, .at .ivs").bind("keyup change", function() {
    calcStat($(this).closest(".poke-info"), 'at');
});
$(".df .base, .df .evs, .df .ivs").bind("keyup change", function() {
    calcStat($(this).closest(".poke-info"), 'df');
});
$(".sa .base, .sa .evs, .sa .ivs").bind("keyup change", function() {
    calcStat($(this).closest(".poke-info"), 'sa');
});
$(".sd .base, .sd .evs, .sd .ivs").bind("keyup change", function() {
    calcStat($(this).closest(".poke-info"), 'sd');
});
$(".sp .base, .sp .evs, .sp .ivs").bind("keyup change", function() {
    calcStat($(this).closest(".poke-info"), 'sp');
});
$(".evs").bind("keyup change", function() {
    calcEvTotal($(this).closest(".poke-info"));
});
$(".sl .base").keyup(function() {
    calcStat($(this).closest(".poke-info"), 'sl');
});
$(".at .dvs").keyup(function() {
    var poke = $(this).closest(".poke-info");
    calcStat(poke, 'at');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});
$(".df .dvs").keyup(function() {
    var poke = $(this).closest(".poke-info");
    calcStat(poke, 'df');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});
$(".sa .dvs").keyup(function() {
    var poke = $(this).closest(".poke-info");
    calcStat(poke, 'sa');
    poke.find(".sd .dvs").val($(this).val());
    calcStat(poke, 'sd');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});
$(".sp .dvs").keyup(function() {
    var poke = $(this).closest(".poke-info");
    calcStat(poke, 'sp');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});
$(".sl .dvs").keyup(function() {
    var poke = $(this).closest(".poke-info");
    calcStat(poke, 'sl');
    poke.find(".hp .dvs").val(getHPDVs(poke));
    calcHP(poke);
});

function getHPDVs(poke) {
    return (~~poke.find(".at .dvs").val() % 2) * 8 +
            (~~poke.find(".df .dvs").val() % 2) * 4 +
            (~~poke.find(gen === 1 ? ".sl .dvs" : ".sa .dvs").val() % 2) * 2 +
            (~~poke.find(".sp .dvs").val() % 2);
}

function calcStats(poke) {
    for (var i = 0; i < STATS.length; i++) {
        calcStat(poke, STATS[i]);
    }
}

function calcEvTotal(poke) {
    var total = 0;
    if (!poke.find('.transform').prop('checked'))
        poke.find('.evs').each(function (idx, elt) { total += 1 * $(elt).val(); });
    else {
        var pID = poke.closest('.poke-info').attr('id');
        total += 1 * poke.find('.hp .evs').val();
        for (var i = 0; i < STATS.length; i++) {
            total += 1 * preTransformVars[pID]['.' + STATS[i] + ' .evs'];
        }
    }

    var newClass = total > 510 ? 'overLimit' : 'underLimit';

    var left = 510-total;

    var newClassLeft = left < 0 ? 'overLimit' : 'underLimit';

    var evTotal = poke.find('.ev-total');
    evTotal.removeClass('underLimit overLimit').text(total).addClass(newClass);

    var evLeft = poke.find('.ev-left');
    evLeft.removeClass('underLimit overLimit').text(left).addClass(newClassLeft);
}

function calcCurrentHP(poke, max, percent) {
    var current = Math.ceil(percent * max / 100);
    var hpBar = poke.find(".hp-bar");
    poke.find(".current-hp").val(current);
    hpBar.val(current);
    changeHPBarColor(hpBar, max, current);
}
function calcPercentHP(poke, max, current) {
    var percent = Math.floor(100 * current / max);
    poke.find(".percent-hp").val(percent);
}
function changeHPBarColor(bar, max, current) {
    var percent = 100 * current / max;
    var barColor = percent > 50 ? "#23b928" : percent > 20 ? "#fa9600" : "#ff503c";
    bar.css("background", "linear-gradient(to right, " + barColor + " " + percent + "%, #606060 0%)");
    var p = bar.closest(".poke-info").attr('id');
    document.body.style.setProperty('--slider-color-' + p, barColor);
}
function updateHPBar(pokeObj, hpVal) {
    pokeObj.find(".hp-bar").prop('max', pokeObj.find(".max-hp").text());
    pokeObj.find(".hp-bar").val(hpVal);
    changeHPBarColor(pokeObj.find(".hp-bar"), pokeObj.find(".max-hp").text(), pokeObj.find(".hp-bar").val());
}
$(".current-hp").keyup(function() {
    var max = $(this).parent().children(".max-hp").text();
    validate($(this), 0, max);
    var current = $(this).val();
    $(this).parent().find(".hp-bar").val(current);
    calcPercentHP($(this).parent(), max, current);
    changeHPBarColor($(this).parent().find(".hp-bar"), max, current);
});
$(".percent-hp").keyup(function() {
    var max = $(this).parent().children(".max-hp").text();
    validate($(this), 0, 100);
    var percent = $(this).val();
    calcCurrentHP($(this).parent(), max, percent);
});
$(".hp-bar").on("input", function () {
    $(this).parent().find(".current-hp").val($(this).val());
    $(this).parent().find(".current-hp").keyup();
    changeHPBarColor($(this), $(this).parent().children(".max-hp").text(), $(this).val());
});

$(".tera-type").bind("keyup change", function () {
    var poke = $(this).closest(".poke-info");
    teraStellarBtns(poke, poke.find(".tera").prop("checked"), $(this).val() === 'Stellar')
});

function teraStellarBtns(poke, isTera, isStellar) {
    if (isTera && isStellar && poke.find("input.set-selector").val().indexOf('Terapagos') === -1) {
        for (i = 1; i <= 4; i++) {
            poke.find(".move" + i + " .stellar-btn").show();
            poke.find(".move" + i + " .move-stellar").prop("checked", true);
        }
    }
    else {
        for (i = 1; i <= 4; i++) {
            poke.find(".move" + i + " .stellar-btn").hide();
            poke.find(".move" + i + " .move-stellar").prop("checked", false);
        }
    }
}

function setHitsVal(poke, ab, item) {
    var pokeMoveObjs = [poke.find(".move1"), poke.find(".move2"), poke.find(".move3"), poke.find(".move4")];
    var moveData = [moves[pokeMoveObjs[0].children("select.move-selector").val()], moves[pokeMoveObjs[1].children("select.move-selector").val()],
        moves[pokeMoveObjs[2].children("select.move-selector").val()], moves[pokeMoveObjs[3].children("select.move-selector").val()]];

    for (var i = 0; i < 4; i++) {
        var curHitBounds = moveData[i].hitRange;
        if (curHitBounds && curHitBounds.length == 2) {
            if (curHitBounds[0] === 2 && curHitBounds[1] === 5) {
                pokeMoveObjs[i].children(".move-hits").val(ab === 'Skill Link' ? 5 : item === 'Loaded Dice' ? 4 : 3);
            }
            else if (curHitBounds[1] !== 6 && curHitBounds[1] !== 2) {
                pokeMoveObjs[i].children(".move-hits").val(curHitBounds[1]);
            }
        }
    }
}

var lastAura = [false, false, false]
var manualProtoQuark;
$(".ability").bind("keyup change", function () {
    thisPoke = $(this).closest(".poke-info");
    autoSetNeutralGas();

    setHitsVal(thisPoke, $(this).val(), thisPoke.find("select.item").val());

    if ($(this).val() === "Supreme Overlord")
        thisPoke.find(".ability-supreme").show();
    else
        thisPoke.find(".ability-supreme").hide();
    thisPoke.find(".ability-supreme").val(0);

    autoSetAura()
    autoSetRuin()
    autoSetTerrain()

    var ab = $(this).val();
    var ABILITY_TOGGLE_OFF = ['Flash Fire', 'Plus', 'Minus', 'Trace', 'Stakeout', 'Electromorphosis', 'Wind Power', 'Sand Spit', 'Seed Sower'];
    var ABILITY_TOGGLE_ON = gen >= 9 ? ['Intimidate', 'Slow Start', 'Protean', 'Libero', 'Intrepid Sword', 'Dauntless Shield', 'Supersweet Syrup'] : ['Intimidate', 'Slow Start'];
    if (ABILITY_TOGGLE_OFF.indexOf(ab) !== -1) {
        thisPoke.find(".abilityToggle").show();
        thisPoke.find(".abilityToggle").prop("checked", false);
    }
    else if (ABILITY_TOGGLE_ON.indexOf(ab) !== -1) {
        thisPoke.find(".abilityToggle").show();
        thisPoke.find(".abilityToggle").prop("checked", true);
    }
    else {
        thisPoke.find(".abilityToggle").hide();
    }
    var STAT_BOOST_VARY = ['Protosynthesis', 'Quark Drive'];
    if (STAT_BOOST_VARY.indexOf(ab) !== -1) {
        thisPoke.find(".ability-advanced").show();
        thisPoke.find(".ability-advanced").prop("checked", false);
    }
    else
        thisPoke.find(".ability-advanced").hide();
    thisPoke.find(".ability-proto-quark").hide();
    manualProtoQuark = false;
    transformCheck(thisPoke);
});

$("#p1 select.ability").bind("keyup change", function() {
    autosetWeather($(this).val(), 0, $("#p1").find(".abilityToggle").prop("checked"));
    if ($(this).val() == 'Teraform Zero') {
        removeWeather();
        removeTerrain();
    }
});
$("#p2 select.ability").bind("keyup change", function() {
    autosetWeather($(this).val(), 1, $("#p2").find(".abilityToggle").prop("checked"));
    if ($(this).val() == 'Teraform Zero') {
        removeWeather();
        removeTerrain();
    }
});

$("#p1 .abilityToggle").bind("keyup change", function () {
    ab = $("#p1").find("select.ability").val();
    if (ab === "Sand Spit")
        autosetWeather(ab, 0, $(this).prop("checked"));
    else if (ab === "Seed Sower")
        autoSetTerrain()
});
$("#p2 .abilityToggle").bind("keyup change", function () {
    ab = $("#p2").find("select.ability").val();
    if (ab === "Sand Spit")
        autosetWeather(ab, 0, $(this).prop("checked"));
    else if (ab === "Seed Sower")
        autoSetTerrain()
});

var lastHighestStat = [0,0];
$(".ability-advanced").bind("keyup change", function () {
    if ($(this).prop("checked")) {
        $(this).closest(".poke-info").find(".ability-proto-quark").show();
        manualProtoQuark = true;
    }
    else {
        $(this).closest(".poke-info").find(".ability-proto-quark").hide();
        manualProtoQuark = false;
    }
    $("#p1 .ability-proto-quark").val(lastHighestStat[0]);
    $("#p2 .ability-proto-quark").val(lastHighestStat[1]);
});

var lastTerrain = "noterrain";
var lastManualWeather = "";
var lastAutoWeather = ["", ""];
function autoSetAura()
{
    var ability1 = $("#p1 select.ability").val()
    var ability2 = $("#p2 select.ability").val()

        if (ability1 == "Fairy Aura" || ability2 == "Fairy Aura")
            $("input:checkbox[id='fairy-aura']").prop("checked", true)
        else
            $("input:checkbox[id='fairy-aura']").prop("checked", lastAura[0])
        if (ability1 == "Dark Aura" || ability2 == "Dark Aura")
            $("input:checkbox[id='dark-aura']").prop("checked", true)
        else
            $("input:checkbox[id='dark-aura']").prop("checked", lastAura[1])
        if (ability1 == "Aura Break" || ability2 == "Aura Break")
            $("input:checkbox[id='aura-break']").prop("checked", true)
        else
            $("input:checkbox[id='aura-break']").prop("checked", lastAura[2])
}

function autoSetRuin() {
    var ability1 = $("#p1 select.ability").val()
    var ability2 = $("#p2 select.ability").val()

    if (ability1 == "Tablets of Ruin" || ability2 == "Tablets of Ruin")
        $("input:checkbox[id='tablets-of-ruin']").prop("checked", true)
    else
        $("input:checkbox[id='tablets-of-ruin']").prop("checked", false)
    if (ability1 == "Vessel of Ruin" || ability2 == "Vessel of Ruin")
        $("input:checkbox[id='vessel-of-ruin']").prop("checked", true)
    else
        $("input:checkbox[id='vessel-of-ruin']").prop("checked", false)
    if (ability1 == "Sword of Ruin" || ability2 == "Sword of Ruin")
        $("input:checkbox[id='sword-of-ruin']").prop("checked", true)
    else
        $("input:checkbox[id='sword-of-ruin']").prop("checked", false)
    if (ability1 == "Beads of Ruin" || ability2 == "Beads of Ruin")
        $("input:checkbox[id='beads-of-ruin']").prop("checked", true)
    else
        $("input:checkbox[id='beads-of-ruin']").prop("checked", false)
}
function autoSetTerrain() {
    var ability1 = $("#p1 select.ability").val()
    var ability2 = $("#p2 select.ability").val()
    var abOn1 = $("#p1").find(".abilityToggle").prop("checked")
    var abOn2 = $("#p2").find(".abilityToggle").prop("checked")
    //Grassy Terrain check is first due to the need to check for abilityToggle with Seed Sower
    if ([ability1, ability2].indexOf("Grassy Surge") !== -1 || (ability1 == "Seed Sower" && abOn1) || (ability2 == "Seed Sower" && abOn2)) {
        $("input:radio[id='grassy']").prop("checked", true);
        lastTerrain = 'grassy';
    }
    else if ([ability1, ability2].indexOf("Electric Surge") != -1 || [ability1, ability2].indexOf("Hadron Engine") != -1) {
        $("input:radio[id='electric']").prop("checked", true);
        lastTerrain = 'electric';
    }
    else if ([ability1, ability2].indexOf("Misty Surge") !== -1) {
        $("input:radio[id='misty']").prop("checked", true);
        lastTerrain = 'misty';
    }
    else if ([ability1, ability2].indexOf("Psychic Surge") !== -1) {
        $("input:radio[id='psychic']").prop("checked", true);
        lastTerrain = 'psychic';
    }
    else
        $("input:radio[id='noterrain']").prop("checked", true);
}

function removeTerrain() {
    $("input:radio[id='noterrain']").prop("checked", true);
}

function autosetWeather(ability, i, abOn) {
    var currentWeather = $("input:radio[name='weather']:checked").val();
    if (lastAutoWeather.indexOf(currentWeather) === -1 || currentWeather === "") {
        lastManualWeather = currentWeather;
        lastAutoWeather[1-i] = "";
    }

    var primalWeather = ["Harsh Sun", "Heavy Rain"];
    var autoWeatherAbilities = {
        "Drought": "Sun",
        "Drizzle": "Rain",
        "Sand Stream": "Sand",
        "Snow Warning": "Hail",
        //"Sand Spit": "Sand",
        "Desolate Land": "Harsh Sun",
        "Primordial Sea": "Heavy Rain",
        "Delta Stream": "Strong Winds",
        "Orichalcum Pulse": "Sun",
    };
    var newWeather;

    if (gen >= 9) autoWeatherAbilities["Snow Warning"] = "Snow";
    if (ability === "Sand Spit" && abOn)
        autoWeatherAbilities["Sand Spit"] = "Sand";

    if (ability in autoWeatherAbilities) {
        lastAutoWeather[i] = autoWeatherAbilities[ability];
        if (currentWeather === "Strong Winds") {
            if (lastAutoWeather.indexOf("Strong Winds") === -1) {
                newWeather = lastAutoWeather[i];
            }
        } else if (primalWeather.indexOf(currentWeather) > -1) {
            if (lastAutoWeather[i] === "Strong Winds" || primalWeather.indexOf(lastAutoWeather[i]) > -1) {
                newWeather = lastAutoWeather[i];
            } else if (primalWeather.indexOf(lastAutoWeather[1-i]) > -1) {
                newWeather = lastAutoWeather[1-i];
            } else {
                newWeather = lastAutoWeather[i];
            }
        } else {
            newWeather = lastAutoWeather[i];
        }
    } else {
        lastAutoWeather[i] = "";
        newWeather = lastAutoWeather[1-i] !== "" ? lastAutoWeather[1-i] : lastManualWeather;
    }
    if (newWeather === "Strong Winds" || primalWeather.indexOf(newWeather) > -1) {
        //$("input:radio[name='weather']").prop("disabled", true);
        //edited out by squirrelboy1225 for doubles!
        $("input:radio[name='weather'][value='" + newWeather + "']").prop("disabled", false);
    } else if (typeof newWeather != "undefined") {
        for (var k = 0; k < $("input:radio[name='weather']").length; k++) {
            var val = $("input:radio[name='weather']")[k].value;
            if (primalWeather.indexOf(val) === -1 && val !== "Strong Winds") {
                $("input:radio[name='weather']")[k].disabled = false;
            } else {
                //$("input:radio[name='weather']")[k].disabled = true;
                //edited out by squirrelboy1225 for doubles!
            }
        }
    }
    $("input:radio[name='weather'][value='" + newWeather + "']").prop("checked", true);
}

function removeWeather() {
    $("input:radio[name='weather'][value='']").prop("checked", true);
}

function autoSetNeutralGas() {
    var ability1 = $("#p1 select.ability").val()
    var ability2 = $("#p2 select.ability").val()
    if ((ability1 == "Neutralizing Gas" || ability2 == "Neutralizing Gas")) {
        $("input:checkbox[id='neutralizingGas']").prop("checked", true);
    }
}

$(".item").bind("keyup change", function () {
    var thisMon = $(this).closest(".poke-info");
    setHitsVal(thisMon, thisMon.find("select.ability").val(), $(this).val());
    autosetStatus('#' + thisMon.attr('id'), $(this).val());
    autoSetType('#' + thisMon.attr('id'), $(this).val());
});

function autoSetType(p, item) {
    var ab = $(p + " select.ability").val();
    var name = $(p + " input.set-selector").val();
    var pokName = name.substring(0, name.indexOf(" ("));

    if (ab == "RKS System" && pokName == "Silvally") {
        if (item.indexOf("Memory") != -1) {
            $(p + " .type1").val(getMemoryType(item));
        }
        else {
            $(p + " .type1").val('Normal');
        }
    }
    else if (ab == "Multitype" && pokName == "Arceus") {
        if (item.indexOf("Plate") != -1)
            $(p + " .type1").val(getItemBoostType(item));
        else if (item.indexOf("ium Z") != -1 && getZType(item) !== '')
            $(p + " .type1").val(getZType(item));
        else
            $(p + " .type1").val('Normal');
    }
}

var lastManualStatus = {"#p1":"Healthy", "#p2":"Healthy"};
var lastAutoStatus = {"#p1":"Healthy", "#p2":"Healthy"};
function autosetStatus(p, item) {
    var currentStatus = $(p + " .status").val();
    if (currentStatus !== lastAutoStatus[p]) {
        lastManualStatus[p] = currentStatus;
    }
    if (item === "Flame Orb") {
        lastAutoStatus[p] = "Burned";
        $(p + " .status").val("Burned");
        $(p + " .status").change();
    } else if (item === "Toxic Orb") {
        lastAutoStatus[p] = "Badly Poisoned";
        $(p + " .status").val("Badly Poisoned");
        $(p + " .status").change();
    } else {
        lastAutoStatus[p] = "Healthy";
        if (currentStatus !== lastManualStatus[p]) {
            $(p + " .status").val(lastManualStatus[p]);
            $(p + " .status").change();
        }
    }
}

$(".status").bind("keyup change", function() {
    if ($(this).val() === 'Badly Poisoned') {
        $(this).parent().children(".toxic-counter").show();
    } else {
        $(this).parent().children(".toxic-counter").hide();
    }
});

// auto-update move details on select
$(".move-selector").change(function() {
    var moveName = $(this).val();
    var move = moves[moveName] || moves['(No Move)'];
    var moveGroupObj = $(this).parent();
    moveGroupObj.children(".move-bp").val(move.bp);
    moveGroupObj.children(".move-type").val(move.type);
    moveGroupObj.children(".move-cat").val(move.category);
    moveGroupObj.children(".move-crit").prop("checked", move.alwaysCrit === true);

    if (move.hitRange && move.hitRange.length == 2) {
        showHits(move.hitRange, moveGroupObj);
    }
    else {
        moveGroupObj.children(".move-hits").hide();
    }

    if (move.canDouble) moveGroupObj.children(".double-btn").show();
    else moveGroupObj.children(".double-btn").hide();

    if (move.linearAddBP) moveGroupObj.children(".move-linearAddedBP").show();
    else moveGroupObj.children(".move-linearAddedBP").hide();

    if (move.usesOppMoves) {    //for when the attacker's moves change
        getOppMoves($(this).closest(".poke-info").attr("id"), moveGroupObj);
        moveGroupObj.children(".move-opponent").show();
    } else {
        moveGroupObj.children(".move-opponent").hide();
    }

    if (move.isPledge) {
        moveGroupObj.children(".move-pledge").show();
        moveGroupObj.children(".move-pledge").val(moveName);
    }
    else moveGroupObj.children(".move-pledge").hide();

    moveGroupObj.children(".move-z").prop("checked", false);

    //SLOPPY WAY OF HANDLING
    glaiveRushCheck(moveGroupObj);
    transformCheck(moveGroupObj);
    getOppMoves($(this).closest(".poke-info").attr("id"));  //for when the defender's moves change
});

function showHits(hitBounds, moveGroupObj) {
    var moveHits = moveGroupObj.children(".move-hits");
    moveHits.find("option").hide();
    moveHits.show();
    for (var i = hitBounds[0]; i <= hitBounds[1]; i++) {
        moveHits.find('option[value="' + i + '"]').show();
    }
    if (hitBounds[0] === 2 && hitBounds[1] === 5) {
        moveHits.val(moveHits.closest(".poke-info").find("select.ability").val() === 'Skill Link' ? 5
            : moveHits.closest(".poke-info").find("select.item").val() === 'Loaded Dice' ? 4
                : 3);
    }
    else if (hitBounds[0] === 1 && hitBounds[1] === 2) {  //Use case only for Dragon Darts, for now.
        moveHits.val(1);
    }
    else if (hitBounds[0] === 1 && hitBounds[1] === 6) {  //Use case only for Beat Up. Sorry non-VGC players, it'll be stuck as 4
        moveHits.val(4);
    }
    else {
        moveHits.val(hitBounds[1]);
    }
}

//sloppy check for Glaive Rush checkbox
function glaiveRushCheck(divValue) {    //divValue should accept any div class, it's just meant to be a quick way to find which Pokemon it's checking
    pInfo = $(divValue).closest(".poke-info");
    pMoves = [pInfo.find(".move1").children("select.move-selector").val(),
        pInfo.find(".move2").children("select.move-selector").val(),
        pInfo.find(".move3").children("select.move-selector").val(),
        pInfo.find(".move4").children("select.move-selector").val()];

    if (pMoves.indexOf("Glaive Rush") != -1)
        pInfo.find(".glaive-rush").show();
    else {
        pInfo.find(".glaive-rush").hide();
        pInfo.find(".glaive-rush").prop("checked", false);
    }
}

function transformCheck(divValue) {    //divValue should accept any div class, it's just meant to be a quick way to find which Pokemon it's checking
    var pInfo = $(divValue).closest(".poke-info");
    var pMoves = [pInfo.find(".move1").children("select.move-selector").val(),
    pInfo.find(".move2").children("select.move-selector").val(),
    pInfo.find(".move3").children("select.move-selector").val(),
    pInfo.find(".move4").children("select.move-selector").val()];
    var pAbility = pInfo.find("select.ability").val();
    var transformObj = pInfo.find(".transform").parent();
    var isTransformed = pInfo.find(".transform").prop("checked");
    var otherPInfo = pInfo.attr("id") == "p1" ? $("#p2 .panel-body") : $("#p1 .panel-body");
    var otherPName = otherPInfo.find("input.set-selector").val();
    if (otherPName) {
        otherPName = otherPName.substring(0, otherPName.indexOf(" ("));

        if (pMoves.indexOf("Transform") != -1 || pAbility == "Imposter" || isTransformed) {
            transformObj.show();
        }
        else {
            transformObj.hide();
            transformObj.prop("checked", false);
        }
        if (!isTransformed && (otherPInfo.find(".transform").prop("checked") || (otherPInfo.find("select.ability").val() == "Good as Gold" && pAbility != "Imposter")
            || (otherPInfo.find(".tera").prop("checked") && (otherPName.indexOf("Ogerpon") != -1 || otherPName.indexOf("Terapagos") != -1)))) {
            pInfo.find(".transform").prop("disabled", true);
        }
        else {
            $(".transform").prop("disabled", false);
            if (isTransformed)
                otherPInfo.find(".transform").prop("disabled", true);
        }
    }
}

function getOppMoves(pokID, moveGroupObj) {
    var oppMoveOptions;
    if (moveGroupObj) {
        if (pokID == 'p1') {
            var oppMoves = [$("#p2 .move1 select.move-selector").val(),
            $("#p2 .move2 select.move-selector").val(),
            $("#p2 .move3 select.move-selector").val(),
            $("#p2 .move4 select.move-selector").val(),];
            oppMoveOptions = getSelectOptions(oppMoves);
            moveGroupObj.children(".move-opponent").find("option").remove().end().append(oppMoveOptions);
        }
        else if (pokID == 'p2') {
            var oppMoves = [$("#p1 .move1 select.move-selector").val(),
            $("#p1 .move2 select.move-selector").val(),
            $("#p1 .move3 select.move-selector").val(),
            $("#p1 .move4 select.move-selector").val(),];
            oppMoveOptions = getSelectOptions(oppMoves);
            moveGroupObj.children(".move-opponent").find("option").remove().end().append(oppMoveOptions);
        }
    }
    else {
        var oppMoves = [$("#" + pokID + " .move1 select.move-selector").val(),
            $("#" + pokID + " .move2 select.move-selector").val(),
            $("#" + pokID + " .move3 select.move-selector").val(),
            $("#" + pokID + " .move4 select.move-selector").val(),];
        oppMoveOptions = getSelectOptions(oppMoves);
        if (pokID == 'p1') {
            for (i = 1; i <= 4; i++) {
                if ($("#p2 .move" + i + " .move-opponent").is(":visible")) {
                    $("#p2 .move" + i + " .move-opponent").find("option").remove().end().append(oppMoveOptions);
                }
            }
        }
        else if (pokID == 'p2') {
            for (i = 1; i <= 4; i++) {
                if ($("#p1 .move" + i + " .move-opponent").is(":visible")) {
                    $("#p1 .move" + i + " .move-opponent").find("option").remove().end().append(oppMoveOptions);
                }
            }
        }
    }
}

// auto-update set details on select
$(".set-selector").change(function() {
    var fullSetName = $(this).val();
    var pokemonName, setName;
    var DOU = !$('#douswitch').is(":checked");
    pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
    if (pokemonName === 'Spamton')
        run_spamton();
    else if (pokemonName === 'The Noise')
        run_noise();
    setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));
    var pokemon = pokedex[pokemonName];
    if (pokemon) {
        var pokeObj = $(this).closest(".poke-info");
        var otherObj = pokeObj.attr("id") == "p1" ? $("#p2") : $("#p1");

        // If the sticky move was on this side, reset it
        if (stickyMoves.getSelectedSide() === pokeObj.prop("id")) {
            stickyMoves.clearStickyMove();
        }
        pokeObj.find(".transform").prop("checked", false);

        pokeObj.find(".type1").val(pokemon.t1);
        pokeObj.find(".type2").val(pokemon.t2);
        pokeObj.find(".hp .base").val(pokemon.bs.hp);
        var i;
        for (i = 0; i < STATS.length; i++) {
            pokeObj.find("." + STATS[i] + " .base").val(pokemon.bs[STATS[i]]);
        }
        pokeObj.find(".weight").val(pokemon.w);
        pokeObj.find(".boost").val(0);
        pokeObj.find(".percent-hp").val(100);
        pokeObj.find(".status").val("Healthy");
        $(".status").change();
        var moveObj;
        var abilityObj = pokeObj.find("select.ability");
        var itemObj = pokeObj.find("select.item");
        if (pokemonName in setdex && setName in setdex[pokemonName]) {
            var set = setdex[pokemonName][setName];
            if ($.isEmptyObject(setdexCustom) == false && pokemonName in setdexCustom && setName in setdexCustom[pokemonName]
                && LEFT_SIDEBAR_NAMES.indexOf(setName) == -1 && RIGHT_SIDEBAR_NAMES.indexOf(setName) == -1) {
                $(this).closest(".poke-info").find(".setCalc").val(setName);
                $(this).closest(".poke-info").find(".delset").show();
            }
            else {
                $(this).closest(".poke-info").find(".setCalc").val("My Calc Set");
                $(this).closest(".poke-info").find(".delset").hide();
            }
            if (DOU) {
                if (set.level && set.level != 50)
                    pokeObj.find(".level").val(set.level);
                else
                    pokeObj.find(".level").val(100);
            }
            else {
                if (gen <= 6 && set.level && set.level < 50)
                    pokeObj.find(".level").val(set.level);
                else
                    pokeObj.find(".level").val(50);
            }
            pokeObj.find(".hp .evs").val((set.evs && typeof set.evs.hp !== "undefined") ? set.evs.hp : 0);
            pokeObj.find(".hp .ivs").val((set.ivs && typeof set.ivs.hp !== "undefined") ? set.ivs.hp : 31);
            pokeObj.find(".hp .dvs").val((set.dvs && typeof set.dvs.hp !== "undefined") ? set.dvs.hp : 15);
            for (i = 0; i < STATS.length; i++) {
                pokeObj.find("." + STATS[i] + " .evs").val((set.evs && typeof set.evs[STATS[i]] !== "undefined") ? set.evs[STATS[i]] : 0);
                pokeObj.find("." + STATS[i] + " .ivs").val((set.ivs && typeof set.ivs[STATS[i]] !== "undefined") ? set.ivs[STATS[i]] : 31);
                pokeObj.find("." + STATS[i] + " .dvs").val((set.dvs && typeof set.dvs[STATS[i]] !== "undefined") ? set.dvs[STATS[i]] : 15);
            }
            setSelectValueIfValid(pokeObj.find(".nature"), set.nature, "Serious");
            setSelectValueIfValid(abilityObj, set.ability, pokemon.ab ? pokemon.ab : "");   //necessary check; custom sets with abilities different to defaults will have the default ability instead, and custom sets with non-existent abilities won't default to (other)
            setSelectValueIfValid(itemObj, set.item, "");
            for (i = 0; i < 4; i++) {
                moveObj = pokeObj.find(".move" + (i+1) + " select.move-selector");
                setSelectValueIfValid(moveObj, set.moves[i], "(No Move)");
                moveObj.change();
            }
            if (set.tera_type)
                pokeObj.find(".tera-type").val(set.tera_type);
            else
                pokeObj.find(".tera-type").val(pokemon.t1);
        } else {
            if(DOU) pokeObj.find(".level").val(100);
            else pokeObj.find(".level").val(50);
            pokeObj.find(".hp .evs").val(0);
            pokeObj.find(".hp .ivs").val(31);
            pokeObj.find(".hp .dvs").val(15);
            for (i = 0; i < STATS.length; i++) {
                pokeObj.find("." + STATS[i] + " .evs").val(0);
                pokeObj.find("." + STATS[i] + " .ivs").val(31);
                pokeObj.find("." + STATS[i] + " .dvs").val(15);
            }
            pokeObj.find(".nature").val("Serious");
            setSelectValueIfValid(abilityObj, pokemon.ab, "");  //necessary check; blank abilities won't update to their defaults otherwise
            itemObj.val("");
            for (i = 0; i < 4; i++) {
                moveObj = pokeObj.find(".move" + (i+1) + " select.move-selector");
                moveObj.val("(No Move)");
                moveObj.change();
            }
            pokeObj.find(".tera-type").val(pokemon.t1);
        }
        var formeObj = $(this).siblings().find(".forme").parent();
        itemObj.prop("disabled", false);
        if (pokemon.formes) {
            showFormes(formeObj, setName, pokemonName, pokemon);
        } else {
            formeObj.hide();
        }
        pokeObj.find(".max").prop("checked", false);
        pokeObj.find(".tera").prop("checked", false);
        pokeObj.find(".tera").change();
        calcHP(pokeObj);
        calcStats(pokeObj);
        calcEvTotal(pokeObj);
        abilityObj.change();
        itemObj.change();
        transformCheck(otherObj);
        pokeObj.find(".editsc").prop("disabled", false);
        pokeObj.find(".addsc").prop("disabled", false);
        pokeObj.find(".setCalc").parent().children().prop("disabled", false);
    }
});

function showFormes(formeObj, setName, pokemonName, pokemon) {
    var defaultForme = 0;
    var gmaxDefaults = ['Venusaur', 'Charizard', 'Blastoise', 'Butterfree', 'Pikachu', 'Meowth', 'Gengar', 'Kingler', 'Lapras', 'Eevee', 'Snorlax', 'Garbodor',
        'Rillaboom', 'Cinderace', 'Inteleon', 'Orbeetle', 'Coalossal', 'Flapple', 'Sandaconda', 'Toxtricity', 'Centiskorch', 'Hatterene', 'Grimmsnarl',
        'Alcremie', 'Copperajah', 'Urshifu-Single Strike', 'Urshifu-Rapid Strike'];

    if (setName !== 'Blank Set') {
        var set = setdex[pokemonName][setName];

        // Repurpose the previous filtering code to provide the "different default" logic
        if (set.item) {
            if ((set.item.indexOf('ite') !== -1 && set.item.indexOf('ite Y') === -1) ||
                (pokemonName === "Groudon" && set.item.indexOf("Red Orb") !== -1) ||
                (pokemonName === "Kyogre" && set.item.indexOf("Blue Orb") !== -1) ||
                (pokemonName === "Meloetta" && set.moves.indexOf("Relic Song") !== -1) ||
                (pokemonName === "Rayquaza" && set.moves.indexOf("Dragon Ascent") !== -1)) {
                defaultForme = 1;
            } else if (set.item.indexOf('ite Y') !== -1) {
                defaultForme = 2;
            }
        }
    }

    if (pokemonName === "Palafin" || pokemonName === "Terapagos")
        defaultForme = 1;
    else if (gen == 8 && !defaultForme && gmaxDefaults.indexOf(pokemonName) != -1)
        defaultForme = pokedex[pokemonName].formes.indexOf(pokemonName + "-Gmax");

    var formeOptions = getSelectOptions(pokemon.formes, false, defaultForme);
    formeObj.children("select").find("option").remove().end().append(formeOptions).change();
    formeObj.show();
}

function setSelectValueIfValid(select, value, fallback) {
    select.val(select.children('option[value="' + value + '"]').length !== 0 ? value : fallback);
}

$(".forme").change(function() {
    var altForme = pokedex[$(this).val()],
        container = $(this).closest(".info-group").siblings(),
        fullSetName = container.find(".select2-chosen").first().text(),
        pokemonName = fullSetName.substring(0, fullSetName.indexOf(" (")),
        setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));

    $(this).parent().siblings().find(".type1").val(altForme.t1);
    $(this).parent().siblings().find(".type2").val(typeof altForme.t2 != "undefined" ? altForme.t2 : "");
    $(this).parent().siblings().find(".weight").val(altForme.w);
    //$(this).parent().siblings().find(".canEvolve").val(altForme.canEvolve);
    var STATS_WITH_HP = ["hp", "at", "df", "sa", "sd", "sp"];
    var prevCurrHP = container.find(".current-hp").val(), prevMaxHP = container.find(".max-hp").text();
    for (var i = 0; i <STATS_WITH_HP.length; i++) {
        var baseStat = container.find("." + STATS_WITH_HP[i]).find(".base");
        baseStat.val(altForme.bs[STATS_WITH_HP[i]]);
        baseStat.keyup();
    }
    var newMaxHP = container.find(".max-hp").text();
    if (prevMaxHP !== newMaxHP) {
        container.find(".current-hp").val(Math.max(0, parseInt(prevCurrHP) + (parseInt(newMaxHP) - parseInt(prevMaxHP))));
        container.find(".current-hp").keyup();
    }

    if (abilities.indexOf(altForme.ab) > -1) {
        container.find(".ability").val(altForme.ab);
    } else if (setName !== "Blank Set" && abilities.indexOf(setdex[pokemonName][setName].ability) > -1) {
        container.find(".ability").val(setdex[pokemonName][setName].ability);
    } else {
        container.find(".ability").val("");
    }
    container.find(".ability").keyup();
    container.find(".ability").trigger("change.select2");

    if (pokemonName === "Darmanitan") {
        container.find(".percent-hp").val($(this).val() === "Darmanitan-Zen" ? "50" : "100").keyup();
    }
});

function getTerrainEffects() {
    var className = $(this).prop("className");
    className = className.substring(0, className.indexOf(" "));
    switch (className) {
        case "type1":
        case "type2":
        case "ability":
        case "item":
            var id = $(this).closest(".poke-info").prop("id");
            var terrainValue = $("input:checkbox[name='terrain']:checked").val();
            if (terrainValue === "Electric") {
                $("#" + id).find("[value='Asleep']").prop("disabled", isGrounded($("#" + id)));
            } else if (terrainValue === "Misty") {
                $("#" + id).find(".status").prop("disabled", isGrounded($("#" + id)));
            }
            break;
        default:
            $("input:checkbox[name='terrain']").not(this).prop("checked", false);
            if ($(this).prop("checked") && $(this).val() === "Electric") {
                $("#p1").find("[value='Asleep']").prop("disabled", isGrounded($("#p1")));
                $("#p2").find("[value='Asleep']").prop("disabled", isGrounded($("#p2")));
            } else if ($(this).prop("checked") && $(this).val() === "Misty") {
                $("#p1").find(".status").prop("disabled", isGrounded($("#p1")));
                $("#p2").find(".status").prop("disabled", isGrounded($("#p2")));
            } else {
                $("#p1").find("[value='Asleep']").prop("disabled", false);
                $("#p1").find(".status").prop("disabled", false);
                $("#p2").find("[value='Asleep']").prop("disabled", false);
                $("#p2").find(".status").prop("disabled", false);
            }
            break;
    }
}

function isGrounded(pokeInfo) {
    return $("#gravity").prop("checked") || (pokeInfo.find(".type1").val() !== "Flying" && pokeInfo.find(".type2").val() !== "Flying" &&
            pokeInfo.find("select.ability").val() !== "Levitate" && pokeInfo.find("select.item").val() !== "Air Balloon");
}

var resultLocations = [[],[]];
for (var i = 0; i < 4; i++) {
    resultLocations[0].push({
        "move":"#resultMoveL" + (i+1),
        "damage":"#resultDamageL" + (i+1)
    });
    resultLocations[1].push({
        "move":"#resultMoveR" + (i+1),
        "damage":"#resultDamageR" + (i+1)
    });
}

var damageResults;
function calculate() {
    var p1 = new Pokemon($("#p1"));
    var p2 = new Pokemon($("#p2"));
    var field = new Field();
    damageResults = calculateAllMoves(p1, p2, field);
    var result, minDamage, maxDamage, minPercent, maxPercent, percentText;
    var highestMaxPercent = -1;
    var bestResult;
    for (var i = 0; i < 4; i++) {
        p1.moves[i].painMax = (p1.moves[i].name === "Pain Split" && p1.isDynamax);
        result = damageResults[0][i];
        minDamage = result.damage[0] * p1.moves[i].hits;
        maxDamage = result.damage[result.damage.length-1] * p1.moves[i].hits;
        minPercent = Math.floor(minDamage * 1000 / p2.maxHP) / 10;
        maxPercent = Math.floor(maxDamage * 1000 / p2.maxHP) / 10;
        result.damageText = minDamage + "-" + maxDamage + " (" + minPercent + " - " + maxPercent + "%)";
        result.koChanceText = p1.moves[i].bp === 0 && p1.moves[i].category !== "Status" ? '<a href="https://www.youtube.com/watch?v=NFZjEgXIl1E&t=21s">how</a>'
                  : getKOChanceText(result.damage, p1.moves[i], p2, field.getSide(1), p1.ability === 'Bad Dreams');
        result.crit = p1.moves[i].isCrit
        if(p1.moves[i].isMLG && !($("#p1").find(".move" + (i + 1)).find(".move-z").prop("checked")) && !($("#p1").find(".max").prop("checked"))){
            result.koChanceText = "<a href = 'https://www.youtube.com/watch?v=KGzH7ZR4BXs&t=19s'>is it a one-hit KO?!</a>"; //dank memes
        }
        $(resultLocations[0][i].move + " + label").text(p1.moves[i].name.replace("Hidden Power", "HP"));
        $(resultLocations[0][i].damage).text(minPercent + " - " + maxPercent + "%");
        if (maxPercent > highestMaxPercent) {
            highestMaxPercent = maxPercent;
            bestResult = $(resultLocations[0][i].move);
        }

        p2.moves[i].painMax = (p2.moves[i].name === "Pain Split" && p2.isDynamax);
        result = damageResults[1][i];
        minDamage = result.damage[0] * p2.moves[i].hits;
        maxDamage = result.damage[result.damage.length-1] * p2.moves[i].hits;
        minPercent = Math.floor(minDamage * 1000 / p1.maxHP) / 10;
        maxPercent = Math.floor(maxDamage * 1000 / p1.maxHP) / 10;
        result.damageText = minDamage + "-" + maxDamage + " (" + minPercent + " - " + maxPercent + "%)";
        result.koChanceText = p2.moves[i].bp === 0 && p2.moves[i].category !== "Status" ? '<a href="https://www.youtube.com/watch?v=NFZjEgXIl1E&t=21s">how</a>'
                : getKOChanceText(result.damage, p2.moves[i], p1, field.getSide(0), p2.ability === 'Bad Dreams');
        result.crit = p2.moves[i].isCrit
        if (p2.moves[i].isMLG && !($("#p2").find(".move" + (i + 1)).find(".move-z").prop("checked")) && !($("#p2").find(".max").prop("checked"))){
            result.koChanceText = "<a href = 'https://www.youtube.com/watch?v=KGzH7ZR4BXs&t=19s'>is it a one-hit KO?!</a>";
        }
        $(resultLocations[1][i].move + " + label").text(p2.moves[i].name.replace("Hidden Power", "HP"));
        $(resultLocations[1][i].damage).text(minPercent + " - " + maxPercent + "%");
        if (maxPercent > highestMaxPercent) {
            highestMaxPercent = maxPercent;
            bestResult = $(resultLocations[1][i].move);
        }
    }
    if ($('.locked-move').length) {
        bestResult = $('.locked-move');
    } else {
        stickyMoves.setSelectedMove(bestResult.prop("id"));
    }
    temp_crit = bestResult.crit;
    bestResult.prop("checked", true);
    bestResult.change();
    $("#resultHeaderL").text(p1.name + "'s Moves (select one to show detailed results)");
    $("#resultHeaderR").text(p2.name + "'s Moves (select one to show detailed results)");
}

$(".result-move").change(function() {
    if (damageResults) {
        var result = findDamageResult($(this));
        if (result) {
            $("#mainResult").html(result.description + ": " + result.damageText + " -- " + result.koChanceText);
            if (result.parentDamage) {
                if (result.child2Damage && result.child2Damage !== -1) {
                    $("#damageValues").text("(First hit: " + result.parentDamage.join(", ") +
                        "; Second hit: " + result.childDamage.join(", ") +
                        "; Third hit: " + result.child2Damage.join(", ") + ")");
                }
                else {
                    $("#damageValues").text("(First hit: " + result.parentDamage.join(", ") +
                        "; Second hit: " + result.childDamage.join(", ") + ")");
                }
            }
            else {
                $("#damageValues").text("(" + result.damage.join(", ") + ")");
            }
            //checkCrit(result.crit)
        }
    }
});

// Need to close over "lastClicked", so we'll do it the old-fashioned way to avoid
// needlessly polluting the global namespace.
var stickyMoves = (function () {
    var lastClicked = 'resultMoveL1';
    $(".result-move").click(function () {
        if (this.id === lastClicked) {
            $(this).toggleClass("locked-move");
        } else {
            $('.locked-move').removeClass('locked-move');
        }
        lastClicked = this.id;
    });

    return {
        clearStickyMove: function () {
            lastClicked = null;
            $('.locked-move').removeClass('locked-move');
        },
        setSelectedMove: function (slot) {
            lastClicked = slot;
        },
        getSelectedSide: function () {
            if (lastClicked) {
                if (lastClicked.indexOf('resultMoveL') !== -1) {
                    return 'p1';
                } else if (lastClicked.indexOf('resultMoveR') !== -1) {
                    return 'p2';
                }
            }
            return null;
        }
    };
})();

function findDamageResult(resultMoveObj) {
    var selector = "#" + resultMoveObj.attr("id");
    for (var i = 0; i < resultLocations.length; i++) {
        for (var j = 0; j < resultLocations[i].length; j++) {
            if (resultLocations[i][j].move === selector) {
                return damageResults[i][j];
            }
        }
    }
}

function Pokemon(pokeInfo) {
    var setName = pokeInfo.find("input.set-selector").val();

    if (setName.indexOf("(") === -1) {
        this.name = setName;
    } else {
        var pokemonName = setName.substring(0, setName.indexOf(" ("));
        this.name = (pokedex[pokemonName] && pokedex[pokemonName].formes) ? pokeInfo.find(".forme").val() : pokemonName;
    }

    //Check for form-item coordination
    var lockItemCheck = LOCK_ITEM_LOOKUP[this.name];
    if (lockItemCheck === "Griseous Orb" && gen >= 9)
        lockItemCheck = "Griseous Core";
        //lockItemCheck = LOCK_ITEM_LOOKUP[''];               
    if (lockItemCheck !== undefined) {
        if (this.name && pokemonName && (this.name.includes(pokemonName) || this.name === "Ultra Necrozma")) {    //if this if statement isn't here then sets won't change items from locked items properly
            pokeInfo.find(".item").val(lockItemCheck);
            pokeInfo.find(".item").trigger('change.select2');
        }
        pokeInfo.find(".item").prop("disabled", true);
    }
    else {
        pokeInfo.find(".item").prop("disabled", false);
    }

    //Check for ability to Dynamax
    if (["Zacian", "Zacian-Crowned", "Zamazenta", "Zamazenta-Crowned", "Eternatus"].indexOf(this.name) !== -1
        || ["Zacian", "Zacian-Crowned", "Zamazenta", "Zamazenta-Crowned", "Eternatus"].indexOf(transformSpecies[pokeInfo.attr('id')]) !== -1) {
        pokeInfo.find(".max").prop("checked", false);
        pokeInfo.find(".max").prop("disabled", true);
    }
    else {
        pokeInfo.find(".max").prop("disabled", false);
    }

    //Check for Tera related permissions (change Tera Type, Terastalize disabled for "baby" Terapagos)
    if (this.name && this.name.indexOf('Ogerpon') !== -1) {
        var itemCheck = pokeInfo.find("select.item").val();
        var mask = itemCheck !== null ? itemCheck.substring(0, itemCheck.indexOf(" Mask")) : '';

        if (this.name.indexOf(mask) !== -1) {
            var maskTera = mask === 'Wellspring' ? 'Water'
                : mask === 'Hearthflame' ? 'Fire'
                    : mask === 'Cornerstone' ? 'Rock'
                        : 'Grass';
            pokeInfo.find(".tera-type").val(maskTera);
            pokeInfo.find(".tera-type").prop("disabled", true);
        }
        pokeInfo.find(".tera").prop("disabled", false);
    }
    else if (this.name && this.name.indexOf('Terapagos') !== -1) {
        pokeInfo.find(".tera-type").val('Stellar');
        pokeInfo.find(".tera-type").prop("disabled", true);
        if (this.name === 'Terapagos-Terastal') {
            if (pokeInfo.find(".tera").prop("checked")) this.name = 'Terapagos-Stellar';
            pokeInfo.find(".tera").prop("disabled", false);
        }
        else {
            pokeInfo.find(".tera").prop("disabled", true);
        }
    }
    else {
        pokeInfo.find(".tera-type").prop("disabled", false);
        pokeInfo.find(".forme").prop("disabled", false);
        if (transformSpecies[pokeInfo.attr("id")].indexOf('Ogerpon') != -1 || transformSpecies[pokeInfo.attr("id")].indexOf('Terapagos') != -1)
            pokeInfo.find(".tera").prop("disabled", true);
        else
            pokeInfo.find(".tera").prop("disabled", false);
    }

    this.type1 = pokeInfo.find(".type1").val();
    this.type2 = pokeInfo.find(".type2").val();
    this.tera_type = pokeInfo.find(".tera-type").val();
    this.level = ~~pokeInfo.find(".level").val();
    this.maxHP = ~~pokeInfo.find(".hp .total").text();
    this.curHP = ~~pokeInfo.find(".current-hp").val();
    this.HPEVs = ~~pokeInfo.find(".hp .evs").val();
    this.HPIVs = ~~pokeInfo.find(".hp .ivs").val();
    this.isDynamax = pokeInfo.find(".max").prop("checked");
    this.isTerastalize = pokeInfo.find(".tera").prop("checked");
    this.rawStats = {};
    this.boosts = {};
    this.stats = {};
    this.evs = {};
    if (gen >= 3) {
        this.ivs = {};
    }
    for (var i = 0; i < STATS.length; i++) {
        this.rawStats[STATS[i]] = ~~pokeInfo.find("." + STATS[i] + " .total").text();
        this.boosts[STATS[i]] = ~~pokeInfo.find("." + STATS[i] + " .boost").val();
        this.evs[STATS[i]] = ~~pokeInfo.find("." + STATS[i] + " .evs").val();
        if (gen >= 3) {
            this.ivs[STATS[i]] = ~~pokeInfo.find("." + STATS[i] + " .ivs").val();
        }
    }
    this.nature = pokeInfo.find(".nature").val();
    this.ability = pokeInfo.find("select.ability").val();
    this.abilityOn = pokeInfo.find(".abilityToggle").prop("checked");
    this.supremeOverlord = ~~pokeInfo.find(".ability-supreme").val();
    this.highestStat = pokeInfo.find(".ability-advanced").prop("checked") ? ~~pokeInfo.find(".ability-proto-quark").val() : -1;
    this.item = pokeInfo.find("select.item").val();
    this.status = pokeInfo.find(".status").val();
    this.toxicCounter = this.status === 'Badly Poisoned' ? ~~pokeInfo.find(".toxic-counter").val() : 0;
    this.moves = [
        getMoveDetails(pokeInfo.find(".move1"), this.isDynamax),
        getMoveDetails(pokeInfo.find(".move2"), this.isDynamax),
        getMoveDetails(pokeInfo.find(".move3"), this.isDynamax),
        getMoveDetails(pokeInfo.find(".move4"), this.isDynamax)
    ];
    this.glaiveRushMod = pokeInfo.find(".glaive-rush").prop("checked");
    this.weight = +pokeInfo.find(".weight").val();
    this.canEvolve = pokedex[pokemonName] ? pokedex[pokemonName].canEvolve : false;
    this.isTransformed = pokeInfo.find(".transform").prop("checked");
    if (this.isTransformed) this.name = this.name + " (" + transformSpecies[pokeInfo.attr("id")] + ")";
}

function getMoveDetails(moveInfo, maxMon) {
    var moveName = moveInfo.find("select.move-selector").val();
    var defaultDetails = moves[moveName];
    return $.extend({}, defaultDetails, {
        name: moveName,
        bp: ~~moveInfo.find(".move-bp").val(),
        type: moveInfo.find(".move-type").val(),
        category: moveInfo.find(".move-cat").val(),
        isCrit: moveInfo.find(".move-crit").prop("checked"),
        isZ: moveInfo.find(".move-z").prop("checked"),
        hits: (defaultDetails.hitRange && !defaultDetails.isTripleHit && !moveInfo.find(".move-z").prop("checked") && !maxMon)
            ? (defaultDetails.hitRange.length == 2 ? ~~moveInfo.find(".move-hits").val() : defaultDetails.hitRange)
            : 1,
        isDouble: (defaultDetails.canDouble && !moveInfo.find(".move-z").prop("checked") && !maxMon && moveInfo.find(".move-double").prop("checked")) ? 1 : 0,
        tripleHits: (defaultDetails.isTripleHit && !moveInfo.find(".move-z").prop("checked") && !maxMon) ? ~~moveInfo.find(".move-hits").val() : 0,
        combinePledge: (defaultDetails.isPledge && !moveInfo.find(".move-z").prop("checked") && !maxMon) ? moveInfo.find(".move-pledge").val() : 0,
        timesAffected: (defaultDetails.linearAddBP && !moveInfo.find(".move-z").prop("checked") && !maxMon) ? ~~moveInfo.find(".move-linearAddedBP").val() : 0,
        usedOppMove: moveInfo.find(".move-opponent option:selected").text(),
        getsStellarBoost: moveInfo.find(".move-stellar").prop("checked"),
    });
}

function Field() {
    var format = $("input:radio[name='format']:checked").val();
    var isGravity = $("#gravity").prop("checked");
    var isSR = [$("#srL").prop("checked"), $("#srR").prop("checked")];
    var isProtect = [$("#protectL").prop("checked"), $("#protectR").prop("checked")];
    var weather;
    var spikes;
    if (gen === 2) {
        spikes = [$("#gscSpikesL").prop("checked") ? 1 : 0, $("#gscSpikesR").prop("checked") ? 1 : 0];
        weather = $("input:radio[name='gscWeather']:checked").val();
    } 
    else {
        weather = $("input:radio[name='weather']:checked").val();
        spikes = [~~$("input:radio[name='spikesL']:checked").val(), ~~$("input:radio[name='spikesR']:checked").val()];
    }
    var terrain = ($("input:radio[name='terrain']:checked").val()) ? $("input:radio[name='terrain']:checked").val() : "";
    var isReflect = [$("#reflectL").prop("checked"), $("#reflectR").prop("checked")];
    var isLightScreen = [$("#lightScreenL").prop("checked"), $("#lightScreenR").prop("checked")];
    var isForesight = [$("#foresightL").prop("checked"), $("#foresightR").prop("checked")];
    var isHelpingHand = [$("#helpingHandR").prop("checked"), $("#helpingHandL").prop("checked")]; // affects attacks against opposite side
    var isGMaxField = [$("#gMaxFieldL").prop("checked"), $("#gMaxFieldR").prop("checked")];
    var isNeutralizingGas = $("#neutralizingGas").prop("checked");
    var isFriendGuard = (!isNeutralizingGas) ? [$("#friendGuardL").prop("checked"), $("#friendGuardR").prop("checked")] : false;
    var isBattery = (!isNeutralizingGas) ? [$("#batteryR").prop("checked"), $("#batteryL").prop("checked")] : false;
    var isPowerSpot = (!isNeutralizingGas) ? [$("#powerSpotR").prop("checked"), $("#powerSpotL").prop("checked")] : false; // affects attacks against opposite side
    var isSteelySpirit = (!isNeutralizingGas) ? [$("#steelySpiritR").prop("checked"), $("#steelySpiritL").prop("checked")] : false; // affects attacks against opposite side
    var isFlowerGiftSpD = (!isNeutralizingGas) ? [$("#flowerGiftL").prop("checked"), $("#flowerGiftR").prop("checked")] : false;
    var isFlowerGiftAtk = (!isNeutralizingGas) ? [$("#flowerGiftR").prop("checked"), $("#flowerGiftL").prop("checked")] : false;
    var isTailwind = [$("#tailwindL").prop("checked"), $("#tailwindR").prop("checked")];
    var isSaltCure = [$("#saltCureL").prop("checked"), $("#saltCureR").prop("checked")];
    var isAuroraVeil = [$("#auroraVeilL").prop("checked"), $("#auroraVeilR").prop("checked")];
    var isSwamp = [$("#swampL").prop("checked"), $("#swampR").prop("checked")];
    var isSeaFire = [$("#seaFireL").prop("checked"), $("#seaFireR").prop("checked")];

    this.getNeutralGas = function () {
        return isNeutralizingGas;
    }
    this.getTailwind = function (i) {
        return isTailwind[i];
    }
    this.getWeather = function() {
        return weather;
    };
    this.getTerrain = function() {
        return terrain;
    };
    this.getSwamp = function (i) {
        return isSwamp[i];
    }
    this.clearWeather = function() {
        weather = "";
    };
    this.clearTerrain = function () {
        terrain = "";
    };
    this.getSide = function (i) {
        return new Side(format, terrain, weather, isGravity, isSR[i], spikes[i], isReflect[i], isLightScreen[i], isForesight[i], isHelpingHand[i], isFriendGuard[i], isBattery[i], isProtect[i], isPowerSpot[i], isSteelySpirit[i], isNeutralizingGas, isGMaxField[i], isFlowerGiftSpD[i], isFlowerGiftAtk[i], isTailwind[i], isSaltCure[i], isAuroraVeil[i], isSwamp[i], isSeaFire[i]);
    };
}

function Side(format, terrain, weather, isGravity, isSR, spikes, isReflect, isLightScreen, isForesight, isHelpingHand, isFriendGuard, isBattery, isProtect, isPowerSpot, isSteelySpirit, isNeutralizingGas, isGmaxField, isFlowerGiftSpD, isFlowerGiftAtk, isTailwind, isSaltCure, isAuroraVeil, isSwamp, isSeaFire) {
    this.format = format;
    this.terrain = terrain;
    this.weather = weather;
    this.isGravity = isGravity;
    this.isSR = isSR;
    this.spikes = spikes;
    this.isReflect = isReflect;
    this.isLightScreen = isLightScreen;
    this.isForesight = isForesight;
    this.isHelpingHand = isHelpingHand;
    this.isFriendGuard = isFriendGuard;
    this.isBattery = isBattery;
    this.isProtect = isProtect;
    this.isPowerSpot = isPowerSpot;
    this.isSteelySpirit = isSteelySpirit;
    this.isNeutralizingGas = isNeutralizingGas;
    this.isGMaxField = isGmaxField;
    this.isFlowerGiftSpD = isFlowerGiftSpD;
    this.isFlowerGiftAtk = isFlowerGiftAtk;
    this.isTailwind = isTailwind;
    this.isSaltCure = isSaltCure;
    this.isAuroraVeil = isAuroraVeil;
    this.isSwamp = isSwamp;
    this.isSeaFire = isSeaFire;
}

var gen, pokedex, setdex, setdexCustom, typeChart, moves, abilities, items, STATS, calculateAllMoves, calcHP, calcStat;

$(".gen").change(function () {
    gen = ~~$(this).val();
    localStorage.setItem("gen", gen);

    loadSVColors(document.getElementById('switchTheme').value);     //

    switch (gen) {
        case 1: //Gen 1
            pokedex = POKEDEX_RBY;
            //setdex = SETDEX_RBY;
            //setdexCustom = [];
            typeChart = TYPE_CHART_RBY;
            moves = MOVES_RBY;
            items = [];
            abilities = [];
            STATS = STATS_RBY;
            calculateAllMoves = CALCULATE_ALL_MOVES_RBY;
            calcHP = CALC_HP_RBY;
            calcStat = CALC_STAT_RBY;
            break;
        case 2: //Gen 2
            pokedex = POKEDEX_GSC;
            //setdex = SETDEX_GSC;
            //setdexCustom = [];
            typeChart = TYPE_CHART_GSC;
            moves = MOVES_GSC;
            items = ITEMS_GSC;
            abilities = [];
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_GSC;
            calcHP = CALC_HP_RBY;
            calcStat = CALC_STAT_RBY;
            break;
        case 3: //Gen 3
            pokedex = POKEDEX_ADV;
            //setdex = SETDEX_ADV;
            //setdexCustom = SETDEX_CUSTOM_ADV;
            typeChart = TYPE_CHART_GSC;
            moves = MOVES_ADV;
            items = ITEMS_ADV;
            abilities = ABILITIES_ADV;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_ADV;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
        case 4: //Gen 4
            pokedex = POKEDEX_DPP;
            //setdex = SETDEX_DPP;
            //setdexCustom = SETDEX_CUSTOM_DPP;
            typeChart = TYPE_CHART_GSC;
            moves = MOVES_DPP;
            items = ITEMS_DPP;
            abilities = ABILITIES_DPP;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_DPP;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
        case 5: //Gen 5
            pokedex = POKEDEX_BW;
            //setdex = SETDEX_BW;
            //setdexCustom = SETDEX_CUSTOM_BW;
            typeChart = TYPE_CHART_BW;
            moves = MOVES_BW;
            items = ITEMS_BW;
            abilities = ABILITIES_BW;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_XY;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
        case 6: //Gen 6
            pokedex = POKEDEX_XY;
            //setdex = SETDEX_XY;
            //setdexCustom = SETDEX_CUSTOM_XY;
            typeChart = TYPE_CHART_XY;
            moves = MOVES_XY;
            items = ITEMS_XY;
            abilities = ABILITIES_XY;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_XY;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
        case 7: //Gen 7
            pokedex = POKEDEX_SM;
            //setdex = SETDEX_SM;
            //setdexCustom = SETDEX_CUSTOM_SM;
            typeChart = TYPE_CHART_XY;
            moves = MOVES_SM;
            items = ITEMS_SM;
            abilities = ABILITIES_SM;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_SV;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
        case 8: //Gen 8 SwSh+BDSP
            pokedex = (localStorage.getItem("dex") == "natdex") ? POKEDEX_SS_NATDEX : POKEDEX_SS;
            //setdex = SETDEX_SS;
            //setdexCustom = SETDEX_CUSTOM_SS;
            typeChart = TYPE_CHART_XY;
            moves = (localStorage.getItem("dex") == "natdex") ? MOVES_SS_NATDEX : MOVES_SS;
            items = (localStorage.getItem("dex") == "natdex") ? ITEMS_SS_NATDEX : ITEMS_SS;
            abilities = ABILITIES_SS;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_SV;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
        case 9: //Gen 9 SV
            pokedex = (localStorage.getItem("dex") == "natdex") ? POKEDEX_SV_NATDEX :  POKEDEX_SV;
            //setdex = SETDEX_SV;
            //setdexCustom = SETDEX_CUSTOM_SV;
            typeChart = TYPE_CHART_SV;
            moves = (localStorage.getItem("dex") == "natdex") ? MOVES_SV_NATDEX : MOVES_SV;
            items = (localStorage.getItem("dex") == "natdex") ? ITEMS_SV_NATDEX : ITEMS_SV;
            abilities = ABILITIES_SV;
            STATS = STATS_GSC;
            calculateAllMoves = CALCULATE_ALL_MOVES_SV;
            calcHP = CALC_HP_ADV;
            calcStat = CALC_STAT_ADV;
            break;
    }
    if (gen in ALL_SETDEX_CUSTOM)
        setdexCustom = ALL_SETDEX_CUSTOM[gen];
    else
        setdexCustom = [];
    clearField();
    $(".gen-specific.g" + gen).show();
    $(".gen-specific").not(".g" + gen).hide();
    loadSetdexScript();
    if (gen >= 8) {
        if (localStorage.getItem("dex") == "natdex") {
            for (i = 1; i <= 4; i++) {
                $('label[for="zL' + i + '"]').show();
                $('label[for="zR' + i + '"]').show();
            }
            $('div #primal-weather').show();
        }
        else {
            for (i = 1; i <= 4; i++) {
                $('label[for="zL' + i + '"]').hide();
                $('label[for="zR' + i + '"]').hide();
            }
            $('div #primal-weather').hide();
        }
    }
    if (gen >= 9) {
        if (localStorage.getItem("dex") == "natdex") {
            $('div #auras').show();
            $('div #protect-field').show();
            $('div #flower-gift').show();
        }
        else {
            $('div #auras').hide();
            $('div #protect-field').hide();
            $('div #flower-gift').hide();
        }
    }
    var types = Object.keys(typeChart);
    if (types.indexOf('Typeless') !== -1)
        types.splice(types.indexOf('Typeless'), 1);
    var teraTypes = $.extend(true, [], types);
    if (gen >= 2) types.push('Typeless');
    if (types.indexOf('Stellar') !== -1)
        types.splice(types.indexOf('Stellar'), 1);
    var typeOptions = getSelectOptions(types);
    var teraTypeOptions = getSelectOptions(teraTypes);
    $("select.type1, select.move-type").find("option").remove().end().append(typeOptions);
    $("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
    $("select.tera-type").find("option").remove().end().append(teraTypeOptions);
    var moveOptions = getSelectOptions(Object.keys(moves), true);
    $("select.move-selector").find("option").remove().end().append(moveOptions);
    var abilityOptions = getSelectOptions(abilities, true);
    $("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option>" + abilityOptions);
    var itemOptions = getSelectOptions(items, true);
    $("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);

    $("#p1 .set-selector").val(getSetOptions("#p1")[gen > 3 ? 1 : gen === 1 ? 5 : 3].id);
    $("#p1 .set-selector").change();
    $("#p2 .set-selector").val(getSetOptions("#p2")[gen > 3 ? 1 : gen === 1 ? 5 : 3].id);
    $("#p2 .set-selector").change();
    $(".sidebarMon").hide();
    $(".sidebarAdd").show();
    loadSidebar(1);
    loadSidebar(2);
});

function clearField() {
    $("#doubles").prop("checked", true);
    $("#clear").prop("checked", true);
    $("#gscClear").prop("checked", true);
    $("#gravity").prop("checked", false);
    $("#srL").prop("checked", false);
    $("#srR").prop("checked", false);
    $("#spikesL0").prop("checked", true);
    $("#spikesR0").prop("checked", true);
    $("#gscSpikesL").prop("checked", false);
    $("#gscSpikesR").prop("checked", false);
    $("#reflectL").prop("checked", false);
    $("#reflectR").prop("checked", false);
    $("#lightScreenL").prop("checked", false);
    $("#lightScreenR").prop("checked", false);
    $("#foresightL").prop("checked", false);
    $("#foresightR").prop("checked", false);
    $("#helpingHandL").prop("checked", false);
    $("#helpingHandR").prop("checked", false);
    $("#friendGuardL").prop("checked", false);
    $("#friendGuardR").prop("checked", false);
    $("#neutralizingGas").prop("checked", false);
    $("#steelySpiritL").prop("checked", false);
    $("#steelySpiritR").prop("checked", false);
    $("#gMaxHazardL").prop("checked", false);
    $("#gMaxHazardR").prop("checked", false);
    $("#flowerGiftL").prop("checked", false);
    $("#flowerGiftR").prop("checked", false);
    $("#tailwindL").prop("checked", false);
    $("#tailwindR").prop("checked", false);
    $("#evoL").prop("checked", false);
    $("#evoR").prop("checked", false);
    $("#clangL").prop("checked", false);
    $("#clangR").prop("checked", false);
    $("#weakL").prop("checked", false);
    $("#weakR").prop("checked", false);
    $("#tatsuL").prop("checked", false);
    $("#tatsuR").prop("checked", false);
    $("#powerSpotL").prop("checked", false);
    $("#powerSpotR").prop("checked", false);
    $("#batteryL").prop("checked", false);
    $("#batteryR").prop("checked", false);
    $("#saltCureL").prop("checked", false);
    $("#saltCureR").prop("checked", false);
    $("#auroraVeilL").prop("checked", false);
    $("#auroraVeilR").prop("checked", false);
    $("#swampL").prop("checked", false);
    $("#swampR").prop("checked", false);
    $("#seaFireL").prop("checked", false);
    $("#seaFireR").prop("checked", false);
}

function getSetOptions(p) {
    var pokeNames, index;
    pokeNames = Object.keys(pokedex);
    index = pokeNames.length;
    while (index--) {
        try {
            if (pokedex[pokeNames[index]].isAlternateForme) {
                pokeNames.splice(index, 1);
            }
        }
        catch {
            console.log(pokeNames[index]);
        }
    }
    pokeNames.sort();
    var setOptions = [];
    var idNum = 0;
    var usesCustom = $(p + " .set-toggle").prop("checked") && gen >= 3;
    var setdexUsed = usesCustom ? setdexCustom : setdex;
    if (!usesCustom) {
        for (var i = 0; i < pokeNames.length; i++) {
            var pokeName = pokeNames[i];
            setOptions.push({
                pokemon: pokeName,
                text: pokeName
            });
            if (pokeName in setdexUsed) {
                var setNames = Object.keys(setdexUsed[pokeName]);
                for (var j = 0; j < setNames.length; j++) {
                    var setName = setNames[j];
                    setOptions.push({
                        pokemon: pokeName,
                        set: setName,
                        text: pokeName + " (" + setName + ")",
                        id: pokeName + " (" + setName + ")"
                    });
                }
            }
            setOptions.push({
                pokemon: pokeName,
                set: "Blank Set",
                text: pokeName + " (Blank Set)",
                id: pokeName + " (Blank Set)"
            });
        }
    }
    else {
        for (var i = 0; i < pokeNames.length; i++) {
            var pokeName = pokeNames[i];
            if (pokeName in setdexUsed) {
                setOptions.push({
                    pokemon: pokeName,
                    text: pokeName
                });
                var setNames = Object.keys(setdexUsed[pokeName]);
                for (var j = 0; j < setNames.length; j++) {
                    var setName = setNames[j];
                    setOptions.push({
                        pokemon: pokeName,
                        set: setName,
                        text: pokeName + " (" + setName + ")",
                        id: pokeName + " (" + setName + ")"
                    });
                }
            }
        }
    }
    return setOptions;
}

function getSelectOptions(arr, sort, defaultIdx) {
    if (sort) {
        arr.sort();
    }
    var r = '';
    // Zero is of course falsy too, but this is mostly to coerce undefined.
    if (!defaultIdx) {
        defaultIdx = 0;
    }
    for (var i = 0; i < arr.length; i++) {
        if (i === defaultIdx) {
            r += '<option value="' + arr[i] + '" selected="selected">' + arr[i] + '</option>';
        } else {
            r += '<option value="' + arr[i] + '">' + arr[i] + '</option>';
        }
    }
    return r;
}

function getGen() {
    var genLocalStor = localStorage.getItem("gen");
    if (genLocalStor) {
        $("#gen" + genLocalStor).prop("checked", true);
        $("#gen" + genLocalStor).change();
    }
    else {
        $("#gen9").prop("checked", true);
        $("#gen9").change();
    }
}

function setStartup(p) {
    $(p + " .set-selector").select2({
        formatResult: function (object) {
            return object.set ? ("&nbsp;&nbsp;&nbsp;" + object.set) : ("<b>" + object.text + "</b>");
        },
        query: function (query) {
            var setOptions = getSetOptions(p);
            var pageSize = 30;
            var results = [];
            for (var i = 0; i < setOptions.length; i++) {
                var pokeName = setOptions[i].pokemon.toUpperCase();
                //if (!query.term || pokeName.indexOf(query.term.toUpperCase()) === 0) {
                //    results.push(setOptions[i]);
                //}
                if (!query.term || query.term.toUpperCase().split(" ").every(function (term) {
                    return pokeName.indexOf(term) === 0 || pokeName.indexOf("-" + term) >= 0 || pokeName.indexOf(" " + term) >= 0;
                }))
                    results.push(setOptions[i]);
            }
            query.callback({
                results: results.slice((query.page - 1) * pageSize, query.page * pageSize),
                more: results.length >= query.page * pageSize
            });
        },
        initSelection: function (element, callback) {
            var data = getSetOptions(p)[gen > 3 ? 1 : gen === 1 ? 5 : 3];
            callback(data);
        }
    });
}

$(document).ready(function () {
    checkaprilfools();
    //console.log(SETDEX_VGC2023);
    $(".stellar-btn").hide();
    getGen();
    $(".terrain-trigger").bind("change keyup", getTerrainEffects);
    $(".calc-trigger").bind("change keyup", calculate);
    setStartup("#p1");
    setStartup("#p2");
    $(".move-selector").select2({
        dropdownAutoWidth:true,
        matcher: function(term, text) {
            // 2nd condition is for Hidden Power
            return text.toUpperCase().indexOf(term.toUpperCase()) === 0 || text.toUpperCase().indexOf(" " + term.toUpperCase()) >= 0;
        }
    });
    $(".ability").select2({
        dropdownAutoWidth: true,
        matcher: function (term, text) {
            // 2nd condition is just in case
            return text.toUpperCase().indexOf(term.toUpperCase()) === 0 || text.toUpperCase().indexOf(" " + term.toUpperCase()) >= 0;
        }
    });
    $(".item").select2({
        dropdownAutoWidth: true,
        matcher: function (term, text) {
            // 2nd condition is for shorthands like Choice items
            return text.toUpperCase().indexOf(term.toUpperCase()) === 0 || text.toUpperCase().indexOf(" " + term.toUpperCase()) >= 0;
        }
    });
    $("#p1 .set-selector").val(getSetOptions("#p1")[gen > 3 ? 1 : gen === 1 ? 5 : 3].id);
    $("#p1 .set-selector").change();
    $("#p2 .set-selector").val(getSetOptions("#p2")[gen > 3 ? 1 : gen === 1 ? 5 : 3].id);
    $("#p2 .set-selector").change();
    loadSidebar(1);
    loadSidebar(2);
});
