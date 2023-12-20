# Posada Del Sol
La pagina es un sitio de reservas para un hotel. Dentro de este sitio se podrá realizar nuevas reservas, consultar las reservas hechas por un usuario propio (se debe loguear como cliente) y consultas de todas las reservas hechas hasta el momento (se debe loguear como administrador).

Para realizar una reserva debe:

 1. Iniciar sesion como usuario cliente (no pide contraseñas para no hacer mas complejo el review del sitio)
 2. Ir a **Reservar**
 3. Seleccionar una fecha de Check-in, Check-out, y la cantidad de personas que utilizarán la habitacion.
 4. Seleccionar la habitacion que desea reservar para su hospedaje
 5. Confirmar la reserva 
 6. Podrá ver su reserva si en la parte superior derecha coloca el mouse sobre su nombre de usuario y selecciona la opcion **Mis Reservas**

Para ver todas las reservas hechas debe:

 1. Iniciar sesion como usuario administrador (no pide contraseñas para no hacer mas complejo el review del sitio)
 2. En la parte superior derecha coloca el mouse sobre su nombre de usuario y selecciona la opcion **Reservas**

## Base de datos
Toda la base de datos se encuentra hecha en mockapi.io donde hay dos tablas que se utilizan en el sitio para su correcto funcionamiento.

|Habitacion||Reserva|
|--|-|--|
|id||id|
|descripcion||idHabitacion|
|precio||personas|
|personas||check_in|
|imagen||check_out|
|||precio|
|||user|
