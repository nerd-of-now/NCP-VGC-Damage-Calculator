var spamton_isrunning = false;

function run_spamton() {
    if (spamton_isrunning) return;
    spamton_isrunning = true;
    var w = window.innerWidth, h = window.innerHeight;
    document.getElementById('spam_laugh').play();
    var spam_laff = document.createElement('img');
    spam_laff.setAttribute('class', 'spamdancers');
    spam_laff.setAttribute('id', 'spamreal');
    spam_laff.setAttribute('src', 'image_res/aprilfoolsday/spamlaugh.gif');
    spam_laff.setAttribute('style', 'position: fixed; right: ' + (w/2) + 'px; bottom: ' + (h/2) + 'px;');
    document.getElementById('spamtons').appendChild(spam_laff);
    setTimeout(() => {
        var spams = 0;
        spam_laff.setAttribute('src', 'image_res/aprilfoolsday/spamdance.gif');
        //spam_laff.setAttribute('onclick', 'spam_hit(this)');
        document.getElementById('spam_mus').play();
        var intervalID = setInterval(() => {
            if (spams == 71) {
                var deleteSpam = false;
                var nestedIntervalID = setInterval(() => {
                    if (!deleteSpam) {
                        $('.spamdancers').attr('src', 'image_res/aprilfoolsday/spamlaugh.gif');
                        document.getElementById('spam_laugh').play();
                        deleteSpam = true;
                    }
                    else {
                        $('#spamtons').empty();
                        clearInterval(nestedIntervalID);
                    }
                }, 863);
                clearInterval(intervalID);
                spamton_isrunning = false;
            }
            else {
                spam_inloop(w, h);
                spams++;
            }
        }, 909);
    }, 1113);
}

function spam_inloop(w, h) {
    var randX = Math.round(Math.random() * w), randY = Math.round(Math.random() * h);
    var spam_sus = document.createElement('img');
    spam_sus.setAttribute('class', 'spamdancers');
    spam_sus.setAttribute('src', 'image_res/aprilfoolsday/spamdance.gif');
    spam_sus.setAttribute('style', 'position: fixed; right: ' + randX + 'px; bottom: ' + randY + 'px;');
    //spam_sus.setAttribute('onclick', 'spam_hit(this)');
    document.getElementById('spamtons').appendChild(spam_sus);
}

//function spam_hit(spam_hurt) {
//    spam_hurt.setAttribute('src', 'image_res/aprilfoolsday/spamhurt.png');
//    document.getElementById('spam_hit').play();
//    spam_hurt.removeAttribute('onclick');
//}