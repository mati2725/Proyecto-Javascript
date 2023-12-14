class Habitacion{
    constructor(descripcion, personas,precio){
        this.descripcion = descripcion;
        this.personas = personas;
        this.precio = precio;
    }
}

class Reserva{
    constructor(habitacion, personas, noches, check_in, check_out,precio){
        this.habitacion = habitacion;
        this.personas = personas;
        this.noches = noches;
        this.check_in = check_in;
        this.check_out = check_out;
        this.precio = precio
    }
    getReservas() {
        // Declarar la variable reservas
        const reservas = [];
    
        // Parsear el valor almacenado en sessionStorage
        const json = JSON.parse(sessionStorage.getItem("Reservas"));
    
        // Recorrer el objeto JSON y crear objetos Reserva
        if (json) {
            for (const reserva of json) {
                reservas.push(new Reserva(reserva.habitacion, reserva.personas, reserva.noches, reserva.check_in, reserva.check_out, reserva.precio));
            }
        }
    
        // Devolver el array de objetos Reserva
        return reservas;
    }
}
/// Descripcion, Personas, P/Noche
const habitaciones = [  new Habitacion('Habitacion doble. Cama Queen',2,6000),
                        new Habitacion('Habitacion triple. Cama Queen + Cama individual',3,7500),
                        new Habitacion('Habitacion quad. 2 Camas Queen',4,8500),
                        new Habitacion('Habitacion Suite Junior. Cama King',2,12000),
                        new Habitacion('Habitacion Suite Superior. Cama King con vistas al mar',2,15000),
                        new Habitacion('Habitacion Presidencial. 2 Camas King con vistas al mar', 4, 24000)];

/// Guardo los tipos de habitaciones

/// TipoHabitacion, personas, noches, fechaDesde, fechaHasta
let reservasHechas = [];
let check_in = document.getElementById('check_in');
let check_out = document.getElementById('check_out');
let cantidadPersonas, cantidadNoches;
check_in.setAttribute("min",new Date().toISOString().split("T")[0]);
check_out.setAttribute("min",new Date().toISOString().split("T")[0]);


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
            document.getElementById("contenedor").innerHTML = "";
            //Calcula la cantida de noches
            cantidadNoches = Math.floor((new Date(check_out.value) - new Date(check_in.value))/ (1000 * 60 * 60 * 24));
            cantidadPersonas = Number(document.getElementById("adults").value) + Number(document.getElementById("children").value);
            for(const hab of habitacionesDisponibles()){
                document.getElementById("contenedor").innerHTML +=
                `
                <div class="row pt-3 d-flex align-items-center">
                    <div class="col-sm-3">
                        <img class="rounded" src="img/HabitacionDoble.jpg" alt="${hab.descripcion}">
                    </div>
                    <div class="col-sm-7">
                        <p>${hab.descripcion}</p>
                    </div>
                    <div class="col-sm-2">
                        <p>$${hab.precio} por noche / total $${hab.precio * cantidadNoches} (${cantidadNoches} noches)</p>
                        <input type="submit" class="btn btn-secondary ps-5 pe-5 pt-3 pb-3" onclick="redirigirReserva('${hab.descripcion}')" value="RESERVAR"/>
                    </div>
                </div>
                `
            }
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
function habitacionesDisponibles(){
    let listHabitaciones = habitaciones.slice();
    let listReservas = new Reserva().getReservas();
    for(const hab of habitaciones){
        if(hab.personas < cantidadPersonas){
            let index = listHabitaciones.map(e => e.descripcion).indexOf(hab.descripcion);
            listHabitaciones.splice(index,1);
        }
    }
    if(listReservas===null) {
        return listHabitaciones;
    }
    let validadorFecha = (check_in_pedido,check_out_pedido,check_in_reserva,check_out_reserva) => {
        if(check_in_pedido > check_in_reserva && check_in_pedido < check_out_reserva){
            return false;
        } else if(check_out_pedido > check_in_reserva && check_out_pedido < check_out_reserva){
            return false;
        }
        return true;
    }


    for(const hab of listReservas){
        //Chequeo si la reserva corresponde a las fechas pedidas
        if(validadorFecha(check_in.value,check_out.value,hab.check_in,hab.check_out)){
            //Saco del listado de habitaciones
            listHabitaciones.splice(listHabitaciones.map(e => e.descripcion).indexOf(hab.habitacion),1);
        }
    }
    return listHabitaciones;
}

