import { LinkedList } from "../LinkedList.mjs";
import { Music } from "../Music.mjs";

const audio = document.querySelector("audio");
const titulo = document.querySelector("h1");
const reproducir = document.getElementById("reproducir");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const tiempo_actual = document.getElementById("tiempo_actual");
const audio_actual = document.getElementById("audio_actual");
const contenedor_progreso = document.querySelector(".progress_container");
const progreso = document.getElementById("progreso");
const volumenControl = document.getElementById("volumen");


const songs = [
    new Music("Miley Cyrus - Hate Me", "audio/Miley Cyrus - Hate Me.mp3", "img/"),
    new Music("SZA - F2F", "audio/SZA - F2F.mp3"),
    new Music("SZA - Special", "audio/SZA - Special.mp3"),
    new Music("Taylor Swift - mirrorball", "audio/Taylor Swift - mirrorball.mp3"),
    new Music("Taylor Swift - my tears ricochet", "audio/Taylor Swift - my tears ricochet.mp3"),
    new Music("Lana Del Rey - Let Me Love You Like A Woman", "audio/Lana Del Rey - Let Me Love You Like A Woman.mp3"),
    new Music("Lana Del Rey - Thunder", "audio/Lana Del Rey - Thunder.mp3"),
    new Music("Troye Sivan - Easy", "audio/Troye Sivan - Easy.mp3"),
    new Music("Taylor Swift - You're Losing Me (From The Vault)", "audio/Taylor Swift - You're Losing Me (From The Vault).mp3"),
    new Music("The 1975 - About You", "audio/The 1975 - About You.mp3"),
    new Music("iamnotshane - Maybe My Soulmate Died", "audio/iamnotshane - Maybe My Soulmate Died.mp3"),
    new Music("iamnotshane - What A Perfect Day For Crying", "audio/iamnotshane - What A Perfect Day For Crying.mp3"), 
];

let audioIndex = 0;
const playlist = new LinkedList();
songs.forEach(song => playlist.push(song));

function changeSong(direction) {
    audioIndex = (audioIndex + direction + playlist.size()) % playlist.size();
    const currentSong = playlist.getElementAt(audioIndex).getData();
    loadAudio(currentSong);
    audio.play();
}

function loadAudio(song) {
    titulo.textContent = song.getName();
    audio.src = song.getLocation();

    audio.addEventListener("loadedmetadata", () => {
        updateTime(audio.duration, audio_actual);
    });
}

function updateTime(duration, element) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

reproducir.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

anterior.addEventListener("click", () => {
    changeSong(-1);
});

siguiente.addEventListener("click", () => {
    changeSong(1);
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progreso.style.width = `${progressPercent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    tiempo_actual.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

contenedor_progreso.addEventListener("click", (event) => {
    const progressWidth = contenedor_progreso.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    const seekTime = (clickX / progressWidth) * duration;
    audio.currentTime = seekTime;
});

volumenControl.addEventListener("input", () => {
    audio.volume = volumenControl.value;
});

loadAudio(playlist.getElementAt(audioIndex).getData());