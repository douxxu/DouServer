//By Douxx.xyz
//Github: https://github.com/douxxu/DouServer/
//Website: https://douxx.xyz
//Discord: douxx.xyz



const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const os = require('os');
const yargs = require('yargs');
const { exec } = require('child_process');
require('colors');

const app = express();

const logs = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });
app.use(morgan(':date[en-CH] - :remote-addr - :method :url :status :response-time ms', { stream: logs }));

const pjsonpath = path.resolve(__dirname, 'package.json');
const pjson = JSON.parse(fs.readFileSync(pjsonpath, 'utf8'));
const version = pjson.version;


let cifp;
let pdir = path.join(__dirname, 'public');
let pages = [];

fs.readdirSync(pdir).forEach(file => {
  const ppath = path.join(pdir, file);
  if (fs.statSync(ppath).isDirectory()) {
    const ifile = fs.readdirSync(ppath).find(filename => filename.toLowerCase().startsWith('index'));
    if (ifile) {
      const pname = path.basename(file);
      pages.push({
        name: pname,
        path: ppath,
        indexFile: ifile,
      });
    }
  }
});

const rlogs = {};
const rcount = {};
const rlimit = 10;
const gle = 'https://www.google.com';
const blip = yargs.argv.bl || [];
const rtxt = path.join(__dirname, 'public', 'robots.txt');



app.get('/robots.txt', (req, res) => {
  res.sendFile(rtxt);
});

app.use((req, res, next) => {
  req.timestamp = new Date();
  req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.userAgent = req.get('User-Agent');
  const timest = req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' });

  if (blip.includes(req.clientIp)) {

    console.log(`[SERVER] [${timest}] - BLACKLISTED IP ${req.clientIp} tried to connect.`.red);
    return res.status(403).end();
  }

  if (!rlogs[req.clientIp]) {
    rlogs[req.clientIp] = {
      count: 0,
      lastLog: '',
    };
  }

  rlogs[req.clientIp].lastLog = `[${timest}] - ${req.clientIp}`;
  rlogs[req.clientIp].count++;
  
  if (yargs.argv.r && req.path === '/robots.txt') {
    return res.status(404).end(); 
  }

  if (yargs.argv.s) {
    if (!rcount[req.clientIp]) {
        rcount[req.clientIp] = {
        count: 0,
        windowStart: new Date(),
      };
    }

    const time = new Date();
    const wdur = time - rcount[req.clientIp].windowStart;

    if (wdur < 5000) {
        rcount[req.clientIp].count++;

      if (rcount[req.clientIp].count > rlimit) {
        console.log(`[SERVER] [${timest}] - ${req.clientIp} exceeded redirection threshold (${rlimit}).`.yellow);

        blip.push(req.clientIp);
        console.log(`[SERVER] [${timest}] - ${req.clientIp} added to blacklist.`.red);

        return res.redirect(gle);
      }
    } else {
        rcount[req.clientIp] = {
        count: 1,
        windowStart: time,
      };
    }
  }

  next();
});

