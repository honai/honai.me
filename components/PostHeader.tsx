import moment from 'moment'

moment.locale('ja')

interface Props {
  title: string
  published: Date
  updated: Date
}
const PostHeader = (props: Props): JSX.Element => (
  <div>
    <h2>{props.title}</h2>
    <p>
      <span>{moment(props.published).format('ll')}</span>
    </p>
    <style jsx>{`
      h2 {
        text-align: center;
        margin: 0;
        padding: 30px;
        color: #eee;
        background-color: #333;
      }
    `}</style>
  </div>
)

export default PostHeader
