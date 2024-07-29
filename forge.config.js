const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: './markazIcon' // no file extension required
  },
  rebuildConfig: {},
  makers: {
    name: "@electron-forge/maker-zip",
    platforms: [
            "win32"
          ],
    config: {
      name: 'your_app_name',
      authors: 'Your Name',
      description: 'Your App Description',
      version: '1.0.0',
      iconUrl: 'http://url-to-your-icon.ico',
      setupIcon: 'path/to/your/icon.ico',
      loadingGif: 'path/to/loading.gif',
    },
  },
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
};
