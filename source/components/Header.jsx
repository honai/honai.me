import styled from '@emotion/styled'

export const Header = () => (
  <Wrap>
    <Icon>
      <IconImg src="/images/profile.png" alt="profile icon" />
    </Icon>
    <TitleWrap className="century-gothic">
      <Title>Honai Ueoka</Title>
      <Subtitle>Welcome to my portfolio.</Subtitle>
    </TitleWrap>
  </Wrap>
)

const Wrap = styled.header`
  align-items: center;
  background-color: var(--primary-color);
  color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding: 10px;
  text-align: center;
`
const Icon = styled.div`
  flex: 0 1 80px;
  @media screen and (min-width: 576px) {
    flex: 0 1 90px;
  }
`
const IconImg = styled.img`
  border-radius: 50%;
`
const TitleWrap = styled.div`
  line-height: 2;
  padding-left: 20px;
  white-space: nowrap;
`
const Title = styled.h1`
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 2rem;
  margin: 0 0 0.5rem;
  @media screen and (min-width: 576px) {
    font-size: 2.5rem;
  }
`
const Subtitle = styled.div`
  margin: 0 0 0.5rem;
`
