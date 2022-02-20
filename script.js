//selectors
const title=document.querySelector('.title');
const prev=document.querySelector('.prev');
const playPause=document.querySelector('.playPause');
const next=document.querySelector('.next');
const audio=document.querySelector('audio');

//events
playPause.addEventListener('click',()=>{
    songPlays?pauseSong():playSong()
})
prev.addEventListener('click',previousSong)
next.addEventListener('click',nextSong)

//
const songList=[
    {path:'Nesamaguren.mp3',
        songName:'Nesamaguren'},
    {path:'Sirivennela.mp3',
        songName:'Sirivennela'},
    {path:'Srivalli.mp3',
        songName:'Srivalli'},
]

var songPlays=false;
function playSong()
{
    songPlays=true;
    audio.play();
    playPause.classList.add('active');
    playPause.innerHTML='<ion-icon name="pause-outline"></ion-icon>'
}

function pauseSong()
{
    songPlays=false;
    audio.pause();
    playPause.classList.remove('active');
    playPause.innerHTML='<ion-icon name="play-outline"></ion-icon>';
}

function loadSong(song)
{
    title.textContent=song.songName
    audio.src=song.path
}
let i=0;
loadSong(songList[i])

function previousSong()
{
    if(i==0)
    {
        i=(songList.length-1)
    }else{
        i--;
    }
    loadSong(songList[i])
    playSong();
}

function nextSong()
{
    if(i==songList.length-1)
    {
        i=1
    }else{
        i++;
    }
    loadSong(songList[i]);
    playSong();
}