# 🧰 DouServer WebServer

DouServer Webserver is a secure webserver who uses Express.js and commands line to work.

## 📀 Requirements
To work properly, DouServer requires:

**Bases:**
- [node js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/package/npm)

**Packages:**
- [Express](https://expressjs.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Yargs](https://yargs.js.org/)
- [Colors](https://www.npmjs.com/package/colors)

*note: all these packages are on [npmjs.org](https://npmjs.com) and can be installed with the command `npm install xyz` (xyz is the package name)*

## 🖥 Installation
To install DouServer, follow these easy steps:
1. Make sure that you have [node js](https://nodejs.org/en) and [npm](https://www.npmjs.com/package/npm) installed on your device
2. open a terminal
3. copy and paste this command in the terminal:
```
git clone https://github.com/douxxu/DouServer.git
cd DouServer
npm install express morgan yargs colors
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
| Server created by Douxx.xyz (https://github.com/douxxu/)     |
----------------------------------------------------------------
𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗼𝗽𝘁𝗶𝗼𝗻𝘀:
| -p, --port [port]: Specifies the server port
| -s, --shield: Activates Shield mode to limit requests
| -bl, --blacklist [ip1 ip2 ...] : List of IP addresses to be blocked
| -st, --start [minutes]: Automatically starts the server after a set time.
| -i, --index [path]: Specify HTML index file path
| -r, --robots: Blocks robots if the option is present
| -h: Shows this help message

𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐮𝐬𝐚𝐠𝐞:
----------------------------------------------------------------
| node server.js -p 3000 -s -bl 127.0.0.1 -st 1 -i ./public/index.html -r
----------------------------------------------------------------

```
**Options:**
`-p [port]`/`--port [port]`: Specify the server port. Usage: `node server.js -p 8080`: Server will be hosted on http://127.0.0.1:8080.

`-s`/`--shield`: If this option is enabled, the server will automatically blacklist all ip's exceeding the allowed request limit every 5 seconds. The default number of requests is 10. This can be changed with the line `const rlimit = 10;`. Usage: `node server.js -s`: server will activate shield mode.

`-bl [ips]`/`--blacklist [ips]`: With this option, you can disable access to the server for given ips. Usage: `node server.js -bl 192.168.0.0 192.168.0.1 10.0.0.2`: Ips '192.168.0.0', '192.168.0.1' and '10.0.0.2' will be blacklisted.

`-st [time]`/`--start [time]`: Will set a countdown before the server starts. Usage: `node server.js -st 1`: The server will start after 1 minute.

`-i`/`--index`: Will set the default page (/) file to the given file. Usage: `node server.js -i /path/to/your/file.html`: The server default file will be `file.html`.

`-r`/`--robots`: If this option is enabled, the server will remove access to bots. Usage: `node server.js -r`.

*note: you can also host images, doing this command:*
```
node server.js -i /path/to/your/image.png
```
## 📃 Website pages (/)
You can easily create website pages adding a new folder into the `public` folder and putting an index.extention file into this folder. The page will have the name of folder. Exemple: we can access to the image into the [/public/image](https://github.com/douxxu/DouServer/tree/0397d4b1bf6ecacc82824fa72f299ee3aaf10ca1/public/image) going to http://127.0.0.1:port/image. Same for the html and txt folder.

## [SERVER] messages

A log system was implemented to the server. All the `[SERVER]` messages in the console are server logs. 
There is all the type of logs:

1. Launching logs: ``[SERVER] Server is running at http://127.0.0.1:1111`` these logs are giving you the server URL.

2. Requests logs: ``[SERVER] [DD/MM/YYYY, hh:mm:ss] - 127.0.0.1 - 1`` these logs provide you with the ip of the visitor to your website, as well as the number of times this ip has visited your website in this session. The log is formed as follows: `[SERVER] [date, time] - ip adrs. - number of visits by this ip`. The visitor's user agent can be found in the server.log file.

3. Blacklist logs: ``[SERVER] [DD/MM/YYYY, hh:mm:ss] - BLACKLISTED IP 127.0.0.1 tried to connect.`` these logs only appear if you have blacklisted one or more ips with the `-bl` parameter, and one of these ips has tried to access your server. (127.0.0.1 is the blacklisted ip adrs.)

4. Shield logs: ``[SERVER] [DD/MM/YYYY, hh:mm:ss] - 127.0.0.1 exceeded requests threshold (3).`` this log occurs when the `-s` (`--shield`) parameter has been activated, and an ip address has exceeded the limit of 3 requests every 5 seconds.

5. Index file log: ``[SERVER] Using custom index file: /path/to/your/index/file.html`` this log confirms that the custom index file you configured with the `-index [path]` parameter has been used.


## LICENCE

No licence guys 😌
Do what do you want with this project, but please credit me
