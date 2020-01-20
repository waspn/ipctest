const { ipcRenderer, remote } = require('electron')

const username = document.getElementById('input-username')
const signinBtn = document.getElementById('signin-btn')
const cancelBtn = document.getElementById('cancel-btn')
const window = remote.getCurrentWindow()

signinBtn.addEventListener('click', () => {
    ipcRenderer.send('user-login', username.value)
    window.close()
})
cancelBtn.addEventListener('click', () => {
    window.close()
})