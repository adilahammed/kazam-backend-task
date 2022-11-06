const express=require('express');
const { createServer } = require("http");
const { MongoClient } = require("mongodb");
const { Server } = require("socket.io");
const app = express();
require('dotenv').config()
const uri =process.env.mongouri
const monclient = new MongoClient(uri);
const httpServer = createServer(app);
app.use(express.json())
const io = new Server(httpServer, { cors:{origin:"*"},
path:'/sample'
});
//importing functions and constants
import {createClient} from './redisHelper';
import {fetchData} from './services/apiService';
import {addTolist} from './services/socketService'

const client=createClient()
client.on('error', (err:any) => {
    console.log( err);
  });

io.on("connection", (socket:any) => {    
    socket.on("add",(data:any)=>{
        console.log(data);
        addTolist(data,monclient,client);
    })
});
app.post('/fetchAllTasks',async (req:any,res:any)=>{
    let result=await fetchData(req,res,monclient,client);
    console.log(req.body);
    res.json({data:result})
})


httpServer.listen(process.env.nodeport,()=>{
    console.log('listening to '+process.env.nodeport);
    
});