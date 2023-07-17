let currentMusic = 0;
let songData = []; //this global variable stores song data

const music = document.querySelector("#audio");
const slider = document.querySelector(".slider");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

playBtn.addEventListener('click', ()=>{
    if(playBtn.classList.contains('pause')){
        music.pause();
    }else{
        music.play();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

// setting up music to be played:
const setMusic = (i)=>{
    slider.value = 0; //range value set to 0
    //using data from the JSON file
    const song = songData[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    //without the setTimeOut function, there will be a slight delay when setting up the music sorce and accessing its duration
    setTimeout(() => {
        slider.max = music.duration;
        songDuration.innerHTML = formatTime(music.duration);
    }, 300);
}
// Fetch the JSON file and load the song data
fetch('songList.json')
    .then(response => response.json())
    .then(data=>{
    //checking if JSON is being loaded
    console.log(data);
    songData = data; //assign the data to the global variable
    setMusic(9); //call setMusic after the data is loaded
    })
    //error handling
    .catch(error => {
        console.error('Error loading JSON file', error);
    });

//formatting the song duration to mins and seconds format
const formatTime = (time)=>{
    let min = Math.floor(time / 60);
    if(min<10){
        min = `0${min}`
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`
    }
    return `${min} : ${sec}`;
}
//slider
setInterval(() => {
    slider.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500)

slider.addEventListener('change', ()=>{
    music.currentTime =slider.value;
})

//forward and backward button functions
forwardBtn.addEventListener('click', ()=>{
    if(currentMusic >= songData.length - 1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

backwardBtn.addEventListener('click', ()=>{
    if(currentMusic <= 0){
        currentMusic = songData.length - 1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})
