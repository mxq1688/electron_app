const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true, //是否使用asar打包格式
    // 设置应用程序图标 名称
    name: "aiask",
    icon: 'assets/icons/laihua/logo',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      // 配置安装程序图标
      config: {
        iconUrl: 'assets/icons/laihua/logo.ico',
        setupIcon: 'assets/icons/laihua/logo.ico'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    // {
    //   name: '@electron-forge/maker-dmg',
    //   config: {
    //     // icon: '/path/to/icon.icns'
    //   }
    // },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          // 设置应用程序图标 名称
          icon: 'assets/icons/laihua/logo.png'
        }
      }
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
