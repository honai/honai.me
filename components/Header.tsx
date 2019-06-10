import Link from 'next/link'

import { primaryColor } from '../components/theme'

const Header = (): JSX.Element => (
  <header className="century-gothic">
    <Link href="/">
      <a className="site-title">honai.me</a>
    </Link>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
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
        height: 36px;
        position: sticky;
        top: 0;
        z-index: 200;
      }
      .site-title {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.8);
        padding: 0 10px;
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
      a {
        color: inherit;
        text-decoration: none;
      }
    `}</style>
  </header>
)

export default Header
