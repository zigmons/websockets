import io from "./servidor.js"


io.on("connection", (socket)=>{
    console.log("Um cliente conectado! ID:", socket.id);

    socket.on("texto_editor", (texto)=>{
        //Broadcast emite evento para todos clientes, exceto o cliente que emite o evento
        socket.broadcast.emit("texto_editor_clientes", texto)
    })
    
    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
      });
}) 
