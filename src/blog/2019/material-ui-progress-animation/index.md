---json
{
  "title": "サイトの読み込みが終わらないのでアニメーションを調べてみた",
  "date": "2019-12-01T15:00:02.681Z",
  "description": "この記事は CAMPHOR- Advent Calendar 2019 2日目 の記事です。  こんにちは、ほないです。Advent Calender の記事を書くのは、CAMPHOR- 以外のものも含めて初めてなので、わくわくしています。 1日目のあたらんさんの記事、おもしろかったです。私も質問箱をつくりたくなりました。",
  "updated": "2020-12-13T15:24:06.183Z",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/6bEGPf10zzbUANTdYkev2D/edd6f13dc0e250224a68674fbf2ecbd4/ogp.png",
  "large_card": true
}
---

#### この記事は [CAMPHOR- Advent Calendar 2019](http://advent.camph.net/) **2日目** の記事です。

こんにちは、ほないです。Advent Calender の記事を書くのは、CAMPHOR- 以外のものも含めて初めてなので、わくわくしています。
1日目のあたらんさんの記事、おもしろかったです。私も質問箱をつくりたくなりました。

今回はフロントエンドのアニメーションの話です。CSSやSVGのアニメーション、マイクロインタラクション、UIデザインに興味がある人におすすめの内容です。最後まで読んでいただけるとうれしいです。

## ローディングでくるくる回るアレ

<div class="component-box">
  <div class="circular-progress secondary indeterminate">
    <svg viewBox="22 22 44 44">
      <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
    </svg>
  </div>
</div>

「あれ？ローディングが終わらない…」

スマホアプリやWebアプリで使われるインジケーター、みなさんも見たことがあると思います。データを取得しているときに表示して、ユーザーに「今がんばってるのでちょっと待ってね」ということを伝えるためのものですね。

