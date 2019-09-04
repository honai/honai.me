import Head from 'next/head'

interface OgpProps {
  url: string
  title: string
  description?: string
  image?: string
}

interface TwitterCardProps extends OgpProps {
  largeCard?: boolean
  alt?: string
}

export const OgTags = (props: OgpProps): JSX.Element => (
  <Head>
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta property="og:image" content={props.image} />
    <meta property="fb:app_id" content={process.env.FB_ID} />
    <meta property="og:locale" content="ja_JP" />
  </Head>
)

export const TwitterCardTags = (props: TwitterCardProps): JSX.Element => (
  <Head>
    <meta name="twitter:card" content={props.largeCard ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:image" content={props.image} />
    <meta name="twitter:image:alt" content={props.alt} />
  </Head>
)
