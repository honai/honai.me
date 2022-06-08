---
title: 自分用スライド共有サービスをつくった
description: 要約
date: 2022-06-01
# thumbnail_url: https://res.cloudinary.com/honai/image/upload/sample.png  # optional
# thumbnail_cld: sample.png  # cloudinary, optional
---
## はじめに

SlideShareが2021年9月にScribd傘下となり、スライドをPDFとしてダウンロードする機能が有料となったことがアナウンスされています。

[https://blog.scribd.com/bringing-slideshare-scribd-communities-together/](https://blog.scribd.com/bringing-slideshare-scribd-communities-together/)

さらに先日、スライドの閲覧にも上限が設けられたことが話題となりました。下図のように、有料サブスクリプションを案内するバナーやポップアップが表示されます（2022年5月現在）。

![SlideShareのスクリーンショット。サブスクリプションを案内するバナーやポップアップが表示されている](https://res.cloudinary.com/honai/image/upload/c_limit,f_auto,w_720/v1654081612/blog/slideshare-subscription-popup.png)

[https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779](https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779)

筆者は、これまでの登壇資料はSlideShareではなくSpeaker Deckに投稿しており、こちらは今のところ無料機能の縮小はなさそうです。しかし、これを機に、PDFスライドを自サイト内で公開できるようにしたいなと思い、機能の検討と実装を行いました。

### できたもの

<iframe loading="lazy" src="https://www.honai.me/slides/embed/jsx-as-ssg-template/" title="JSXでJSなしの静的サイトをつくる" width="100%" style="aspect-ratio:1.778" frameborder="0" allowfullscreen></iframe>

このように横スクロールでスライドを閲覧でき、**スライド上のハイパーリンクをクリックできる**（スライド2枚目参照）ようになっています。埋め込みではない [スライド単体のページ](https://www.honai.me/slides/jsx-as-ssg-template/) もあります。

本記事では、筆者が作成したPDFを自サイト内で公開する仕組みとスライドビューアーについて解説します。

## なぜスライドビューアーが必要なのか

SlideShareやSpeaker Deckなどのサービスでは、資料のPDFファイルをアップロードすることで、スライドショーのようなUIで資料を表示するWebページが生成されます。

しかし、そもそもPDFファイルは多くのブラウザで直接閲覧することができます。では、なぜPDFそのものではなく、HTMLや画像からなるページが必要なのでしょうか。

### SEO

Googleなどの検索エンジンはPDFファイルも内容を解析してインデックスすることができます。みなさんも、大学の講義資料や公的機関の資料などPDFファイルに、検索エンジンで直接たどり着いて閲覧したことがあるのではないでしょうか。キーワードによっては、PDFファイルが検索上位に表示されることもよくあります。10年前の記事ですが、Googleからも以下のような記事が出ています。

[検索結果における PDF ファイルの取り扱いについてのヒント | Google 検索セントラル ブログ | Google Developers](https://developers.google.com/search/blog/2011/09/pdfs-in-google-search-results?hl=ja)

しかし、この記事からも読み取れるように、通常のHTMLによるWebサイトに比べてSEOの観点で以下のような欠点があります。

#### 画像がインデックス登録されない

先ほどの記事によると

> 現時点では、PDF ファイル内の画像はインデックスには登録されません。画像をインデックス登録するには、その画像用の HTML ページを作成する必要があります。

とあります。テキストで検索はできますが、スライドが画像検索に表示されたほうが、資料を探しやすくなるでしょう。

#### PDFファイルによってはテキストが画像化されている

スライドを作成した後、PDFとして出力するときに、使用するアプリケーションや設定によっては、テキスト情報が失われてしまう場合もあります。先ほどの記事では

> テキストが画像として埋め込まれている場合は、Google ではその画像を OCR （英語）アルゴリズムで処理し、テキストを抽出することができます。
> 

とありますが、OCRの認識精度は100%ではないでしょう。スライドのタイトル、説明、中身をテキストとして提供できるほうが望ましいです。例えば、Speaker Deckでは、PDFをアップロードするときに、タイトルと説明を入力することができます。

### ネットワークの転送量

ページ数が多かったり、埋め込まれている画像のサイズが大きかったりすると、当然PDFのファイルサイズは大きくなります。ブラウザでPDFを直接表示するときにはPDFファイル全体がダウンロードされるため、ファイルサイズが大きいと転送量が大きくなり、表示に時間がかかります。

HTMLと画像によるスライドビューアーなら、 [画像の遅延読み込み](https://web.dev/i18n/ja/lazy-loading/) などを使用することで、最初にスライドが表示されるまでの転送量を減らすことができます。

### ユーザーインターフェース（UI）

SlideShareやSpeaker Deckなどのスライド共有サービスでは、スライドビューアーのページ内に同じユーザーの他のスライドや関連するスライドなどが表示されます。このように、スライドそのものだけでなく、サイト内のナビゲーションや共有・埋め込み機能などのUIを提供するのは、PDFファイル単体では不可能です。

### セクションのまとめ

スライドをWebにPDF形式で公開すると、HTML等によるWebページ形式で公開する場合と比べて、SEO、ネットワーク転送量、UIなどにおいて欠点があります。

## 作成したスライドビューアーの要件

今回筆者がこのサイトにスライドビューアー（PDFを変換等する仕組みも含みます）を実装するにあたって、以下のような要件を考えました。なお、スライド共有サービスを引き合いに出したので断っておきますが、複数ユーザーが使えるようなサービスとしての機能はありません。筆者が自身のスライドを自身のサイト内で公開するための仕組みです。もちろん、Web開発者の方であれば紹介するコードやレポジトリ等を参考にご自身のWebサイトに同じような機能を組み込めると思いますので、参考にしていただければうれしいです！

### 画像化されたスライドを、カルーセルとして表示できる

最も基本的な機能です。PDF形式のスライドの各ページを画像に変換し、カルーセルのUIとして表示します。

### スライド上のリンクをクリックできる

Speaker DeckやSlideShareではスライドが画像化されるため、PDF上にあったURLリンクに直接ジャンプすることはできません（抽出されたテキストがページ下部に表示されているので、その部分からURLをコピーすることはできます）。しかし、ブラウザ内蔵PDFビューアーのようにPDFを解析すればリンクを表示できるはずです。何らかの方法でリンクを抽出して、スライド画像上に表示できるようにします。

### 別のページにスライドを埋め込める

筆者はこれまで、Speaker Deckにアップロードしたスライドを自身のサイト内に埋め込んで利用していました。これと同様に、スライド単体のページだけでなく、別ページに埋め込む機能も実装します。

### PDFをアップロードするだけでビューアーページが公開される

最後に自動化についての要件です。PDFを何らかの方法でアップロードすれば、あとは自動でそのスライドのWebページが公開されるようにします。

## 実装の解説（PDF解析・変換編）

まずはPDFを画像化したり、リンクやテキストを抽出する工程です。

### 画像化: Poppler

PDFの画像化は、Popplerというコマンドラインツールを使用しています。Popplerは、PDFを表示したり内容を解析・変更するためのソフトウェアで、GPLライセンスのOSSです。

[Poppler: https://poppler.freedesktop.org/](https://poppler.freedesktop.org/)

PDFをPPM/PNG/JPEG等の画像形式に変換できる `pdftoppm` というコマンドを使用します。下記のように使用することができます。このコマンドには他にも数多くのオプションがあり、 `pdftoppm --help` で確認できます。

```bash
# Debian系なら以下でインストールできます
$ apt install poppler-utils

$ ls
example.pdf

$ pdftoppm -png example.pdf out

$ ls
exapmle.pdf out-01.png out-02.png out-03.png (略) out-10.png
```

### リンクとテキストの抽出

PDF内のリンクの情報やテキストを構造化されたデータとして読み取れるライブラリなどをさがしていると、Rubyのpdf-readerというライブラリを見つけました。

[https://github.com/yob/pdf-reader](https://github.com/yob/pdf-reader)

About欄によると、Adobe社によるPDFの仕様を可能な限り反映したPDFパーサーとのことです。レポジトリ内に詳しいリファレンスはないので、基本的にはPDFの仕様を参照せよということだと思います。PDFから抽出したい情報は主に

- 各ページのサイズ（幅、高さ）
- リンク（URLとページ内での位置）
- 各ページに含まれるテキスト

の3つかと思います。

Rubyのサンプルコードを解説していきます。まずはPDFを読み込みます。


まずはメタ情報やテキスト、ページサイズの抽出です。以下のように簡単に行えます。

```rb
# Ruby
require "pdf-reader"

pdf_file = "./example.pdf"
reader = PDF::Reader.new(pdf_file)

p reader.pdf_version
# => 1.7

p reader.info
# => {
#   :Title=>"タイトル",
#   :Author=>"著者",
#   :CreationDate=>"D:20220101000000+09'00'",
#   :ModDate=>"D:20220102000000+09'00'"
# }
 
p reader.page_count
# => 10

p reader.pages
# => [<PDF::Reader::Page page: 1>, (略), <PDF::Reader::Page page: 10>]

p reader.pages[0].text
# => "タイトル 著者 フッター"

p [reader.pages[0].width, reader.pages[1].height]  # ページの幅と高さ
# => [960, 540]
```

次はリンクの抽出です。 [AdobeによるPDF 1.7の仕様](https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf) によると、PDF内でURL (URI) にアクセスする機能は、”Interactive Features” の “URI Actions” （12.6.4.7, 423ページ） として定義されています。さらに、このActionをPDFのページ上の位置と紐付けるのが、同じく “Interactive Features” の “Link Annotations” （12.5.6.13 405ページ） です。[注: PDF仕様を網羅したわけではないので、これ以外の機能でリンクが挿入されているかもしれません。筆者がPowerPointで出力したPDFは以下のコードで抽出できることを確認しています]

あるページ上のリンクを抽出するコードは以下のようになります。（上のコードからの続きとして読んでください）

```ruby
page = reader.pages[1]
links =
  (page.attributes[:Annots] || [])  # [:Annots]は仕様上optionalなのでnilの場合もある
    .map do |ref_to_annotation|
      # page.attributesに含まれるのは実際のannotation objectへの参照であるため、
      # 参照先を見る
      reader.objects[ref_to_annotation]
    end
    .filter do |annotation|
      # URI Actionに対するLink Annotationだけを選択
      annotation[:Subtype] == :Link && annotation[:A][:S] == :URI
    end
    .map do |annotation|
      # Annotationの位置と、リンク先URLを抽出
      { rect: annotation[:Rect], url: annotation[:A][:URI] }
    end

p links
# => [
#   { rect: [123.86, 160.46, 232.22, 211.01], url: "https://example.com/" },
#   { rect: [123.86, 110.9, 245.54, 161.42], url: "https://example.jp/" },
# ]
```

`Rect` は4つの数からなる、Annotationの位置を示す値です［[PDF1.7仕様](https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf) 7.9.5 Rectangle（88ページ）参照］。下図で表されるx_1からy_2に対して、 `[x_1, y_1, x_2, y_2]` のように表されます。原点が左下になっていることに注意してください。

![Link Annotationの位置を表すRectangleの説明](https://res.cloudinary.com/honai/image/upload/f_auto/v1654081611/blog/pdf-rectangle.png)

このようにして、各ページのリンクの位置とリンク先を抽出することができます。後は、それらをJSON形式などで出力すれば良いでしょう。

### 自動化

3つ目の要件（PDFをアップロードするだけでビューアーページが公開される）を満たすため、画像化と情報の抽出をGitHub Actionsを使って自動化しました。GitHub上のレポジトリにPDFを追加してPushすると、GitHub ActionsのCI環境によって以下が行われます

1. PopplerによってPDFの各ページの画像を生成
2. PDFのタイトル・テキスト・リンクなどを抽出しJSONファイルを生成
3. 生成された画像とJSONをレポジトリにコミット & プッシュ※

※GitHub Actionsに慣れていてそれを使いたかったため、PDFファイルを置いておく場所としてGitHub上のGitレポジトリを使っています。さらに、毎回すべてのPDFの処理をするのではなく追加されたPDFだけ処理をするために、Gitレポジトリに生成された画像やJSONを含めるようにしています。Gitの使い方としてはあまり適当ではないかもしれません。単なるクラウドストレージのようなもののほうが向いているとは思います。CIツールと連携できるようなクラウドストレージがあれば同じような構成を実現できるでしょう。

生成した画像ファイルとJSONファイルをどのように利用するかは、スライドを公開するWebサイトの構成によります。

#### スライドとWebサイトを同じレポジトリで管理する

スライド公開専用のサイトを単体で作る場合はこちらがシンプルで良いと思います。PDFからメタデータと画像を生成し、それらをHugoやGatsbyなどの静的サイトジェネレータで利用してWebサイトを作成することができます。具体的なUIの作成は

#### スライドとWebサイトを別のレポジトリで管理する

筆者は今のところこの方法を使っています（ただし、スライドを実際に置いているレポジトリは非公開です。Webサイト側は [公開](https://github.com/honai/honai.me) しています）。

スライドを置くレポジトリでは、PDFから生成したJSON等をHTTPで公開するようにします（ [筆者の実際の例](https://slides.honai.me/mobile-network-explained.json) ）。Webサイト側では、このJSONを利用してスライドのWebページや一覧ページを生成すればよいでしょう。さらに、Webhookを利用して、スライドを置く側のレポジトリの変更時にWebサイト側のビルドを走らせるようにして、自動化を行っています。

## 実装の解説（UI編）

私はWebフロントエンドの分野が好きなので、今回特に楽しかったのはビューアーのUIを作る部分です。前章のPDFの解析・変換によって、PDFの各ページのメタデータと画像が得られました。これらをもとにカルーセルのインターフェースをHTML/CSS/JavaScriptで作っていきます。

### CSSスクロールスナップ

[CSS スクロールスナップ - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Scroll_Snap)

CSSスクロールスナップはCSSの機能の1つで、縦・横にスクロールする要素に対してスナップ点（スクロール終了の位置が吸い付く点）を導入することができます。この機能を用いると、CSSだけで、横にスクロールをすることでスライド画像に順にスナップされるようなカルーセルを実装することができます。
HTMLとCSSのベースは次のようになります。

```html
<!-- HTML -->
<div class="carousel">
  <div class="slide"><img src="slide-01.png" alt=""></div>
  <div class="slide"><img src="slide-02.png" alt=""></div>
  <div class="slide"><img src="slide-03.png" alt=""></div>
</div>
```

```css
/* CSS */
.carousel {
  width: 360px;
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
.carousel > .slide {
  flex: 0 0 320px;
  scroll-snap-align: center;
}
.slide > img {
  width: 100%;
  height: auto;
}
```

あとは幅や余白などを適宜調節していけば良いでしょう。

[デモ](https://github.honai.me/demos/pdf-slide-viewer/scroll-snap/)

<iframe loading="lazy" src="https://github.honai.me/demos/pdf-slide-viewer/scroll-snap/" width="100%" style="aspect-ratio:1;max-height:370px;"></iframe>

Can I use… によると、PC・モバイルともに主要ブラウザでサポートされています。

[CSS Scroll Snap | Can I use...](https://caniuse.com/css-snappoints)

### リンクをクリックできるようにする

今回の個人的な推しポイントである、スライド中のリンクをクリックできる機能を実装します。ページの幅、高さとLink Annotationの位置（Rectangle）をもとにリンクを描画します。

#### イメージマップ vs `position: absolute` （レスポンシブ対応のしやすさ）

「画像上の特定の位置にハイパーリンクを設置する」という機能は、 [`<map>` タグ](https://developer.mozilla.org/ja/docs/Web/HTML/Element/map) や [`<area>` タグ](https://developer.mozilla.org/ja/docs/Web/HTML/Element/area) を利用した**イメージマップ**で実現することができます。しかし、位置を絶対座標で指定することしかできないため、デバイスの幅に合わせて画像のサイズが変わる場合、座標を書き換える必要があります。PCやモバイルデバイスでの表示を考えると、スライドの画像サイズを固定するのは現実的ではありません。

せっかくカルーセルにCSSのみで実現できるスクロールスナップを採用したので、リンクの描画もJavaScriptを使わずにシンプルに実現したいと考えました。そこで、ナイーブですが、パーセントによって座標を相対指定できる `position: absolute` によって `<a>` タグを描画するのが良いと考え、こちらを採用しました。

先述したように、PDFから抽出したリンクの位置（Rectangle）は、長方形の各辺の位置を左下を原点とした座標で表したものなので、下図のように、RectangleからCSSのtop, left, bottom, rightのパーセント値に変換する必要があります。


![RectangleからCSSのposition値への変換](https://res.cloudinary.com/honai/image/upload/f_auto/v1654410145/blog/pdf-rect-to-css-position.png)

```js
// JavaScript
/**
 * @param {number} rect [左端のx, 下端のy, 右端のx, 上端のy] すべて左下が原点
 * @param {number} width PDFのページの幅
 * @param {number} height PDFのページの高さ
 */
function rectToCssPosition(rect, width, height) {
  const [left, bottom, right, top] = [
    rect[0] / width,
    rect[1] / height,
    (width - rect[2]) / width,
    (height - rect[3]) / height,
  ].map(ratio => `${(ratio * 100).toFixed(2)}%`)
  return { left, bottom, right, top }
}

console.log(rectToCssPosition([10, 10, 300, 50], 400, 300))
// { left: '2.50%', bottom: '3.33%', right: '25.00%', top: '83.33%' }
```

これを使って以下のようにHTMLを生成します。

```jsx
// JSX
const SlidePageWithLinks = ({ src, width, height, links }) => {
  return (
    <div class="slide">
      <img src={src} alt="" width={width} height={height} />
      {links.map(({ rect, url }) => (
        <a
          href={url}
          title={url}
          style={rectToCssPosition(rect, width, height)}
        />
      ))}
    </div>
  );
};

const links = [
  { rect: [(略)], url: "https://example.com/" },
  { rect: [(略)], url: "https://example.jp/" },
];

const html = renderToStaticMarkup(
  <SlidePageWithLinks
    src="slide.png"
    width={800}
    height={600}
    links={links}
  />
);

console.log(html);
// <div class="slide">
//   <img src="slide.png" alt="" width="800" heigth="600">
//   <a href="http://(略)"
//      style="top:XX%; left:XX%; right: XX%; bottom: XX%;"
//   ></a>w
//   <a href="http://(略)" (...略)></a>
//   ...
// </div>
```

このように生成したHTMLは、以下のようなスタイルを当てることで、ラッパーの `<div>` の幅に追従するリンク付きの画像が完成します。

```css
.slide {
  position: relative;
}
.slide > img {
  width: 100%;
  height: auto;
}
.slide > a {
  position: absolute;
  border: 2px dashed blue;
}
```

[デモ](https://github.honai.me/demos/pdf-slide-viewer/position-absolute-image-map/)
（“Resize me” の場所にあるハンドルで、サイズが追従できることを確かめてみてください）

<iframe loading="lazy" src="https://github.honai.me/demos/pdf-slide-viewer/position-absolute-image-map/" width="100%" style="aspect-ratio:1;max-height:370px;"></iframe>

[カルーセルとイメージマップを合わせたデモ](https://github.honai.me/demos/pdf-slide-viewer/slide-carousel/) も参照してください。

### ボタンでスライドを切り替えられるようにする

スクロールスナップを `mandatory` にしていても、大きくスクロールすると一度に2スナップ分スクロールされる場合があります。
特にモバイルデバイスでスワイプ操作でスクロールするときにこうなることが多く、
1スライドずつ閲覧したいときに不便です。

### 素早くスライドを切り替えるスライダーを追加する
逆に最初や最後にスライドの一気にジャンプしたい時もあります。
PCブラウザではスクロールバーをドラッグして素早くスクロールできますが、スクロールバーをつかめないモバイルブラウザでは不便です
（iOS版Safariではスクロールバーを直接ドラッグできるようです）。

そこで、スクロールバーの代わりに、モバイルブラウザでもドラッグしてスライドを切り替えられるUIを実装しました。

パーツとしては、ブラウザ標準の `<input type="range">` 要素を使いました。

### iframeによる埋め込みページの作成
要件「別のページにスライドを埋め込める」を実現するために、iframeでの埋め込み用ページを作成しました。
といっても、基本的には前節で説明したカルーセルをビューポートいっぱいに表示するようなページを作成するだけです。
iframeの埋め込みコードに、 [CSSのaspect-ratio](https://developer.mozilla.org/ja/docs/Web/CSS/aspect-ratio) による縦横比指定を入れておくと、スライドの縦横比に合わせた埋め込み要素を作成できます。

## まとめ・感想
この記事では、筆者が自身のサイト内で自身のスライドを公開・共有できるようにした仕組み・実装について解説しました。
なぜPDFそのものではなくスライドビューアーサイトが必要なのかについて述べた後、
機能の要件、そして実装方法をデモコードとともに解説しました。
PDFの仕様にも片足を突っ込んだりして、勉強になりました

既存のスライド共有サービスと同じような機能を実現しつつ、リンクのクリックなど追加機能も実装して、楽しく取り組めました。

## References

- [Looking for a linux PDF library to extract annotations and images from a PDF - Stack Overflow](https://stackoverflow.com/questions/7131747/looking-for-a-linux-pdf-library-to-extract-annotations-and-images-from-a-pdf)
