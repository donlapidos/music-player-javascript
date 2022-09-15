const musicContainer = document.querySelector(".music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

//Song titles
const songs = ["snow", "waitress", "clones"];

//Keep track of songs
let songIndex = 2;



//Update song details
const loadSong = (song) => {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}` + `img.jpg`;
}

const playSong = () => {
    musicContainer.classList.add("play");
    playBtn.querySelector(".fas").classList.remove("fa-play");
    playBtn.querySelector(".fas").classList.add("fa-pause");

    audio.play();
}
const pauseSong = () => {
    musicContainer.classList.remove("play");
    playBtn.querySelector(".fas").classList.add("fa-play");
    playBtn.querySelector(".fas").classList.remove("fa-pause");

    audio.pause();
}

const prevSong = () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
};

const nextSong = () => {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
};

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progessPercent = (currentTime / duration) * 100;

    progress.style.width = `${progessPercent}%`;
};

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

};


//Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

//Load songs into the DOM
loadSong(songs[songIndex]);