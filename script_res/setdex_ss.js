var SETDEX_SS = {};
var SETDEX_CUSTOM_SS = {};

var components = [
    SETDEX_VGC2022,
    SETDEX_VGC2021,
    SETDEX_VGC2021_S10,
    SETDEX_VGC_BFD,
];

for (var i=0; i<components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SS[p] = $.extend(SETDEX_SS[p], sourceDex[p])
            }
        }
    }
}

var reloadSSScript = function()
{
  console.log(SETDEX_CUSTOM_SS);
    components = [
    SETDEX_VGC2022,
    SETDEX_VGC2021,
    SETDEX_VGC2021_S10,
    SETDEX_CUSTOM_SS,
];

for (var i=0; i<components.length; i++) {
    sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SS[p] = $.extend(SETDEX_SS[p], sourceDex[p])
            }
        }
    }
}
}
