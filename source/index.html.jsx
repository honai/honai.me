import { Seo } from './components/Seo.jsx'
import { meta } from './data/meta.js'
import { Header } from './components/Header.jsx'
import { Head2, Head3 } from './components/Heading.jsx'
import { HistoryList } from './components/HistoryList.jsx'
import { SnsList } from './components/SnsList.html.jsx'
import { Footer } from './components/Footer.jsx'

export default () => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Seo meta={meta} />
        <link rel="stylesheet" href="/styles/main.css" />
      </head>
      <body>
        <Header />
        <main>
          <section>
            <Head2>Profile</Head2>
            <p>京都大学工学部3回生。Webエンジニア志望。大学では電気の勉強をしています。</p>
            <Head3>経歴</Head3>
            <HistoryList />
            <Head3>オンラインアカウント</Head3>
            <SnsList />
            <Head3>
              <a href="https://blog.honai.me/">ブログ</a>
            </Head3>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
