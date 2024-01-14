const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const os = require('os');
const yargs = require('yargs');
require('colors'); 

const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });
app.use(morgan(':date[en-CH] - :remote-addr - :method :url :status :response-time ms', { stream: logStream }));

let customIndexFilePath;

const requestLogs = {};
const requestCounter = {};
const redirectionThreshold = 3;
const redirectionUrl = 'https://www.google.com';
const blockedIps = yargs.argv.bl || [];

app.use((req, res, next) => {
  req.timestamp = new Date();
  req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.userAgent = req.get('User-Agent');

  if (blockedIps.includes(req.clientIp)) {
    // Enregistrer la tentative de connexion d'une personne figurant sur la liste noire
    console.log(`[SERVER] [${req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}] - BLACKLISTED IP ${req.clientIp} tried to connect.`.red);
    return res.redirect(redirectionUrl);
  }

  if (!requestLogs[req.clientIp]) {
    requestLogs[req.clientIp] = {
      count: 0,
      lastLog: '',
    };
  }

  requestLogs[req.clientIp].lastLog = `[${req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}] - ${req.clientIp}`;
  requestLogs[req.clientIp].count++;

  if (yargs.argv.s) {
    if (!requestCounter[req.clientIp]) {
      requestCounter[req.clientIp] = {
        count: 0,
        windowStart: new Date(),
      };
    }

    const currentTime = new Date();
    const windowDuration = currentTime - requestCounter[req.clientIp].windowStart;

    if (windowDuration < 5000) {
      requestCounter[req.clientIp].count++;

      if (requestCounter[req.clientIp].count > redirectionThreshold) {
        console.log(`[SERVER] [${req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}] - ${req.clientIp} exceeded redirection threshold (${redirectionThreshold}).`.yellow);
        return res.redirect(redirectionUrl);
      }
    } else {
      requestCounter[req.clientIp] = {
        count: 1,
        windowStart: currentTime,
      };
    }
  }

  next();
});

app.get('/', (req, res) => {
  const lastLog = requestLogs[req.clientIp] || { count: 0, lastLog: '' };

  console.log(`[SERVER] [${req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}] - ${req.clientIp} - ${lastLog.count}`.green);

  if (customIndexFilePath) {
    res.sendFile(customIndexFilePath);
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

const argv = yargs
  .option('p', {
    alias: 'port',
    describe: 'Port to run the server on',
    type: 'number'
  })
  .option('s', {
    alias: 'shield',
    describe: 'Enable Shield mode to limit requests and redirect',
    type: 'boolean'
  })
  .option('bl', {
    alias: 'blacklist',
    describe: 'List of IP addresses to block',
    type: 'array'
  })
  .option('start', {
    describe: 'Start the server automatically after a specified time',
    type: 'number'
  })
  .option('index', {
    describe: 'Specify the index HTML file',
    type: 'string'
  })
  .option('h', {
    describe: 'Show help',
    type: 'boolean'
  })
  .argv;

if (argv.h) {
  console.log('______ _____ _   _ _____ ___________ _   _ ___________ '.cyan);
  console.log('|  _  \\  _  | | | /  ___|  ___| ___ \\ | | |  ___| ___ \\'.cyan);
  console.log('| | | | | | | | | \\ `--.| |__ | |_/ / | | | |__ | |_/ /'.cyan);
  console.log('| | | | | | | | | `--. \\  __||    /| | | |  __||    / '.cyan);
  console.log('| |/ /\\ \\_/ / |_| /\\__/ / |___| |\\ \\\\ \\_/ / |___| |\\ \\ '.cyan);
  console.log('|___/  \\___/ \\___/\\____/\\____/\\_| \\_\\___/\\____/\\_| \\_|'.cyan);
  console.log('----------------------------------------------------------------'.gray);
  console.log("| Server created by Douxx.xyz                                  |".gray);
  console.log('----------------------------------------------------------------'.gray);
  console.log("𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗼𝗽𝘁𝗶𝗼𝗻𝘀:".yellow);
  console.log("| -p, --port [port]: Specifies the server port".yellow);
  console.log("| -s, --shield: Activates Shield mode to limit requests".yellow);
  console.log("| -bl, --blacklist [ip1 ip2 ...] : List of IP addresses to be blocked".yellow);
  console.log("| -start [minutes]: Automatically starts the server after a set time.".yellow);
  console.log("| -index [path]: Specify HTML index file path".yellow);
  console.log("| -h: Shows this help message\n".yellow);
  console.log("𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐮𝐬𝐚𝐠𝐞:".gray);
  console.log('----------------------------------------------------------------'.gray);
  console.log("| node server.js -p 3000 -s -bl 127.0.0.1 -start 1 -index ./public/index.html".yellow);
  console.log('----------------------------------------------------------------'.gray);
  process.exit();
} else {
  if (argv.index) {
    customIndexFilePath = argv.index;
    console.log(`[SERVER] Using custom index file: ${customIndexFilePath}`.green);
  }

  if (argv.start) {
    const countdownMinutes = argv.start;
    console.log(`[START] Server will start in ${countdownMinutes} minutes. Countdown begins...`.yellow);

    setTimeout(() => {
      startServer();
    }, countdownMinutes * 60 * 1000);
  } else {
    startServer();
  }
}

function startServer() {
  const PORT = argv.p || 1111;
  const host = '0.0.0.0';

  app.listen(PORT, host, () => {
    const serverIp = getServerIp();
    console.log('______ _____ _   _ _____ ___________ _   _ ___________ '.cyan);
    console.log('|  _  \\  _  | | | /  ___|  ___| ___ \\ | | |  ___| ___ \\'.cyan);
    console.log('| | | | | | | | | \\ `--.| |__ | |_/ / | | | |__ | |_/ /'.cyan);
    console.log('| | | | | | | | | `--. \\  __||    /| | | |  __||    / '.cyan);
    console.log('| |/ /\\ \\_/ / |_| /\\__/ / |___| |\\ \\\\ \\_/ / |___| |\\ \\ '.cyan);
    console.log('|___/  \\___/ \\___/\\____/\\____/\\_| \\_\\___/\\____/\\_| \\_|'.cyan);
    console.log('----------------------------------------------------------------'.gray);
    console.log("| Server created by Douxx.xyz                                  |".gray);
    console.log('----------------------------------------------------------------'.gray);
    console.log(`[SERVER] Server is running at http://${serverIp}:${PORT}`.green);
    console.log(`[HELP] Use ctrl + c to stop the server`.yellow);
    console.log("[HELP] Use 'node server.js -h' to show help".yellow);
  });
}

function getServerIp() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    for (const entry of networkInterface) {
      if (!entry.internal && entry.family === 'IPv4') {
        return entry.address;
      }
    }
  }
  return 'localhost';
}
