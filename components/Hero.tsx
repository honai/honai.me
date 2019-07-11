const Hero = (): JSX.Element => {
  return (
    <div className="hero">
      <div className="icon">
        <img src="/static/profile.png" alt="アイコン" width="100%" />
      </div>
      <div className="titles">
        <h1 className="century-gothic">Honai Ueoka</h1>
        <div className="subtitle century-gothic">Student at Kyoto University.</div>
      </div>
      <style jsx>{`
        .hero {
          align-items: center;
          background-color: #02545a;
          color: #fff;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          padding: 10px;
          text-align: center;
        }
        .icon {
          flex: 0 1 80px;
        }
        .icon img {
          border-radius: 50%;
          max-height: 100%;
          max-width: 100%;
        }
        .titles {
          padding-left: 20px;
          white-space: nowrap;
        }
        h1 {
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          font-size: 2rem;
          margin: 0 0 0.5rem;
        }
        .subtitle {
          margin: 0 0 0.5rem;
        }
        @media screen and (min-width: 576px) {
          h1 {
            font-size: 2.5rem;
          }
          .icon {
            flex: 0 1 90px;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero
