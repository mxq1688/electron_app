const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
// const listenAutoUpdate = require('./listenAutoUpdate')

// 处理安装/卸载时在Windows上创建/删除快捷方式
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {//这是一个对象，其中包含了控制窗口内部网页渲染过程的各种选项
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // 加载 index.html
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // mainWindow.loadURL('https://aiask365.com')
  mainWindow.loadURL('https://aiask365.com/#/h5/list')

  // 打开开发工具
  // mainWindow.webContents.openDevTools();

  // listenAutoUpdate(mainWindow)

};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  
  createWindow();

  // 在 macOS 系统内, 如果没有已开启的应用窗口
  // 点击托盘图标时通常会重新创建一个新窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
