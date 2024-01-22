async  function getSongs(){
    let a=await fetch("/songs")
    let response= await a.text();
    // console.log(response);
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
        
    }
    return songs;
}

async function main(){
    // Get all songs from directory
    let songs=await getSongs();
    console.log(songs);

    // insert songs
    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        let cleanSong = song.replaceAll("%20"," ").replace(/%5B128 Kbps%5D-\(SongsPk\.com\.se\)/g, "").replaceAll(".mp3","").replaceAll("(PagalWorld.com.pe)","");
        songUL.innerHTML = songUL.innerHTML + `<li>${cleanSong}</li>`;
    }    

    // Play the song
    let audio=new Audio(songs[0]);
    audio.play();
    audio.pause();
}
main();