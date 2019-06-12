import skillData from '../resources/skills'

interface SkillProps {
  title: string
  svg: string
}

const Skill: React.FC<SkillProps> = ({ title, svg }: SkillProps): JSX.Element => {
  return (
    <li>
      <figure dangerouslySetInnerHTML={{ __html: svg }} />
      <h3>{title}</h3>
      <style jsx>{`
        h3 {
          text-align: center;
        }
        figure {
          margin: 0;
        }
      `}</style>
    </li>
  )
}

const Skills: React.FC = (): JSX.Element => {
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
            grid-template-columns: repeat(auto-fit, 100px);
            justify-content: space-around;
            grid-column-gap: 30px;
            padding: 10px;
          }
          @media screen and (min-width: 600px) {
            ul {
              grid-template-columns: repeat(auto-fit, 120px);
            }
          }
        `}
      </style>
    </>
  )
}

export default Skills
