import React from 'react'
import { StickyHeader } from './StickyHeader'
import { StickyBody } from './StickyBody'
import styled from 'styled-components'
import { Page } from '../../common/types'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.13);
`

interface StickyProps {
  page: Page
  pinned: boolean
  webViewRef: React.RefObject<Electron.WebviewTag>
  onDogEarClick: () => void
  onMenuOpen: () => void
  onOpenExternal: (url: string) => void
  onPageClose: () => void
  onPageTitleUpdate: (title: string) => void
}

export const Sticky: React.FC<StickyProps> = ({
  page,
  pinned,
  webViewRef,
  onDogEarClick,
  onMenuOpen,
  onOpenExternal,
  onPageClose,
  onPageTitleUpdate,
}) => (
  <Container>
    <StickyHeader pinned={pinned} onDogEarClick={onDogEarClick} onMenuOpen={onMenuOpen} />
    <StickyBody
      page={page}
      webViewRef={webViewRef}
      onOpenExternal={onOpenExternal}
      onPageClose={onPageClose}
      onPageTitleUpdate={onPageTitleUpdate}
    />
  </Container>
)
