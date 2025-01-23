let numeroSecreto;
let intentos;
let numerosSorteados = new Set();
let numeroMaximo = 10;
let maximoIntentos;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentos++; // Incrementa el contador de intentos
    console.log(intentos);
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('h1', '¡Felicidades! ¡Ganaste!');
        asignarTextoElemento('p', `El número secreto era ${numeroSecreto} y acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitar el botón de reiniciar
        limpiarCaja();
        document.querySelector('#valorUsuario').setAttribute('disabled', true); // Deshabilitar el input
    document.querySelector('#intentar').setAttribute('disabled', true); // Deshabilitar el botón de intentar
    } else {
        // El usuario no acertó.
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElemento('h1', '¡Lo siento! ¡Inténtalo de nuevo!');
            asignarTextoElemento('p', 'El número secreto es menor.');
        } else {
            asignarTextoElemento('h1', '¡Lo siento! ¡Inténtalo de nuevo!');
            asignarTextoElemento('p', 'El número secreto es mayor.');
        }
        limpiarCaja();
        if (intentos == maximoIntentos) {
            asignarTextoElemento('h1', '¡Lo siento! ¡Perdiste!');
            asignarTextoElemento('p', `Has llegado al número máximo de ${maximoIntentos} intentos.`);
            document.querySelector('#valorUsuario').setAttribute('disabled', true); // Deshabilitar el input
    document.querySelector('#intentar').setAttribute('disabled', true); // Deshabilitar el botón de intentar
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitar el botón de reiniciar
        }
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function deshabilitarControles(){
    document.querySelector('#valorUsuario').style.display = 'none'; // Deshabilitar el input
    document.querySelector('#intentar').style.display = 'none'; // Deshabilitar el botón de intentar
    document.querySelector('#reiniciar').style.display = 'none'; // Deshabilitar el botón de reiniciar
}

function habilitarControles(){
    document.querySelector('#valorUsuario').removeAttribute('disabled'); // Habilitar la caja de texto
    document.querySelector('#intentar').removeAttribute('disabled'); // Habilitar el botón de intentar
}

function generarNumeroSecreto() {
    if (numerosSorteados.size === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles. Por favor, presiona la tecla F5 si deseas reiniciar el juego.');
        deshabilitarControles();
    }else{
        let numeroGenerado;
        do {
            numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
        } while (numerosSorteados.has(numeroGenerado));
    
        numerosSorteados.add(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número entre 1 y ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    maximoIntentos = 3;
    console.log(numeroSecreto);
    habilitarControles();
}

function reiniciarJuego() {
    // Limpiar el valor de la caja de texto
    limpiarCaja();
    // Indicar mensaje de intervalo de números
    // Generar un nuevo número secreto
    // Inicializar el contador de intentos
    condicionesIniciales();
    // Deshabilitar el botón de reiniciar
    document.querySelector('#reiniciar').setAttribute('disabled', true); // Deshabilitar el botón de reiniciar
}

condicionesIniciales();
