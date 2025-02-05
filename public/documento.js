import { emitirTextoEditor, selecionarDocumento, emitirExluirDocumento } from "./socket-front-documento.js";


//apenas para pegar qual a pagina que o usuario está atraves da url
const paramentros = new URLSearchParams(window.location.search)
const nomeDocumento = paramentros.get("nome")

const textoEditor = document.getElementById("editor-texto")
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");

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

botaoExcluir.addEventListener("click", ()=>{
    emitirExluirDocumento(nomeDocumento)
})

function alertareRedirecionar(nome){
    if(nome === nomeDocumento){
        alert(`Documento ${nome} excluido!`);
        window.location.href = "/";
    }
}

export {atualizaTextoEditor, alertareRedirecionar}