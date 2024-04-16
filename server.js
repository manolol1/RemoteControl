// Settings
const serverPort = 2082
const clientAddress = "example.com:2052";
const wolMacAddress = 'a0:b1:c2:d3:e4:f5';


const express = require('express')
const app = express()

const http = require('http');
const wol = require('wake_on_lan');
const axios = require('axios');

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

app.get('/scripts', (req, res) => {
  axios.get(`http://${clientAddress}/scripts`)
    .then(response => {
      const scripts = response.data.split(', ');

      // For each script, create a route
      scripts.forEach(script => {
        app.get(`/scripts/${script}`, (req, res) => {
          // Make a request to the client to execute the script
          axios.get(`http://${clientAddress}/scripts/${script}`)
            .then(response => {
              res.send(response.data);
            })
            .catch(error => {
              console.error(`Error during script execution: ${error.message}`);
              res.send(`Script ${script} execution failed.`);
            });
        });
      });

      res.send(scripts.join(', '));
    })
    .catch(error => {
      console.error(`Error during scripts request: ${error.message}`);
      res.send('Scripts request failed.');
    });
});

app.listen(serverPort, () => {
  console.log(`RemoteControl Server is listening on port ${serverPort}...`)
})
