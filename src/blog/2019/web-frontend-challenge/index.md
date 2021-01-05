---json
{
  "title": "「Web Frontend Challenge」参加記",
  "date": "2019-03-16",
  "description": "こんにちは、ほないです。  2019年3月9日・10日の2日間、サイバーエージェントの短期インターン「Web Frontend Challenge」に参加してきました。  wfc  Web Frontend Challenge | 株式会社サイバーエージェント  応募のきっかけ ",
  "updated": "2020-05-16T14:22:53.387Z",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/4N4cL2giFr1ZKYZiFJue1Z/a33e0b3ee50b074fde4041e3badd587d/wfc.png",
  "large_card": true,
  "plugins": [
    "twitter"
  ]
}
---

こんにちは、ほないです。

2019年3月9日・10日の2日間、サイバーエージェントの短期インターン「Web Frontend Challenge」に参加してきました。

![wfc](//images.ctfassets.net/7q1ibtbymdj9/4N4cL2giFr1ZKYZiFJue1Z/a33e0b3ee50b074fde4041e3badd587d/wfc.png)

[Web Frontend Challenge | 株式会社サイバーエージェント](https://www.cyberagent.co.jp/careers/students/event/detail/id=22740)

## 応募のきっかけ

春から大学3回生になるので、春休みには何かインターンに行っておきたいと思い、有名なIT企業のインターンについて調べるなかで見つけたのが最初のきっかけだったと思います。

他にも学科の友人に誘われたり、エンジニア志望の学生向けセミナーでCAの方とお話する機会があったりと、複数のきっかけが重なって応募することになりました。

## Web面接

エントリーシートを提出し、Web面接をしました。人事のエンジニア採用担当の方と30分ほどの面接で、エントリーシートに記入した成果物や、興味を持っている・使っている技術などについて話した後、その場で採用と伝えられました。エンジニア系のアルバイト等の経験もなかったので、とてもうれしかったです。誘ってくれた学科の友人も採用となり安心しました。

<blockquote class="twitter-tweet">
<p lang="ja" dir="ltr">Frontend Challenge受かってしまった…</p>&mdash; ほない (@_honai)
<a href="https://twitter.com/_honai/status/1100623411640918016?ref_src=twsrc%5Etfw">February 27, 2019</a>
</blockquote>

## 1日目

当日朝は新幹線に乗り、東京へ向かいました。渋谷駅から坂を登っていくと10分ほどでオフィスに着きました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">5時起きに成功して無事新幹線に乗れました<br>行ってきます
<a href="https://t.co/m7bngOMoTX">pic.twitter.com/m7bngOMoTX</a></p>&mdash; ほない (@_honai)
<a href="https://twitter.com/_honai/status/1104137643267252224?ref_src=twsrc%5Etfw">March 8, 2019</a>
</blockquote>

部屋は開放的でとてもきれいでした（お世辞ではなく、こんなオフィスで働いてみたい！と思ったくらいです）。

10時になり、いよいよインターンがスタートしました。

![office](//images.ctfassets.net/7q1ibtbymdj9/rCvZrrFrXcK2lzr2W4WO7/eeea1e573ce21a82590dacb2e50ec85c/office.jpg)

### 自己紹介

インターンの参加者は10人で、想像より少人数でした。なんとCAのエンジニアや内定者が8人もおり、メンターとしてサポートをしてくださるとのこと。

高専生から19卒までいろんな学生がおり、「今までバックエンド中心にやってきたからフロントもやっておきたい」「将来はプロダクトマネージャーをやってみたい」など様々な背景をもって参加しているようでした。

### 課題発表

このインターンの大まかな内容は、与えられた課題にそってWebアプリケーションを作り、その完成度を競うというものです。

お題は次のようなものでした。

![slide-1](//images.ctfassets.net/7q1ibtbymdj9/1OsYNDpjvvstRcoL71jveS/bed6f78bfba74f8540243efb4a2ce8be/slide-1.png)

![slide-2](//images.ctfassets.net/7q1ibtbymdj9/2LpfrQUCrxQeNtBWELsWyb/b94b41188c9f7cbd330ac4d98b1e5766/slide-2.png)

- 画像APIを使って画像の一覧が作成できている
- 一覧から画像詳細画面を開ける

を最低要件とし、UIと技術的要素のレベルや、追加機能などで評価するというものです。

このあと、内定者からのLTがあり、画像のLazyLoadやアジャイル開発についてのアドバイスをいただきました。

### ワーク

さっそく開発の時間が始まりました。2月に別のインターンの選考課題として、Reactの新機能であるHooksを利用した [Todoリストアプリ](https://github.com/honai/w-todo) を作ったばかりだったので、今回もReact Hooksを使ってみることにしました。

create-react-appでGithubにレポジトリを作ったはいいものの、ReactでAPIを使う経験すらなかった私はスタートからつまずいてしまいました……。JavaScriptの非同期処理の扱い（thenとかasync/awaitとか）もなんとなくしか理解していなかったので、そのあたりのドキュメントを読むことに時間を割いてしまいます。

メンターの方のサポートにも頼りながら、なんとか最低要件の画像一覧と詳細画面を実装できたところで、1日目のワーク時間が終了。集中して開発していると時間があっという間に過ぎるものです。

ワーク後は進捗の共有ということで、他の人のアプリを見せてもらいました。LazyLoad・Infinite Scrollなどの技術的な工夫や、独自のUIの実装など進んでいる人もおり、圧倒されました。

### 夕食
ワークの後、参加者のうち7人（3人は電車などの関係で無理だったようです）でご飯を食べました。その日はまだ他の参加者と話すタイミングがなかったのですが、すぐに打ち解けることができ、大学や趣味の話で盛り上がりました。

## 2日目

2日目に入る前に、自分のアプリのゴールを決めました。残された時間も少なく、自身のもっている技術で実現できるものを考えておかないと、中途半端なところで時間切れになりそうだったからです。

1. LazyLoadとInfinte Scrollを実装する
1. 画面サイズによらず、使いやすく整ったUIにする
1. グリッド表示のサイズを変更する機能をつける

という3つの目標を立て、2日目のワークを開始しました。

![lunch](//images.ctfassets.net/7q1ibtbymdj9/55nuu0Qyfkn0ekW26VmBqo/86dcf78ef0ee8aa9df5875d25fe822f0/lunch.jpg)

### ワーク

LazyLoadは [react-lazyload](https://github.com/twobin/react-lazyload) で比較的簡単に実装できました。

つまずいたのがInfinite Scrollです。React向けのInfinite Scrollのライブラリの仕様が自身の実装と合っておらず、使えませんでした。メンターの方に「Intersection Observerを使って自分で書いてみたらいいかも」というアドバイスをいただき、実装することができました。

さらにSafariはIntersection Observerに対応していないため、Polyfillを入れました（Appleデバイスを持っていない自分は、発表30分前に友人のiPhoneでテストさせてもらった時にそのことに気づき、かなり焦りました）。

レスポンシブに対応したグリッドサイズ変更の機能は、 [Material-UI](https://material-ui.com/) のGridを使って比較的楽に実装できました。大・中・小のサイズが選べ、「大」のスマホ表示が2カラム、「小」のPC表示が12カラムになるようにレスポンシブなグリッドにしました。

CSSには自信があったので、どんな画面サイズでも見やすく使いやすいデザインを目指しました。

少し時間が余ったのでIllustratorでロゴを作り、アプリらしいものが何とか完成しました。

### できたもの

[GridPics](https://honai.github.io/wfc-photo/)

![gridpics-1](//images.ctfassets.net/7q1ibtbymdj9/qkeuCyMBHZ7guP2POQsuX/dd7b8982cf2ee73e2001132a2ee286f9/gridpics-1.jpg)

<div class="img-row-wrap">
<img src="//images.ctfassets.net/7q1ibtbymdj9/3Q3feIisIHDfDDjoGroCEq/20ca6b3edaed63d556e8e6911b4d5b91/gridpics-2.jpg" alt="gridpics-2"><img src="//images.ctfassets.net/7q1ibtbymdj9/MEaY1la21IQrOagsnKrTX/b7b4c94c40e43ac3af98d450b8cb1d44/gridpics-3.jpg" alt="gridpics-3">
</div>

コードはGithubで公開しています。

[honai/wfc-photo - GitHub](https://github.com/honai/wfc-photo)

### 発表会

作ったアプリを実際に操作しながら3分でプレゼンをしました。

写真アプリというシンプルなお題だったので、みんな同じようなアプリになっているのかなと思っていましたが、10人それぞれが違った方向にこだわりをもって作っていて、発表会では驚きの連続でした。斬新なデザインやアルバム機能、位置情報をもとに地図上に写真を表示したり、アクセシビリティを重視してキーボード操作や読み上げに対応したり、PinterestのようなSNSとしてのUIにしたりと、みんなが独自のこだわりをもって開発しているのがよくわかりました。

### 優勝者は……

最優秀賞をとったのは、誘ってくれた学科の友人（HN: どら）でした。

<blockquote class="twitter-tweet">
<p lang="ja" dir="ltr">二次会楽しすぎてツイートしてませんでしたが、Web Frontend Challenge 2019 で最優秀賞いただきました🎉🎉🎉<br>強力なメンターさんのお陰で、一人では辿り着けなかったところまでできて、最高に楽しかったです！<a href="https://twitter.com/hashtag/ca_wfc?src=hash&amp;ref_src=twsrc%5Etfw">#ca_wfc</a>
<a href="https://t.co/3aT3M0eNpX">pic.twitter.com/3aT3M0eNpX</a></p>&mdash; ど(∩❛ڡ❛∩)ら (@d0ra1998) <a href="https://twitter.com/d0ra1998/status/1104790581442576384?ref_src=twsrc%5Etfw">March 10, 2019</a>
</blockquote>

彼のアプリは、ローカルで写真をまとめられるアルバム機能や、詳細画面の下の画像スライダーなどレベルの高い追加機能がありました。また開発の手法としてもチーム開発ができるレベルで整っており、GithubでIssueを立て、Pull Requestでマージしてきちんと開発していました。アプリ自体にも、その開発フローにも、2日間の短期開発とは思えないクオリティの高さがありました。

また追加で2つの賞があり、「アクセシビリティ賞」としてアクセシビリティを重視したIくんが、「チャレンジ賞」として地図との連携など高度な機能に挑戦したKくんが受賞しました。

### 懇親会

オフィス近くのおしゃれなお店で懇親会がありました。社員の方ともたくさんお話でき、とにかく楽しかったです。

## まとめ

いろいろと経験が浅かった私も、メンターの方のサポートのおかげで、2日間でアプリを作ることができました。「参加者の中でも2日間での成長率がとても高かった」とのお言葉をいただいた（もともとのレベルがあまり高くなかったというのもありますが……）ので、いろんな技術にチャレンジして、長所を活かしたいと思っています。夏のインターンやその先の就活などに向けて、レベルアップを目指します！

「自分のこだわりをユーザーに直接届けられるのが、フロントの良いところ」という社員の方の言葉が印象に残っていますが、まさにフロントエンドの楽しさ・大変さを肌で感じられた2日間でした。メンターや人事のみなさん、参加者のみなさん、ありがとうございました！

最後まで読んでくださりありがとうございました。

