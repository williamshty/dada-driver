import openSocket from 'socket.io-client';
import {socket_url} from './keys';
const  socket = openSocket(socket_url);
function updateLocation(location){
  socket.emit('location', localStorage.getItem('driverID'), location.lng, location.lat);
}
function openAndReceivingOrder(cb) {
  socket.emit('update', localStorage.getItem('driverID'));
  socket.on('order', resp=>cb(null, resp));
}
function clientConfirmed(cb){
  socket.on('confirm', resp=>cb(null, resp))
}
export { openAndReceivingOrder , updateLocation,clientConfirmed};

// function socketConnect(cb) {
//   socket.on('update2', resp=>cb(null, resp));
//   socket.emit('update', '5b5940e60db7b95f182204ad');
// }