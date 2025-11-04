import { Socket } from "socket.io"
import {  v4 as UUIDv4} from 'uuid'


    const rooms: Record<string, string[]> = {};

const roomhandler =(socket :Socket) =>{



    const createRoom = ()=>{
 
        const roomId = UUIDv4();// uniqe id for rooms for multipe connection

         socket.join(roomId);//we will make a connection to enter a new roo,m
         socket.emit('room-created',{roomId}) // emit a room event
        console.log('room created success fullyat id ',roomId)

    }
    // the below functon run everytime even join or create 
    const joinRoom = (data: { roomId: string, peerId: string }) => {
        if (!rooms[data.roomId]) {
            // initialize the room array if it doesn't exist
            rooms[data.roomId] = [];
        }
        const room = rooms[data.roomId]; // now definitely a string[] (initialized above)
        if (Array.isArray(room)) {
            room.push(data.peerId);
            socket.join(data.roomId)
            console.log('new room joined', data.roomId, "peerid", data.peerId)


 

            // below is for login
            socket.emit('get-user' , {
                roomId: data.roomId,
                partcipants: room
            })

            
        } else {
            console.error(`Room with id ${data.roomId} does not exist.`);
        }
    }
    // when to call above function  1 28 48
    
    // when client emite a event top create room

    socket.on("create-room",createRoom)
    socket.on('join-room',joinRoom)

    // whene ever any join room

    socket.on('ready', (data: { roomId: string, peerId: string }) => {
        // frome fronend someone join the room we will emit a ready event 
        // th;en from our server we will emits an event to all the clients conn that a new peet had added
        if (!data || !data.roomId || !data.peerId) return;
        socket.to(data.roomId).emit('user-join', { peerId: data.peerId });
    })
}

export default roomhandler;