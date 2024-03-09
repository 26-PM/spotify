// Global Variable for curr song
let currentSong = new Audio();
let songs = [
    { name: "Dil Jhoom", src: "./Dil Jhoom from Crakk.mp3" },
    { name: "Teri Baaton", src: "https://ghantalele.com/uploads/files/data-86/42618/Teri%20Baaton%20Mein%20Aisa%20Uljha%20Jiya%20Title%20Song_192(Ghantalele.com).mp3" },
    { name: "O Maahi", src: "./O Maahi By Arijit Singh.mp3" },
    { name: "Rom Rom", src: "https://songspk.com.se/files/download/id/100553" },
    { name: "Akhiyaan Gulaab", src: "https://pagalnew.com/download128/45280" }
];
// seconds to minutes
function convertSecondsToMinutesAndSeconds(seconds = 0) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : String(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track) => {
    // Find the matching song object using find()
    const matchedSong = songs.find(song => song.name === track);

    if (matchedSong) {
        // Update current song information and playback
        currentSong.src = matchedSong.src;
        currentSong.play();

        // Update UI elements
        play.src = "pause.svg";
        document.querySelector(".songInfo").innerHTML = track;
        document.querySelector(".time").innerHTML = ""; // Reset time display, if needed

        // Handle potential errors during playback (optional)
        currentSong.onerror = (e) => {
            console.error("Error playing song:", e);
            // Handle errors gracefully, e.g., display an error message or choose a backup song
        };
    } else {
        // Handle the case where the track is not found (optional)
        console.warn("Track not found:", track);
        // Handle gracefully, e.g., display a message or default to a different song
    }
};


async function main() {

    // insert songs
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songs.forEach(element => {
        songUL.innerHTML = songUL.innerHTML + `<li>${element.name}</li>`;
    });


    // attach event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.innerHTML);
        })
    })

    // attach event listener to play prev and next btns
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg"
        }
        else {
            currentSong.pause();
            play.src = "play.svg"
        }
    })

    // listen for time change
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".time").innerHTML = `${convertSecondsToMinutesAndSeconds(currentSong.currentTime)}/${convertSecondsToMinutesAndSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // add event listener to seekbar
    document.querySelector(".seekBar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    // add event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    });

    // add event listener to close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });

    document.querySelector("#first").addEventListener("click", () => { playMusic('Dil Jhoom') });
    document.querySelector("#second").addEventListener("click", () => { playMusic('Teri Baaton') });
    document.querySelector("#third").addEventListener("click", () => { playMusic('O Maahi') });
    document.querySelector("#fourth").addEventListener("click", () => { playMusic('Rom Rom') });
    document.querySelector("#fifth").addEventListener("click", () => { playMusic('Akhiyaan Gulaab') });
}
main();

// Search Input Events
let input = document.querySelector("#searchInput");
const searchResultsContainer = document.getElementById('searchResults');

input.addEventListener("focus", function () {
    document.querySelector(".playlists").style = "opacity:0.1";
})
input.addEventListener("blur", function () {
    document.querySelector(".playlists").style = "opacity:1";
    searchResultsContainer.innerHTML = '';
})
input.addEventListener("input", () => {
    if (input.value !== " ") {
        const filter = songs.filter(obj => obj.name.toLowerCase().startsWith(input.value))
        searchResultsContainer.innerHTML = '';
        filter.forEach(song => {
            const songElement = document.createElement('div');
            songElement.textContent = song.name; // Displaying song name, you can adjust this according to your data structure
            songElement.setAttribute("id",song.name)
            searchResultsContainer.appendChild(songElement);
        });
    }
    if (input.value === " ") {
        searchResultsContainer.innerHTML = '';
    }
    if (input.value == "") {
        searchResultsContainer.innerHTML = '';
    }
})

// Hamburger and close events
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".right").style = "opacity:0.1";
})
document.querySelector(".close ").addEventListener("click", () => {
    document.querySelector(".right").style = "opacity:1";
})