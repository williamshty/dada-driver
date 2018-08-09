import openSocket from 'socket.io-client';
import {socket_url} from './keys';
const  socket = openSocket(socket_url);
function socketConnect(cb) {
  socket.on('update2', resp=>cb(null, resp));
  socket.emit('update', 'hello world');
}
export { socketConnect };