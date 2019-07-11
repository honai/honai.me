import { useInView } from 'react-intersection-observer'
import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Skills from '../components/Skills'
import Works from '../components/Works'
import { getMyWorks, WorkEntry } from '../api/contentful'
import { NextPage } from '../types'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import Profile from '../components/Profile'

interface InitialProps {
  works: WorkEntry[]
}

const Index: NextPage<InitialProps> = ({ works }: InitialProps): JSX.Element => {
  const [heroWrap, heroInview] = useInView()
  const [inviewTimeout, setInviewTimeout] = useState(true)
  useEffect(
    (): void => {
      setTimeout((): void => {
        setInviewTimeout(false)
      }, 100)
    }
  )
  return (
    <Page>
      <div ref={heroWrap}>
        <Hero />
      </div>
      <Header isToppage isHeroInview={inviewTimeout || heroInview} />
      <Main>
        <Section title="プロフィール">
          <Profile />
        </Section>
        <Section title="スキル">
          <Skills />
        </Section>
        <Section title="作ったもの">
          <Works worksData={works} />
        </Section>
      </Main>
      <Footer />
    </Page>
  )
}

Index.getInitialProps = async (): Promise<InitialProps> => {
  const response = await getMyWorks()
  return {
    works: response.items
  }
}

export default Index
