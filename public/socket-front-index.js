import { alertareRedirecionar } from "./documento.js";
import {inserirLinkDocumento} from "./index.js"

const socket = io();

socket.emit("obter_documentos", (documentos)=>{
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome)
    });
})

function emitirAdicionarDocumento(nome){
    socket.emit("adicionar_documento", nome)
    inserirLinkDocumento(nome)
}

socket.on("adicionar_documento_interface", (nomeDocumento)=>{
    inserirLinkDocumento(nomeDocumento)
})

socket.on("documento_existe", (nomeDocumento)=>{
    alert(`O documento "${nomeDocumento}" já existe!`)
})

socket.on("excluir_documento_sucesso", (nomeDocumento)=>{
    alertareRedirecionar(nomeDocumento)
})
export {emitirAdicionarDocumento}