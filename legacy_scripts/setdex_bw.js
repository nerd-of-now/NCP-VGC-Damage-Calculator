var SETDEX_BW = {};
var SETDEX_CUSTOM_BW = {};

var components = [
    //SETDEX_VGC2011,
    //SETDEX_VGC2012,
    //SETDEX_VGC2013,
    //SETDEX_CUSTOM_BW
];

for (var i = 0; i < components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_BW[p] = $.extend(SETDEX_BW[p], sourceDex[p])
            }
        }
    }
}

var reloadBWScript = function () {
    console.log(SETDEX_CUSTOM_BW);
    components = [
        //SETDEX_VGC2011,
        //SETDEX_VGC2012,
        //SETDEX_VGC2013,
        SETDEX_CUSTOM_BW
    ];

    for (var i = 0; i < components.length; i++) {
        sourceDex = components[i];
        if (sourceDex) {
            for (var p in sourceDex) {
                if (sourceDex.hasOwnProperty(p)) {
                    SETDEX_BW[p] = $.extend(SETDEX_BW[p], sourceDex[p])
                }
            }
        }
    }
}