let listReservas = document.getElementById("listReservas");
listReservas.innerHTML = "";
fetch('https://657cddeb853beeefdb9a0ef6.mockapi.io/reservas/reserva', {
    method: 'GET',
    headers: {'content-type':'application/json'},
    }).then(res => {
        return res.json();
    })
    .then(data => data.forEach(res =>{
        listReservas.innerHTML +=
        `
            <div class="row pt-3 d-flex align-items-center">
                <div>
                id habitacion: ${res.idHabitacion}
                </div>
                <div>
                check-in: ${res.check_in}
                </div>
                <div>
                check-out: ${res.check_out}
                </div>
                <div>
                personas: ${res.personas}
                </div>
                <div>
                precio: ${res.precio}
                </div>
                <div>
                usuario: ${res.user}
                </div>
            </div>
        `
    }))
    .catch(error => alert(error));