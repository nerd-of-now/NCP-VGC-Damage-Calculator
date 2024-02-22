var SETDEX_DPP = {};
var SETDEX_CUSTOM_DPP = {};

var components = [
    //VGC 2008-10 default sets
];

for (var i = 0; i < components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_DPP[p] = $.extend(SETDEX_DPP[p], sourceDex[p])
            }
        }
    }
}

var reloadDPPScript = function () {
    console.log(SETDEX_CUSTOM_DPP);
    components = [
        //VGC 2008-10 default sets
        SETDEX_CUSTOM_DPP,
    ];

    for (var i = 0; i < components.length; i++) {
        sourceDex = components[i];
        if (sourceDex) {
            for (var p in sourceDex) {
                if (sourceDex.hasOwnProperty(p)) {
                    SETDEX_DPP[p] = $.extend(SETDEX_DPP[p], sourceDex[p])
                }
            }
        }
    }
}