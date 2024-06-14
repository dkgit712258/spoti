
console.log("JavaScript");
let currentSong=new Audio();
let songs;
let currFolder;
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const bodyParser = require("body-parser"); router.use(bodyParser.json());
// componentDidMount(){
//     fetch('http://127.0.0.1:5500/')
//     .then(response => response.json())
//     .then(console.log)
//   }

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

async function getSongs(folder){
    currFolder=folder;
let a= await fetch(`/${folder}`);
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
        songs.push((element.href.split(`${folder}`)[1]).split(".mp3")[0].replace(/\//g,""));
    }
}

let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
songUL.innerHTML=""
for (const song of songs) {
    
    console.log(song);
    songUL.innerHTML = songUL.innerHTML+`<li>
    <img class="invert" src="img/music.svg" alt="">
    <div class="info">
        <div>${song.replaceAll("%20"," ").trim("/")}</div>
        <div>Dev</div>
    </div><div class="playnow">
    <img class="invert" src="img/play.svg" alt=""></div>
</li>`;
}
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
})
})

return songs;
}

const playMusic =(track,pause=false)=>{
    // let audio=new Audio("/SPOTIFY/songs/"+track+".mp3");
    currentSong.src=`/${currFolder}/`+track+".mp3";
    if(!pause){
    currentSong.play();
    play.src="img/pause.svg";
    }
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

// async function displayAlbums(){
//     let a= await fetch(`http://127.0.0.1:5500/songs/`);
//     let response = await a.text();
//     console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors =div.getElementsByTagName("a");
//     let cardcontainer=document.querySelector(".cardcontainer");
//     Array.from(anchors).forEach(async e=>{
//         if(e.href.includes("/songs")){
//             console.log(e);
//            let folder= e.href.split("/").slice(-1)[0];
//            console.log(e.href);
//            let a= await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
//            let response = await a.json();
//            console.log(response);
//            cardcontainer.innerHTML = cardcontainer.innerHTML+`<div data-folder="song1" class="card">
//            <div class="play"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="48"
//                    fill="none">
//                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"
//                        fill="#1ED760" />
//                    <path
//                        d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
//                        fill="currentColor" />
//                </svg>
//            </div>
//            <img src="/songs/${folder}/cover.jpg" alt="">
//            <h3>${response.title}</h3>
//            <p>${response.description}</p>
//        </div>`

//         }
//     })
// }

async function displayAlbums(){
    let a= await fetch(`/songs/`);
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors =div.getElementsByTagName("a");
    let cardcontainer=document.querySelector(".cardcontainer");
    // Array.from(anchors).forEach(async e=>{
        let array =Array.from(anchors);
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
        
        if(e.href.includes("/songs/")){
            
           let folder= e.href.split("/").slice(-1)[0];
           
           let a= await fetch(`/songs/${folder}/info.json`);
           let response = await a.json();
           console.log(response);
           cardcontainer.innerHTML = cardcontainer.innerHTML+`<div data-folder=${folder} class="card">
           <div class="play"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="48"
                   fill="none">
                   <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"
                       fill="#1ED760" />
                   <path
                       d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                       fill="currentColor" />
               </svg>
           </div>
           <img src="/songs/${folder}/cover.jpg" alt="">
           <h3>${response.title}</h3>
           <p>${response.description}</p>
       </div>`

        }
    }
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async item=>{
            songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
            
            console.log("click");
            console.log(`songs/${item.currentTarget.dataset.folder}`);
            console.log(songs[0]);
            
        })
    })
}


async function main(){
    

    await getSongs("songs/song1");
    console.log(songs);
    playMusic(songs[0],true);

    displayAlbums();
    

    // var audio = new Audio(songs[0]);
    // audio.play();

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src="img/pause.svg";
        }
        else{
            currentSong.pause();
            play.src="img/play.svg";
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
        if(currentSong.volume>0){
            document.querySelector(".volume img").src = document.querySelector(".volume img").src.replace("mute.svg","volume.svg");
        }
    })

    document.querySelector(".volume img").addEventListener("click",e=>{
        if(e.target.src.includes("volume.svg")){
            e.target.src=e.target.src.replace("volume.svg","mute.svg");
            currentSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume.svg");
            currentSong.volume=0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0.1;
        }
    })

    



    currentSong.addEventListener("loadeddata", () => {
    console.log(currentSong.duration,currentSong.currentSrc,currentSong.currentTime);
    });



} 

main();