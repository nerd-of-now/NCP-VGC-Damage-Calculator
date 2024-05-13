var SETDEX_ADV = {};
var SETDEX_CUSTOM_ADV = {};

var components = [
    //Orre Colusseum or JAA default sets
];

for (var i = 0; i < components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_ADV[p] = $.extend(SETDEX_ADV[p], sourceDex[p])
            }
        }
    }
}

var reloadADVScript = function () {
    console.log(SETDEX_CUSTOM_ADV);
    components = [
        //Orre Colusseum or JAA default sets
        SETDEX_CUSTOM_ADV,
    ];

    for (var i = 0; i < components.length; i++) {
        sourceDex = components[i];
        if (sourceDex) {
            for (var p in sourceDex) {
                if (sourceDex.hasOwnProperty(p)) {
                    SETDEX_ADV[p] = $.extend(SETDEX_ADV[p], sourceDex[p])
                }
            }
        }
    }
}