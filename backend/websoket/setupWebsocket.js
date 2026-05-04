import { WebSocketServer } from 'ws';
// import { createChat } from '../agent/ai.js';
import { askAI } from '../agent/ai.js';
export function setupWebsocket(server) {
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws) => {
        console.log('client connected');

        // const chat = createChat();

        ws.on('message', async (message) => {
            try {
                const data = JSON.parse(message.toString());
                if (data.type === 'start') {
                    ws.send(JSON.stringify({
                        type: 'ready',
                        message: 'ai ready'
                    }))
                }
                if (data.type === 'message') {
                    console.log(data.text);
                    const reply = await askAI(data.text)
                    if (typeof reply === 'object') {
                        ws.send(JSON.stringify(reply))
                    } else {
                        ws.send(JSON.stringify({
                            type: 'reply',
                            message: reply
                        }));
                    }

                }
            } catch (err) {
                ws.send(JSON.stringify({
                    type: 'error',
                    error: err.message
                }));
            }
        });

        ws.send(JSON.stringify({
            type: "reply",
            text: "Hello from WebSocket 👋"
        }));
        ws.on('close', () => {
            console.log('disconnected');
        })
    });
}