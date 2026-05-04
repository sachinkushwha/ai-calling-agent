import http from 'http';
import express from 'express';
import {setupWebsocket} from './websoket/setupWebsocket.js'
import dotenv from 'dotenv'
dotenv.config();
const app=express();

const server=http.createServer(app);

setupWebsocket(server)

server.listen(3000,()=>{
    console.log('server running on port http://localhost:3000')
})