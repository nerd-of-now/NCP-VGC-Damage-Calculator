//LIGHT AND DARK THEMES
// Load theme according to localStorage
if (localStorage.getItem("theme") == "dark" || (localStorage.getItem("theme") != "light" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
	$("#switchTheme").html("Light theme");
	$("#switchTheme").val("light");
	loadTheme("dark");
}else{
	$("#switchTheme").val("dark");
	loadTheme("light");
}
//NATIONAL DEX TOGGLING
// Load dex according to localStorage
if (localStorage.getItem("dex") == "natdex") {
	$("#switchDex").prop("checked", true);
	$("#switchDex").val("vgcdex");
	//loadDex("natdex");	Don't load when starting, it'll be easier if ap_calc handles it by itself
} else {
	$("#switchDex").val("natdex");
	//loadDex("vgcdex");	Don't load when starting, it'll be easier if ap_calc handles it by itself
}

//LEVEL TOGGLING
//Load the leveling system according to localStorage
if (localStorage.getItem("level") == true) {
	$("#douswitch").prop("checked", false);
}

//GEN TOGGLING
//Load the generation according to localStorage
//see function getGen() in ap_calc.js

$(function(){

	$("#switchTheme").on("click", function(){
		if($(this).val() == "dark"){
			$(this).html("Light theme");
			this.value = "light";
			//	We load the dark theme
			loadTheme("dark");
			localStorage.setItem("theme", "dark");
		}else{
			$(this).html("Dark theme");
			this.value = "dark";
			// We load the light theme
			loadTheme("light");
			localStorage.setItem("theme", "light");
		}
		loadSVColors(this.value);	//
	});

	$("#switchDex").on("click", function () {
		if ($(this).val() == "natdex") {
			this.value = "vgcdex";
			//	We load the natdex
			loadDex("natdex");
			localStorage.setItem("dex", "natdex");
		} else {
			this.value = "natdex";
			// We load the vgcdex
			loadDex("vgcdex");
			localStorage.setItem("dex", "vgcdex");
		}
	});

	$("#douswitch").on("click", function () {
		if (!$(this).is(":checked")) {
			localStorage.setItem("level", true);
		}
		else {
			localStorage.setItem("level", false);
        }
	});

	//see $(".gen").change(function ()) in ap_calc.js for changing gen value in localStorage

	$(".set-toggle").on("click", function () {
		loadSets("#" + $(this).closest(".poke-info").prop("id"));
	});
})

function loadTheme(color){
	$('body').removeClass();
	$('body').addClass(color);
}

function loadSVColors(theme) {																    //
	if (gen === 9) {																			//
		if (theme === "light") {																//
			document.querySelector('.dark .panel[id="p1"]').style.backgroundColor = '#380c0a';	//
			document.querySelector('.dark .panel[id="p2"]').style.backgroundColor = '#200c30';	//
			document.querySelector('.dark .panel[id="field-panel"]').style.backgroundColor = '#003030';	//
		}																						//
		else {																					//
			document.querySelector('.light .panel[id="p1"]').style.backgroundColor = '#fad2d2';	//
			document.querySelector('.light .panel[id="p2"]').style.backgroundColor = '#e8d6f5';	//
			document.querySelector('.light .panel[id="field-panel"]').style.backgroundColor = '#c8e0f0';	//
		}																						//
	}																							//
	else {																						//
		if (theme === "light") {																//
			document.querySelector('.dark .panel[id="p1"]').style.backgroundColor = '#192121';	//
			document.querySelector('.dark .panel[id="p2"]').style.backgroundColor = '#192121';	//
			document.querySelector('.dark .panel[id="field-panel"]').style.backgroundColor = '#192121';	//
		}																						//
		else {																					//
			document.querySelector('.light .panel[id="p1"]').style.backgroundColor = '#ffffff';	//
			document.querySelector('.light .panel[id="p2"]').style.backgroundColor = '#ffffff';	//
			document.querySelector('.light .panel[id="field-panel"]').style.backgroundColor = '#ffffff';	//
		}																						//
    }																							//
}																								//

function loadDex(dexMode) {
	if (dexMode === "natdex") {
		if (gen === 9) {
			pokedex = POKEDEX_SV_NATDEX;
			moves = MOVES_SV_NATDEX;
			items = ITEMS_SV_NATDEX;
		}
		else {
			pokedex = POKEDEX_SS_NATDEX;
			moves = MOVES_SS_NATDEX;
			items = ITEMS_SS_NATDEX;
		}
	}
	else {
		if (gen === 9) {
			pokedex = POKEDEX_SV;
			moves = MOVES_SV;
			items = ITEMS_SV;
		}
		else {
			pokedex = POKEDEX_SS;
			moves = MOVES_SS;
			items = ITEMS_SS;
		}
	}

	clearField();
	$(".gen-specific.g" + gen).show();
	$(".gen-specific").not(".g" + gen).hide();
	if (gen >= 8) {
		if (localStorage.getItem("dex") == "vgcdex") {
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
		if (localStorage.getItem("dex") == "vgcdex") {
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
	if (typeChart !== undefined) {
		var types = Object.keys(typeChart);
		if (types.indexOf('Typeless') !== -1)
			types.splice(types.indexOf('Typeless'), 1);
		var teraTypes = $.extend(true, [], types);
		if (gen >= 2) types.push('Typeless');
		if (types.indexOf('Stellar') !== -1)
			types.splice(types.indexOf('Stellar'), 1);
		var typeOptions = getSelectOptions(types);
		var teraTypeOptions = getSelectOptions(teraTypes);
    }
	$("select.type1, select.move-type").find("option").remove().end().append(typeOptions);
	$("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
	$("select.tera-type").find("option").remove().end().append(teraTypeOptions);
	var moveOptions = getSelectOptions(Object.keys(moves), true);
	$("select.move-selector").find("option").remove().end().append(moveOptions);
	var abilityOptions = getSelectOptions(abilities, true);
	$("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option>" + abilityOptions);
	var itemOptions = getSelectOptions(items, true);
	$("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);

	resetSetSelectors();
}

function loadSets(p) {
	setStartup(p);
	$(p + " .set-selector").val(getSetOptions(p)[gen > 3 ? 1 : gen === 1 ? 5 : 3].id);
	$(p + " .set-selector").change();
}

function toggleAFD() {
	if (!localStorage.getItem("isAFD")) {
		localStorage.setItem("isAFD", true);
		alert("April Fools' Day mode activated! (This just adds two joke characters to SV. Refresh to see them.)");
	}
	else {
		localStorage.removeItem("isAFD");
		alert("April Fools' Day mode deactivated. Refresh to see the change.");
    }
}