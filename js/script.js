
console.log("JavaScript");
let currentSong=new Audio();
let songs;

function convertSecondsToMinutes(seconds) {

    if(isNaN(seconds) || seconds<0){
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds to always have two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(){
let a= await fetch("./songs");
let response = await a.text();
console.log(response);
let div = document.createElement("div");
div.innerHTML = response;
let as=div.getElementsByTagName("a");
console.log(as);
songs= [];
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push((element.href.split("/songs/")[1]).split(".mp3")[0]);
    }
}
return songs;
}

const playMusic =(track,pause=false)=>{
    // let audio=new Audio("/SPOTIFY/songs/"+track+".mp3");
    currentSong.src="/songs/"+track+".mp3";
    if(!pause){
    currentSong.play();
    play.src="pause.svg";
    }
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function main(){
    

    songs=await getSongs();
    console.log(songs);
    playMusic(songs[0],true);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        console.log(song);
        songUL.innerHTML = songUL.innerHTML+`<li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20"," ")}</div>
            <div>Dev</div>
        </div><div class="playnow">
        <img class="invert" src="play.svg" alt=""></div>
    </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })
    })

    // var audio = new Audio(songs[0]);
    // audio.play();

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src="pause.svg";
        }
        else{
            currentSong.pause();
            play.src="play.svg";
        }
    })

    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML =`${convertSecondsToMinutes(currentSong.currentTime)}/${convertSecondsToMinutes(currentSong.duration)}`;
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = (e.offsetX/e.target.getBoundingClientRect().width)*100 +"%";
        currentSong.currentTime = ((currentSong.duration)* percent)/100;
    })

    previous.addEventListener("click",()=>{
        console.log("Previous clicked");
        let c=currentSong.src.split("/").slice(-1) [0];
        let index = songs.indexOf(c.split(".mp3").slice(0)[0]);
        
        if((index-1)>=0){
            playMusic(songs[index-1]);
        }
        else if((index-1)<0){
            playMusic(songs[songs.length-1]);
        }
    })

    next.addEventListener("click",()=>{
        console.log("Next clicked");
        // let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0]);
        let c=currentSong.src.split("/").slice(-1) [0];
        let index = songs.indexOf(c.split(".mp3").slice(0)[0]);
        // console.log(c);
        // console.log(c.split(".mp3").slice(0)[0]);
        // console.log(index);
        // console.log(songs);
        // console.log(currentSong.src.split("/").slice(-1) [0].slice(-1) [0].split(".mp3").slice(0));
        // console.log(index);
        // console.log(currentSong);
        // console.log(songs[index]);
        // console.log(songs[index+1]);
        if((index+1)<songs.length){
            playMusic(songs[index+1]);
        }
        else if((index+1)>=songs.length){
            playMusic(songs[0]);
        }
        
    })

    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left ="0";
    })

    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left ="-100%";
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currentSong.volume=parseInt(e.target.value)/100;
    })



    currentSong.addEventListener("loadeddata", () => {
    console.log(currentSong.duration,currentSong.currentSrc,currentSong.currentTime);
    });



} 

main();