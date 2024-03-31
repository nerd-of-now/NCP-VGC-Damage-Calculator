//var isAFD = false;

function checkaprilfools() {
    if (new Date().toString().indexOf("Apr 1") != -1 /*true*/) {
        //isAFD = true;
        //Buckle the fuck up it's April Fools' Day
        //Toby Fox and Tour de Pizza please don't sue me
        loadrest();
        loadaudio();
        addjokechars();
    }
}

function loadrest() {
    var cur_el = document.createElement('div');
    cur_el.setAttribute('id', 'spamtons');
    document.getElementById('april_fools').appendChild(cur_el);
    cur_el = document.createElement('div');
    cur_el.setAttribute('id', 'noisechars');
    document.getElementById('april_fools').appendChild(cur_el);
}

function loadaudio() {
    var cur_audio;
    var id_list = ['spam_laugh', 'spam_mus', /*'spam_hit',*/ 'noise_walk', 'noise_woag', 'peppino_yell', 'peppino_run', 'peppino_run2', 'noise_yell', 'peppino_hit'];
    var src_list = ['spamton_laugh_noise', 'spamton_battle', /*'snd_smallcar_yelp',*/ 'Sfx_step', 'Noise2', 'Scream', 'Sfx_mach3', 'Sfx_mach3', 'Noisescream', 'Sfx_breakmetal'];
    for (i = 0; i < id_list.length; i++) {
        cur_audio = document.createElement('audio');
        cur_audio.setAttribute('id', id_list[i]);
        cur_audio.setAttribute('src', 'sound_res/' + src_list[i] + '.ogg');
        document.getElementById('april_fools').appendChild(cur_audio);
    }
}

function addjokechars() {
    for (key in POKEDEX_AFD24) {
        POKEDEX_SV[key] = POKEDEX_AFD24[key];
        POKEDEX_SV_NATDEX[key] = POKEDEX_AFD24[key];
        SETDEX_SV[key] = SETDEX_AFD24[key];
    }
}