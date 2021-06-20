const dgram = require('dgram');
const moment = require('moment');
const tcp = require('net');

// Create a datagram socket to listen for datagrams
const s = dgram.createSocket('udp4');
s.bind(2205, function() {
    s.addMembership('239.255.0.0');
})

s.on('error', (err) => {
    console.log(err);
    s.close();
});

s.on('listening', () => {
    var address = s.address();
});

// Listen to messages
var musicians = new Map();

s.on('message', (msg, rinfo) => {
    var musician = JSON.parse(msg);

    if(!musicians.has(musician.uuid)) {
        var now = moment().format();
        var musician_info = {
            "uuid": musician.uuid,
            "instrument": getInstrument(musician.sound),
            "activeSince": now
        }
        musicians.set(musician.uuid, musician_info);
    }
    else {
        var now = moment().format();
        var musician_info = musicians.get(musician.uuid);
        musician_info.activeSince = now;
        musicians.set(musician.uuid, musician_info);
    }

    setTimeout(function(uuid) {
        var musician_info = musicians.get(uuid);

        if(moment().diff(musician_info.activeSince) > 5000) {
            musicians.delete(uuid);
        }
    }, 6000, musician.uuid);
});

// Create a TCP server
const tcpServer = tcp.createServer(function(socket) {
    var musiciansSend = [];

    musicians.forEach((musician) => {
        musiciansSend.push(musician);
    });

    socket.write(JSON.stringify(musiciansSend));
    socket.destroy();
});

tcpServer.on('listening', () => {
    var address = tcpServer.address();
});

tcpServer.listen(2205);

// Get instrument corresponding to sound
function getInstrument(sound) {
    switch(sound) {
        case 'ti-ta-ti':
            return 'piano';
        case 'pouet':
            return 'trumpet';
        case 'trulu':
            return 'flute';
        case 'gzi-gzi':
            return 'violin';
        case 'boum-boum':
            return 'drum';
        default:
            return 'pfft';
    }
}
