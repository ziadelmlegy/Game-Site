// ? =============> Global ===============>

const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formeData=document.querySelector("form");
let isValid = false;
// ! =============> When Start ===============>
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

// * =============> Events ===============>
formeData.addEventListener("submit", function (e) {
  e.preventDefault();
  if(isValid === true){
    setData()
  }
  console.log(setData.value)
});
formeData.addEventListener("input", function(){
  if(validationName() &&
   validationEmail() &&
    validationPassword() && 
      validationRePassword() && 
      validationPhone() ){
        isValid=true;
  }else{
    isValid=false;
  }
})
// ! =============> Functions ===============>
function setData() {
  const user = {
    name: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value,
    rePassword: inputs[3].value,
    phone: inputs[4].value,
  };
  console.log(user);
  registerForm(user);
}
async function registerForm(userData) {
  const api = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();
  console.log(response);


  if(response.message==='success'){
    location.href ='./index.html' 
  }
  else{
    document.getElementById("msg").innerHTML=response.error?.email.message;
    
  }
}
//  =============> Validation ===============>
function validationName() {
  const regexStyle=/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
  if(regexStyle.test(inputs[0].value)){

    inputs[0].classList.add('is-valid');
    inputs[0].classList.remove('is-invalid');
    return true;
  }
  else{
    inputs[0].classList.add('is-invalid');
    inputs[0].classList.remove('is-valid');
    return false;
  }

}
function validationEmail() {
  const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if(regexStyle.test(inputs[1].value)){
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true
  }
  else{
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    
    return false;
  }
  
}

function validationPassword(){
  const regexStyle=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if(regexStyle.test(inputs[2].value)){
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  }
  else{
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}
function validationRePassword(){
  const regexStyle=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if(regexStyle.test(inputs[3].value)){
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  }
  else{
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function validationPhone(){
  const regexStyle=/^01[0125][0-9]{8}$/
  if(regexStyle.test(inputs[4].value)){
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  }else{
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}