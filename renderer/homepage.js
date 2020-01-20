const { ipcRenderer, remote } = require('electron')

const username = document.getElementById('username')
const signoutBtn = document.getElementById('signoutBtn')

signoutBtn.addEventListener('click', () => {
  ipcRenderer.send('sign-out-notify', 'You have just logged out')
  remote.getCurrentWindow().close()
})

ipcRenderer.on('display-username', (event, arg) => {
  username.innerHTML = arg
})