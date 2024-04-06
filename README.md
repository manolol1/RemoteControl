# RemoteControl

### WakeOnLan and Shutdown client/server running on Node.js

To run any command, just send a http request to `http://host:port/command`.

Have a look at the command lists for both server and client below.

Examples:
* `http://example.com:2082/wakeup` (send a wakeup request to the server, which wakes up the client)
* `http://192.168.8.184:2082/shutdown` (send a shutdown request to the server, which will send a shutdown request to the client)
* `http://192.168.8.184:2052/shutdown` (send a shutdown request directly to the client)
* `http://192.168.8.184:2052/ping` (send a ping request directly to the client)

## Server

The server can send WakeOnLan packets and shutdown requests to the client.

**Commands**
* /ping - sends a request to client/ping, check if the client is online
* /wakeup - sends a WOL packet to the client
* /shutdown - sends a request to client/shutdown - tells the client to shut down

**Setup:**

1. Clone the repository: `git clone https://github.com/manolol1/RemoteControl.git`
2. Adjust the serverPort, clientAddress and wolMacAddress variables in server.js (default server port is 2082)
3. Run the server: `sudo node server.js`
5. You can delete the client.js file here, if you want.

## Client

The client receives shutdown requests. Install it on the device you want to control.

To receive WOL packets (and react to them), you most likely need to configure some things in your BIOS/UEFI and OS settings.
If you only need the WOL functionality (only be able to turn the computer on, not off), the client isn't required.

**Commands**
* /ping - responds if it's online
* /shutdown - shuts the client down (runs `sudo shutdown -P now` by default.)

**Note:** The client's shutdown command should work on most Linux Distributions. If you're running it on other operating systems, you might need to adjust it.
To change the command, just edit the shutdownCommand constant in client.js

**Setup:**

1. Clone the repository: `git clone https://github.com/manolol1/RemoteControl.git`
2. Adjust the clientPort variable in client.js if required (default port is 2052)
3. Run the client: `sudo node client.js`
5. You can delete the server.js file here, if you want.
