// Mock device simulator
// Usage: node mock-device.js

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

// Device side of the virtual port pair
const DEVICE_PORT_PATH = '/dev/ttys009'

// Open the serial port
const port = new SerialPort({ path: DEVICE_PORT_PATH, baudRate: 9600 })
const parser = port.pipe(new ReadlineParser())

console.log(`Mock device listening on ${DEVICE_PORT_PATH}...`)

// Handle incoming commands
parser.on('data', (data) => {
  const command = data.trim()
  console.log(`Device received: ${command}`)

  let response

  switch (command.toUpperCase()) {
    case 'STATUS?':
      response = 'ONLINE'
      break
    case 'PING':
      response = 'PONG'
      break
    case 'CALL:101':
      response = 'CALLING ROOM 101'
      break
    default:
      response = 'UNKNOWN COMMAND'
  }

  // Send response back through the serial port
  port.write(response + '\n', (err) => {
    if (err) {
      console.error('Error writing response:', err)
    } else {
      console.log(`Device sent: ${response}`)
    }
  })
})
