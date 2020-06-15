import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 30px;
  height: 30px;
`

const PinnedDogEarContainer = styled.div`
  width: 30px;
  height: 30px;
  fill: ${(props) => props.theme.colors.dogear};

  &:hover {
    fill: ${(props) => props.theme.colors.dogearHover};
  }
`

const PinnedDogEar: React.FC = () => (
  <PinnedDogEarContainer>
    <svg width="30" height="30" viewBox="0 0 30 30">
      <path className="dog-ear" d="M0,0 L30,30 L0,30 L0,0" />
    </svg>
  </PinnedDogEarContainer>
)

const UnpinnedDogEar = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.colors.header};

  &:hover {
    background-color: ${(props) => props.theme.colors.headerHover};
  }
`

interface DogEarProps {
  pinned: boolean
  onClick: () => void
}

export const DogEar: React.FC<DogEarProps> = ({ pinned, onClick }) => {
  const dogEar = React.useMemo(() => (pinned ? <PinnedDogEar /> : <UnpinnedDogEar />), [pinned])

  return <Container onClick={onClick}>{dogEar}</Container>
}
