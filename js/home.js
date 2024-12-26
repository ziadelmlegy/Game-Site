// ? =============> Global ===============>
const links = document.querySelectorAll(".menu a");
const loading = document.querySelector(".loading");
// ! =============> When Start ===============>
getGame("mmorpg");
// * =============> Events ===============>
// document.querySelectorAll(".menu a").forEach(function (link) {
//     link.addEventListener("click", function(){
//         document.querySelector(".menu .active").classList.remove("active");
//         link.classList.add("active");
//     })

// })
const mode =document.getElementById("mode");
mode.addEventListener("click" , function(){
  if(mode.classList.contains("fa-sun")){
    document.querySelector("html").setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme","light");
  } else{ 
    document.querySelector("html").setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme","dark");
  }
})
if(localStorage.getItem("theme") !=null){
    const themeData= localStorage.getItem("theme");
    if(themeData=== "light"){
      mode.classList.replace("fa-sun", "fa-moon")
    }else{
      mode.classList.replace("fa-moon", "fa-sun")

    }
    document.querySelector("html").setAttribute("data-theme",themeData)
}




for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    document.querySelector(".menu .active").classList.remove("active");
    links[i].classList.add("active");
    const category = links[i].getAttribute("data-category");
    console.log(category);
    getGame(category);
  });
}
document.querySelector(".logout-btn").addEventListener('click', function(){
  localStorage.removeItem('uToken');
  location.href='./index.html';
})
// ! =============> Functions ===============>

async function getGame(categoryName) {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fe7df74715msh643dd8f50acd1f2p19e55ajsn26dc43c7e544",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
    options
  );
  const data = await api.json();

  console.log(data);

  displayData(data);
  loading.classList.add("d-none");
}
function displayData(gamesData) {
  let gamesBox = ``;
  for (let i = 0; i < gamesData.length; i++) {
    let videoPath = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    gamesBox += `
  <div class="col">
                  <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" onclick="showDetails()">
                     <div class="card-body">
                        <figure class="position-relative">
                           <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />
                         <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                          <source src="${videoPath}">
                          </video>
                        </figure>
            
                        <figcaption>
            
                           <div class="hstack justify-content-between">
                              <h3 class="h6 small">${gamesData[i].title}</h3>
                              <span class="badge text-bg-primary p-2">Free</span>
                           </div>
            
                           <p class="card-text small text-center opacity-50">
                              ${gamesData[i].short_description}
                           </p>
            
                        </figcaption>
                     </div>
            
                     <footer class="card-footer small hstack justify-content-between">
            
                        <span class="badge badge-color">${gamesData[i].genre}</span>
                        <span class="badge badge-color">${gamesData[i].platform}</span>
            
                     </footer>
                  </div>
               </div>
  
  `;
  }
  document.getElementById("gameData").innerHTML = gamesBox;
}

function startVideo(event) {
  const videoEl = event.target.querySelector("video");
  videoEl.classList.remove("d-none");
  videoEl.muted = true;
  videoEl.play();
}
function stopVideo(event) {
  const videoEl = event.target.querySelector("video");
  videoEl.classList.add("d-none");
  videoEl.muted = true;
  videoEl.pause();
}

function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}
