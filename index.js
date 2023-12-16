/// TipoHabitacion, personas, noches, fechaDesde, fechaHasta
let check_in = document.getElementById('check_in');
let check_out = document.getElementById('check_out');
let cantidadPersonas, cantidadNoches;
check_in.setAttribute("min",new Date().toISOString().split("T")[0]);
check_out.setAttribute("min",new Date().toISOString().split("T")[0]);
let validadorFecha = (check_in_pedido,check_out_pedido,check_in_reserva,check_out_reserva) => {
    if(check_in_pedido > check_in_reserva && check_in_pedido < check_out_reserva){
        return false;
    } else if(check_out_pedido > check_in_reserva && check_out_pedido < check_out_reserva){
        return false;
    }
    return true;
}
async function getHabitaciones() {
    let listHabitaciones = [];
    await fetch('https://657cddeb853beeefdb9a0ef6.mockapi.io/reservas/habitacion', {
        method: 'GET',
        headers: {'content-type':'application/json'},
        }).then(res => {
            return res.json();
        })
        .then(data => data.forEach(hab =>{
            listHabitaciones.push(hab);
        }))
        .catch(error => alert(error));
        return listHabitaciones;
}
function getReservas(){
    let listReservas = [];
    fetch('https://657cddeb853beeefdb9a0ef6.mockapi.io/reservas/reserva', {
        method: 'GET',
        headers: {'content-type':'application/json'},
        }).then(res => {
            return res.json();
        })
        .then(data => data.forEach(res =>{
            listReservas.push(res);
        }))
        .catch(error => alert(error));
        return listReservas;
}

document.getElementById('btnBuscarHabitaciones').onclick = () => {
    if(!check_in.value){
        document.getElementById("lblcheck_in").innerHTML = "Check-in   *Completar"
    } else {
        document.getElementById("lblcheck_in").innerHTML = "Check-in"
    }
    if(!check_out.value){
        document.getElementById("lblcheck_out").innerHTML = "Check-out   *Completar"
    } else {
        document.getElementById("lblcheck_out").innerHTML = "Check-out"
    }
    if(check_in.value && check_out.value){
        if(check_in.value < check_out.value){
            //Calcula la cantida de noches
            cantidadNoches = Math.floor((new Date(check_out.value) - new Date(check_in.value))/ (1000 * 60 * 60 * 24));
            cantidadPersonas = Number(document.getElementById("adults").value) + Number(document.getElementById("children").value);
            document.getElementById("contenedor").innerHTML = ""
            getHabitaciones()
                .then(data => filtrarHabitaciones(data))
                .then(data => data.forEach(hab =>{
                    document.getElementById("contenedor").innerHTML +=
                    `
                    <div class="row pt-3 d-flex align-items-center">
                        <div class="col-sm-3">
                            <img class="w-100 rounded" src="${hab.imagen}" alt="${hab.descripcion}">
                        </div>
                        <div class="col-sm-7">
                            <p>${hab.descripcion}</p>
                        </div>
                        <div class="col-sm-2">
                            <p>$${hab.precio} por noche / total $${hab.precio * cantidadNoches} (${cantidadNoches} noches)</p>
                            <input type="submit" class="btn btn-secondary ps-5 pe-5 pt-3 pb-3" onclick="redirigirReserva('${hab.id}')" value="RESERVAR"/>
                        </div>
                    </div>
                    `;
                }));        
        } else {
           alert("La fecha de check-out debe ser posterior a la fecha de check-in");
        }
    }
}

function getPrecioPorDescripcion(desc){
    let index = habitaciones.map(e => e.descripcion).indexOf(desc);
    return habitaciones[index].precio * cantidadNoches;
}
//return listado de habitaciones disponibles
async function filtrarHabitaciones(listHabitaciones){
    let listHabitacionesAuxiliar = listHabitaciones.slice();
    listReservas = await getReservas();
    for(const hab of listHabitaciones){
        if( hab.personas < cantidadPersonas || isReservado(hab.id,check_in.value,check_out.value)){
            let index = listHabitacionesAuxiliar.map(e => e.id).indexOf(hab.id);
            listHabitacionesAuxiliar.splice(index,1);
        }
    }
    return listHabitacionesAuxiliar;
}
function isReservado(idHabitacion,check_in,check_out){
    let reservado = false;
    listReservas.forEach(res => {
        if(res.idHabitacion === idHabitacion){
            if(validadorFecha(check_in,check_out,res.check_in,res.check_out)){
                reservado = true;
            }
        }
    })
    return reservado;
}
async function redirigirReserva(idHabitacion){
    let user = JSON.parse(localStorage.getItem("user"));
    await getHabitaciones()
    .then(data =>{
        data.forEach(hab=>{
            if(hab.id === idHabitacion){
                let res = JSON.stringify({idHabitacion:hab.id, personas:cantidadPersonas, check_in:check_in.value,check_out:check_out.value,precio:hab.precio,user:user.user});
                sessionStorage.setItem("reservaPendiente",res);
                location.href = "exito.html";
            }
        })
    })
}