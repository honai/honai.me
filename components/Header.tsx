import Link from 'next/link'

import { primaryColor } from '../components/theme'

const NormalTitle = (): JSX.Element => (
  <>
    <Link href="/">
      <a className="site-title">honai.me</a>
    </Link>
    <style jsx>
      {`
        .site-title {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          padding: 0 10px;
        }
      `}
    </style>
  </>
)

interface ToppageTitleProps {
  isHeroInview?: boolean
}

const ToppageTitle = ({ isHeroInview }: ToppageTitleProps): JSX.Element => (
  <>
    <Link href="/">
      <a className="reset">
        <img src="/static/profile.png" alt="アイコン" height="100%" />
        <span>Honai Ueoka</span>
      </a>
    </Link>
    <style jsx>
      {`
        a {
          align-items: center;
          display: flex;
          padding: 5px;
          height: 36px;
          opacity: ${isHeroInview ? 0 : 1};
          transition: opacity linear 0.1s;
        }
        img {
          border-radius: 50%;
          margin: 0 5px;
        }
      `}
    </style>
  </>
)

const Header = ({ isToppage, isHeroInview }: HeaderProps): JSX.Element => (
  <header className="century-gothic">
    <div>{isToppage ? <ToppageTitle isHeroInview={isHeroInview} /> : <NormalTitle />}</div>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a className="reset">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a className="reset">Blog</a>
          </Link>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      header {
        background-color: ${primaryColor};
        width: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 200;
      }
      nav ul {
        display: flex;
        justify-content: flex-end;
        margin: 0;
        padding: 0;
        line-height: 1;
      }
      nav li {
        list-style: none;
        cursor: pointer;
        transition: background-color ease 0.2s;
      }
      nav li:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
      nav a {
        display: block;
        padding: calc((36px - 1rem) / 2) 20px;
      }
    `}</style>
  </header>
)

export interface HeaderProps {
  isToppage?: boolean
  isHeroInview?: boolean
}

export default Header
