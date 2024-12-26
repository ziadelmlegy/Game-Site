// ? =============> Global ===============>
const searchParams= location.search;
const params=new URLSearchParams(searchParams);

const id =params.get("id");

let containerBox={};






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

// ! =============> When Start ===============>
( async function(){
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fe7df74715msh643dd8f50acd1f2p19e55ajsn26dc43c7e544',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };


const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}` , options)

const responeDetails= await api.json();

 console.log(responeDetails);
 containerBox = responeDetails;
 displayData();
 
})()

function displayData(){
    detailsData=`
    <div class="col-md-4">
   <figure>
      <img src="${containerBox.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
            <li class="breadcrumb-item text-reset "><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${containerBox.title}</li>
         </ol>
      </nav>

      <h4 class="content-details">${containerBox.title}</h4>

      <h5 class=" content-details">About ${containerBox.title}</h5>
      <p>${containerBox.description}</p>
      <a class="btn btn-outline-warning" target=""_blank  href="${containerBox.game_url}">Show More</a>

      
   </div>
</div>
    `;
    document.getElementById("detailsData").innerHTML= detailsData;
    let backgroundImage= containerBox.thumbnail.replace('thumbnail', 'background')
    document.body.style.cssText=`background-image:url('${backgroundImage}') ; background-position:center ;
   background-size: cover;`
}   


