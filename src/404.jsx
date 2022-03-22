export const data = {
  permalink: "404.html",
};
export default (props) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 Not Found</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/bdo3rru.css" />
        <style
          dangerouslySetInnerHTML={{
            __html: props._functions.sassinline("portfolio-critical.scss"),
          }}
        />
      </head>

      <body className="body-layout">
        <main className="main-content">
          <div className="nav-title">
            <h2 className="subtitle">
              <a href="/" className="_uncolor">
                Honai Ueoka's Portfolio
              </a>
            </h2>
            <h1 className="title">404 Not Found</h1>
          </div>
        </main>
      </body>
    </html>
  );
};
