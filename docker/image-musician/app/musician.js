const dgram = require('dgram');
const { v4: uuidv4 } = require('uuid');

// Create datagram socket to send UDP datagrams
const s = dgram.createSocket('udp4');

s.on('listening', () => {
    const address = s.address();
});

s.on('error', (err) => {
    console.log(err);
    s.close();
});

var args = process.argv;
var sound;

switch(args[2]) {
    case 'piano':
        sound = 'ti-ta-ti';
        break;
    case 'trumpet':
        sound = 'pouet';
        break;
    case 'flute':
        sound = 'trulu';
        break;
    case 'violin':
        sound = 'gzi-gzi';
        break;
    case 'drum':
        sound = 'boum-boum';
        break;
    default:
        sound = 'pfft';
}

const uuid = uuidv4();

setInterval(function() {
    const payload = JSON.stringify({
        'sound': sound,
        'uuid': uuid
    });

    s.send(payload, 0, payload.length, 2205, '239.255.0.0');
}, 2000);
