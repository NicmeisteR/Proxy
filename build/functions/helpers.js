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
const node = require('node-essentials');
function weeklySchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        let metaData;
        try {
            metaData = yield node.get("https://www.haloapi.com/metadata/h5/metadata/seasons", ["ocp-apim-subscription-key", process.env.API_KEY]).then(console.log(`Retrieved: Meta Data`));
        }
        catch (error) {
            console.log(error);
        }
        finally {
            return new Promise((resolve, reject) => {
                let currentPlaylists = null;
                metaData = JSON.parse(metaData);
                metaData.filter((item) => {
                    if (item.isActive === true) {
                        let activePlaylists = [];
                        item.playlists.forEach((playlist) => {
                            if (playlist.isActive) {
                                activePlaylists.push({
                                    name: playlist.name,
                                    description: playlist.description,
                                    id: playlist.id
                                });
                            }
                        });
                        currentPlaylists = {
                            name: item.name,
                            description: item.description,
                            date: {
                                startDate: item.startDate,
                                endDate: item.endDate
                            },
                            id: item.id,
                            playlists: activePlaylists
                        };
                    }
                });
                resolve(node.writeToFile("./cache", "metaData", "json", JSON.stringify(currentPlaylists)));
            });
        }
    });
}
exports.weeklySchedule = weeklySchedule;
