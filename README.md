# 🧰 DouServer WebServer

DouServer Webserver is a secure webserver who uses Express.js and commands line to work.

## 🖥 Installation
To install DouServer, follow these easy steps:
1. Make sure that you have [node js](https://nodejs.org/en) and [npm](https://www.npmjs.com/package/npm) installed on your device
2. open a terminal
3. copy and paste this command in the terminal:
```
git clone https://github.com/douxxu/DouServer.git
cd DouServer
npm install
```
4. DouServer is now installed, you can now run it with
```
node server.js
```
## ⚡️ Running DouServer
You can run DouServer using the following command:
```
node server.js
```
This command will run a basic web server, the default port is 1111, and the default index file is the ./public/index.html file, you can access it from http://localhost:1111.

You can use the differents arguments for editing the web server:
```
______ _____ _   _ _____ ___________ _   _ ___________ 
|  _  \  _  | | | /  ___|  ___| ___ \ | | |  ___| ___ \
| | | | | | | | | \ `--.| |__ | |_/ / | | | |__ | |_/ /
| | | | | | | | | `--. \  __||    /| | | |  __||    / 
| |/ /\ \_/ / |_| /\__/ / |___| |\ \\ \_/ / |___| |\ \ 
|___/  \___/ \___/\____/\____/\_| \_\___/\____/\_| \_|
----------------------------------------------------------------
| Server created by Douxx.xyz                                  |
----------------------------------------------------------------
𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗼𝗽𝘁𝗶𝗼𝗻𝘀:
| -p, --port [port]: Specifies the server port
| -s, --shield: Activates Shield mode to limit requests
| -bl, --blacklist [ip1 ip2 ...] : List of IP addresses to be blocked
| -start [minutes]: Automatically starts the server after a set time.
| -index [path]: Specify HTML index file path
| -h: Shows this help message

𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐮𝐬𝐚𝐠𝐞:
----------------------------------------------------------------
| node server.js -p 3000 -s -bl 127.0.0.1 10.0.0.1 --start 1 --index ./public/index.html
----------------------------------------------------------------
```
You can also host images, doing this command:
```
node server.js --index /path/to/your/image.png
```

## [SERVER] messages

A log system was implemented to the server. All the `[SERVER]` messages in the console are server logs. 
There is all the type of logs:

1. Launching logs: ``[SERVER] Server is running at http://127.0.0.1:1111`` these logs are giving you the server URL.

2. Requests logs: ``[SERVER] [DD/MM/YYYY, hh:mm:ss] - 127.0.0.1 - 1`` these logs provide you with the ip of the visitor to your website, as well as the number of times this ip has visited your website in this session. The log is formed as follows: `[SERVER] [date, time] - ip adrs. - number of visits by this ip`. The visitor's user agent can be found in the server.log file.

3. Blacklist logs: ``[SERVER] [DD/MM/YYYY, hh:mm:ss] - BLACKLISTED IP 127.0.0.1 tried to connect.`` these logs only appear if you have blacklisted one or more ips with the `-bl` parameter, and one of these ips has tried to access your server. (127.0.0.1 is the blacklisted ip adrs.)

4. Shield logs: ``[SERVER] [DD/MM/YYYY, hh:mm:ss] - 127.0.0.1 exceeded requests threshold (3).`` this log occurs when the `-s` (`--shield`) parameter has been activated, and an ip address has exceeded the limit of 3 requests every 5 seconds.

5. Index file log: ``[SERVER] Using custom index file: /path/to/your/index/file.html`` this log confirms that the custom index file you configured with the `-index [path]` parameter has been used.
