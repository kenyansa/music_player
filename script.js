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

// setting up music to be played:
const setMusic = (i)=>{
    slider.value = 0; //range value set to 0
    // Fetch the JSON file and load the song data
    fetch('songList.json')
        .then(response => response.json())
        .then(data=>{
            //checking if JSON is being loaded
            console.log(data);
            //using the data
            let song = data[i];
            currentMusic = i;
            music.src = song.path;

            songName.innerHTML = song.name;
            artistName.innerHTML = song.artist;
            disk.style.backgroundImage = `url('${song.cover}')`;

            currentTime.innerHTML = '00.00';
            //without the setTimeOut function, there will be a slight delay when setting up the music sorce and accessing its duration
            setTimeout(() => {
                slider.max = music.duration;
                songDuration.innerHTML = formatTime(music.duration);
            }, 300);
        })
        //error handling
        .catch(error => {
            console.error('Error loading JSON file', error);
        })
}
setMusic(8);
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