var CURRENT_SIDEBARS = [];
//left and right sidebar names used in ap_calc.js and setdex_custom.js to make sure the user can't delete or add any sets to the sidebar without using the sidebar buttons
//separated in case there are any specific checks that require individually checking each side added in the future
var LEFT_SIDEBAR_NAMES = ['Left Sidebar Slot 1', 'Left Sidebar Slot 2', 'Left Sidebar Slot 3', 'Left Sidebar Slot 4', 'Left Sidebar Slot 5', 'Left Sidebar Slot 6',];
var RIGHT_SIDEBAR_NAMES = ['Right Sidebar Slot 1', 'Right Sidebar Slot 2', 'Right Sidebar Slot 3', 'Right Sidebar Slot 4', 'Right Sidebar Slot 5', 'Right Sidebar Slot 6',];

function addSidebarSlot(pnum) {
    var fullSetName = $('#p' + pnum + ' input.set-selector').val();
    var displayName = fullSetName.substring(0, fullSetName.indexOf(" ("));
    CURRENT_SIDEBARS[pnum - 1].push(displayName);
    localStorage['g' + gen + '_sidebars'] = JSON.stringify(CURRENT_SIDEBARS);
    var side = pnum == 1 ? 'Left' : pnum == 2 ? 'Right' : '';
    var teamnum = CURRENT_SIDEBARS[pnum - 1].length;
    var spreadName = side + ' Sidebar Slot ' + teamnum;
    //save custom set to calc
    savecalc(new Pokemon($('#p' + pnum)), spreadName, $('#p' + pnum + ' input.ivs.calc-trigger').closest(".poke-info"));
    side = pnum == 1 ? 'l' : pnum == 2 ? 'r' : '';
    var pID = '#pkmn' + side.toUpperCase() + teamnum;
    $(pID).prop('title', displayName);
    getSidebarImg(pID + 'I', displayName);
    $('#' + side + teamnum).show();
    if (teamnum == 6)
        $('#sb' + side.toUpperCase()).hide();
}

function editSidebarSlot(pnum, teamnum) {
    var fullSetName = $('#p' + pnum + ' input.set-selector').val();
    var displayName = fullSetName.substring(0, fullSetName.indexOf(" ("));
    var side = pnum == 1 ? 'Left' : pnum == 2 ? 'Right' : '';
    var spreadName = side + ' Sidebar Slot ' + teamnum;
    deleteSet(CURRENT_SIDEBARS[pnum - 1][teamnum - 1], spreadName);
    CURRENT_SIDEBARS[pnum - 1][teamnum - 1] = displayName;
    localStorage['g' + gen + '_sidebars'] = JSON.stringify(CURRENT_SIDEBARS);
    savecalc(new Pokemon($('#p' + pnum)), spreadName, $('#p' + pnum + ' input.ivs.calc-trigger').closest(".poke-info"));
    var pID = '#pkmn' + (pnum == 1 ? 'L' : pnum == 2 ? 'R' : '') + teamnum;
    $(pID).prop('title', displayName);
    getSidebarImg(pID + 'I', displayName);
}

function removeSidebarSlot(pnum, teamnum) {
    var monName = CURRENT_SIDEBARS[pnum - 1][teamnum - 1];
    var side = pnum == 1 ? 'Left' : pnum == 2 ? 'Right' : '';
    var spreadName = side + ' Sidebar Slot ' + teamnum;
    if (CURRENT_SIDEBARS[pnum - 1].length == 6)
        $('#sb' + (pnum == 1 ? 'L' : pnum == 2 ? 'R' : '')).show();
    CURRENT_SIDEBARS[pnum - 1].splice(teamnum - 1, 1);
    localStorage['g' + gen + '_sidebars'] = JSON.stringify(CURRENT_SIDEBARS);
    $('#' + (pnum == 1 ? 'l' : pnum == 2 ? 'r' : '') + (CURRENT_SIDEBARS[pnum - 1].length + 1)).hide();
    deleteSet(monName, spreadName);
    shiftSidebar(pnum);
    reloadSidebar(pnum);
}

