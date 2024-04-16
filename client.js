// Settings
const clientPort = 2052;

const scriptsEnabled = false // DANGEROUS! Anyone will be able to execute all scripts in the specified scripts directory, if enabled!
const scriptsPath = "./scripts"; // set the path to your scripts directory here!


const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

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

// load all scripts
if (scriptsEnabled) {
    fs.readdir(scriptsPath, (err, files) => {
        if (err) {
            console.error(`Could not read scripts: ${err}`);
    
            app.get('/scripts/*', (req, res) => {
                res.status(500);
                res.send('Could not read scripts.');
            });
        }
    
        app.get('/scripts', (req, res) => {
            res.status(200);
            res.send("Available scripts: " + files.join(", "));
        });
    
        // For each file, create a route that will execute the script when requested
        files.forEach((file, index) => {
            const filePath = path.join(scriptsPath, file);
            app.get(`/scripts/${file}`, (req, res) => {
                exec(`bash ${filePath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return res.status(500).send('Script execution failed.');
                    }
                    // Send the output of the script back to the client
                    return res.status(200).send(`Script executed.<br/><br/>stdout:<br/>${stdout}<br/><br/>stderr:<br/>${stderr}`);
                });
            });
        });
    });
} else {
    app.get('/scripts*', (req, res) => {
        res.status(403);
        res.send("Scripts are disabled.");
    });
}

app.listen(clientPort, () => {
    console.log(`RemoteControl Client is listening on port ${clientPort}...`);
});
