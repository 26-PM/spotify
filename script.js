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

const playMusic=(track)=>{
    // // Play the song
    currentSong.src="/songs/"+ track + ".mp3";
    currentSong.play();
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
}
main();