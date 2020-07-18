import React from 'react'
import { ThemeContext } from 'styled-components'
import { Page } from '../../lib/types'
import { scrapboxUrl, sessionPartition } from '../../lib/constants'
import { Theme } from '../theme'

const makeCustomCSS = (theme: Theme) => `
  .page-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: scroll;
    background-color: ${theme.colors.body};
  }

  .page {
    padding: 6px 10px 6px !important;
    box-shadow: none !important;
  }

  .navbar, .quick-launch, .page-menu, .related-page-list {
    display: none;
  }
`

const scrollToCursorLineScript = `
(() => {
  const appContainer = document.getElementById('app-container');

  if (appContainer) {
    const observer = new MutationObserver(() => {
      const cursor = appContainer.querySelector('.editor > .cursor');
      if (cursor) cursor.scrollIntoViewIfNeeded(false);
    });
    observer.observe(appContainer, { attributes: true, childList: true, subtree: true });
  }
})();
`

const checkEditorScript = `
(() => {
  return (document.getElementsByClassName('editor').length > 0);
})();
`

const waitForEditorLoaded = (webView: Electron.WebviewTag) =>
  new Promise((resolve) => {
    const timerId = setInterval(
      () =>
        webView.executeJavaScript(checkEditorScript).then((loaded: boolean) => {
          if (loaded) {
            clearInterval(timerId)
            resolve()
          }
        }),
      250
    )
  })

type PageViewRef = Electron.WebviewTag | null

interface PageViewProps {
  page: Page
  onOpenExternal: (url: string) => void
  onPageClose: () => void
  onPageLoad: () => void
  onPageTitleUpdate: (title: string) => void
}

export const PageView = React.forwardRef<PageViewRef, PageViewProps>(
  ({ page, onOpenExternal, onPageClose, onPageLoad, onPageTitleUpdate }, ref) => {
    const theme = React.useContext(ThemeContext)
    const webViewRef = React.useRef<Electron.WebviewTag>(null)

    React.useImperativeHandle<PageViewRef, PageViewRef>(ref, () => webViewRef.current)

    React.useEffect(() => {
      const webView = webViewRef.current
      if (webView == null) return

      const handleDidFinishLoad = () => {
        webView.insertCSS(makeCustomCSS(theme))
        webView.executeJavaScript(scrollToCursorLineScript)
        waitForEditorLoaded(webView).then(onPageLoad)

        // ページビューをデバッグしたい場合は以下の行をコメントアウトしてください
        // webView.openDevTools()
      }

      const handleDidNavigate = (event: Electron.DidNavigateInPageEvent) => {
        const url = new URL(event.url)
        const closed =
          !url.href.startsWith(scrapboxUrl) || url.pathname.match(/^\/[^/]+\/[^/]+$/) == null
        if (closed) onPageClose()
      }

      const handleNewWindow = (event: Electron.NewWindowEvent) => onOpenExternal(event.url)

      const handlePageTitleUpdated = (event: Electron.PageTitleUpdatedEvent) =>
        onPageTitleUpdate(event.title)

      webView.addEventListener('did-finish-load', handleDidFinishLoad)
      webView.addEventListener('did-navigate-in-page', handleDidNavigate)
      webView.addEventListener('new-window', handleNewWindow)
      webView.addEventListener('page-title-updated', handlePageTitleUpdated)

      return () => {
        webView.removeEventListener('did-finish-load', handleDidFinishLoad)
        webView.removeEventListener('did-navigate-in-page', handleDidNavigate)
        webView.removeEventListener('new-window', handleNewWindow)
        webView.removeEventListener('page-title-updated', handlePageTitleUpdated)
      }
    }, [onPageLoad, onPageClose, onOpenExternal, onPageTitleUpdate, theme])

    return (
      <webview
        src={`${scrapboxUrl}/${page.project}/${page.title}`}
        partition={sessionPartition}
        style={{ flex: 1 }}
        ref={webViewRef}
        webpreferences="scrollBounce"
      />
    )
  }
)
