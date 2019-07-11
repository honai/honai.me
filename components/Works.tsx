import markdownIt from 'markdown-it'
import { WorkEntry } from '../api/contentful'

const md = new markdownIt({ breaks: true })

const Work = (work: WorkEntry): JSX.Element => {
  const { title, url, description } = work.fields
  const heroUrl = work.fields.hero.fields.file.url
  const descriptionHtml = md.renderInline(description)
  return (
    <li>
      <a className="image" href={work.fields.url}>
        <img src={heroUrl} width="100%" />
      </a>
      <div className="text">
        <a className="title reset" href={url}>
          <h3 className="century-gothic">{title}</h3>
        </a>
        <p className="description" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
      <style jsx>
        {`
          .description :global(a) {
            display: inline-block;
            padding: 0 5px;
          }
          li {
            display: grid;
            margin: 1rem 0 3rem;
          }
          .image {
            justify-self: center;
            max-width: 300px;
            width: 90%;
          }
          .image img {
            border-radius: 10px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
          .text {
            padding: 0 10px;
            display: flex;
            flex-flow: column nowrap;
          }
          h3 {
            font-size: 2rem;
            line-height: 1.2;
            margin: 0.5rem 0;
          }
          p {
            border: solid rgba(0, 0, 0, 0.3);
            border-width: 1px 0 1px;
            line-height: 1.5;
            margin: 0;
            padding: 10px 5px;
            flex: 1 0 auto;
          }
          @media screen and (min-width: 600px) {
            li {
              grid-template-columns: 300px 1fr;
            }
            .text {
              padding-left: 20px;
            }
          }
        `}
      </style>
    </li>
  )
}

interface WorksProps {
  worksData: WorkEntry[]
}

const Works = ({ worksData }: WorksProps): JSX.Element => (
  <ul className="reset">
    {worksData.map(
      (work, idx): JSX.Element => (
        <Work key={idx} {...work} />
      )
    )}
  </ul>
)

export default Works
