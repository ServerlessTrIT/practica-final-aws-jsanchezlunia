var cars = [];
var editCarLicensePlate = null;
var editCarBrand = null;
var editCarModel = null;

/***********************************
               API
************************************/

const API_KEY="sVosyKLQTj4hTFNovhHk76hZ5ql5LrHU7UBCgOyG"
const API_URL = "https://pb1l41o98f.execute-api.eu-central-1.amazonaws.com/dev/";
const API_LOGIN = API_URL+"login";
const API_SIGNUP = API_URL+"signup";
const API_CONFIRMSIGNUP = API_URL+"confirmsignup";
const API_CARS = API_URL+"cars";

/* USERS */
function signup(event){
  console.log("signup");
  event.preventDefault();
  $.ajax({
    url: API_SIGNUP,
    method: "POST",
    dataType : "json",
    headers:{
      "x-api-key": API_KEY
    },
    data: JSON.stringify({
      "username":$("input[id='username']").val(),
      "password":$("input[id='password']").val()
    })
  }).done(function(resp){
    //$("div[id='msg']").text(resp.message);
    goTo('/confirmsignup');
  }).fail(function(msg){
    //$("div[id='msg']").text(JSON.parse(error.responseText).message);
    $("div[id='msg']").text("Se ha producido un error");
  });
  return true;
}

function confirmSignup(){
  console.log("confirmsignup");
  event.preventDefault();
  $.ajax({
    url: API_CONFIRMSIGNUP,
    method: "POST",
    dataType : "json",
    headers:{
      "x-api-key": API_KEY
    },
    data: JSON.stringify({
      "username":$("input[id='username']").val(),
      "code":$("input[id='code']").val()
    })
  }).done(function(resp){
    $("div[id='msg']").text(resp.message);
  }).fail(function(msg){
    //$("div[id='msg']").text(JSON.parse(error.responseText).message);
    $("div[id='msg']").text("Se ha producido un error");
  });
  return false;
}

function login(event){
  console.log("login");
  event.preventDefault();
  
  $.ajax({
    url: API_LOGIN,
    method: "POST",
    dataType : "json",
    headers:{
      "x-api-key": API_KEY
    },
    data: JSON.stringify({
      "username":$("input[id='username']").val(),
      "password":$("input[id='password']").val()
    })
  }).done(function(resp){
    localStorage.setItem('token', resp.token);
    goTo("/");
  }).fail(function(error){
    //$("div[id='msg']").text(JSON.parse(error.responseText).message);
    $("div[id='msg']").text("Credenciales incorrectas");
  });
  
  return false;
}

/* CARS */

function getCars(){
  console.log("getCars");
  //event.preventDefault();
  
  $.ajax({
    url: API_CARS,
    method: "GET",
    headers:{
      "x-api-key": API_KEY,
      "Authorization":"Bearer "+localStorage.getItem('token')
    }
  }).done(function(resp){
    cars=resp.items;
    goTo("/cars");
  }).fail(function(error){
    //console.log(JSON.stringify(error));
    localStorage.removeItem('token');
    goTo("/");
  });
  
  return false;
}

function getCar(licenseplate){
  console.log("getCar " + licenseplate);
  //event.preventDefault();
  
  $.ajax({
    url: API_CARS + '/' + licenseplate,
    method: "GET",
    headers:{
      "x-api-key": API_KEY,
      "Authorization":"Bearer "+localStorage.getItem('token')
    }
  }).done(function(resp){
    editCarBrand=resp.item['brand'];
    editCarModel=resp.item['model'];
    goTo("/editcar");
  }).fail(function(error){
    //console.log(JSON.stringify(error));
    localStorage.removeItem('token');
    goTo("/");
  });
  
  return false;
}

function putCar(){
  console.log("putCar");
  event.preventDefault();
  
  $.ajax({
    url: API_CARS,
    method: "PUT",
    headers:{
      "x-api-key": API_KEY,
      "Authorization":"Bearer "+localStorage.getItem('token')
    },
    data: JSON.stringify({
      "licenseplate":$("input[id='licenseplate']").val(),
      "brand":$("input[id='brand']").val(),
      "model":$("input[id='model']").val()
    })
  }).done(function(resp){
    getCars(); //actualizar listado de coches
  }).fail(function(error){
    //console.log(JSON.stringify(error));
    localStorage.removeItem('token');
    goTo("/");
  });
  
  return false;
}

function updateCar(){
  console.log("updateCar");
  event.preventDefault();
  
  $.ajax({
    url: API_CARS + '/' + editCarLicensePlate,
    method: "POST",
    headers:{
      "x-api-key": API_KEY,
      "Authorization":"Bearer "+localStorage.getItem('token')
    },
    data: JSON.stringify({
      "brand":$("input[id='brand']").val(),
      "model":$("input[id='model']").val()
    })
  }).done(function(resp){
    getCars(); //actualizar listado de coches
  }).fail(function(error){
    //console.log(JSON.stringify(error));
    localStorage.removeItem('token');
    goTo("/");
  });
  
  return false;
}

function deleteCar(event){
  console.log("deleteCar");
  event.preventDefault();
  licenseplate = $(this).attr('id').split("_")[1];
  console.log(licenseplate);
  $.ajax({
    url: API_CARS,
    method: "DELETE",
    headers:{
      "x-api-key": API_KEY,
      "Authorization":"Bearer "+localStorage.getItem('token')
    },
    data: JSON.stringify({
      "licenseplate":licenseplate
    })
  }).done(function(resp){
    getCars(); //actualizar listado de coches
  }).fail(function(error){
    //console.log(JSON.stringify(error));
    localStorage.removeItem('token');
    goTo("/");
  });
  return false;
}

