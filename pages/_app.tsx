import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import withRedux from 'next-redux-wrapper'
import createStore from '../store'

interface MyAppProps {
  store: Store
}

Router.events.on('routeChangeComplete', (url): void => {
  // @ts-ignore
  window.gtag('config', process.env.GA_TRACKING_ID, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_location: url
  })
})

class MyApp extends App<MyAppProps> {
  public render(): JSX.Element {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(MyApp)
