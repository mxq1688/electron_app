const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true, //是否使用asar打包格式
    icon: '/icon/logo',
    // 基础配置（一般这些就够用了）
    // "name": "MyElectronApp", // 应用程序的名称
    // "productName": "My Electron App", // 产品名称（用于生成安装包的名称）
    // "ignore": [ // 不需要打包的文件和文件夹的路径列表
    //   ".git",
    //   ".vscode",
    //   "node_modules/.cache",
    //   "src"
    // ],
    //   // 配置其他构建器（特殊情况下使用）
    // "win": { // Windows平台的配置
    //   "target": "nsis", // 打包的目标格式为NSIS安装程序
    //   "icon": "path/to/windows/icon.ico", // Windows平台的图标路径
    //   "publisherName": "My Company", // 发布者名称
    //   "fileAssociations": [ // 关联文件类型的配置
    //     {
    //       "ext": "myext", // 文件扩展名
    //       "name": "My Extension", // 文件类型名称
    //       "description": "Open My Extension files", // 文件类型描述
    //       "role": "Editor" // 文件类型的角色
    //     }
    //   ],
    //   "certificateFile": "path/to/certificate.pfx", // 数字证书文件的路径
    //   "certificatePassword": "password123" // 数字证书的密码
    // },
    // "mac": { // macOS平台的配置
    //   "target": "dmg", // 打包的目标格式为DMG镜像
    //   "icon": "path/to/mac/icon.icns", // macOS平台的图标路径
    //   "category": "public.app-category.utilities", // 应用程序的分类
    //   "extendInfo": { // 扩展应用程序包的配置
    //     "NSAppTransportSecurity": {
    //       "NSAllowsArbitraryLoads": true // 允许应用程序加载任意的网络资源
    //     }
    //   }
    // },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: './icon/logo.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: './icon/logo.icns'
      }
    },
    // {
    //   name: '@electron-forge/maker-dmg',
    //   config: {
    //     // icon: '/path/to/icon.icns'
    //   }
    // },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'mxq1688',
          name: 'electron_app'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};
