//Delaring a Variable
let audio, playbtn, title, poster, artists, nextbtn, prevbtn, mutebtn, seekslider, volumeslider, seeking = false, seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist,
    repeat, randomSong,playlist_index;

// Initialization of Array of Music,title, artists,Poster images
dir = "music/";
playlist = ["Cartoon-On & On", "Elektronomia", "Fearless", "Johnning", "Popsicle"];
title = ["Cartoon-On & On", "Elektronomia", "Fearless", "Johnning", "Popsicle"];

artists = ["feat. John Doe[Bombay Rocks]", "feat. John Doe[Bombay Rocks]", "feat. John Doe[Bombay Rocks]", "feat. John Doe[Bombay Rocks]", "feat. John Doe[Bombay Rocks]"];
poster = ["images/ncs1.jpeg", "images/ncs2.jpg", "images/ncs3.jpg", "images/ncs4.jpg", "images/ncs5.jpg"];

//Used to run on every Browser
ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1)
    ext = ".ogg";

// set object references

playbtn = document.getElementById('playpausebtn');
nextbtn = document.getElementById('nextbtn');
prevbtn = document.getElementById('prevbtn');
mutebtn = document.getElementById('mutebtn');
seekslider = document.getElementById('seekslider');
volumeslider = document.getElementById('volumeslider');
curtimetext = document.getElementById('curtimetext');
durtimetext = document.getElementById('durtimetext');
playlist_status = document.getElementById('playlist_status');
playlist_artist = document.getElementById('playlist_artist');
repeat = document.getElementById('repeat');
randomSong = document.getElementById('random');

playlist_index = 0;

//Audio object
audio = new Audio();
audio.src = dir + playlist[0] + ext;//music/musicname.mp3
audio.loop = false;
//First Song title and Artists
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//add Event Handling
playbtn.addEventListener('click', playPause);
nextbtn.addEventListener('click', nextSong);
prevbtn.addEventListener('click', prevSong);
mutebtn.addEventListener('click', mute);
seekslider.addEventListener('mousedown', function (event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener('mousemove', function (event) {
    seek(event);
});
seekslider.addEventListener('mouseup', function () {
    seeking = false;
});
volumeslider.addEventListener('mousemove', setVolume);
audio.addEventListener('timeupdate', function () {
    seektimeupdate();
});
audio.addEventListener('ended', function () {
    switchTrack(); 
});
repeat.addEventListener('click', loop);
randomSong.addEventListener('click', random);

//Functions
function fetchMusicDetails() {
    //Poster Image, Play/Pause Image
    document.getElementById('playpauseicon').className = 'fa fa-pause';
    document.getElementById('image').src = poster[playlist_index];

    //Title and Artist
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    //Audio
    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();
}
function playPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById('playpauseicon').className = 'fa fa-pause';
    } else {
        audio.pause();
        document.getElementById('playpauseicon').className = 'fa fa-play';
    }
}

function nextSong() {
    playlist_index++;
    if (playlist_index > playlist.length - 1)
    {
        playlist_index = 0;
    }
    fetchMusicDetails();
}
function prevSong() {
    playlist_index--;
    if (playlist_index < 0)
    {
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
}
function mute() {
    if (audio.muted) {
        audio.muted = false;
        document.getElementById('mute').className = 'fa fa-volume-off';
        mutebtn.title = 'Mute'
    } else {
        audio.muted = true;
        document.getElementById('mute').className = 'fa fa-volume-up';
        mutebtn.title = 'Unmute'
    }
}
function seek(event) {
    if (audio.duration == 0) { null }
    else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
    event.preventDefault();
}
function setVolume() {
    audio.volume = volumeslider.value / 100;
}
function seektimeupdate() {
    if (audio.duration)
    {
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = Math.floor(nt); 
        curmin = Math.floor(audio.currentTime / 60);
        cursec = Math.floor(audio.currentTime - curmin * 60);
        durmin = Math.floor(audio.duration / 60);
        dursec = Math.floor(audio.duration - durmin * 60);
        if (cursec < 10) { cursec = "0" + cursec }
        if (dursec < 10) { dursec = "0" + dursec }
        if (curmin < 10) { curmin = "0" + curmin }
        if (durmin < 10) { durmin = "0" + durmin }
        curtimetext.innerHTML = curmin + ":" + cursec;
        durtimetext.innerHTML = durmin + ":" + dursec;
    } else {
        curtimetext.innerHTML = "00" + ":" + "00";
        durtimetext.innerHTML = "00" + ":" + "00";
    }
}
function switchTrack() {
    if (playlist_index === (playlist.length - 1))
    {
        playlist_index = 0;
    } else {
        playlist_index++;
    }
    fetchMusicDetails();
}
function loop() {
    if (audio.loop)
    {
        audio.loop = false;
    } else {
        audio.loop = true;
    }
}
function getRandomNumber(min,max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function random() {
    let randomIndex = getRandomNumber(0, playlist.length - 1)
    playlist_index = randomIndex;
    fetchMusicDetails();
}