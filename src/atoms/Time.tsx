import moment from 'moment'

moment.locale('ja')

interface Props {
  time?: Date | string
  format?: string
  fromNow?: boolean
}

export const Time = ({ time, format, fromNow }: Props): JSX.Element => {
  return (
    <time dateTime={moment(time).format()}>
      {fromNow ? moment(time).fromNow() : moment(time).format(format)}
    </time>
  )
}
