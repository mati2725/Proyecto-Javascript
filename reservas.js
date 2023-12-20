async function cargarReservas(){
    let listHabitaciones;
    let listReservas = document.getElementById("listReservas");
    listReservas.innerHTML = "";
    await fetch('https://657cddeb853beeefdb9a0ef6.mockapi.io/reservas/habitacion', {
        method: 'GET',
        headers: {'content-type':'application/json'},
        }).then(res => {
            return res.json();
        })
        .then(data => {
            listHabitaciones = data
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
        });
    
    
    await fetch('https://657cddeb853beeefdb9a0ef6.mockapi.io/reservas/reserva', {
    method: 'GET',
    headers: {'content-type':'application/json'},
    })
    .then(res => res.json())
    .then(data => data.forEach(res =>{
        let habitacion = listHabitaciones.find(hab=>hab.id === res.idHabitacion);
        listReservas.innerHTML +=
        `
            <div class="reservaItem">
                <div class="imagen">
                    <img src="${habitacion.imagen}">
                </div>
                <div class="checkin">
                    <p>Check-in: ${res.check_in}</p>
                    <p>Check-out: ${res.check_out}</p>
                </div>
                <div class="infoItem">
                <p>${res.personas} Personas</p>
                <p>Precio: ${res.precio}</p>
                <p>Usuario: ${res.user}</p>
                </div>
            </div>
        `
    })
    );
}
cargarReservas();