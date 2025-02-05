
import { atualizaDocumento, encontrarDocumento, obterDocumentos, adicionarDocumento, excluirDocumento } from "./documentoDb.js";
import io from "./servidor.js";




io.on("connection", (socket)=>{
    console.log("Um cliente conectado! ID:", socket.id);
    socket.on("obter_documentos", async (devolverDocumentos)=>{
        const documentos = await obterDocumentos();
        
        devolverDocumentos(documentos)
    })

    socket.on("adicionar_documento", async (nome)=>{
        const documentoExiste = (await encontrarDocumento(nome)) !== null;
        if (documentoExiste){
            socket.emit("documento_existe", nome);
        }else{
            
            const resultado = await adicionarDocumento(nome);
            if (resultado.acknowledged){
                io.emit("adicionar_documento_interface", nome)
            }
        }

    })

    socket.on("selecionar_documento",async (nomeDocumento, devolverTexto)=>{
        socket.join(nomeDocumento)

        const documento = await encontrarDocumento(nomeDocumento);
        if (documento){
            // socket.emit("texto_documento", documento.texto)
            devolverTexto(documento.texto)
        }

        
    })
    socket.on("texto_editor", async ({ texto, nomeDocumento })=>{

        const att = await atualizaDocumento(nomeDocumento, texto);
        console.log(att)
        if (att.modifiedCount){
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
        }
        //Broadcast emite evento para todos clientes, exceto o cliente que emite o evento
        // socket.broadcast.emit("texto_editor_clientes", texto)

    })
    

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
      });

      socket.on("excluir_documento", async (nome)=> {
        const resultado = await excluirDocumento(nome);
        if(resultado.deletedCount){
            io.emit("excluir_documento_sucesso", nome)
        }
      })
}) 


