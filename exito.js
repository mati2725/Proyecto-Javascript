let obj =JSON.parse( sessionStorage.getItem("reservaPendiente"))
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
document.getElementById("confirmarReserva").onclick = async () =>{
    let jsonReserva = JSON.stringify(obj);
    await fetch('https://657cddeb853beeefdb9a0ef6.mockapi.io/reservas/reserva', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    // Send your data in the request body as JSON
    body: jsonReserva
    }).then(res => {
    if (res.ok) {
        alert("Reserva hecha con éxito")
        sessionStorage.removeItem("reservaPendiente")
        location.href="index.html"
    }
    }).catch(error => {
    })
}

getHabitaciones().then(data => data.forEach( hab => {
    if(obj.idHabitacion === hab.id){
        document.getElementById("descripcion").innerHTML = hab.descripcion;
    }
}))
document.getElementById("descripcion").innerHTML = obj.habitacion;
document.getElementById("check_in").innerHTML = obj.check_in;
document.getElementById("check_out").innerHTML = obj.check_out;
document.getElementById("total").innerHTML = obj.precio;