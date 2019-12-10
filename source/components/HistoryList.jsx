import styled from '@emotion/styled'

export const HistoryList = () => (
  <HistoryWrap>
    <Item>
      <Period>2017.4</Period>
      <span>京都大学入学</span>
    </Item>
    <Item>
      <Period>2017.5 - 2018.12</Period>
      <span>京都大学11月祭事務局</span>
    </Item>
    <Item>
      <Period>2019.3</Period>
      <span>CyberAgent Web Frontend Challenge 参加</span>
    </Item>
    <Item>
      <Period>2019.8</Period>
      <span>OPENREC Webフロントチームでの就業型インターン</span>
    </Item>
    <Item>
      <Period>2019.4 - 現在</Period>
      <span>
        <a href="https://camph.net" target="_blank" rel="noopener noreferrer">
          CAMPHOR-
        </a>{' '}
        運営メンバー
      </span>
    </Item>
  </HistoryWrap>
)

const barWrapWidth = 50
const barWidth = 2
const markerSize = 12

const HistoryWrap = styled.ul`
  padding-left: ${barWrapWidth}px;
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: ${barWidth}px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: ${barWrapWidth / 2 - barWidth / 2}px;
  }
`
const Item = styled.li`
  padding: 10px 0;
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  &::before {
    content: '';
    display: inline-block;
    width: ${markerSize}px;
    height: ${markerSize}px;
    top: calc(50% - ${markerSize}px / 2);
    left: ${-barWrapWidth / 2 - markerSize / 2}px;
    border-radius: 50%;
    background-color: var(--primary-color);
    position: absolute;
  }
`
const Period = styled.span`
  color: rgba(0, 0, 0, 0.7);
  font-weight: bold;
`
