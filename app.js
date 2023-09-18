import express from 'express'
import http from 'http'
import { Server } from "socket.io";
import dotenv from 'dotenv'
import { connectDb } from './config/dbConfig.js';
import { getDocument } from './controllers/documents/get.document.js';
import { updateDocument } from './controllers/documents/update.document.js';
dotenv.config()


const app = express()
const httpServer = http.createServer(app)
httpServer.listen(process.env.PORT, async () => {
    try {
        const isConnected = await connectDb()
        console.log(isConnected);
    } catch (error) {
        console.log(error);
    }

})
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})
io.on('connection', socket => {
    console.log("connected");
    socket.on('get-document', async id => {
        const { data } = await getDocument(id)
        socket.join(id)
        socket.emit('load-document', data);

        socket.on("change-content", contents => {
            socket.broadcast.to(id).emit('receive-changes', contents)
        })
        socket.on('save-document', async value => {
            await updateDocument(id, value)

        })
    })
})

