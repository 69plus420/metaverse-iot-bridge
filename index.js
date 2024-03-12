const express = require('express');
const http = require('http').Server(express());
const io = require('socket.io')(http);
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

const app = express();
app.use(express.static('public'));

client.on('connect', () => {
  console.log("Connected to MQTT broker");
  client.subscribe('iot/devices/#');
});

client.on('message', (topic, message) => {
  console.log(`Received message from ${topic}`);
  io.emit('device-update', { topic, message: message.toString() });
});

http.listen(3000, () => {
  console.log('VR Device Manager running on http://localhost:3000');
});