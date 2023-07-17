let currentMusic = 0;

const music = document.querySelector("#audio");

const slider = document.querySelector(".slider");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwarBtn = document.querySelector("backward-btn");

playBtn.addEventListener('click', ()=>{
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})