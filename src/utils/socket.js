import openSocket from 'socket.io-client';
import {socket_url} from './keys';
const  socket = openSocket(socket_url);
function socketConnect(cb) {
  socket.emit('update', '5b5940e60db7b95f182204ad');
  socket.emit('location', '5b5940e60db7b95f182204ad', 104.06761569999999, 30.551612799999997);
  socket.on('order', resp=>cb(null, resp));
}
export { socketConnect };

// function socketConnect(cb) {
//   socket.on('update2', resp=>cb(null, resp));
//   socket.emit('update', '5b5940e60db7b95f182204ad');
// }