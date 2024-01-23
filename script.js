// Global Variable for curr song
let currentSong=new Audio();

async function getSongs() {
    let a = await fetch("/songs")
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }

    }
    return songs;
}
// seconds to minutes
function convertSecondsToMinutesAndSeconds(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
      return 'Invalid input';
    }
  
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : String(remainingSeconds);
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
const playMusic=(track)=>{
    // // Play the song
    currentSong.src="/songs/"+ track + ".mp3";
    currentSong.play();
    play.src="pause.svg"
    document.querySelector(".songInfo").innerHTML=track;
    document.querySelector(".time").innerHTML="";

}

async function main() {
    // Get all songs from directory
    let songs = await getSongs();
    console.log(songs);

    // insert songs
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        let cleanSong = song.replaceAll("%20", " ").replace(/%5B128 Kbps%5D-\(SongsPk\.com\.se\)/g, "").replaceAll(".mp3", "").replaceAll("(PagalWorld.com.pe)", "");
        songUL.innerHTML = songUL.innerHTML + `<li>${cleanSong}</li>`;
    }


    // attach event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.innerHTML);
            playMusic(e.innerHTML);
        })
    })

    // attach event listener to play prev and next btns
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src="pause.svg"
        }
        else{
            currentSong.pause();
            play.src="play.svg"
        }
    })

    // listen for time change
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".time").innerHTML=`${convertSecondsToMinutesAndSeconds(currentSong.currentTime)}:${convertSecondsToMinutesAndSeconds(currentSong.duration)}`
    })

}
main();