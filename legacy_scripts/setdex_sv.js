var SETDEX_SV = {};
var SETDEX_CUSTOM_SV = {};

var components = [
    SETDEX_VGC2023,
];

for (var i=0; i<components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SV[p] = $.extend(SETDEX_SV[p], sourceDex[p])
            }
        }
    }
}

var reloadSVScript = function () {
    console.log(SETDEX_CUSTOM_SV);
    components = [
        SETDEX_VGC2023,
        SETDEX_CUSTOM_SV,
    ];
    SETDEX_SV = {};

    for (var i = 0; i < components.length; i++) {
        sourceDex = components[i];
        if (sourceDex) {
            for (var p in sourceDex) {
                if (sourceDex.hasOwnProperty(p)) {
                    SETDEX_SV[p] = $.extend(SETDEX_SV[p], sourceDex[p])
                }
            }
        }
    }
}
