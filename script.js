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
            songs.push(element.href);
        }
        
    }
    return songs;
}

async function main(){
    // Get all songs from directory
    let songs=await getSongs();
    console.log(songs);

    // Play the song
    let audio=new Audio(songs[0]);
    audio.play();
    audio.pause();
}
main();