/***********************************
      VISTAS Y RENDERIZACIÓN
************************************/
function loginPage(){
  content ='<h1>Login</h1><br/><div id="msg"></div><br/><form id="formLogin"><input type="text" name="username" placeholder="E-mail" id="username"><input type="password" name="password" id="password" placeholder="Contraseña"><button type="submit" value="Enviar" id="btnLogin">Enviar</button></form>';
  return content;
}

function signupPage(){
  content ='<h1>Registro</h1><br/><div id="msg"></div><br/><form id="formSignup"><input type="text" name="username" placeholder="E-mail" id="username"><input type="password" name="password" id="password" placeholder="Contraseña"><button type="submit" id="btnSignup">Enviar</button></form>';
  return content;
}
function confirmSignupPage(){
  content ='<h1>Confirmar e-mail</h1><br/><div id="msg"></div><br/><form id="formConfirmSignup"><input type="text" name="username" placeholder="E-mail" id="username"><input type="text" name="code" id="code" placeholder="Código"><button type="submit"  id="btnConfirmSignup">Enviar</button></form>';
  return content;
}

function newCarPage(){
  content='<h1>Nuevo coche</h1><br/>';
  content+='<form id="formCar"><input type="text" name="licenseplate" placeholder="Matrícula" id="licenseplate"><input type="text" name="brand" id="brand" placeholder="Marca"><input type="text" name="model" id="model" placeholder="Modelo"><button type="submit" value="Enviar" id="btnNewCar">Enviar</button></form>';
  return content;
}

function editCarPage(){
  content='<h1>Editar coche</h1><br/>';
  content+='<form id="formCar"><input type="text" name="licenseplate" placeholder="Matrícula" id="licenseplate" value="'+editCarLicensePlate+'" disabled="disabled"><input type="text" name="brand" id="brand" placeholder="Marca" value="'+editCarBrand+'"><input type="text" name="model" id="model" placeholder="Modelo" value="'+editCarModel+'"><button type="submit" value="Enviar" id="btnEditCar">Enviar</button></form>';
  return content;
}

function carsPage(){
  content='<h1>Coches</h1><br/><button id="linkNewCar">Nuevo coche</button><br/>';
  content+='<table border="1"><tr><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Acciones</th></tr>';
  for (i = 0; i< cars.length; i++){
    content+='<tr><td>'+cars[i].licenseplate+'</td><td class="brand">'+cars[i].brand+'</td><td class="model">'+cars[i].model+'</td><td><button id="edit_licenseplate_'+cars[i].licenseplate+'">Modificar</button><button id="licenseplate_'+cars[i].licenseplate+'">X Eliminar</button></td></tr>';
  }
  content+='</table>'
  return content;
}

function renderApp() {
  /* MENÚ */
  var li_cars = document.getElementById('li_cars');
  var li_login = document.getElementById('li_login');
  var li_logout = document.getElementById('li_logout');
  var li_signup = document.getElementById('li_signup');
  if (localStorage.getItem('token')===null){
    li_cars.style.display = 'none';
    li_logout.style.display = 'none';
    li_login.style.display = 'block';
    li_signup.style.display = 'block';
  }else{
    li_cars.style.display = 'block';
    li_logout.style.display = 'block';
    li_login.style.display = 'none';
    li_signup.style.display = 'none';
  }

/* CARGAR VISTAS */
  var content;
  if (window.location.pathname === '/cars') {
    content = carsPage();
  } else if (window.location.pathname === '/newcar') {
    content = newCarPage();
  } else if (window.location.pathname === '/editcar') {
    content = editCarPage();
  } else if (window.location.pathname === '/') {
    content = '<h1>¡Bienvenid@s!</h1>';
  } else if(window.location.pathname === '/login'){
    content = loginPage();
  }else if(window.location.pathname === '/signup'){
    content = signupPage();
  }else if(window.location.pathname ==='/confirmsignup'){
    content=confirmSignupPage();
  }else if(window.location.pathname ==='/logout'){
    localStorage.removeItem('token');
    content = '<h1>¡Hasta pronto!</h1>';
    goTo("/");
  }
  var main = document.getElementsByTagName('main')[0];
  main.innerHTML = content;
}

/***********************************
             NAVEGACIÓN
************************************/
function navigate(evt) {
  evt.preventDefault();
  var href = evt.target.getAttribute('href');
  if(href==='/cars'){
    getCars();
  }
  window.history.pushState({}, undefined, href);
  renderApp();
}

function goTo(path) {
  window.history.pushState({}, undefined, path);
  renderApp();
}

function newCar(event){
  goTo('/newcar');
}

function goToEditCar(event){
  editCarLicensePlate = $(this).attr('id').split("_")[2];
  getCar(editCarLicensePlate);
}


/***********************************
          INICIALIZACIÓN
************************************/
$(document).ready(init);

function init(){
  $("nav").click(navigate);
  $("body").on("click","form button[id='btnLogin']",login);
  $("body").on("click","form button[id='btnSignup']",signup);
  $("body").on("click","form button[id='btnConfirmSignup']",confirmSignup);
  $("body").on("click","button[id^='licenseplate']",deleteCar);
  $("body").on("click","button[id^='edit_licenseplate']",goToEditCar);
  $("body").on("click","button[id='linkNewCar']",newCar);
  $("body").on("click","form button[id='btnNewCar']",putCar);
  $("body").on("click","form button[id='btnEditCar']",updateCar);
  renderApp();
}
