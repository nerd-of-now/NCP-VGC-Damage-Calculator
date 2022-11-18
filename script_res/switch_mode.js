	
// Load theme according to localStorage
if(localStorage.getItem("theme") == "dark"){
	$("#switchTheme").html("Light theme");
	$("#switchTheme").val("light");
	loadTheme("dark");
}else{
	$("#switchTheme").val("dark");
	loadTheme("light");
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