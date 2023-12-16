class Usuario{
    constructor(user, tipoUsuario){
        this.user = user;
        this.tipoUsuario = tipoUsuario;
    }
}

function validarUser(user){
    
    let resultMessage = '';
    
    // Expresión regular que permite solo letras y números
    var regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(user)) {
        resultMessage= 'El nombre de usuario no debe contener espacios ni símbolos.';
    }
    return resultMessage;
}

document.getElementById("login").onclick = () => {
    try{
        const user = document.getElementById("user").value;
        let result = validarUser(user);
        if(result !== ''){
            throw result;
        }
        let checkedRadio = document.querySelector(".tipoUsuario input[type='radio']:checked");
        if(checkedRadio === null){
            throw "Debe seleccionar un tipo de usuario."
        }
        let  usuarioLogeado = new Usuario(user,checkedRadio.value);
        //Guardo en localStorage el usuario
        localStorage.setItem("user", JSON.stringify(usuarioLogeado));


        location.href = "index.html"
    } catch (Error){
        alert(Error);
    }
}