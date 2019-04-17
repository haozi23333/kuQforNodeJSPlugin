import { SocketClient } from './src/socketClient'

new SocketClient({
    serverPort: 11235
}, client => {
    // client.send('PrivateMessage 296409654 123')
});

