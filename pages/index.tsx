import { NextFC } from 'next'
import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Skills from '../components/Skills'
import Footer from '../components/Footer'

const Index: NextFC = (): JSX.Element => {
  return (
    <Page>
      <Hero />
      <Header />
      <Main>
        <Section title="自己紹介">
          <p>京都大学工学部電気電子工学科3回生。</p>
        </Section>
        <Section title="スキル">
          <Skills />
        </Section>
        <Section title="作ったもの" />
        <Section title="オンラインアカウント" />
      </Main>
      <Footer />
    </Page>
  )
}

export default Index
