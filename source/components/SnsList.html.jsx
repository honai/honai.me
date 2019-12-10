import styled from '@emotion/styled'

import GithubLogo from '../svgs/github.svg'
import TwitterLogo from '../svgs/twitter.svg'

export const SnsList = () => (
  <Wrap>
    <Item>
      <a href="https://twitter.com/_honai" aria-label="Twitter account link">
        <TwitterLogo />
      </a>
    </Item>
    <Item>
      <a href="https://github.com/honai" aria-label="GitHub account link">
        <GithubLogo />
      </a>
    </Item>
  </Wrap>
)

const Wrap = styled.ul`
  display: flex;
`
const Item = styled.li`
  margin: 10px;
`
