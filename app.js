const ENCRYPT_KEYS = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function procesarTexto(isEncrypt) {
    const inputElement = document.getElementById("encryptInput");
    const tituloResultado = document.getElementById("resultTitle");
    const parrafoResultado = document.getElementById("resultParagraph");
    const imagenResultado = document.getElementById("resultImage");
    const copyButton = document.getElementById("copyButton");

    const texto = inputElement.value;

    if (!texto) {
        mostrarError(tituloResultado, parrafoResultado, imagenResultado);
        copyButton.style.display = 'none';
        return;
    }

    if (!/^[a-z\s]*$/.test(texto)) {
        alert("Usa solo letras minúsculas sin acentos.");
        return;
    }

    try {
        const textoProcessed = isEncrypt ? encriptar(texto) : desencriptar(texto);
        inputElement.value = textoProcessed;
        mostrarResultado(isEncrypt, tituloResultado, parrafoResultado, imagenResultado);
        copyButton.style.display = 'block';
    } catch (error) {
        console.error('Error al procesar el texto:', error);
        alert("Error: Hubo un problema al procesar el texto");
        copyButton.style.display = 'none';
    }
}

function encriptar(texto) {
    return texto.replace(/[eiaou]/g, letra => ENCRYPT_KEYS[letra]);
}

function desencriptar(texto) {
    return texto.replace(new RegExp(Object.values(ENCRYPT_KEYS).join('|'), 'g'),
         match => Object.keys(ENCRYPT_KEYS).find(key => ENCRYPT_KEYS[key] === match));
}

function mostrarResultado(isEncrypt, titulo, parrafo, imagen) {
    titulo.textContent = `Texto ${isEncrypt ? 'encriptado' : 'desencriptado'} exitosamente`;
    parrafo.textContent = "Usa el botón 'Copiar' para obtener el resultado.";
    imagen.src = `./assets/${isEncrypt ? 'encriptado' : 'desencriptado'}.png`;
    imagen.alt = `Imagen de ${isEncrypt ? 'encriptación' : 'desencriptación'} exitosa`;
}

function mostrarError(titulo, parrafo, imagen) {
    imagen.src = "./assets/NoFound.png";
    imagen.alt = "Imagen de error: no se encontró texto";
    titulo.textContent = "No hay mensaje aún";
    parrafo.textContent = "Ingresa un texto para encriptar o desencriptar.";
    alert("¡Atención! Debes ingresar un texto");
}

function copiarTexto() {
    const inputElement = document.getElementById("encryptInput");
    inputElement.select();
    document.execCommand('copy');
    alert('Texto copiado al portapapeles');
}

function limpiarTexto() {
    const inputElement = document.getElementById("encryptInput");
    const tituloResultado = document.getElementById("resultTitle");
    const parrafoResultado = document.getElementById("resultParagraph");
    const imagenResultado = document.getElementById("resultImage");
    const copyButton = document.getElementById("copyButton");

    inputElement.value = '';
    tituloResultado.textContent = "No hay mensaje aún";
    parrafoResultado.textContent = "Ingresa un texto para encriptar o desencriptar.";
    imagenResultado.src = "./assets/NoFound.png";
    imagenResultado.alt = "Imagen de error: no se encontró texto";
    copyButton.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.section__encrypt__button__encrypt').addEventListener('click', () => procesarTexto(true));
    document.querySelector('.section__encrypt__button__decrypt').addEventListener('click', () => procesarTexto(false));
    document.getElementById('copyButton').addEventListener('click', copiarTexto);
    document.querySelector('.section__encrypt__button__clear').addEventListener('click', limpiarTexto);
});