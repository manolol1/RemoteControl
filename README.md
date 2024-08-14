# RemoteControl
### A comprehensive solution for remotely controlling a computer.

## Features
* Wake up the computer through WakeOnLan
* Shut down and reboot
* remotely execute shell scripts and view their output

## Modules

The Remote Control project consists of three modules:
* **[Client](https://github.com/manolol1/remotecontrol_client)**: Always required, runs on the computer that should be controlled, provides websocket API for the server or Discord bot to issue commands or run scripts
* **[Webinterface (Work in Progress)](https://github.com/manolol1/remotecontrol_webserver)**: Optional, not available yet, user-facing part that runs on a seperate machine and issues commands to the client or sends WakeOnLan packets
* **[Discord Bot](https://github.com/manolol1/remotecontrol_discord)**: Optional, same as the webserver, but through Discord messages

The client is always required and doesn't need to be accessible from the internet. The Webinterface and Discord bot are used for interfacing with the client through an API.

## Installation
You need to set up the client, and at least one of the user-facing parts (Webinterface and/or Discord bot).
Detailed instructions can be found in the individual module's repositories.
