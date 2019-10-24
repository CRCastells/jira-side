const ipc = require('electron').ipcRenderer;
const $ = require('jquery');
console.log('in renderer!');


ipc.on('json', (evt, statuses) => {
    console.log(statuses);
    $('#statuses').html(JSON.stringify(statuses));
})