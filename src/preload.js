// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。

// 方式1：
    window.addEventListener('DOMContentLoaded', () => {
        const replaceText = (selector, text) => {
            const element = document.getElementById(selector)
            if (element) element.innerText = text
        }

        for (const dependency of ['chrome', 'node', 'electron']) {
            replaceText(`${dependency}-version`, process.versions[dependency])
        }
    })

// 方式2：暴露变量|函数到window
    const { contextBridge, ipcRenderer } = require('electron')

    contextBridge.exposeInMainWorld('versions', {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron
        // 除函数之外，我们也可以暴露变量
    })

    // 希望主窗口打开一个新窗口，并且新窗口的界面是自己开发的vue组件页面。这里使用vue路由进行页面跳转。
    const openWindow = (param) => {
        ipcRenderer.invoke('on-open-event', param)
    }
    
    contextBridge.exposeInMainWorld('myApi',{ openWindow });

        // vue组件内跳转
            const openWindowApi = () => {
                const param = {
                    url: '/luao',  // 路由路径
                    width: 800,
                    height: 800
                }
                myApi.openWindow(param)
            }     