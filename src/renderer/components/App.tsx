import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { remote, shell } from 'electron'
import { Sticky } from './Sticky'
import { Page } from '../../lib/types'
import { defaultTheme } from '../theme'
import { makeBuildMenuItem } from '../menu'

const { Menu } = remote

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2px;
`

interface AppProps {
  page: Page
}

export const App: React.FC<AppProps> = ({ page }) => {
  const [pinned, setPinned] = React.useState(false)
  const [dotsVisible, setDotsVisible] = React.useState(true)

  const webViewRef = React.useRef<Electron.WebviewTag>(null)

  const handleDogEarClick = React.useCallback(() => {
    setPinned(!pinned)
    remote.getCurrentWindow().setAlwaysOnTop(!pinned)
  }, [pinned])

  const handleMenuOpen = React.useCallback(() => {
    const webView = webViewRef.current
    if (webView == null) return

    const buildMenuItem = makeBuildMenuItem(webView)
    const menu = Menu.buildFromTemplate([
      buildMenuItem('copyLink'),
      buildMenuItem('copyReadableLink'),
      dotsVisible
        ? buildMenuItem('hideDots', () => setDotsVisible(false))
        : buildMenuItem('showDots', () => setDotsVisible(true)),
      { type: 'separator' },
      buildMenuItem('deletePage'),
    ])

    menu.popup({
      window: remote.getCurrentWindow(),
      x: 2,
      y: 36,
    })
  }, [dotsVisible])

  const handleOpenExternal = React.useCallback((url: string) => shell.openExternal(url), [])

  const handlePageClose = React.useCallback(() => remote.getCurrentWindow().close(), [])

  const handlePageTitleUpdate = React.useCallback(
    (title: string) => remote.getCurrentWindow().setTitle(title),
    []
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Sticky
          page={page}
          pinned={pinned}
          webViewRef={webViewRef}
          onDogEarClick={handleDogEarClick}
          onMenuOpen={handleMenuOpen}
          onOpenExternal={handleOpenExternal}
          onPageClose={handlePageClose}
          onPageTitleUpdate={handlePageTitleUpdate}
        />
      </Container>
    </ThemeProvider>
  )
}
