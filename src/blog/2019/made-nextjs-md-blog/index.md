---json
{
  "title": "Markdownで記事を書けるブログをNext.jsで作った話",
  "date": "2019-04-07",
  "description": "2020年10月17日追記：最近Next.jsが人気になってきているからかアクセスが多いのですが、この記事の内容は(Webフロントエンドの流れの早さでいえば)かなり古いです。 Zeit Nowは今はVercelですし、Next.jsにはSSGの機能などが追加されていますので、参考にならない部分もあることをご了承ください(書き直す予定はありません)。",
  "updated": "2021-04-22",
  "plugins": [
    "katex"
  ]
}
---

2020年10月17日追記：最近Next.jsが人気になってきているからかアクセスが多いのですが、この記事の内容は(Webフロントエンドの流れの早さでいえば)かなり古いです。
Zeit Nowは今はVercelですし、Next.jsにはSSGの機能などが追加されていますので、参考にならない部分もあることをご了承ください(書き直す予定はありません)。

こんにちは。ほないです。

はてなブログに1つだけ記事を投稿していましたが、
以前から自前のブログを作ってみたいと思っていました。
春休み最後の日に何とか形になったので、初投稿がてらまとめておきます。

## 仕様
Next.jsを利用しました。通常のページ遷移はSPAですが、静的Export的なことをやっているので
ブラウザのJavaScriptがオフでもレンダリングできます(検索エンジンもクロールできます)。

デプロイは[Now](https://zeit.co/now)というサービスを使っています。
Zeitという会社のサービスですが、Next.jsをメンテナンスしている会社で、Nextとの親和性が高いです(後述)。

記事はMarkdownファイルで書きます(パーサーはmarkdown-it)。ビルド時にスクリプトを走らせ記事一覧を作成してます。

katexを利用した数式のレンダリングに対応しており、記事内でtex形式で数式を書くことができます。

## Next.jsについて
[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org/)

Reactだけだと、ルーティングやSSR/静的化などを本格的にやろうとすると結構大変になってきますが、
Nextはそういう部分を使いやすくしてくれるライブラリです。

### ルーティングが便利
例えばReactでだけで、 `/` と `/about` という2つのページを作って切り替えたいと思うと、
`Index`コンポーネントと`About`コンポーネントを作って
```
<BrouserRouter>
  <Route path='/' component={Index}>
  <Route path='/about' component={About}>
</BrouserRouter>
```
みたいなことをやるんですね。

これがNextだと、`pages` というフォルダの中に `index.js` と `about.js` を作って、
それぞれコンポーネントをexportするだけです。共通のヘッダーとかを設定するのも簡単です。

### SSR対応/静的化が簡単
Reactなどで普通にアプリを作ると、リロードしても正しいページが表示されるようにするのに苦労しますよね。
そのあたりの処理もNext.jsはいい感じにしてくれます。
これはNext.jsそのものではなくサーバー環境などにもよりますが、
例えばクエリなしのルーティングなら何もしなくてもリロードに対応します。
また後述のNowを使えば動的なルーティングもNodeサーバーの設定なしで行えます。

静的サイトとしてエクスポートする機能も標準でついていて、
Github PagesのようなStatic Hostingで公開するのも簡単です。

## ZEIT Now について
[![Now CLI](https://assets.zeit.co/image/upload/front/oss/now-cli.png)](https://zeit.co/now)

サーバーやクラウドの面倒なところを一切考えなくていい、
初心者にとっては非常にありがたいSaaSです
（といっても今回の私のブログは静的なので、Github Pagesでもホストできないことはないです）。
詳しくは[チュートリアル](https://nextjs.org/learn/basics/deploying-a-nextjs-app)を見ていただきたいですが、
設定を数行書いて `now` の3文字でデプロイできます。

しかもデプロイごとに `プロジェクト名.ランダム.now.sh` という形式で個別のURLが発行され、最新のものに `プロジェクト名.ユーザー名.now.sh` というエイリアスが自動で貼られます。
つまり、開発/ステージング/本番環境の使い分けやロールバックがとてもやりやすいのです。

またNextとの親和性が非常に高く、Nodeサーバーとしての設定を1行も書かずにSSR付きでNextアプリをデプロイすることができます。
またSSRのための正規表現を使った[ルーティング](https://zeit.co/guides/custom-next-js-server-to-routes/)もできます。

逆に言えばNode.jsのサーバー側の知識をほぼ得ないままデプロイしてしまったので、勉強しなければと思ってはいます。

## Markdown-it と katex について
実際にmarkdownのファイルをレンダリングする流れを説明します。
関連するディレクトリ構造は
```
- /pages
    - post.js
- /posts
    - hello-world.md
```
こんな感じです。`posts` フォルダの中にmarkdown記事を入れていき、post.jsでレンダリングします。

記事のページの実際のURLは `/post?path=hello-world.md` という形式で、
クエリ文字列から.mdファイルのパスを受け取って、動的にrequireしています。
```
const path = router.query.path    // hello-world.md
const { default: rawMarkdown } = require(`/posts/${path}`)
```
markdonwファイルを直接import/requireするにはraw-loaderを使います。
Nextでは `next.config.js` にWebpackの設定を記述します。

Markdown-itとkatexの連携はとても簡単で、markdown-it-katexをインストールして、
```
import markdonwIt from 'markdown-it'
import mk from 'markdown-it-katex'

const md = new markdownIt()
md.use(mk)
```
基本的にはこれだけです。あとはkatex用のcssを読み込んでおくだけ。

$$
\begin{aligned}
\nabla \cdot \bm{B} &= 0 \\
\nabla \times \bm{E} &= - \frac{\partial B}{\partial t} \\
\nabla \cdot \bm{D} &= \rho \\
\nabla \times \bm{H} &= J + \frac{\partial D}{\partial t}
\end{aligned}
$$

## まとめ
Markdownを変換して記事にするブログなら、静的サイトジェネレータ([Hugo](https://gohugo.io)など)
を使うとかなり簡単にできるし、テーマも豊富です。
でも今回はNext.jsの勉強も兼ねてやりたかったのです。その代わり時間がかかってしまいました。

また、Twitterのツイート埋め込みのようなasyncでscriptを読み込んで表示するプラグインが動かないなど、
Markdown（静的）をSPAで扱うことによる弊害もあります。
このあたりの技術的検討をする上で得られた知見もまだまだありますが、それはまた別の記事で書きたいと思います。

またせっかく数式に対応したので、大学の勉強のまとめなんかも書いてみたいですね。書かない気はしますけど。

## 参考サイト
[Next.jsで自分用のブログを作った話](http://ganow.me/article/blog-system-configuration)

↑ この記事に触発されたのがブログを作ったきっかけです。naganoさんありがとうございます🙏