app.get('/', (req, res) => {
  const lastLog = rlogs[req.clientIp] || { count: 0, lastLog: '' };
  const timest = req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' });

  console.log(`[SERVER] [${timest}] - ${req.clientIp} - ${lastLog.count}`.green);

  if (cifp) {
    res.sendFile(cifp);
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

pages.forEach(page => {
  app.get(`/${page.name}`, (req, res) => {
    const lastLog = rlogs[req.clientIp] || { count: 0, lastLog: '' };
    const timest = req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' });

    console.log(`[SERVER] [${timest}] - ${req.clientIp} - ${lastLog.count}`.green);
    res.sendFile(path.join(page.path, page.indexFile));
  });
});

app.get('/ping', (req, res) => {
    exec('ping -c 1 1.1.1.1', (error, stdout, stderr) => {
        const timest = req.timestamp.toLocaleString('en-CH', { timeZone: 'Europe/Zurich' });
        if (error) {
            console.error(`[SERVER] [${timest}] (/ping) Ping error : ${stderr}`);
            res.json({ ping: 'N/A' });
            return;
        }

        const pt = /time=(\d+\.\d+) ms/.exec(stdout);
        const pv = pt ? parseFloat(pt[1]) : 'Error';

        res.json({ ping: pv });
    });
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
  .option('t', {
    alias: 'start',
    describe: 'Start the server automatically after a specified time',
    type: 'number'
  })
  .option('i', {
    alias: 'index',
    describe: 'Specify HTML index file',
    type: 'string'
  })
  .option('h', {
    describe: 'Show help',
    type: 'boolean'
  })
  .option('r', {
    alias: 'robots',
    describe: 'don\'t allow robots to reach the website',
    type: 'boolean'
  })
  .argv;

  if (argv.v) {
    console.log(`${version}`);
    process.exit();
  }

if (argv.h) {
  console.log('______ _____ _   _ _____ ___________ _   _ ___________ '.cyan);
  console.log('|  _  \\  _  | | | /  ___|  ___| ___ \\ | | |  ___| ___ \\'.cyan);
  console.log('| | | | | | | | | \\ `--.| |__ | |_/ / | | | |__ | |_/ /'.cyan);
  console.log('| | | | | | | | | `--. \\  __||    /| | | |  __||    / '.cyan);
  console.log('| |/ /\\ \\_/ / |_| /\\__/ / |___| |\\ \\\\ \\_/ / |___| |\\ \\ '.cyan);
  console.log('|___/  \\___/ \\___/\\____/\\____/\\_| \\_\\___/\\____/\\_| \\_|'.cyan);
  console.log('----------------------------------------------------------------'.rainbow);
  console.log("| Server created by Douxx.xyz (https://github.com/douxxu/)     |".gray);
  console.log('----------------------------------------------------------------'.rainbow);
  console.log("𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗼𝗽𝘁𝗶𝗼𝗻𝘀:".yellow);
  console.log("| -p, --port [port]: Specifies the server port".yellow);
  console.log("| -s, --shield: Activates Shield mode to limit requests".yellow);
  console.log("| -bl, --blacklist [ip1 ip2 ...] : List of IP addresses to be blocked".yellow);
  console.log("| -t, --start [minutes]: Automatically starts the server after a set time.".yellow);
  console.log("| -i, --index [path]: Specify HTML index file path".yellow);
  console.log("| -r, --robots: Blocks robots if the option is present".yellow);
  console.log("| -h: Shows this help message\n".yellow);
  console.log("𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐮𝐬𝐚𝐠𝐞:".gray);
  console.log('----------------------------------------------------------------'.gray);
  console.log("| dserver -p 3000 -s -bl 127.0.0.1 -st 1 -i ./public/index.html -r".yellow);
  console.log('----------------------------------------------------------------'.gray);
  process.exit();
} else {
  if (argv.i) {
    cifp = argv.i;
    console.log(`[SERVER] Using custom index file: ${cifp}`.green);
  }

  if (argv.t) {
    const countdownMinutes = argv.t;
    console.log(`[START] Server will start in ${countdownMinutes} minutes. Countdown begins...`.yellow);

    setTimeout(() => {
        launch();
    }, countdownMinutes * 60 * 1000);
  } else {
    launch();
  }
}

function launch() {
  const PORT = argv.p || 1111;
  const host = '0.0.0.0';

  app.listen(PORT, host, () => {
    const sip = getip();
    console.log('______ _____ _   _ _____ ___________ _   _ ___________ '.cyan);
    console.log('|  _  \\  _  | | | /  ___|  ___| ___ \\ | | |  ___| ___ \\'.cyan);
    console.log('| | | | | | | | | \\ `--.| |__ | |_/ / | | | |__ | |_/ /'.cyan);
    console.log('| | | | | | | | | `--. \\  __||    /| | | |  __||    / '.cyan);
    console.log('| |/ /\\ \\_/ / |_| /\\__/ / |___| |\\ \\\\ \\_/ / |___| |\\ \\ '.cyan);
    console.log('|___/  \\___/ \\___/\\____/\\____/\\_| \\_\\___/\\____/\\_| \\_|'.cyan);
    console.log('----------------------------------------------------------------'.rainbow);
    console.log("| Server created by Douxx.xyz (https://github.com/douxxu/)     |".gray);
    console.log('----------------------------------------------------------------'.rainbow);
    console.log(`[SERVER] Server is running at http://${sip}:${PORT}`.green);
    console.error(`Use ctrl + c to stop the server`.yellow);
    console.error(`Use 'dserver -h' to get help`.yellow);
  });
}

function getip() {
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
//2+2=7
