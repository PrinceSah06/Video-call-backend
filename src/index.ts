import   express from "express"

import http from "http"
import serverConfig from "./config/server.config"
import {Server} from "socket.io"
import cors from "cors"
const app = express()

const server = http.createServer(app)
app.use(cors())

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("new user is connected")
    socket.on('disconected',()=>{
        console.log("user is disconnected")
    })
})
server.listen(serverConfig.PORT,()=>{
    console.log('server is up at port  ',serverConfig.PORT )
})
