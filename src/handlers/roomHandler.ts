import { Socket } from "socket.io"
import {  v4 as UUIDv4} from 'uuid'

const roomhandler =(socket :Socket) =>{

    const createRoom = ()=>{
 
        const roomId = UUIDv4();// uniqe id for rooms for multipe connection

         socket.join(roomId);//we will make a connection to enter a new roo,m
         socket.emit('room-created',{roomId}) // emit a room event
        console.log('room created success fullyat id ',roomId)

    }
    const joinRoom = ()=>{
        console.log('new room joined')
    }
    // when to call above function 
    // when client emite a event top create room

    socket.on("create-room",createRoom)
    socket.on('join-room',joinRoom)

}

export default roomhandler;