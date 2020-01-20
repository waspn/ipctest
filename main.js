const { app, BrowserWindow, ipcMain, dialog } = require('electron')
let mainWindow = null
const createWindow = (window) => {
  window.loadFile('index.html')
}
const newWindow = (args) => {
  const window = new BrowserWindow({
    width: 500,
    height: 350,
    webPreferences: { nodeIntegration: true }
  })
  window.loadFile('renderer/homePage.html')
  window.webContents.on('did-finish-load', () => {
    window.webContents.send('display-username', args)
  })
}
const displayMsg = () => {
  const window = new BrowserWindow({
    width: 250,
    height: 100,
    webPreferences: { nodeIntegration: true }
  })
  window.loadFile('renderer/testPage.html')
}

// app started
app.on('ready', () => {
  mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true } })
  createWindow(mainWindow)
})

// app terminated
app.on('window-all-closed', () => {
  app.quit()
})

// custom event
ipcMain.on('sampleBtnEvent', (event) => {
  // dialog.showErrorBox('An error message', 'Click for what ?')

  // dialog.showMessageBox({
  //     type: 'info',
  //     title: 'Info',
  //     message: 'Lorem Ipsum',
  //     detail: 'Lorem ipsum sit dolor amet conseqtetur'    
  // })

  dialog.showOpenDialog({
    title: 'Open file',
    properties: ['openFile', 'openDirectory']
  })
    .then(res => { console.log('RES', res) })
    .catch(err => { console.log('ERR', err) })
})
ipcMain.on('closeApp', (event) => {
  app.quit()
})
ipcMain.on('openNewWindowEvent', (event) => {
  // createWindow()
  displayMsg()
})
ipcMain.on('showMessageEvent', (event) => {
  event.sender.send('display-msg', 'HAPPY NEW YEAR 2020')
})
ipcMain.on('user-login', (event, arg) => {
  newWindow(arg)
})
ipcMain.on('sign-out-notify', (event, msg) => {
  console.log('msggg', msg)
})
ipcMain.on('new-window', (event, url) => {
  const googleWindow = new BrowserWindow({
    useContentSize: true,
    transparent: true, frame: false,
    webPreferences: { nodeIntegration: true }
  })
  googleWindow.loadURL(url)
})
ipcMain.on('got-text', (event, msg) => {
  // console.log('event', event)
  handleMsg(mainWindow)
})

const handleMsg = (mainWindow) => {
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('did-finish-load')
    mainWindow.webContents.send('aaa')
  })
}
