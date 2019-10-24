const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const request = require("request").defaults({ jar: true });
const username = require('./env').username;
const apiKey = require('./env').apiKey;
const token = Buffer.from(username + ':' + apiKey).toString("base64");
const ipc = electron.ipcMain;

app.on("ready", _ => {
  console.log("Electron is Ready!");
  let mainWindow = new BrowserWindow({
    height: '75vh',
    width: '50vw'
  });

  let headers = {
    Authorization:
      "Basic " + token
  };
  let statuses = {};
  request.get(
    `https://ineomobility.atlassian.net/rest/api/2/search?jql=project = "MOV" AND sprint in openSprints() AND Sprint not in closedSprints() ORDER BY priority&maxResults=100&startAt=0`, { headers }, (e, r, b) => {
      let body = JSON.parse(b);
      body.issues.forEach(issue => {
        if (statuses[issue.fields.status.name] == undefined) {
          statuses[issue.fields.status.name] = Number(issue.fields.customfield_10115);
        } else {
          statuses[issue.fields.status.name] += Number(issue.fields.customfield_10115);
        }
      });
      mainWindow.webContents.send('json', statuses);
    }
  );

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", _ => {
    mainWindow = null;
    console.log('Closed!');
  });
});
