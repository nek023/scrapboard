import { BrowserWindow } from 'electron'
import { WindowController } from './WindowController'
import { scrapboxUrl } from '../common/constants'
import { Page } from '../common/types'

const customProtocol = 'scrapboard:'

const modifyPageLinksScript = `
(() => {
  const appContainer = document.getElementById('app-container');

  if (appContainer) {
    const modifyPageLinks = () => {
      const modify = (a) => {
        if (a.protocol === '${customProtocol}') return;
        a.setAttribute('href', \`${customProtocol}\${a.pathname.slice(1)}\`)
      }

      const buttons = document.querySelectorAll('.new-button');
      buttons.forEach((button) => modify(button));

      const items = document.querySelectorAll('.page-list .page-list-item a');
      items.forEach((item) => modify(item));
    }

    // ロードタイミングによってはobserveが発火しないことがあるので、手動で1回実行しておく
    modifyPageLinks();

    // app-containerが更新されたらmodifyPageLinksが実行されるようにする
    const observer = new MutationObserver(modifyPageLinks);
    observer.observe(appContainer, { childList: true, subtree: true });
  }
})();
`

export class ProjectWindowController extends WindowController {
  onPageOpen?: (page: Page) => void

  constructor() {
    const window = new BrowserWindow({
      webPreferences: {
        enableRemoteModule: false,
        partition: 'persist:scrapboard',
        scrollBounce: true,
      },
    })
    super(window)

    // ページを開いたことを検出できるようにするため、
    // ページへのリンクをtarget=_blankにするスクリプトを注入する
    window.webContents.on('did-finish-load', () =>
      window.webContents.executeJavaScript(modifyPageLinksScript)
    )

    window.webContents.on('will-navigate', (e, urlString) => {
      const url = new URL(urlString)
      if (url.protocol !== customProtocol) return
      e.preventDefault()

      if (this.onPageOpen) {
        const [project, title] = url.pathname.split('/')
        this.onPageOpen({ project, title })
      }
    })

    window.loadURL(scrapboxUrl)

    // プロジェクト画面をデバッグしたい場合は以下の行をコメントアウトしてください
    // window.webContents.openDevTools()
  }
}