function loadSidebar() {
    var side, pID, displayName, teamslot;
    if (localStorage['g' + gen + '_sidebars'])
        CURRENT_SIDEBARS = JSON.parse(localStorage['g' + gen + '_sidebars']);
    else
        CURRENT_SIDEBARS = [[],[]];
    for (var i = 0; i < CURRENT_SIDEBARS.length; i++) {
        side = i == 0 ? 'l' : i == 1 ? 'r' : '';
        pID = '#pkmn' + side.toUpperCase();
        for (var j = 0; j < 6; j++) {
            if (j < CURRENT_SIDEBARS[i].length) {
                displayName = CURRENT_SIDEBARS[i][j];
                teamslot = pID + (j + 1);
                $(teamslot).prop('title', displayName);
                getSidebarImg(teamslot + 'I', displayName);
                $('#' + side + (j + 1)).show();
            }
            else
                $('#' + side + (j + 1)).hide();
        }
        if (CURRENT_SIDEBARS[i].length == 6)
            $('#sb' + side.toUpperCase()).hide();
    }
}

function reloadSidebar(pnum) {
    var side = pnum == 1 ? 'l' : pnum == 2 ? 'r' : '';
    var pID = '#pkmn' + side.toUpperCase();
    var displayName, teamslot;
    for (var i = 0; i < CURRENT_SIDEBARS[pnum - 1].length; i++) {
        displayName = CURRENT_SIDEBARS[pnum - 1][i];
        teamslot = pID + (i + 1);
        $(teamslot).prop('title', displayName);
        getSidebarImg(teamslot + 'I', displayName);
        $('#' + side + (i + 1)).show();
    }
}

function getSidebarImg(teamslotI, displayName) {
    for (var i = 0; i < calcToShowdownFormes.length; i++) {
        if (displayName == calcToShowdownFormes[i][1])
            displayName = calcToShowdownFormes[i][0];
    }
    if (['Urshifu', 'Urshifu-Rapid-Strike'].indexOf(displayName) == -1) {
        displayName = displayName.replace(' ', '-').toLowerCase();
        $(teamslotI).prop('src', 'https://www.smogon.com/forums/media/minisprites/' + displayName + '.png');
    }
    else if (displayName == 'Urshifu') {
        $(teamslotI).prop('src', 'image_res/urshifu-single.png');
    }
    else if (displayName == 'Urshifu-Rapid-Strike') {
        $(teamslotI).prop('src', 'image_res/urshifu-rapid.png');
    }
}

function loadPreset(p, fullSetName) {
    $(p + " .set-selector").val(fullSetName);
    $(p + " .set-selector").change();
    $(p + " .set-selector").find('.select2-chosen').text(fullSetName);
}

function loadSidebarSlot(pnum, teamnum) {
    var p = '#p' + pnum;
    var slotName = (CURRENT_SIDEBARS[pnum - 1][teamnum - 1]) + (pnum == 1 ? ' (Left' : pnum == 2 ? ' (Right' : '') + ' Sidebar Slot ' + teamnum + ')';
    loadPreset(p, slotName);
}

function shiftSidebar(pnum) {
    //console.log(ALL_SETDEX_CUSTOM[gen]);
    var sidebar = CURRENT_SIDEBARS[pnum - 1];
    var tempHold = [{}, {}, {}, {}, {}, {},];
    var desyncStart = -1;
    var side = pnum == 1 ? 'Left' : pnum == 2 ? 'Right' : '';
    for (var i = 0; i < sidebar.length; i++) {
        var tempMonSets = ALL_SETDEX_CUSTOM[gen][sidebar[i]];
        if (!(side + ' Sidebar Slot ' + (i + 1) in tempMonSets)) {
            desyncStart = i;
            break;
        }
    }
    if (desyncStart != -1) {
        for (var i = desyncStart; i < sidebar.length; i++) {
            tempHold[i] = ALL_SETDEX_CUSTOM[gen][sidebar[i]][side + ' Sidebar Slot ' + (i + 2)];
        }
        for (var i = desyncStart; i < sidebar.length; i++) {
            ALL_SETDEX_CUSTOM[gen][sidebar[i]][side + ' Sidebar Slot ' + (i + 1)] = tempHold[i];
            deleteSet(sidebar[i], side + ' Sidebar Slot ' + (i + 2));
        }
    }
    //console.log(ALL_SETDEX_CUSTOM[gen]);
}

function removeSidebarTeam(pnum) {
    for (var i = CURRENT_SIDEBARS[pnum - 1].length; i > 0; i--) {
        removeSidebarSlot(pnum, i);
    }
}

//function importSidebarTeam(pnum) {
//    teamNames = pnum == 1 ? LEFT_SIDEBAR_NAMES : pnum == 2 ? RIGHT_SIDEBAR_NAMES : [];
//}