import path from 'path'
import url from 'url'
import { BrowserWindow } from 'electron'
import { WindowController } from './WindowController'
import { sessionPartition } from '../lib/constants'
import { Page } from '../lib/types'

export class PageWindowController extends WindowController {
  constructor(page: Page) {
    const window = new BrowserWindow({
      width: 320,
      height: 320,
      minWidth: 200,
      minHeight: 200,
      frame: false,
      transparent: true,
      hasShadow: false,
      webPreferences: {
        nodeIntegration: true,
        partition: sessionPartition,
        webviewTag: true,
      },
    })
    super(window)

    window.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        query: { project: page.project, page: page.title },
        slashes: true,
      })
    )

    // ページ画面をデバッグしたい場合は以下の行をコメントアウトしてください
    // window.webContents.openDevTools()
  }
}
