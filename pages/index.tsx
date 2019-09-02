import { useInView } from 'react-intersection-observer'
import Page from 'src/components/Page'
import Header from 'src/components/Header'
import Main from 'src/components/Main'
import Hero from 'src/components/Hero'
import Section from 'src/components/Section'
import Skills from 'src/components/Skills'
import Works from 'src/components/Works'
import { getMyWorks, WorkEntry } from 'src/lib/contentful'
import { NextPage } from 'src/types'
import Footer from 'src/components/Footer'
import { useEffect, useState } from 'react'
import Profile from 'src/components/Profile'

interface InitialProps {
  works: WorkEntry[]
}

const Index: NextPage<InitialProps> = ({ works }: InitialProps): JSX.Element => {
  const [heroWrap, heroInview] = useInView()
  const [inviewTimeout, setInviewTimeout] = useState(true)
  useEffect((): void => {
    setTimeout((): void => {
      setInviewTimeout(false)
    }, 100)
  })
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
        <Section title="作ったもの">
          <Works worksData={works} />
        </Section>
        <Section title="スキル">
          <Skills />
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
