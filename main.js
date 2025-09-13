const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

// Replace with your actual port from `ls /dev/tty.*`
const port = new SerialPort({
  path: '/dev/ttys008', // /dev/ttys008 /dev/ttys009
  baudRate: 57600,
})

// Pipe the data
const lineStream = port.pipe(new ReadlineParser())

// Write to serial
port.write('main screen turn on', function(err) {
  if (err) return console.log('Error on write: ', err.message)
  console.log('message written')
})

// Handle errors
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

// Readable mode
port.on('readable', function () {
  console.log('Data:', port.read())
})

// Flowing mode
port.on('data', function (data) {
  console.log('Data:', data.toString())
})

port.write('Hi Mom!')
port.write(Buffer.from('Hi Mom!'))

setInterval(() => {
  const msg = `Hello from Node at ${new Date().toLocaleTimeString()}\n`
  port.write(msg, (err) => {
    if (err) return console.error('Write error:', err.message)
    console.log('Wrote:', msg.trim())
  })
}, 5000)