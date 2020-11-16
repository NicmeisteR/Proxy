// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
const node = require('node-essentials');

export async function weeklySchedule(){
    let metaData: any;
    try {
        metaData = await node.get("https://www.haloapi.com/metadata/h5/metadata/seasons", ["ocp-apim-subscription-key", process.env.API_KEY]).then(console.log(`Retrieved: Meta Data`));
    } catch (error) {
        console.log(error);
    }
    finally {
        return new Promise<any>((resolve, reject) => {

            let currentPlaylists: any = null;
    
            metaData = JSON.parse(metaData);
            metaData.filter((item: any) => {
                if(item.isActive === true){
                    let activePlaylists: any = [];
                    item.playlists.forEach((playlist: any) => {
                        if(playlist.isActive){
                            activePlaylists.push({
                                name : playlist.name,
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
}