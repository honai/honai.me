const Hero = (): JSX.Element => {
  return (
    <div className="hero">
      <div className="icon">
        <img src="/static/profile.png" alt="アイコン" height="100%" />
      </div>
      <h1 className="century-gothic">Honai Ueoka</h1>
      <h2 className="century-gothic">Student at Kyoto University.</h2>
      <div className="scroll-icon" />
      <style jsx>{`
        .hero {
          align-items: center;
          background-color: #02545a;
          color: #fff;
          display: flex;
          flex-flow: column nowrap;
          padding: 20px 0;
          text-align: center;
        }
        .icon {
          max-height: 180px;
          height: 30vw;
        }
        .icon img {
          border-radius: 50%;
          max-height: 100%;
          max-width: 100%;
        }
        h1 {
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          font-size: 2.5rem;
          margin: 1rem 0 0.5rem;
          width: 90%;
          max-width: 400px;
        }
        h2 {
          font-size: 1.2rem;
          margin: 0 0 0.5rem;
        }
        .scroll-icon {
          height: 24px;
          width: 24px;
          position: relative;
        }
        .scroll-icon::before,
        .scroll-icon::after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border: 1px solid #fff;
          border-bottom-style: none;
          border-right-style: none;
          transform: rotate(45deg);
          position: absolute;
          left: 7px;
        }
        .scroll-icon::before {
          top: 8px;
        }
        .scroll-icon::after {
          top: 13px;
        }
      `}</style>
    </div>
  )
}

export default Hero
