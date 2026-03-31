var CURRENT_SETDEX = {};

var ALL_SETDEX_CUSTOM = {};

function loadSetdexScript() {
    console.log(ALL_SETDEX_CUSTOM[gen]);
    var customSets = ALL_SETDEX_CUSTOM[gen] || {};
    CURRENT_COMPONENTS = (COMPONENTS[gen] || []).concat(customSets);

    if (Object.keys(customSets).length)
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