function redirigirReserva(habitacion){
    let reserva = new Reserva(habitacion,cantidadPersonas,cantidadNoches,check_in.value,check_out.value,getPrecioPorDescripcion(habitacion))
    sessionStorage.setItem("reservaPendiente",JSON.stringify(reserva));
    location.href = "exito.html";
}


/*while(confirm('Desea hacer una reserva?')){
    
    //Obtener cantidad de noches
    let noches = ObtenerNoches();
    if(noches !== null){

        //Obtener cantidad de personas
        let personas = ObtenerPersonas();
        if(personas !== null){

            //Obtener habitaciones disponibles (misma o mayor capacidad de personas y que no esté reservado)
            let habitacionesDisponibles = ObtenerHabitacionesDisponibles(noches,personas);

            //Verifico que haya alguna habitacion disponible
            if(habitacionesDisponibles.length > 0){

                //El usuario elije la habitacion que quiere reservar
                let habitacionElegida = ObtenerHabitacionElegida(habitacionesDisponibles, noches);
                
                if(habitacionElegida !== null){
                    reservasHechas.push({habitacion: habitacionElegida,noches: noches});
                    let msg = 'Reserva hecha exitósamente!\n' +
                    'Descripcion: ' + habitacionElegida[0] +'\n'+
                    'Noches: ' + noches +'\n'+
                    'Precio Final: $' + habitacionElegida[2]*noches;
                    alert(msg);
                }
            } else {
                alert('No existen habitaciones disponibles para la cantidad de huespedes.')
            }
            
        }
    }
}
console.log('Reservaciones Hechas:');
console.log(reservasHechas);

function ObtenerNoches(){
    let noches = prompt('Ingrese cantidad de noches a hospedarse:');
    while(isNaN(noches)){
        noches = prompt('Solo ingresar numeros.\nIngrese cantidad de noches a hospedarse:');
    }
    return noches;
}
function ObtenerPersonas(){
    let personas = prompt('Ingrese cantidad de huespedes:');
    while(isNaN(personas) || personas > 4 || personas == ''){
        if(personas > 4){
            personas = prompt('El maximo es de 4 personas.\nIngrese cantidad de huespedes:');    
        } else {
            personas = prompt('Solo ingresar numeros.\nIngrese cantidad de huespedes:');
        }
    }
    return personas;
}
function ObtenerHabitacionesDisponibles(noches, personas){
    let habitacionesDisponibles = []
    for(let i = 0; i<habitaciones.length; i++){
        if(!reservasHechas.some(h => h.habitacion[0] === habitaciones[i][0])){
            if(habitaciones[i][1] >= personas){
                habitacionesDisponibles.push(habitaciones[i]);
            }
        }
    }
    return habitacionesDisponibles;
}
function ObtenerHabitacionElegida(habitacionesDisponibles, noches){
    let msg = 'Seleccione una de las siguientes habitaciones disponibles:\n';
    for(let i = 0; i < habitacionesDisponibles.length; i++){
        msg += (i+1) + ' - ' + habitacionesDisponibles[i][0] + ' P/noche: $' + habitacionesDisponibles[i][2] + ' Total: $' + habitacionesDisponibles[i][2]*noches + '\n';
    }
    let hab = prompt(msg);
    while(isNaN(hab) || hab > habitacionesDisponibles.length || (hab < 1 && hab !== null)){
        if(hab > habitacionesDisponibles.length || hab < 1){
            hab = prompt('Por favor, elegir una de las siguientes opciones:\n' + msg);    
        } else {
            hab = prompt('Solo ingresar numeros.\n' + msg);
        }
    }
    if(hab !== null) {
        return habitacionesDisponibles[hab-1];
    }
    return null;
}*/