/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { notarize } = require('electron-notarize')

exports.default = async () => {
  if (process.platform !== 'darwin') {
    console.log('afterSign: skipping notarization because platform is not macOS')
    return
  }

  const pkg = require('../package.json')
  const appBundleId = pkg.build.appId
  const appProductName = pkg.build.productName
  const appPath = path.resolve(__dirname, `../dist/mac/${appProductName}.app`)
  const appleId = process.env.APPLE_ID
  const appleIdPassword = process.env.APPLE_ID_PASSWORD
  const ascProvider = process.env.ASC_PROVIDER

  if (!appleId) {
    console.log('afterSign: skipping notarization: APPLE_ID is not set')
    return
  }
  if (!appleIdPassword) {
    console.log('afterSign: skipping notarization: APPLE_ID_PASSWORD is not set')
    return
  }
  if (!ascProvider) {
    console.log('afterSign: skipping notarization: ASC_PROVIDER is not set')
    return
  }

  console.log(`afterSign: notarizing ${appPath}`)

  await notarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
    ascProvider,
  }).catch((err) => {
    console.error(`afterSign: failed to notarize: ${err.message}`)
    process.exit(1)
  })

  console.log('afterSign: notarized')
}
