const express = require('express');
const app = express();

const clientPort = 2052;

const shutdownCommand = "sudo shutdown -P now";

const { exec } = require("child_process");

app.get('/shutdown', (req, res) => {
    exec(shutdownCommand, (error, stdout, stderr) => {

        res.status(200);
        res.send('Shutdown command executed.');

        if (error) {
            res.status(500);
            res.send('Shutdown command failed.');
        }
    });
});

app.get('/ping', (req, res) => {
    res.status(200);
    res.send('Pong!');
});

app.listen(clientPort, () => {
    console.log(`RemoteControl Client is listening on port ${clientPort}...`);
});
