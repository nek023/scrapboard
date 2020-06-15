import React from 'react'
import styled from 'styled-components'
import { DogEar } from './DogEar'
import { MenuButton } from './MenuButton'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Dragger = styled.div`
  flex: 1;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  background-color: ${(props) => props.theme.colors.header};
`

interface StickyHeaderProps {
  pinned: boolean
  onDogEarClick: () => void
  onMenuOpen: () => void
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  pinned,
  onDogEarClick,
  onMenuOpen,
}) => (
  <Container>
    <MenuButton onClick={onMenuOpen} />
    <Dragger />
    <DogEar pinned={pinned} onClick={onDogEarClick} />
  </Container>
)
