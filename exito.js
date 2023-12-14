class Reserva{
    constructor(habitacion, personas, noches, check_in, check_out,precio){
        this.habitacion = habitacion;
        this.personas = personas;
        this.noches = noches;
        this.check_in = check_in;
        this.check_out = check_out;
        this.precio = precio;
    }
    crearReserva(){
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
        reservas.push(new Reserva(this.habitacion,this.personas,this.noches,this.check_in,this.check_out,this.precioS));
        sessionStorage.setItem("Reservas",JSON.stringify(reservas));
    }
    getReservas(){
        return JSON.parse(sessionStorage.getItem("Reservas"));
    }
}

let obj =JSON.parse( sessionStorage.getItem("reservaPendiente"))

document.getElementById("descripcion").innerHTML = obj.habitacion;
document.getElementById("check_in").innerHTML = obj.check_in;
document.getElementById("check_out").innerHTML = obj.check_out;
document.getElementById("total").innerHTML = obj.precio;


document.getElementById("confirmarReserva").onclick = () =>{
    new Reserva().crearReserva(obj)
    alert("Reserva hecha con éxito")
}