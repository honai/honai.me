const redirectText = `/rss /blog/rss.xml 301
/blog/post/ /blog/
/blog/post /blog/
/blog/2021/naacl-2021/ /blog/post/naacl-2021/ 301
/blog/2021/naacl-2021 /blog/post/naacl-2021/ 301
/blog/2020/makefile-python-task-runner/ /blog/post/makefile-python-task-runner/ 301
/blog/2020/makefile-python-task-runner /blog/post/makefile-python-task-runner/ 301
/blog/2020/comet-ml-logging/ /blog/post/comet-ml-logging/ 301
/blog/2020/comet-ml-logging /blog/post/comet-ml-logging/ 301
/blog/2020/adversarial-watermarking-transformer/ /blog/post/adversarial-watermarking-transformer/ 301
/blog/2020/adversarial-watermarking-transformer /blog/post/adversarial-watermarking-transformer/ 301
/blog/2020/power-automate-disable-outlook-spam/ /blog/post/power-automate-disable-outlook-spam/ 301
/blog/2020/power-automate-disable-outlook-spam /blog/post/power-automate-disable-outlook-spam/ 301
/blog/2020/how-http-works-5-quic-http3/ /blog/post/how-http-works-5-quic-http3/ 301
/blog/2020/how-http-works-5-quic-http3 /blog/post/how-http-works-5-quic-http3/ 301
/blog/2020/how-http-works-4-http2/ /blog/post/how-http-works-4-http2/ 301
/blog/2020/how-http-works-4-http2 /blog/post/how-http-works-4-http2/ 301
/blog/2020/how-http-works-3-http-over-tls/ /blog/post/how-http-works-3-http-over-tls/ 301
/blog/2020/how-http-works-3-http-over-tls /blog/post/how-http-works-3-http-over-tls/ 301
/blog/2020/how-http-works-2-tls-http/ /blog/post/how-http-works-2-tls-http/ 301
/blog/2020/how-http-works-2-tls-http /blog/post/how-http-works-2-tls-http/ 301
/blog/2020/how-http-works-1-http1-keep-alive/ /blog/post/how-http-works-1-http1-keep-alive/ 301
/blog/2020/how-http-works-1-http1-keep-alive /blog/post/how-http-works-1-http1-keep-alive/ 301
/blog/2019/kuac2019/ /blog/post/kuac2019/ 301
/blog/2019/kuac2019 /blog/post/kuac2019/ 301
/blog/2019/elm-advent-2019-excel/ /blog/post/elm-advent-2019-excel/ 301
/blog/2019/elm-advent-2019-excel /blog/post/elm-advent-2019-excel/ 301
/blog/2019/material-ui-progress-animation/ /blog/post/material-ui-progress-animation/ 301
/blog/2019/material-ui-progress-animation /blog/post/material-ui-progress-animation/ 301
/blog/2019/github-actions-aws-s3/ /blog/post/github-actions-aws-s3/ 301
/blog/2019/github-actions-aws-s3 /blog/post/github-actions-aws-s3/ 301
/blog/2019/catechjob-openrec/ /blog/post/catechjob-openrec/ 301
/blog/2019/catechjob-openrec /blog/post/catechjob-openrec/ 301
/blog/2019/ubuntu-docker-lamp/ /blog/post/ubuntu-docker-lamp/ 301
/blog/2019/ubuntu-docker-lamp /blog/post/ubuntu-docker-lamp/ 301
/blog/2019/ubuntu-initial-settings-surface-pro-4/ /blog/post/ubuntu-initial-settings-surface-pro-4/ 301
/blog/2019/ubuntu-initial-settings-surface-pro-4 /blog/post/ubuntu-initial-settings-surface-pro-4/ 301
/blog/2019/made-nextjs-md-blog/ /blog/post/made-nextjs-md-blog/ 301
/blog/2019/made-nextjs-md-blog /blog/post/made-nextjs-md-blog/ 301
/blog/2019/web-frontend-challenge/ /blog/post/web-frontend-challenge/ 301
/blog/2019/web-frontend-challenge /blog/post/web-frontend-challenge/ 301
`;

class Redirects {
  data() {
    return {
      permalink: "/_redirects",
    };
  }
  render() {
    return redirectText;
  }
}

module.exports = Redirects;