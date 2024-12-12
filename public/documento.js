import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";


//apenas para pegar qual a pagina que o usuario está atraves da url
const paramentros = new URLSearchParams(window.location.search)
const nomeDocumento = paramentros.get("nome")

const textoEditor = document.getElementById("editor-texto")
const tituloDocumento = document.getElementById("titulo-documento");

//Altera o titulo do documento
tituloDocumento.textContent = nomeDocumento || "Documento sem titulo"

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", ()=>{
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento})
})

function atualizaTextoEditor(texto){
    textoEditor.value = texto;
}

export {atualizaTextoEditor}