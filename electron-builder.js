module.exports = {
  productName: "aiask",
  appId: 'com.electron.aiask',
  asar: true, //asar加密
  directories: {
    output: 'builder', // 输出目录
  },
  files: [
    "**/*",
    "!frontend/",
    "!run/",
    "!logs/",
    "!data/"
  ],
  // extraResources: {
  //   from: "build/extraResources/",
  //   to: "extraResources"
  // },
  win: {
    target: 'nsis', // Windows 构建目标
    icon: 'assets/icons/laihua/logo.ico',
    artifactName: "${productName}-${os}-${version}-${arch}.${ext}",
  },
  mac: {
    target: ['dmg', 'zip'], // macOS 构建目标
    icon: 'assets/icons/laihua/logo.icns',
    artifactName: "${productName}-${os}-${version}-${arch}.${ext}",
  },
  linux: {
    target: 'deb', // Linux 构建目标
    icon: 'assets/icons/laihua/logo.png',
    artifactName: "${productName}-${os}-${version}-${arch}.${ext}",
  },
  publish: [
    {
      provider: 'github', // 发布提供商
      owner: 'mxq1688', // GitHub 用户名或组织名
      repo: 'electron_app', // GitHub 仓库名
      // url: 'electron应用的更新地址'
    },
  ],
  // win安装包配置项
  nsis: {
    oneClick: false, // 是否允许单击安装
    perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
    allowElevation: false,// 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowToChangeInstallationDirectory: true, // 是否允许用户更改安装目录
    menuCategory: true, // 是否在开始菜单创建文件夹
    installerIcon: 'assets/icons/laihua/logo.ico', // 安装程序图标
    uninstallerIcon: 'assets/icons/laihua/logo.ico', // 卸载程序图标
    installerHeaderIcon: 'assets/icons/laihua/logo.ico',// 安装程序头部图片
    createDesktopShortcut: true, // 创建桌面快捷方式
    createStartMenuShortcut: true, // 创建开始菜单快捷方式
    shortcutName: '${productName}', // 快捷方式名称
    // include: 'build/installer.nsh',// NSIS的路径包括自定义安装程序的脚本。默认为build/installer.nsh
    deleteAppDataOnUninstall: true,// 卸载时删除用户数据
  },

  // dmg安装包配置项
  dmg: {
    // background: '背景图地址',
    contents: [
      { // 这个是右边图标及内容
        x: 410,
        y: 190,
        type: 'link',
        path: '/Applications'
      },
      { // 这个是你左边的图标
        x: 130,
        y: 190,
        type: 'file'
      }
    ],
    window: { // 这里是整个窗口的大小
      height: 380,
      width: 540
    }
  },
};