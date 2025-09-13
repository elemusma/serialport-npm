socat -d -d pty,raw,echo=1 pty,raw,echo=1
Node controller-api.js
screen /dev/ttys009 57600 or cat /dev/ttys009 (cat allows for typing)

curl "http://localhost:3009/send/STATUS?"

node.js

socat -d -d pty,raw,echo=1 pty,raw,echo=1 (terminal 1)
node controller-api.js (terminal 2)
node mock-device.js (terminal 3)

curl "http://localhost:3009/send/STATUS%3F" (for connection with mock-device.js and controller-api.js)# serialport-npm
