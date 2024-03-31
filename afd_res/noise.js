var noise_isrunning = false;

function run_noise() {
    if (noise_isrunning) return;
    noise_isrunning = true;
    var w = window.innerWidth, h = window.innerHeight;
    var h_center = h / 2;
    var the_noise = document.createElement('img'), peppino = document.createElement('img');
    var noise_pos = -100, peppino_pos = -100, noise_posy = 0;
    var step_loopnum = 0;
    the_noise.setAttribute('id', 'thenoise');
    the_noise.setAttribute('src', 'image_res/aprilfoolsday/noisewalk.gif');
    the_noise.setAttribute('style', 'transform: scaleX(-1); position: absolute; left: ' + (w + noise_pos) + 'px; bottom: ' + (h_center) + 'px;');
    document.getElementById('noisechars').appendChild(the_noise);
    noise_walk = setInterval(() => {
        if (noise_pos >= (w / -2 - 20)) {
            step_loopnum++;
            noise_pos -= 20;
            the_noise.style.left = (w + noise_pos) + 'px';
            if (step_loopnum % 8 == 5)
                document.getElementById('noise_walk').play();
        }
        else {
            clearInterval(noise_walk);
            the_noise.setAttribute('src', 'image_res/aprilfoolsday/noiseidle.gif');
            var loopnum = 0, attackframe = 0, attackanim = false, noisehit = false;
            peppino_enters = setInterval(() => {
                if (loopnum == 30) {
                    the_noise.setAttribute('src', 'image_res/aprilfoolsday/noisesmile.gif');
                    document.getElementById('noise_woag').play();
                }
                else if (loopnum == 75) {
                    document.getElementById('peppino_yell').play();
                }
                else if (loopnum == 80) {
                    the_noise.setAttribute('src', 'image_res/aprilfoolsday/noisestun.gif');
                }
                else if (loopnum == 123) {
                    peppino.setAttribute('id', 'peppino');
                    peppino.setAttribute('src', 'image_res/aprilfoolsday/peppinorun.gif');
                    peppino.setAttribute('style', 'position: absolute; right: ' + (w + peppino_pos) + 'px; bottom: ' + (h_center) + 'px;');
                    document.getElementById('noisechars').appendChild(peppino);
                }
                else if (loopnum == 128) {
                    the_noise.setAttribute('src', 'image_res/aprilfoolsday/noisefear.gif');
                    document.getElementById('noise_yell').play();
                }
                if (loopnum >= 123) {
                    if (loopnum % 102 == 21)
                        document.getElementById('peppino_run').play();
                    else if (loopnum % 102 == 72)
                        document.getElementById('peppino_run2').play();
                }
                if (peppino.parentNode && peppino_pos > (-w + 40)) {
                    peppino_pos -= 40;
                    peppino.style.right = (w + peppino_pos) + 'px';
                    if (w + peppino_pos >= w + noise_pos - 20 && w + peppino_pos <= w + noise_pos + 20) {
                        peppino.setAttribute('src', 'image_res/aprilfoolsday/peppinoattack.gif');
                        the_noise.setAttribute('src', 'image_res/aprilfoolsday/noisedies.gif');
                        document.getElementById('peppino_hit').play();
                        attackanim = true;
                        noisehit = true;
                    }
                    else if (attackframe == 6) {
                        peppino.setAttribute('src', 'image_res/aprilfoolsday/peppinorun.gif');
                        attackframe++;
                        attackanim = false;
                    }
                }
                else if (peppino.parentNode && peppino_pos <= (-w + 40)) {
                    peppino.remove();
                }
                if (noisehit) {
                    if (h_center + noise_posy <= h && w + noise_pos <= w) {
                        noise_pos += 60;
                        noise_posy += 40;
                        the_noise.style.left = (w + noise_pos) + 'px';
                        the_noise.style.bottom = (h_center + noise_posy) + 'px';
                    }
                    else
                        the_noise.remove();
                }

                if (!peppino.parentNode && !the_noise.parentNode) {
                    clearInterval(peppino_enters);
                    noise_isrunning = false;
                }

                if (attackanim) attackframe++;
                loopnum++;
            }, 33);
        }
    }, 33);
}