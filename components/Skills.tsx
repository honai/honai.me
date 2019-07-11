import skillData from '../resources/skills'

interface SkillProps {
  title: string
  svg: string
}

const Skill = ({ title, svg }: SkillProps): JSX.Element => {
  return (
    <li>
      <figure dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="title">{title}</div>
      <style jsx>{`
        .title {
          text-align: center;
          font-size: 0.9rem;
        }
        figure {
          margin: 0;
        }
      `}</style>
    </li>
  )
}

const Skills = (): JSX.Element => {
  return (
    <>
      <ul className="reset">
        {skillData.map(
          (data, idx): JSX.Element => (
            <Skill key={idx} {...data} />
          )
        )}
      </ul>
      <style jsx>
        {`
          ul {
            display: grid;
            grid-template-columns: repeat(auto-fit, 75px);
            justify-content: space-around;
            grid-column-gap: 20px;
            grid-row-gap: 10px;
            padding: 10px;
          }
        `}
      </style>
    </>
  )
}

export default Skills
