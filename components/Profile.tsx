import Accounts from './Accounts'
import { PropsWithChildren } from 'react'

interface HistoryItemProps {
  period: string
}
const HistoryItem: React.FC<HistoryItemProps> = ({
  period,
  children
}: PropsWithChildren<HistoryItemProps>): JSX.Element => (
  <li>
    <span>{period}</span>
    <br />
    {children}
    <style jsx>
      {`
        li {
          margin: 5px 0;
        }
        span {
          display: inline-block;
          width: 8rem;
        }
        @media screen and (min-width: 576px) {
          br {
            display: none;
          }
        }
      `}
    </style>
  </li>
)

const Profile = (): JSX.Element => (
  <>
    <p>京都大学工学部3回生。Webエンジニア志望。大学では電気の勉強をしています。</p>
    <h3>経歴</h3>
    <ul>
      <HistoryItem period="2019.4 - 現在">
        <a href="https://camph.net" target="_blank" rel="noopener noreferrer">
          CAMPHOR-
        </a>
        &ensp;運営メンバー
      </HistoryItem>
      <HistoryItem period="2019.3">CyberAgent Web Frontend Challenge 参加</HistoryItem>
      <HistoryItem period="2017.5 - 2018.12">京都大学11月祭事務局</HistoryItem>
      <HistoryItem period="2017.4">京都大学入学</HistoryItem>
    </ul>
    <h3>Social</h3>
    <Accounts />
    <style jsx>
      {`
        ul {
          list-style-type: '-  ';
          padding-left: 30px;
          margin-top: 0;
        }
        h3 {
          margin: 0.5rem 0 0.5rem 0.5rem;
        }
        h3::before {
          content: '##';
          font-size: 1rem;
          margin-right: 0.5rem;
          opacity: 0.5;
        }
        @media screen and (min-width: 576px) {
          .br--mobile {
            display: none;
          }
        }
      `}
    </style>
  </>
)

export default Profile
