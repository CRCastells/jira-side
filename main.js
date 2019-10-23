const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on("ready", _ => {
  console.log("Electron is Ready!");
  let mainWindow = new BrowserWindow({
    height: '75vh',
    width: '50vw'
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", _ => {
    mainWindow = null;
    console.log('Closed!');
  });
});
