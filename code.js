/// Descripcion, Personas, P/Noche
const habitacionDoble = ['Habitacion doble',2,6000],
habitacionTriple = ['Habitacion triple',3,7500],
habitacionQuad = ['Habitacion quad',4,8500],
habitacionSuiteJunior = ['Habitacion Suite Junior',2,12000],
habitacionSuiteSuperior = ['Habitacion Suite Superior',2,15000],
habitacionPresidencial = ['Habitacion Presidencial', 4, 24000];
const habitaciones = [habitacionDoble,habitacionTriple,habitacionQuad,habitacionSuiteJunior,habitacionSuiteSuperior,habitacionPresidencial];

/// TipoHabitacion, noches reservadas
let reservasHechas = [];

while(confirm('Desea hacer una reserva?')){
    
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
}