ある日、あるサイトでこのインジケーターが表示されたまま進まなくなったとき、ふと「このくるくるってどんなを動きしているんだろう」と思ったのです。
じっと見つめてもよくわかりませんよね…。そこで、React向けのマテリアルデザインのUIフレームワークである [**Material-UI**](https://material-ui.com/) 注1 のソースコードを読んで、アニメーションを調べてみることにしました。

<small>注1 本家 [Material Design](https://material.io/) のソースを見ても良かったのですが、 Web版に丸いインジケーターがありませんでした。</small>

### 円を描いたり消したりしながら回転している

このインジケーターは、`div` の中にSVGで描かれた円 ( `circle` 要素) でできています。
```html
<!-- HTML -->
<div class="circular-progress">
  <svg>
    <circle cx="44" cy="44" r="20.2"stroke-width="3.6" />
  </svg>
</div>
```
この `div` と `circle` に別々のアニメーションが設定されています。

  <div class="component-box">
  <div class="circular-progress primary indeterminate" style="background-color: #ddd; animation: none;">
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
      </svg>
    </div>
    <span>+</span>
    <div class="circular-progress primary indeterminate" style="background-color: #ddd;">
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" style="animation: none;"></circle>
      </svg>
    </div>
    <span>=</span>
    <div class="circular-progress primary indeterminate" style="background-color: #ddd;">
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
      </svg>
    </div>
  </div>

わかりやすさのために `div` をグレーにしています。真ん中が `div` にのみアニメーションをかけたものです。このアニメーションは、シンプルに1.4秒で等速で1回転するものです。

```css
/* CSS */
div {
  animation: circular-rotate 1.4s linear infinite
}
@keyframes circular-rotate {
  100% { transform: rotate(360deg); }
}
```

左側が `circle` にのみアニメーションをかけたものです。まだ少しわかりにくいので、さらに分解して、遅くしてみましょう。

  <div class="component-box">
    <div class="circular-progress primary indeterminate" style="background-color: #ddd; animation: none;">
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"
          style="animation: circular-dash-1 2s ease-in infinite"></circle>
      </svg>
    </div>
    <span>→</span>
    <div class="circular-progress primary indeterminate" style="background-color: #ddd; animation: none;">
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"
          style="animation: circular-dash-2 2s ease-out infinite"></circle>
      </svg>
    </div>
    <span>=</span>
    <div class="circular-progress primary indeterminate" style="background-color: #ddd; animation: none;">
      <svg viewBox="22 22 44 44">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"
          style="animation: circular-dash 4s ease-in-out infinite"></circle>
      </svg>
    </div>
  </div>

`circle` 要素のアニメーションは2段階あり、1つ目で時計回りに円を描いて、2つ目でその円を時計回りに消していくようになっています。
```css
/* CSS */
circle {
  animation: circular-dash 1.4s ease-in-out infinite;
}
@keyframes circular-dash {
  0% {
    stroke-dasharray: 1px 200px;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100px 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px 200px;
    stroke-dashoffset: -125px;
  }
}
```
`stroke-dasharray` と `stroke-dashoffset` は、本来は輪郭を破線にしてその間隔や位置を調節するプロパティですが、ここでは円を途中まで描くために使われています。

参考: [stroke-dasharray - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) , [stroke-dashoffset - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset)

速度の変化は ease-in-out なので、最初は遅くてだんだん速くなって最後は遅くなる、という動きになります(図は Firefox の開発者ツールから引用)。

![ease-in-out](//images.ctfassets.net/7q1ibtbymdj9/6lnGf0xZGpgtPAWD1Qv4vu/4cc67763396a9b942d41509c50ebc960/ease-in-out.png)

以上が丸いプログレスインジケーターのアニメーションにです。シンプルで気持ち良い動きですが、これを頭の中で思いついてコードにおこすのは難しそうです。

## プログレスバーのアニメーション

  <div class="component-box">
    <div class="linear-progress indeterminate secondary">
      <div class="bar bar1"></div>
      <div class="bar bar2"></div>
    </div>
  </div>

Material Design では、進捗を表す要素として、丸いインジケーターのほかに四角いバー型のインジケーターも提供されています。いわゆるプログレスバーです。

[Material Design のドキュメント](https://material.io/components/progress-indicators/) では、現在の進捗の割合に合わせてバーを進めていく **determinate** という状態の他に、進捗が数字ではわからないときのための **indeterminate** という状態も定義されています。上に置いたバーは indeterminate なものです。

<small>※ 話が前後しますが、先述の丸いインジケーターも、 indeterminate のアニメーションです。</small>

このバーのアニメーションも読み解いていきましょう。

### 長さを変えながら右へ動くバー

プログレスバーのDOMの構成は次のようになっています。

```html
<!-- HTML -->
<div class="linear-progress">
  <div class="bar bar1"></div>
  <div class="bar bar2"></div>
</div>
```

親の `div` が薄い色の四角形、子の `div` がそれぞれ `position: absolute;` で動いています。

動きをよく見ると、濃い色の四角形が2つ動いているのがわかると思います。別々にして遅くするとこんな感じになります。

  <div class="component-box column">
    <div class="linear-progress indeterminate secondary">
      <div class="bar bar1" style="animation-duration: 5s;"></div>
    </div>
    <div class="linear-progress indeterminate secondary">
      <div class="bar bar2" style="animation-duration: 5s; animation-delay: 2.5s;"></div>
    </div>
  </div>

```css
/* CSS */
.linear-progress > .bar1 {
  animation: linear-progress-bar1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
.linear-progress > .bar2 {
  animation: linear-progress-bar2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: 1.15s;
}
@keyframes linear-progress-bar1 {
    0% { left: -35%; right: 100%; }
   60% { left: 100%; right: -90%; }
  100% { left: 100%; right: -90%; }
}
@keyframes linear-progress-bar2 {
    0% { left: -200%; right: 100%; }
   60% { left:  107%; right:  -8%; }
  100% { left:  107%; right:  -8%; }
}
```

1つ目のバーは6割までの時間で左から右へ動きます。左端より右端のほうが速く動きます。また `cubic-bezier` で最初と最後は速く、中盤はゆっくりになります。

2つ目のバーは `animation-delay` で半分の時間だけ遅らせて開始します。左端が右端に追いつくような動きになっており、 `cubic-bezier` で前半は急速、後半はゆっくりになっていますね。

`cubic-bezier(...)` の指定によるバーの速度変化はこんな感じです(右が1つ目、左が2つ目のバー)。

![cubic-bezier](//images.ctfassets.net/7q1ibtbymdj9/3xUNguGEVBpX3eLcRi4T4b/a220d73d4756c360f85e1fb64f4429d3/cubic-bezier.png)

以上がプログレスバーのアニメーションの解説になります。

## まとめ

見慣れたアイコンのアニメーションも、詳しく見てみると細部までこだわってデザインされていることがわかります。イージングを1つ変えただけでもかなり印象が変わります(みなさんも開発者ツールでぜひ試してみてください！)。

端末の描画能力が向上し、UIそのものの静的な見た目のデザインだけでなく、それに動きをつけるデザインも重要になってきています。そういった**デザインの手間を省きつつ整ったUIを使えるフレームワーク**は便利だなと改めて感じました。
また機会があれば、ダイアログやメニューの開閉のアニメーションについても調べてみたいです。

CAMPHOR- Advent Calender 3日目の担当は [marty1martie](https://skstmsk-portfolio.firebaseapp.com/) さんです。

  <style>
    .component-box {
      --primary: #1976d2;
      --secondary: #dc004e;
      --primary-trans: rgb(167, 202, 237);
      --secondary-trans: rgb(241, 158, 187);
      display: flex;
      justify-content: space-around;
      padding: 10px;
      align-items: center;
    }

    .component-box.column {
      flex-flow: column nowrap;
    }

    .circular-progress {
      width: 40px;
      height: 40px;
      display: 'inline-block';
    }

    .circular-progress.indeterminate {
      animation: circular-rotate 1.4s linear infinite
    }

    .circular-progress svg {
      display: block;
    }

    .circular-progress.primary circle {
      stroke: var(--primary);
    }
    .circular-progress.secondary circle {
      stroke: var(--secondary);
    }

    .circular-progress.indeterminate circle {
      animation: circular-dash 1.4s ease-in-out infinite;
      stroke-dasharray: 80px 200px;
      stroke-dashoffset: 0px;
    }

    @keyframes circular-rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes circular-dash {
      0% {
        stroke-dasharray: 1px 200px;
        stroke-dashoffset: 0px;
      }

      50% {
        stroke-dasharray: 100px 200px;
        stroke-dashoffset: -15px;
      }

      100% {
        stroke-dasharray: 100px 200px;
        stroke-dashoffset: -125px;
      }
    }

    @keyframes circular-dash-1 {
      0% {
        stroke-dasharray: 1px 200px;
        stroke-dashoffset: 0px;
      }

      100% {
        stroke-dasharray: 100px 200px;
        stroke-dashoffset: -15px;
      }
    }

    @keyframes circular-dash-2 {
      0% {
        stroke-dasharray: 100px 200px;
        stroke-dashoffset: -15px;
      }

      100% {
        stroke-dasharray: 100px 200px;
        stroke-dashoffset: -125px;
      }
    }

    .linear-progress {
      height: 4px;
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
      position: relative;
    }

    .linear-progress.primary {
      background-color: var(--primary-trans);
    }

    .linear-progress.secondary {
      background-color: var(--secondary-trans);
    }

    .linear-progress > .bar {
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      position: absolute;
      transition: transform 0.2s linear;
      transform-origin: left;
    }

    .linear-progress.primary > .bar {
      background-color: var(--primary);
    }

    .linear-progress.secondary > .bar {
      background-color: var(--secondary);
    }

    .linear-progress > .bar.bar1 {
      width: auto;
      animation: MuiLinearProgress-keyframes-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .linear-progress > .bar.bar2 {
      width: auto;
      animation: MuiLinearProgress-keyframes-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }

    @keyframes MuiLinearProgress-keyframes-indeterminate1 {
      0% {
        left: -35%;
        right: 100%;
      }

      60% {
        left: 100%;
        right: -90%;
      }

      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes MuiLinearProgress-keyframes-indeterminate2 {
      0% {
        left: -200%;
        right: 100%;
      }

      60% {
        left: 107%;
        right: -8%;
      }

      100% {
        left: 107%;
        right: -8%;
      }
    }

    @keyframes linear-1-1 {

    }
  </style>

