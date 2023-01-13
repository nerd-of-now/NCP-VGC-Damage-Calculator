//LIGHT AND DARK THEMES
// Load theme according to localStorage
if(localStorage.getItem("theme") == "dark"){
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
		}																						//
		else {																					//
			document.querySelector('.light .panel[id="p1"]').style.backgroundColor = '#fad2d2';	//
			document.querySelector('.light .panel[id="p2"]').style.backgroundColor = '#e8d6f5';	//
		}																						//
	}																							//
	else {																						//
		if (theme === "light") {																//
			document.querySelector('.dark .panel[id="p1"]').style.backgroundColor = '#192121';	//
			document.querySelector('.dark .panel[id="p2"]').style.backgroundColor = '#192121';	//
		}																						//
		else {																					//
			document.querySelector('.light .panel[id="p1"]').style.backgroundColor = '#ffffff';	//
			document.querySelector('.light .panel[id="p2"]').style.backgroundColor = '#ffffff';	//
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
		}
		else {
			for (i = 1; i <= 4; i++) {
				$('label[for="zL' + i + '"]').hide();
				$('label[for="zR' + i + '"]').hide();
			}
		}
	}
	if (typeChart !== undefined) {
		var typeOptions = getSelectOptions(Object.keys(typeChart));
    }
	$("select.type1, select.move-type, select.tera-type").find("option").remove().end().append(typeOptions);
	$("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
	var moveOptions = getSelectOptions(Object.keys(moves), true);
	$("select.move-selector").find("option").remove().end().append(moveOptions);
	var abilityOptions = getSelectOptions(abilities, true);
	$("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option>" + abilityOptions);
	var itemOptions = getSelectOptions(items, true);
	$("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);

	$(".set-selector").val(getSetOptions()[gen > 3 ? 1 : gen === 1 ? 5 : 3].id);
	$(".set-selector").change();
}