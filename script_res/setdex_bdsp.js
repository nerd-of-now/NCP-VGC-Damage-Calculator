var SETDEX_BDSP = {};
var SETDEX_CUSTOM_BDSP = {};

var components = [
    //maybe default sets later?
];

for (var i = 0; i < components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_BDSP[p] = $.extend(SETDEX_BDSP[p], sourceDex[p])
            }
        }
    }
}

var reloadBDSPScript = function () {
    console.log(SETDEX_CUSTOM_BDSP);
    components = [
        SETDEX_CUSTOM_BDSP,
    ];

    for (var i = 0; i < components.length; i++) {
        sourceDex = components[i];
        if (sourceDex) {
            for (var p in sourceDex) {
                if (sourceDex.hasOwnProperty(p)) {
                    SETDEX_BDSP[p] = $.extend(SETDEX_BDSP[p], sourceDex[p])
                }
            }
        }
    }
}
