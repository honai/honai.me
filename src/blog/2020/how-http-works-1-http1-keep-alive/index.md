---json
{
  "title": "連載「入門 HTTP」(1) HTTP/1.xとKeep Alive",
  "date": "2020-04-21",
  "description": "みなさんこんにちは、ほないです。 CAMPHOR-のオンライン配信のイベントCAMPHOR- Dayにて「入門 HTTP」というタイトルで発表した内容をブログにまとめようと思います。  CAMPHOR- カンファー : 京都のIT系学生コミュニティ 【ライブ配信】CAMPHOR- DAY 2020 - connpass",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/1DtNogvBSlG0kw9v7QBNfr/a3d940eafafd78b01c415a4b74100b98/ogp.jpg",
  "large_card": true
}
---

みなさんこんにちは、ほないです。
CAMPHOR-のオンライン配信のイベントCAMPHOR- Dayにて「入門 HTTP」というタイトルで発表した内容をブログにまとめようと思います。

- [CAMPHOR- カンファー : 京都のIT系学生コミュニティ](https://camph.net/)
- [【ライブ配信】CAMPHOR- DAY 2020 - connpass](https://camphor.connpass.com/event/167947/)
- [CAMPHOR- DAY 2020 - YouTube](https://www.youtube.com/watch?v=MJQr59XrAbo)
- [入門 HTTP ― CAMPHOR- Day 2020 - Speaker Deck](https://speakerdeck.com/_honai/ru-men-http-camphor-day-2020)

発表では時間の都合で解説できなかった部分も載せようと思います。
量が多くなるので、連載形式でやっていきます。完走したい。

# 連載の概要

インターネットで広く使われている通信プロトコルのHTTPですが、
今回の連載では、HTTPというプロトコルの中でも実際の通信にかかわる部分（一部TCPなど下のレイヤーを含む）について、
バージョンごとの違い・進化に重点を置いて解説していきたいと思います。

## 連載の計画

- **HTTP/1.xとKeep Alive**（本記事）
- [TLSとHTTP - TLSの概要](/post/how-http-works-2-tls-http-1)
- [TLSとHTTP - HTTP over TLS](/post/how-http-works-3-http-over-tls)
- HTTP/1の課題とHTTP/2
- HTTP/2からQUICへ
- QUICとHTTP/3

## 連載では扱わないこと

アプリケーションプロトコルというよりも通信プロトコルとしての進化に重点を置いていること、
また下のレイヤーまで掘り下げすぎないようにするため、
以下のような事柄については扱いません。
また詳細な仕様や実装の解説をする記事でもありません。

- 個々のメソッドやヘッダー、ステータスの意味（セマンティック）
- キャッシュ、クッキー、リダイレクト
- DNS
- IP層を含む下位のレイヤー

#### 本ブログ記事に掲載している画像の無断転載を禁じます。

# 第1回 HTTP/1.xとKeep Alive

今回のテーマは、HTTPとして広く普及し実質的な標準となったHTTP/1.0や、
RFCに定められた最初の正式バージョンであるHTTP/1.1の基本的な通信の仕組みと、高速化のための機能であるKeep Aliveについて詳解します。

## HTTP/1系の基本的な通信フロー

### TCPによる接続

![tcp-connection](//images.ctfassets.net/7q1ibtbymdj9/3QT6ql3rMYjj7hwfUhNi1W/6fc5a1860decb87fffe41b7143aeb335/tcp-connection.png)

HTTP/1系では、クライアント-サーバー間の接続にTCPプロトコルを利用します。
TCPとは、信頼性の高い双方向通信を行うためのトランスポートプロトコルで、
クライアントとサーバーのIPアドレスとポートによって互いを識別し
通信を行います。

クライアント側からTCPの [3ウェイ・ハンドシェイク](#tcp%E3%81%AE%E3%83%8F%E3%83%B3%E3%83%89%E3%82%B7%E3%82%A7%E3%82%A4%E3%82%AF) を行うことで接続を確立します。

### HTTPの文字列をエンコード

クライアントは、例えば次のようなリクエストの文字列を作ります:
```http
GET / HTTP/1.1
Host: example.com
Accept: */*
 
```
最後に空行があるのは意図的で、空行によってヘッダーの終わりを示します。またリクエストにボディがある場合は、`Content-Length` ヘッダーによってボディの長さを示し、リクエストボディの終わりがわかるようにします。

そしてクライアントは、作ったリクエストの文字列をバイナリにエンコードします。ヘッダーはASCIIでエンコードします。またボディは `Content-Type` , `Content-Encoding` などで文字コード・圧縮形式を指定することで様々な形式でエンコードすることができます。

### TCPで送信

クライアントは作ったバイナリをTCPを利用してサーバーに送ります。
バイナリはパケットに分割して送信されますが、
順序や損失、誤りの訂正はTCPが行います。

![request-flow](//images.ctfassets.net/7q1ibtbymdj9/6IFZy3hL8Yfzw7fZ2dBa3N/fa656a7e02c84e06f276d04d3d0ee747/request-flow.png)

### サーバーが受け取ったバイナリをデコード

TCPによってサーバーに届いたバイナリを（ヘッダーがASCIIであることはわかっているため）ASCIIでデコードします。
空行でヘッダーの終わりを検知し、（ボディがあれば）ヘッダーに基づいてボディもエンコードします。

出てきた文字列を解釈し、必要な処理（ファイルやデータベースを読み込んだり）を行ってレスポンスの準備をします。

### 以下同様に

次はサーバーがレスポンスの文字列を生成し、エンコードし、TCPで送信…リクエストと同じ流れですね。
そしてクライアントは受け取ったレスポンスを同様にデコードして、処理を行います。

![response-flow](//images.ctfassets.net/7q1ibtbymdj9/5Xr3OIyrdtiuaCUGytp25s/a0119a68c60ae23eeeecea72525ead8e/response-flow.png)

### TCPを切断

サーバーからのレスポンスが全て送信されると、
サーバー側からTCPのコネクションを切断します。これでHTTPの1回のリクエスト・レスポンスが終了します。

## シンプルかつ汎用性の高いプロトコル

HTTPではヘッダーとボディを分けることで様々な形式のデータをやりとりすることができるようになりました。
この汎用性の高さこそが、20年以上HTTPが（セマンティックをほとんど変えずに）現役である理由の一つだと思います。

## Keep Aliveによる高速化

### TCPのハンドシェイク

先述したように、HTTP/1系ではクライアントがTCP接続を開始し、
レスポンスの送信が終わるとサーバー側がTCPを切断します。

TCPでは信頼性の高い通信を行うため、相手から応答が返ってくるか最初に確認してから実際の通信を開始し、
切断する場合も相手と切断の確認を行います。

![tcp-handshake](//images.ctfassets.net/7q1ibtbymdj9/6A1T15aTslfxGhtViyNtMt/6c8133ecdc90556a792344996d47d7fc/tcp-handshake.png)

パケットが1往復するのにかかる時間をRTT (Round-Trip Time) といいますが、
TCPでは接続と切断それぞれに1.5RTTを要します。
（実際は、接続時のクライアントからのAckに続けてデータを送信開始できる・切断時のFINはサーバーからのデータに続けて送られてくるため、クライアントから見るとそれぞれ1RTTを要することになります）。

### HTTP/1.xの課題 - 毎回のTCP接続・切断によるレイテンシ
したがって、リクエスト毎にTCPの接続・切断を行うHTTP/1.xでは、
リクエストの数が増えるとこのハンドシェイクによる時間のロスの影響が大きくなります。

![http-without-keep-alive](//images.ctfassets.net/7q1ibtbymdj9/76b9x8qIeP80yhC4gfPMSk/438a04e9752df37350643e7be4a8056a/http-without-keep-alive.png)

### Keep Alive - TCPを接続したままにして高速化する

そこで登場したのがKeep Aliveです。
仕組みは単純で、1つ目のリクエスト/レスポンスが終わった後、TCPを切断せずに、次のリクエストで再利用します。
レスポンスの終わりを明確にする必要があるため、クライアントはレスポンスヘッダーの `Content-Length` を見てリクエストの終わりを判定します。

サーバー/クライアントそれぞれにタイムアウト時間が設定されており、
どちらか短いほうに達すると切断されます。

![http-with-keep-alive](//images.ctfassets.net/7q1ibtbymdj9/4ZSZpaIXHOtg2dIF8FWexV/f06ee2675dd5c61aaea44f7aff93455c/http-with-keep-alive.png)

## Keep Aliveの効果を確かめる

Keep Aliveの効果はローカル環境でも簡単に確かめることができます。
Nginxの `keepalive_timeout` ディレクティブを0に設定することで（デフォルトは65）Keep Aliveを無効にすることができます。

```nginx
# nginx.conf
server_1 {
	listen				8001;
	keepalive_timeout	0;
}

server_2 {
	listen				8002;
	keepalive_timeout	65;
}
```

同じディレクトリのファイルを配信する、Keep Aliveが有効なサーバーと無効なサーバーを、localhostの別のポートに立てます。

画像などをたくさん使ってリクエストが多くなるようなHTML（ `emoji.html` とします）を用意し、別のHTMLから `iframe` などで両方のポートから `emoji.html` を読み込みます。

```html
<!-- index.html -->
<iframe src="http://localhost:8001/emoji.html">
<iframe src="http://localhost:8002/emoji.html">
```

### 結果

筆者がNginx + Chromeで試した結果です。試すときはキャッシュは無効にしてください。

![keep-alive](//images.ctfassets.net/7q1ibtbymdj9/7D58baZU2PmBWhkD1eiMtg/10298f31d52dc6d18486877edee57f99/keep-alive.gif)

### 開発者ツールで違いを見る

<small>※ スクリーンショットはChromeのものです。</small>

ブラウザの開発者ツールの「Network」タブで、
それぞれのリクエストのプロトコルや詳細が確認できます。
「Waterfall」カラムに注目してみます。

<div class="img-row-wrap">
  <figure>
    <img src="//images.ctfassets.net/7q1ibtbymdj9/2schRVkkfmeN765hIJkccM/44f20c2bd8b2bffd52f7072fac323645/devtool-waterfall.png" alt="Keep Aliveなしの開発者ツールのスクリーンショット" title="Keep Aliveなし">
    <figcaption>Keep Aliveなし</figcaption>
  </figure>
  <figure>
    <img src="//images.ctfassets.net/7q1ibtbymdj9/7u6ye4ZiIAmsqhlW4iUrDE/42b597558897d6165d224917b0add187/devtool-waterfall-keep-alive.png" alt="Keep Aliveありの開発者ツールのスクリーンショット" title="Keep Aliveあり">
    <figcaption>Keep Aliveあり</figcaption>
  </figure>
</div>

Keep Aliveが無効の場合、6リクエストごとに時間が段々になっているのがわかると思います。
これは、ブラウザが（クライアントの複数のポートを利用して）1つのサーバーに対して最大6本のTCP接続を同時に行うためです。
1本のTCP接続に対しては先述したように順番にリクエストを処理することしかできませんが、
TCP接続を複数張ることで並列化しています
（実は多数のTCP接続を張ることは別の問題を生むのですが、それは本連載のHTTP/2についての回で解説したいと思います）。

リクエストのWaterfallでマウスオーバーすると、詳細なタイミングを見ることができます。
「Initial Connection」という時間が、TCP接続を確立するのにかかっている時間です。
これがすべてのリクエストにあるため、時間がかかっていることがわかります。
今回はlocalhostなのでかなり短時間ですが、遠くにあるサーバーなどの場合さらに時間がかかります。

Keep Aliveが有効の場合、タイミングに「Initial Connection」がなく、
Waterfallを見ても連続的にロスなくやり取りできていることがわかります。

## まとめ

HTTP/1.x は、TCPを利用したテキストベースのプロトコルです。
TCPが高信頼な双方向通信を提供するため、HTTP/1.x自体は（通信プロトコルという観点では）シンプルです。
TCPの接続・切断によるレイテンシを削減するため、Keep Aliveが使われるようになりました。HTTP/1.1ではデフォルトで有効となっています。

次回はHTTP/2について解説します。

## 参考文献

- 渋川よしき, Real World HTTP ミニ版, オライリー・ジャパン, 2019
- Ilya Grigorik, High Performance Browser Networking, O'Reilly Media, 2013<br>
  https://hpbn.co/

