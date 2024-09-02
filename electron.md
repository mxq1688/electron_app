#### 进程间通信
>模式 1：渲染器到主进程（单向）
```
preload.js 通过预加载公开 ipcRenderer.send
    contextBridge.exposeInMainWorld('electronAPI', {
        setTitle: (title) => ipcRenderer.send('set-title', title)
    })   

main.js 使用 ipcMain.on 侦听事件
    function handleSetTitle (event, title) {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
    }
    app.whenReady().then(() => {
        ipcMain.on('set-title', handleSetTitle)
        createWindow();
    });    

renderer.js（渲染器进程）|vue组件：
    window.electronAPI.setTitle(title)
```
>模式 2：渲染器到主（双向）
```
preload.js 通过预加载公开 ipcRenderer.invoke

    contextBridge.exposeInMainWorld('electronAPI', {
        openFile: () => ipcRenderer.invoke('dialog:openFile')
    })

主进程main.js 使用 ipcMain.handle 监听事件
    async function handleFileOpen () {
        const { canceled, filePaths } = await dialog.showOpenDialog({})
        if (!canceled) {
            return filePaths[0]
        }
    }
    app.whenReady().then(() => {
        ipcMain.handle('dialog:openFile', handleFileOpen)
        createWindow();
    });


renderer.js（渲染器进程）|vue组件：

    const btn = document.getElementById('btn')
    const filePathElement = document.getElementById('filePath')

    btn.addEventListener('click', async () => {
        const filePath = await window.electronAPI.openFile()
        filePathElement.innerText = filePath
    })

    在上述代码段中，我们侦听对 #btn 按钮的点击，并调用我们的 window.electronAPI.openFile() API 来激活本机打开文件对话框。然后我们在 #filePath 元素中显示所选文件路径。
```
>模式 3：主进程到渲染器进程
```
main.js（主进程）：使用 webContents 模块发送消息
    const createWindow = () => {
        const mainWindow = new BrowserWindow({
            webPreferences: {//这是一个对象，其中包含了控制窗口内部网页渲染过程的各种选项
            preload: path.join(__dirname, 'preload.js'),
            },
        });
        const menu = Menu.buildFromTemplate([
            {
            label: app.name,
            submenu: [
                {
                click: () => mainWindow.webContents.send('update-counter', 1),
                label: 'Increment'
                },
                {
                click: () => mainWindow.webContents.send('update-counter', -1),
                label: 'Decrement'
                }
            ]
            }
        ])
        Menu.setApplicationMenu(menu)
    }

preload.js：  通过预加载公开 ipcRenderer.on
    contextBridge.exposeInMainWorld('electronAPI', {
        onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
    })

renderer.js（渲染器进程）|vue组件：

    window.electronAPI.onUpdateCounter((value) => {
        const oldValue = Number(counter.innerText)
        const newValue = oldValue + value
        counter.innerText = newValue.toString()
    })
    在上面的代码中，我们向从预加载脚本公开的 window.electronAPI.onUpdateCounter 函数传递回调。第二个 value 参数对应于我们从原生菜单的 webContents.send 调用中传递的 1 或 -1。
```