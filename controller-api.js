// REST API server that sends serial commands and reads responses
// Usage: node controller-api.js

const express = require('express')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const app = express()
const PORT = 3009

// Adjust this to match your socat-created port
const SERIAL_PORT_PATH = '/dev/ttys008'

// Setup serial connection
const port = new SerialPort({ path: SERIAL_PORT_PATH, baudRate: 9600 })
const parser = port.pipe(new ReadlineParser())

// Capture incoming serial responses
let latestResponse = ''
parser.on('data', (data) => {
  console.log('Serial received:', data)
  latestResponse = data
})

// API endpoint to send command over serial
app.get('/send/:command', (req, res) => {
  const command = req.params.command
  console.log('Sending to serial:', command)

  port.write(command + '\n', (err) => {
    if (err) {
      console.error('Serial write error:', err)
      return res.status(500).json({ error: 'Failed to write to serial' })
    }

    // Wait a moment for response
    setTimeout(() => {
      res.json({ sent: command, response: latestResponse })
    }, 300)
  })
})

app.listen(PORT, () => {
  console.log(`REST API listening at http://localhost:${PORT}`)
})
