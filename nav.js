let hrefInicio = document.getElementById("hrefInicio");
let hrefReservar = document.getElementById("hrefReservar");
let dropdownUser = document.getElementById("dropdownUser");

hrefInicio.setAttribute('href','index.html');
hrefReservar.setAttribute('href','reserva.html');

let user = JSON.parse(localStorage.getItem("user"));

const CerrarSesion = () =>{
    localStorage.removeItem("user");
    location.href = "index.html";
}

if(user === null){
    dropdownUser.innerHTML+=
        `
        <a href="login.html">Iniciar Sesión</a>
        `
} else if (user.tipoUsuario === 'cliente'){
    document.getElementById("user-name").innerHTML = 
    `
    ${user.user}
    `
    dropdownUser.innerHTML+=
    `
    <a id="misReservas">Mis Reservas</a>
    <a id="CerrarSesion">Cerrar Sesión</a>
    `
    document.getElementById("misReservas").setAttribute('href','misReservas.html');
    document.getElementById("CerrarSesion").onclick = CerrarSesion;
    document.getElementById("CerrarSesion").setAttribute('href','index.html');
} else if (user.tipoUsuario === 'admin'){
    document.getElementById("user-name").innerHTML = 
    `
    ${user.user}
    `
    dropdownUser.innerHTML+=
    `
    <a href="reservas.html">Reservas</a>
    <a id="CerrarSesion">Cerrar Sesión</a>
    `
    document.getElementById("CerrarSesion").onclick = CerrarSesion;
    document.getElementById("CerrarSesion").setAttribute('href','index.html');
}
