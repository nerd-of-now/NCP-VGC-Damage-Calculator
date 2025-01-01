var CURRENT_SETDEX = {};
var COMPONENTS = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [SETDEX_GEN5],
    6: [SETDEX_SHOWDOWN,
        SETDEX_NUGGETBRIDGE],
    7: [SETDEX_TT2019],
    //Gen 8 onwards doesn't need to be updated
    8: [SETDEX_VGC2022_S13,
        SETDEX_VGC2022,
        SETDEX_VGC2021,
        SETDEX_VGC2021_S10,
        SETDEX_VGC_BFD],
    9: [SETDEX_GEN9],
};

var ALL_SETDEX_CUSTOM = {};

function loadSetdexScript() {
    console.log(ALL_SETDEX_CUSTOM[gen]);
    CURRENT_COMPONENTS = COMPONENTS[gen].concat(ALL_SETDEX_CUSTOM[gen]);

    if (Object.keys(ALL_SETDEX_CUSTOM[gen]).length)
        $(".set-checkbox").show();
    else
        $(".set-checkbox").hide();

    CURRENT_SETDEX = {};

    for (var i = 0; i < CURRENT_COMPONENTS.length; i++) {
        sourceDex = CURRENT_COMPONENTS[i];
        if (sourceDex) {
            for (var p in sourceDex) {
                if (sourceDex.hasOwnProperty(p)) {
                    CURRENT_SETDEX[p] = $.extend(CURRENT_SETDEX[p], sourceDex[p]);
                }
            }
        }
    }
    setdex = CURRENT_SETDEX;
}