// ? =============> Global ===============>

    const inputs = document.querySelectorAll("input");
    const btnLogin = document.getElementById("btnLogin");
    const formeData=document.querySelector("form");
    let isValid = false;
    // ! =============> When Start ===============>
    
    // * =============> Events ===============>
    formeData.addEventListener("submit", function (e) {
      e.preventDefault();
      if(isValid === true){
        setData()
      }
      console.log(setData.value)
    });
    formeData.addEventListener("input", function(){
      if(validationEmail() && validationPassword() ){
            isValid=true;
      }else{
        isValid=false;
      }
    })

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

    // ! =============> Functions ===============>
    function setData() {
      const user = {
        email: inputs[0].value,
        password: inputs[1].value,
       
      };
      console.log(user);
      loginForm(user);
    }
    async function loginForm(userData) {
      const api = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
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
        localStorage.setItem("uToken",response.token)
        location.href ='./home.html' 
      }
      else{
        document.getElementById("msg").innerHTML=response.message;
        
      }
    }
    //  =============> Validation ===============>

    function validationEmail() {
      const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      if(regexStyle.test(inputs[0].value)){
        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        return true
      }
      else{
        inputs[0].classList.add("is-invalid");
        inputs[0].classList.remove("is-valid");
        
        return false;
      }
      
    }
    
    function validationPassword(){
      const regexStyle=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if(regexStyle.test(inputs[1].value)){
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true;
      }
      else{
        inputs[1].classList.add("is-invalid");
        inputs[1].classList.remove("is-valid");
        return false;
      }
    }
  