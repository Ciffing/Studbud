const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title = document.getElementById("title")
const musicCover = document.getElementById("music-cover")

// music info
const songs = ["Ocean", "pink", "piano", "Rain"]
// default from the first song
let songIndex = 0;
// Load the song details into the DOM
loadSong(songs[songIndex])
// update song details
function loadSong(song) {
    title.innerHTML = song
    audio.src = `music/${song}.mp3`;      
    // The path is music/ with fireworks.mp3
    musicCover.src = `img/${song}.jpg`;
}

// play the song
function playSong() {
    // element add class name
    musicContainer.classList.add("play")
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

// Stop play
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// previous song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    // load song info and play
    loadSong(songs[songIndex])
    playSong()
}
// next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// progress bar update
function updateProgress(e) {
    // audio.duration: audio length
     // audio.currentTime: audio playback position
     // object destructuring operation
    const {
        duration,
        currentTime
    } = e.target;
    const progressPercent = (currentTime / duration) * 100
    // progress bar
    progress.style.width = `${progressPercent}%`
}
// set progress bar
function setProgress(e) {
    // progressContainer delegate view width
    const width = this.clientWidth
    // The horizontal offset in the progressContainer when the mouse is clicked
    const clickX = e.offsetX

    // audio.duration: audio length
    const duration = audio.duration

    // audio.currentTime: audio playback position
    audio.currentTime = (clickX / width) * duration
}
// event listener
// 1. Play the song
playBtn.onclick = function () {
    // Determine if it is currently playing

    // const isPlaying = musicContainer.classList.contains('play')
    // if (isPlaying) {
    //     pauseSong()
    // } else {
    //     playSong()
    // }
    musicContainer.classList.contains('play') ? pauseSong() : playSong()
}
// 2. Switch songs
prevBtn.onclick = prevSong
nextBtn.onclick = nextSong

// 3. Player progress bar related
// 3.1 Set the playback progress
progressContainer.onclick = setProgress
// 3.2 progress bar update
audio.ontimeupdate = updateProgress
// 3.3 Auto next song after song ends
audio.onended = nextSong