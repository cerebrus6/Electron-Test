const { app, BrowserWindow } = require('electron')

function createWindow() {
	let win = new BrowserWindow({
		width: 800,
		height: 643,
		frame: true,
		webPreferences: {
			nodeIntegration: true
		}
	})
	win.loadFile('Snake Game/snake.html')
}

app.whenReady().then(createWindow)