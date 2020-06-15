import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 30px;
  height: 30px;
  fill: ${(props) => props.theme.colors.dogear};
  background-color: ${(props) => props.theme.colors.header};

  &:hover {
    fill: ${(props) => props.theme.colors.dogearHover};
    background-color: ${(props) => props.theme.colors.headerHover};
  }
`

interface MenuButtonProps {
  onClick: () => void
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => (
  <Container onClick={onClick}>
    <svg width="30" height="30" viewBox="0 0 30 30">
      <rect x="8" y="10" width="14" height="1" />
      <rect x="8" y="14" width="14" height="1" />
      <rect x="8" y="18" width="14" height="1" />
    </svg>
  </Container>
)
