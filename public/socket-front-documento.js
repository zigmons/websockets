import { atualizaTextoEditor } from "./documento.js";

const socket = io()

//emite evento referente a pagina ou local que usuario esta
function selecionarDocumento(nome){
    socket.emit("selecionar_documento", nome, (texto)=>{
        atualizaTextoEditor(texto)
    } )
}


function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados );
}

// socket.on("texto_documento", (texto)=>{
//     atualizaTextoEditor(texto)
// })

socket.on("texto_editor_clientes", (texto)=>{
    atualizaTextoEditor(texto)
})
socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
  });

  function emitirExluirDocumento(nomeDocumento){
    socket.emit("excluir_documento", nomeDocumento)
}

export {emitirTextoEditor, selecionarDocumento, emitirExluirDocumento}