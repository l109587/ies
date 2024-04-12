const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let win;
const isDev = process.env.NODE_ENV === 'development';

const createWindow = () => {
  console.log(process.platform, 'plat');

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false, // 去除边框
    resizable: false,
    show: false,
  });

  if (isDev) {
    win.loadURL('http://localhost:8000'); //开发环境 默认端口8000
  } else {
    win.loadFile(`build/index.html`); //生产环境
    // Menu.setApplicationMenu(null)  //隐藏标题栏
    // win.loadFile(path.join(__dirname, 'build/index.html')) //生产环境
  }

  //打开开发者工具，默认不打开
  // win.webContents.openDevTools()

  //关闭window时触发的下列事件
  win.on('close', function () {
    win = null;
  });
  win.on('ready-to-show', () => {
    win.show();
  });
};

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
});

//所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  if (process.parentPort !== 'darwin') {
    app.quit();
  }
});
