import React from 'react'
import styled from 'styled-components'
import { Page } from '../../common/types'
import { PageView } from './PageView'
import { Spinner } from './Spinner'

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  background-color: ${(props) => props.theme.colors.body};
  border-left: 1px solid ${(props) => props.theme.colors.border};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

interface StickyBodyProps {
  page: Page
  webViewRef: React.RefObject<Electron.WebviewTag>
  onOpenExternal: (url: string) => void
  onPageClose: () => void
  onPageTitleUpdate: (title: string) => void
}

export const StickyBody: React.FC<StickyBodyProps> = ({
  page,
  webViewRef,
  onOpenExternal,
  onPageClose,
  onPageTitleUpdate,
}) => {
  const [loading, setLoading] = React.useState(true)
  const handlePageLoad = React.useCallback(() => setLoading(false), [])

  return (
    <Container>
      <PageView
        page={page}
        onOpenExternal={onOpenExternal}
        onPageClose={onPageClose}
        onPageLoad={handlePageLoad}
        onPageTitleUpdate={onPageTitleUpdate}
        ref={webViewRef}
      />
      {loading ? <Spinner /> : null}
    </Container>
  )
}
