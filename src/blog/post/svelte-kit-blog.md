---
title: SvelteKitでブログを作ってみた
description: プレビュー段階のSvelteKitというフレームワークでブログを作ってみました。この記事では、SvelteKitを静的サイトジェネレータとして使うためのアイデアの紹介や、SvelteKitと他のフレームワークとの比較を行っています。
date: 2021-08-10
large_card: true
thumbnail_url: https://res.cloudinary.com/honai/image/upload/v1633575294/blog/og-svelte-kit-blog.png
thumb_cld: blog/og-svelte-kit-blog.png
---

気になるサイトジェネレータやフレームワークがあるとブログで試してみることが多く、この個人ブログも実は今までいろいろな構成を試してきました。構成だけ変わって肝心の記事は増えないのもよくないので今回は移行した記録を記事として残しておきます。

今回はSvelteKitというフレームワークを採用し、記事はローカルのマークダウンファイルで管理する方法にしました。まずはSvelteについて紹介し、SvelteKitでどのようにマークダウンファイルから記事を生成しているか解説したいと思います。

なおこのブログは公開レポジトリに置いているので、実際のコードもぜひ見てみてください。今後構成が変わるかもしれないので、移行後につけたタグへのリンクになっています。

[honai/honai.me at svelte-kit](https://github.com/honai/honai.me/tree/svelte-kit)

## Svelteとは
SvelteはReactやVueのようなWebフロントエンドUIのためのライブラリの一種です。しかし、Svelteの特徴は、ビルド時に最小限のヘルパーとコンポーネントに応じたDOM操作をJavaScriptに書き出すことでリアクティブなUIを構築する、という点です。ReactやVueは実行時に仮想DOMを使って差分を計算し、DOMを構築するため、Runtimeでライブラリへの依存があります。一方Svelteは実行時には既にDOMを直接変更する純粋なJavaScriptコードになっているため、依存がありません。この点でSvelteは「コンパイラである」と言われることもあるようです（参考: [Svelteとは](https://zenn.dev/toshitoma/articles/what-is-svelte) ）。

Svelte自体の詳しい解説は他記事に譲りたいと思います。特に、公式の [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead) というブログ記事は、仮想DOMとは何か、そしてSvelteはなぜ仮想DOMを使わなかったのか、仮想DOMを使わずどのようにリアクティブなUIを構築しているのかがコンパクトにまとめられています。もちろん、「仮想DOMがオーバーヘッドである」のかどうかは議論があると思いますが、Svelteの思想はこの記事にまとまっているように思います。

## SvelteKit
[SvelteKit • The fastest way to build Svelte apps](https://kit.svelte.dev/)

SvelteKitは、Svelteを利用したWebアプリ構築のためのフレームワークです。**まだプレビュー段階**にあり、 [Sapper](https://sapper.svelte.dev/) というフレームワークの後継になっています。ReactとNext.js、VueとNuxtのような関係です。ディレクトリ構造によるルーティング、prefetch、サーバーサイドレンダリング、APIエンドポイント、Service Workers、AMP対応、プリレンダリングによる静的生成などの機能を備えています。

## ブログの構成
今回の目標は、SvelteKitをHugo / Gatsbyのような静的サイトジェネレータとして使えるか検証することです。
- レポジトリ内のマークダウンファイルで記事を管理できる
- 記事はビルド時に静的生成する
- SPA遷移（サイト内でページを移動するときに、ページ全てを再読み込みせずDOMのみを更新する）ができる

この3点を必須の要件としました。

### Endpointsをプリレンダリング前提で作る
SvelteKitには、 `routes` フォルダ内にSvelteコンポーネントファイルを配置することでページを作れるほかに、JavaScript / TypeScriptファイルを配置することでサーバーサイドのfunctionを定義できます。SvelteKitではこの機能をEndpointsと呼んでいます。Next.jsでいうAPI Routesと似た機能です。

通常のデプロイではEndpointsはランタイムで実行されますが、プリレンダリングを行う場合はビルド時に実行されます。プリレンダリングすることを前提に、Endpointsを柔軟なビルドスクリプトとして利用できるということです。

レポジトリ内のマークダウンファイルを読み込んで記事一覧や各記事をJSONとして返すEndpointsを作成し、そのEndpointsをSvelteコンポーネントから使用して記事一覧や記事をレンダリングします。

### 記事の管理
レポジトリの `contents/blog`  というフォルダ内にマークダウンの記事ファイルが置いてあり、各マークダウンファイルのFront matterに記事のメタ情報（タイトルとリンク）が書かれているとしましょう。

```
contents/blog
├── first-post.md
└── second-post.md
```

`first-post.md` の中身はこのようになっているとします↓

```
---
title: 最初の記事
---

# First Post!
こんにちは
```

`/blog/first-post` にアクセスしたときに `first-post.md` の記事が表示されるようにします。

### 記事ページ
さっそく、簡略したサンプルコードを見ていきましょう。まずは個別の記事を表示するページです。

#### 記事をJSONとして返すEndpoints
まず、パスから対応する記事を探し、記事をJSONとして返すEndpointsを作成します。ファイルは `routes/blog/[path].json.js` になります。

```js
// src/routes/blog/[path].json.js

export async function get({ params }) {
  const { path } = params
  const markdownFileName = fs.readDirSync("contens/blog").find(fileName => fileName.endsWith(`{path}.md`))
  
  if (!markdownFileName) {
    // ファイルが見つからなかったら404にする処理(省略)
    return
  }

  const markdown = fs.readFileSync(markdownFileName)
  const post = {
    meta: frontMatter(markdown),
	body: markdownToHtml(markdown)
  }

  return {
    body: post,
  }
}
```

これで、 `/blog/first-post.json` にアクセスすると

```json
{
  "meta": { "title": "最初の記事" },
  "body": "<div><h1>First Post!</h1>...(略)"
}
```

このようなJSONが返ってきます。

#### 記事を表示するSvelteコンポーネント
次に `routes/blog/[path].svelte` というファイルを作成し、記事を表示するページを作ります。先ほど作成したEndpointsをscript内で使用します。

```html
<!-- routes/blog/[path].svelte -->
<script context="module">
  export async function load({ page, fetch }) {
    const url = `/blog/${page.params.path}.json`
    const res = await fetch(url)
    if (!res.ok) {
      return
    }
    const post = await res.json()
    return {
      props: { post },
    }
  }
</script>

<script>
  export let post
</script>


<div>
  <h1>{post.title}</h1>
  <div>{@html post.body}</div>
</div>
```

これで記事ページができました。Endpoints内で直接 `fs.readFileSync` してしまうのが今回の構成の特徴です。

### 記事一覧
次に記事一覧ページ（パスは `/blog` ）です。

#### 記事のリストをJSONとして返すEndpoints
まず、フォルダ内のマークダウンファイルを取得し、記事のメタ情報のリストを返すEndpointsを作成します。

```js
// routes/blog.json.js

function retrieveMetaFromMarkdown(fileName) {
  const path = fileName.split(".")[0]  // 拡張子.mdを取り除く
  return {
    path: path,
	meta: frontMatter(fs.readFileSync(fileName))
  }
}

export async function get() {
  const posts = fs.readDirSync("contens/blog").map(retrieveMetaFromMarkdown)

  return {
    body: { posts },
  }
}
```

これで、 `/blog.json` にアクセスすると、front matterとファイル名から作成された記事一覧がJSON形式で表示されます。

#### 記事一覧を表示するSvelteコンポーネント
記事ページと同じように、先ほどのEndpointsを利用して記事一覧を表示するページをSvelteで作成します。

```html
<!-- routes/blog.svelte -->
<script context="module">
  export async function load({ fetch }) {
    const url = "/blog.json"
    const res = await fetch(url)
    if (!res.ok) {
      return
    }
    const { posts } = await res.json()
    return {
      props: { posts },
    }
  }
</script>

<script>
  export let posts = []
</script>


<div>
  <ul>
    {#each posts as post (post.slug)}
      <li><a href="/blog/{post.link}">{post.title}</a></li>
    {/each}
  </ul>
</div>
```

こちらも、Endpoints内で `fs.readDirSync` を使っているのがポイントです。

### プリレンダリングを利用して静的生成
記事執筆時点ではSvelteKitはデフォルトでほとんどのページ（ `[path].svelte` のようなDynamic routeを使用していないページと、それらのページからたどることのできる動的なページ）をプリレンダリングします。このため、前述したコードで全ての記事と記事一覧がHTMLファイルに書き出されます。

## まとめ
### 良かったこと
#### SvelteKitをGatsbyやHugoのようなSSGとして利用できた
今回はSvelteKitがどういうものか、どんな使い心地なのかの検証も兼ねてブログをSvelteKitで作ってみました。また、プリレンダリングを利用してSSGとして利用できることもわかりました。

もちろんHugoやGatsbyのような、ブログがメインのターゲットであるライブラリよりは、設定やコード記述が多く必要になります。

#### SPA遷移ができる
今回のような、マークダウンファイルから静的サイトを生成できるSSGはHugoやJekyll、Eleventyなどがあります。

しかし、今回の目標の1つに、サイト内でのページ遷移をSPA遷移にしたいというものがありました。GatsbyやNext.jsはルーターが組み込まれていてSPAベースなのでこれが可能ですが、HugoやJekyllではできません。SvelteKitもSvelte用のルーターが組み込まれているので、SPA遷移ができます。

余談：SPA遷移が必要かどうかはサイトの規模や目的、作成者の好みによります。ルーター用のJavaScriptのダウンロードや実行にリソースが割かれたり、バグの原因になったりするので、一概に導入すれば体験が良くなるとは言えません。今回は筆者が個人的にこだわりたかったということです。

#### SSR / SPA遷移 / Hydration / プリレンダリングを制御できる
GatsbyやNext.jsにない特徴として、SSR、SPA遷移（ルーター）、Hydration、プリレンダリングのそれぞれについて、するかしないかをサイト全体とページごとに細かく設定できます。

極端な例ですが、SPA遷移とHydrationをサイト全体で無効にすると、SvelteKitはクライアント用のJavaScriptを全く生成しません。また、これらの設定がアプリ自体のコードをほぼ変更せずにできるため、「とりあえずSSR前提で作ってみて、後から必要な部分だけプリレンダリングする」のような使い方もでき便利だと思います（Next.jsだとgetServersidePropsとgetStaticPropsを書き換える必要が出てきます）。

### 課題
#### 記事一覧のページングができていない
記事が増えてくると記事一覧ページを数十記事ごとにページングする必要が出てくると思います。GatsbyやHugoにはそのような機能がありますが、SvelteKitでSSGした場合には簡単にはできないようです。完全な静的生成を行わず、記事一覧でスクロールしたときにEndpointsを利用して追加で記事を読み込むような構成にすれば、この問題は解決できると思います。~~どちらにせよ、まだこのブログの記事が多くないので当面は問題なさそうです。~~

### おわりに
今回はSvelteKitを静的サイトジェネレータとして使い、ブログを作ってみました。プレビュー段階であるSvelteKitを触ってみるいい機会になりましたし、SvelteKitをSSGとして使うアイデアをこうして残すことができ良かったと思います。コメントがあれば [Twitter](https://twitter.com/\_honai) やGitHubのIssueなどにぜひお願いします。