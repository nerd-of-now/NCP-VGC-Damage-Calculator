var SETDEX_SM = {};
var SETDEX_CUSTOM_SM = {};

var components = [
    SETDEX_TT2019
];

for (var i=0; i<components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SM[p] = $.extend(SETDEX_SM[p], sourceDex[p])
            }
        }
    }
}

var reloadSMScript = function()
{
  console.log(SETDEX_CUSTOM_SM);
    components = [
    SETDEX_TT2019,
    SETDEX_CUSTOM_SM,
];

for (var i=0; i<components.length; i++) {
    sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SM[p] = $.extend(SETDEX_SM[p], sourceDex[p])
            }
        }
    }
}
}
