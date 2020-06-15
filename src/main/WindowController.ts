import { BrowserWindow } from 'electron'

export abstract class WindowController {
  private _window?: BrowserWindow

  get window() {
    return this._window
  }

  set window(window: BrowserWindow | undefined) {
    window?.on('closed', () => {
      this._window = undefined
    })

    this._window = window
  }

  constructor(window: BrowserWindow) {
    this.window = window
  }

  close() {
    this.window?.close()
  }
}
