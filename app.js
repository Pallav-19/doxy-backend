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
import indexRoutes from "./index.js"
import tokenValidator from "./middlewares/verifyToken.js"
dotenv.config()


const app = express()
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/api", tokenValidator, indexRoutes)
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
        origin: ['http://localhost:3000', 'https://doxy-frontend.vercel.app', 'https://doxy.pallav.site'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
    }
})


//socket logic

io.on('connection', socket => {
    console.log("connected");
    socket.on('get-document', async ({ id, userId }) => {
        const {
            data,
            viewers,
            collaborators,
            isPublic,
            publiclyEditable,
            createdBy,
            title
        } = await getDocument(id, userId)
        const canView = viewers?.includes(userId)
            || isPublic
            || createdBy == userId
        socket.join(id)
        const canEdit = collaborators.includes(userId)
            || publiclyEditable
            || createdBy == userId
        canView ?
            socket.emit('load-document', {
                data,
                title,
                isPublic,
                publiclyEditable,
            })
            :
            socket.emit("access-denied",
                {
                    message:
                        "You are not authorized to view the document you are trying to access!"
                });
        socket.emit('can-edit', canEdit)
        socket.on("change-content", contents => {
            socket.broadcast.to(id).emit('receive-changes', contents)
        })
        socket.on('save-document', async value => {
            const { data } = await updateDocument(id, value, userId)
            data ? socket.emit('saved') : socket.emit('not-saved')
        })
    })
})

