const { ipcRenderer, remote: { BrowserWindow } } = require('electron')

const sampleBtn = document.getElementById('sampleBtn')
const closeBtn = document.getElementById('closeBtn')
const loginBtn = document.getElementById('loginBtn')
const openNewWindow = document.getElementById('openNewWindow')
const showMessage = document.getElementById('showMessage')
const googleBtn = document.getElementById('gotogoogle')
const caption = document.getElementById('caption')

const showPopupWindow = () => {
  const remoteWindow = new BrowserWindow({
    width: 400,
    height: 180,
    frame: false,
    webPreferences: { nodeIntegration: true }
  })
  remoteWindow.loadFile('./renderer/login.html')
}

sampleBtn.addEventListener('click', () => {
  ipcRenderer.send('sampleBtnEvent')
})

closeBtn.addEventListener('click', () => {
  ipcRenderer.send('closeApp')
})

loginBtn.addEventListener('click', () => {
  showPopupWindow()
})

googleBtn.addEventListener('click', () => {
  ipcRenderer.send('new-window', 'https://www.google.com')
})

openNewWindow.addEventListener('click', () => {
  ipcRenderer.send('openNewWindowEvent')
})

showMessage.addEventListener('click', () => {
  // ipcRenderer.send('showMessageEvent')
  ipcRenderer.send('got-text')
})

ipcRenderer.on('display-msg', (event, msg) => {
  caption.innerHTML = msg
})