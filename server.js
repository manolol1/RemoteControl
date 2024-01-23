const express = require('express')
const app = express()

const serverPort = 2082
const clientAddress = "example.com:2052";

const wolMacAddress = 'a0:b1:c2:d3:e4:f5';

const http = require('http');
const wol = require('wake_on_lan');

app.get('/wakeup', (req, res) => {
  wol.wake(wolMacAddress, function (error) {
    if (error) {
      res.send('WOL request failed.');
    } else {
      res.send('WOL request sent.');
    }
  });
})

app.get('/shutdown', (req, res) => {
  const request = http.get(`http://${clientAddress}/shutdown`, function (response) {
    res.send('Shutdown request sent.');
  });

  request.on('error', function (err) {
    console.error(`Error during shutdown request: ${err.message}`);
    res.send('Shutdown request failed. Most likely, the client is already shut down.');
  });

});

app.get('/ping', (req, res) => {
  const request = http.get(`http://${clientAddress}/ping`, function (response) {
    res.send('Success. Server seems to be up.');
  });

  request.on('error', function (err) {
    console.error(`Error during ping request: ${err.message}`);
    res.send('Ping request failed. The client is most likely offline.');
  });

});

app.listen(serverPort, () => {
  console.log(`RemoteControl Server listening on port ${serverPort}...`)
})
