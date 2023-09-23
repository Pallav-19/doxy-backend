import express from 'express'
import http from 'http'
import { Server } from "socket.io";
import dotenv from 'dotenv'
import { connectDb } from './config/dbConfig.js';
import { getDocument } from './controllers/documents/get.document.js';
import { updateDocument } from './controllers/documents/update.document.js';
import corsOptions from './config/corsOptions.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import credentials from './middlewares/credentials.js';
import authRoutes from './routes/auth.routes.js'
dotenv.config()


const app = express()
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/auth", authRoutes)
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
        origin: ['http://localhost:3000', 'https://doxy-frontend.vercel.app'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
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

