import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DBPASS = process.env.DBPASS;


const cliente = new MongoClient(DBPASS);

let documentosColecao

try {
    await cliente.connect();
    const db = cliente.db('alura-websockets');
    documentosColecao = db.collection('documentos');
    console.log("Conectado ao banco de dados!");
} catch (erro) {
    console.log("Erro ao conectar ao banco de dados:", erro);
}

export {documentosColecao}