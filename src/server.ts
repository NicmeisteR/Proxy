// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports                                                
import express = require('express');
import { weeklySchedule } from './functions/helpers';
const fs = require('fs');
const node = require('node-essentials');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config({ path: require('find-config')('.env') });

// ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
// ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
// ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
// ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
// ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
// ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
// Server                                             
function start() {

  app.use(cors());
  // Configuring body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    let responseObject = [
      {
        name: "metadata",
        path: "https://haloapi.nicmeister.cloud/metadata"
      },
      {
        name: "csr-designations",
        path: "https://haloapi.nicmeister.cloud/csr-designations"
      }
    ];
    response.end(JSON.stringify(responseObject))
  });

  app.get('/logs', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    fs.readFile(`./logs/cronlog.txt`, 'utf8', (err: any, data: any) => {
      if (err) { throw err };
      response.end(data);
    });
  });

  app.get('/metadata', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    fs.readFile(`./cache/metaData.json`, 'utf8', (err: any, data: any) => {
      if (err) { throw err };
      response.end(data);
    });
  });

  app.get('/csr-designations', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    fs.readFile(`./cache/csr-designations.json`, 'utf8', (err: any, data: any) => {
      if (err) { throw err };
      response.end(data);
    });
  });

  app.listen(process.env.PORT, () => console.log(`API now available on http://localhost:${process.env.PORT}`));
}

// let app = express();
const app: express.Application = express();
start();

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
cron.schedule('* * */24 * * *', async () => {
  await weeklySchedule();
  let date = new Date;
  let datetime = `Last Sync: ${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  node.writeToFile("./logs", "cronlog", "txt", datetime);
});