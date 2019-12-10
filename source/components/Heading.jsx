import styled from '@emotion/styled'

export const Head2 = ({ children }) => <H2 className="century-gothic">{children}</H2>

const H2 = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin: 1rem 0;
  &::before {
    content: '#';
    color: var(--primary-color);
    opacity: 0.75;
    margin-right: 10px;
  }
  &::after {
    content: '';
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    flex: 1 1 auto;
    height: 1px;
    margin-left: 10px;
  }
`

export const Head3 = styled.h3`
  margin: 1rem 0.5rem;
  &::before {
    content: '##';
    font-size: 1rem;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
`
