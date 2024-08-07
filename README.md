# RemoteControl

## Notice: The RemoteControl project is currently being rewritten, with many features changed and added. As of now, it is no replacement for the old version. The old version can still be found in the "old" branch.

### WakeOnLan and Shutdown client/server with Discord Bot running on Node.js

The Remote Control project consists of three modules:
* **[Client](https://github.com/manolol1/remotecontrol_client)**: always required, runs on the computer that should be controlled, provides websocket API for the server or Discord bot to issue commands or run scripts
* **[Webserver](https://github.com/manolol1/remotecontrol_webserver)**: optional, not available yet, user-facing part that runs on a seperate machine and issues commands to the client or sends WakeOnLan packets
* **[Discord Bot](https://github.com/manolol1/remotecontrol_discord)**: optional, same as the webserver, but through Discord messages
