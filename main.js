const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on("ready", _ => {
  console.log("Electron is Ready!");
  let mainWindow = new BrowserWindow({
    height: 400,
    width: 400
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", _ => {
    mainWindow = null;
    console.log('Closed!');
  });
});
