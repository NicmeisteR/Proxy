"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports                                                
const express = require("express");
const helpers_1 = require("./functions/helpers");
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
    app.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
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
        response.end(JSON.stringify(responseObject));
    }));
    app.get('/logs', (request, response) => __awaiter(this, void 0, void 0, function* () {
        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Developer': 'Nicolaas Nel (NicmeisteR)',
            'Support-Development': 'https://ko-fi.com/nicmeister',
            'Twitter': 'https://twitter.com/NicmeistaR'
        });
        fs.readFile(`./logs/cronlog.txt`, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            ;
            response.end(data);
        });
    }));
    app.get('/metadata', (request, response) => __awaiter(this, void 0, void 0, function* () {
        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Developer': 'Nicolaas Nel (NicmeisteR)',
            'Support-Development': 'https://ko-fi.com/nicmeister',
            'Twitter': 'https://twitter.com/NicmeistaR'
        });
        fs.readFile(`./cache/metaData.json`, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            ;
            response.end(data);
        });
    }));
    app.get('/csr-designations', (request, response) => __awaiter(this, void 0, void 0, function* () {
        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Developer': 'Nicolaas Nel (NicmeisteR)',
            'Support-Development': 'https://ko-fi.com/nicmeister',
            'Twitter': 'https://twitter.com/NicmeistaR'
        });
        fs.readFile(`./cache/csr-designations.json`, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            ;
            response.end(data);
        });
    }));
    app.listen(process.env.PORT, () => console.log(`API now available on http://localhost:${process.env.PORT}`));
}
// let app = express();
const app = express();
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
cron.schedule('* * */24 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helpers_1.weeklySchedule();
    let date = new Date;
    let datetime = `Last Sync: ${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    node.writeToFile("./logs", "cronlog", "txt", datetime);
}));
