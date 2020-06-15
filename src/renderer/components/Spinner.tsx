import React from 'react'
import styled from 'styled-components'
import { BounceLoader } from 'react-spinners'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.body};
`

export const Spinner: React.FC = () => (
  <Container>
    <BounceLoader color="#29a972" size={40} />
  </Container>
)
