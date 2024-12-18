
import { atualizaDocumento, encontrarDocumento } from "./documentoDb.js";
import io from "./servidor.js";




io.on("connection", (socket)=>{
    console.log("Um cliente conectado! ID:", socket.id);

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
}) 


