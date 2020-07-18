import { Menu, app, session } from 'electron'
import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'
import { ProjectWindowController } from './ProjectWindowController'
import { sessionPartition, userAgent } from '../lib/constants'
import { PageWindowController } from './PageWindowController'
import { Page } from '../lib/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let projectWindowController: ProjectWindowController | undefined
const pageWindowControllers = new Map<number, PageWindowController>()

const setApplicationMenu = () =>
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      { role: 'appMenu' },
      { role: 'fileMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
    ])
  )

// デフォルトのUser-Agentを設定する
const setDefaultUserAgent = () => {
  session
    .fromPartition(sessionPartition)
    .webRequest.onBeforeSendHeaders({ urls: ['*://*/*'] }, (details, callback) => {
      details.requestHeaders['User-Agent'] = userAgent
      callback({ requestHeaders: details.requestHeaders })
    })
}

const checkForUpdates = () => {
  logger.transports.file.level = 'info'
  autoUpdater.logger = logger
  autoUpdater.checkForUpdatesAndNotify()
}

const openPageWindow = (page: Page) => {
  const pageWindowController = new PageWindowController(page)
  const window = pageWindowController.window
  if (!window) return

  // closedが発火したとき、windowは既に解放されているのでwindow.idを別変数に入れておく
  const windowId = window.id
  window.on('closed', () => pageWindowControllers.delete(windowId))
  pageWindowControllers.set(windowId, pageWindowController)
}

const openProjectWindow = () => {
  projectWindowController = new ProjectWindowController()
  projectWindowController.window?.on('closed', () => {
    projectWindowController = undefined
  })
  projectWindowController.onPageOpen = (page) => openPageWindow(page)
}

app.on('ready', () => {
  setApplicationMenu()
  setDefaultUserAgent()
  openProjectWindow()
  checkForUpdates()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (projectWindowController === undefined) {
    openProjectWindow()
  }
})
