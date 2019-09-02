import { Time } from 'src/atoms/Time'

interface PostHeaderProps {
  title: string
  published: Date
  updated: Date
}

const Publish = ({ published }: { published: Date }): JSX.Element => (
  <span style={{ padding: '0 5px' }}>
    <Time time={published} format="l" />
  </span>
)

const Update = ({ updated }: { updated: Date }): JSX.Element => (
  <span>
    <i className="material-icons">update</i>
    <Time time={updated} format="l" />
    <style jsx>{`
      i {
        font-size: 1em;
        padding: 0 3px;
      }
      span {
        display: flex;
        align-items: center;
      }
    `}</style>
  </span>
)

const PostHeader = (props: PostHeaderProps): JSX.Element => (
  <div>
    <h2>{props.title}</h2>
    <div className="dates century-gothic">
      <Publish published={props.published} />
      ・
      <Update updated={props.updated} />
    </div>
    <style jsx>{`
      h2 {
        background-color: #333;
        font-weight: normal;
        text-align: center;
        color: #eee;
        margin: 0;
        padding: 30px 10px;
      }
      .dates {
        color: #777;
        display: flex;
        justify-content: flex-end;
        padding: 5px 10px 0;
      }
    `}</style>
  </div>
)

export default PostHeader
