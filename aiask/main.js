
const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    backgroundColor: "#fff", //设置窗口的背景颜色
    // titleBarStyle: 'hidden', //隐藏传统的标题栏（即包含最小化、最大化/还原以及关闭按钮的区域）
    // titleBarOverlay: true, //当 titleBarStyle 设置为 'hidden' 或 'hiddenInset' 时，此选项允许窗口的内容扩展到原本标题栏占据的空间。
    webPreferences: {//这是一个对象，其中包含了控制窗口内部网页渲染过程的各种选项
      nativeWindowOpen: true, //允许通过 window.open() 方法打开的新窗口具有与父窗口相同的上下文。如果设为 true，则新窗口会继承父窗口的 webPreferences。
      contextIsolation: true, //启用上下文隔离，这意味着主进程的全局变量（如 require 和 Node.js 全局变量）不会暴露给渲染器进程。这有助于提高安全性。
      webviewTag: true, //允许使用 <webview> HTML5 标签。这个标签允许在一个独立的分区中加载外部网站，从而增加安全性。
    },
  });

  // mainWindow.setFullScreen(true);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.loadURL('https://aiask365.com/#/h5/list')
  // mainWindow.webContents.openDevTools();

}

app.whenReady().then(() => {
  // 在 macOS 系统内, 如果没有已开启的应用窗口
  // 点击托盘图标时通常会重新创建一个新窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
