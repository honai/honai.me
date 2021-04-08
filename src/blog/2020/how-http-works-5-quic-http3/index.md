---json
{
  "title": "連載「入門HTTP」 (5) QUICとHTTP/3",
  "date": "2020-08-06T08:42:56.552Z",
  "description": "8月になりました。京都は真夏日や猛暑日が続きそうです……。入門HTTPの連載も今回で最後になります。  連載について  HTTP/1.xとKeep Alive TLSとHTTP - TLSの概要 TLSとHTTP - HTTP over TLS HTTP/1の課題とHTTP/2 QUICとHTTP/3（本記事）",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/4AIeWZ6Q34a9HbGRmNDavI/561c51ca5d14d7efb047734ba5c3c4c5/ietf-quic.png",
  "large_card": true
}
---

8月になりました。京都は真夏日や猛暑日が続きそうです……。入門HTTPの連載も今回で最後になります。

# 連載について

- [HTTP/1.xとKeep Alive](/post/how-http-works-1-http1-keep-alive)
- [TLSとHTTP - TLSの概要](/post/how-http-works-2-tls-http)
- [TLSとHTTP - HTTP over TLS](/post/how-http-works-3-http-over-tls)
- [HTTP/1の課題とHTTP/2](/post/how-http-works-4-http2)
- **QUICとHTTP/3**（本記事）

この連載全体については
[第1回の記事](/post/how-http-works-1-http1-keep-alive#%e9%80%a3%e8%bc%89%e3%81%ae%e6%a6%82%e8%a6%81)
を参照してください。

**本ブログ記事に掲載している画像の無断転載を禁じます。**

# 第5回 QUICとHTTP/3

HTTPの現在の正式な最新バージョンはHTTP/2ですが、次期バージョンとなるHTTP/3の仕様の策定がIETFで進んでいます。
また、Googleなど一部のサービスやGoogle Chromeでは試験的に新しいプロトコル（QUICと呼ばれています）を導入しています。
今回は、HTTPの次期バージョンがどういうものになろうとしているのか解説します。

[前回の記事](/post/how-http-works-4-http2) では、HTTP/2の仕組みとそのメリットについて解説しました。
今回は、まずHTTP/2のデメリットを解説し、それをいかに解決しているのかを交えながらQUICとHTTP/3がいかに解決しているのか

## HTTP/2の課題

### TCP HoLブロッキング

HTTP/2では、パケットに「ストリーム」という単位でIDを振ることで仮想的なHTTPリクエスト/レスポンスの並列化を行っています。

つまり、あるストリームのパケットが届かなかったり、あるストリームのパケットの到着順序が前後したりしても
そのストリーム以外に影響はありません。

しかし、HTTP/2のパケットはTCPで運んでいるため、TCPの仕様上、パケットの破棄や到着順序の前後はすべて回復されます。
その回復を待つ間は、（別で影響のないストリームであっても）アプリケーション側で処理を進めることができません。
TCPの処理はOSで、HTTPの処理はアプリケーションで行っているため、TCPを使っている以上はこれを避ける方法はありません。
このときにタイムロスが発生してしまいます。

少しわかりにくいと思うので図を用意しました。

![TCPのHead of Lineブロッキングを説明する図](//images.ctfassets.net/7q1ibtbymdj9/44LZZhJEzQYJ0R4NTCKraR/06fe16a07d980a93771236cecb3fdb4d/tcp-hol.png)

この図ではストリームを色で区別しています。この図のように、青のストリームのパケットが届かなかったとしても、
直後に届いている緑や橙のストリームのパケットは処理できるのですが、
TCPの再送制御はOSが行っているため、それらのパケットがアプリケーション側にわたるのは、青のパケットの再送が完了してからになります。

このように、TCPのパケットロスが、HTTPのレイヤーですべてのリクエストをブロックしてしまうことを、（TCPの）Head of Lineブロッキングと言います。

<small>HTTP/1系で問題だったのは、HTTPのレイヤーでリクエストが並列化できていないことによるHoLブロッキングでした。
ここを混乱しないようにしてください。</small>

### TCPとTLSの接続レイテンシ

これはHTTP/2の課題とは言えないかもしれませんが、TCPやTLSを下のレイヤーで使っていることで、それぞれ接続のためのハンドシェイクが必要となり、特に初回のリクエストに時間がかかってしまいます。


## QUIC - UDPベースの多重化されたセキュアなトランスポートプロトコル

HTTP/2の課題を2つ挙げました。しかし、これらの課題についてよく考えてみると、両者ともTCPやTLSを利用しているから起こる問題であり、従来のHTTPのレイヤーでは解決できない問題です。

そこでGoogleが、TCPやTLSを置き換える新しいプロトコルを作ります。それがQUICです。

実はGoogleの一部サービスとGoogle ChromeはQUICに対応しており、すでにみなさんも使っています。

### Google版QUICの概要

![Google版QUICの構成を説明する図](//images.ctfassets.net/7q1ibtbymdj9/3A7kUlLyJK9MnBswdStjGf/80bcafe67b2afbffb6eb13dcad9146e0/google-quic.png)

<small>* QUICと重複する機能を除いたHTTP/2</small>

Google版（なぜGoogle版と呼ぶのかは口述）のQUICの構成は図のようになっています。
今までTCP/IPとTLSを利用してきたHTTPですが、TCPではなくUDPというプロトコルの上で動作する、
TCPやTLSが行っている要素をカバーした新しいトランスポートプロトコルとなっています。

### なぜUDPを使うのか

TCP/IPはインターネットの基礎となるプロトコルとして世界中に普及しているプロトコルです。
逆に、TCPなどに代わる新しいプロトコルを作っても、インターネットでそれを使えるようになるには世界中の機器が対応する必要があり、難しいです（ようやく一般的になってきましたが、IPv6がなかなか普及しなかった理由と同じです）。

UDP (User Datagram Protocol) は、IPパケットにポート番号などの追加情報を付加しただけの非常にシンプルなプロトコルですが、
TCPと同じように既に普及しています。
そこで、UDPパケットを利用しアプリケーションの実装で機能をカバーすれば、既存のインターネットの互換性を維持しつつ、
実装次第で高機能なトランスポートプロトコルを構築することができるということです。

| | TCP | UDP
-- | -- | --
通信の方向 | 双方向 | 相手に送るだけ
誤り/不達の検出と再送 | 行う | 行わない
データの順序 | 保証される | 保証されない

### HTTPリクエストの多重化とHoLブロッキングの解消

HTTP/2は、TCPコネクションの上に仮想的な通信路を確保して多重化を行っていました。
TCPはすべてのパケットの到着順序や欠落をOSレベルでチェックするため、その上のプロトコルで多重化を行うとHead of Lineブロッキングが起こると説明しました。

QUICでは、ただ相手にパケットを送るだけのプロトコルであるUDPの上に、
改めてTCPと同じような双方向の高信頼の通信を行うための機能を実装したプロトコルです。

![QUICのリクエスト多重化の仕組みを説明する図](//images.ctfassets.net/7q1ibtbymdj9/5wZjtuELcWIBCBGqA8Ndgf/4847a6ab4fd63b5b58ad1323ab52194d/quic-stream.png)

TCPとの違いは、はじめから多重化することを前提としている点です。
HTTP/2と同じようにQUICでもフレームにストリームIDを振って仮想的な多重化を行います。
ストリーム内でのフレームの順序は保証されますが、
違うストリーム間の順序は保証されません。

![QUICではヘッドオブラインブロッキングが起こらないことを説明する図](//images.ctfassets.net/7q1ibtbymdj9/64ulLDjWRqKBBgwYbGpv9z/964d9231838908ffce7fce4175738424/quic-hol.png)

これで、TCPの仕様上回避できなかったHoLブロッキングが起こらないより効率的なプロトコルとなりました。

### 0-RTT

QUICはTLSとTCPが個別に行っていたものをひとまとめにできるプロトコルであり、
接続までの時間が短縮されています。従来はTCPで1RTT, TLSで2RTT（再接続時は1RTT）かかっていたハンドシェイクを、まとめて1RTTで行えるようになりました。

さらに、再接続時には0RTTでのデータ送信に対応し、クライアントからの最初のパケットに暗号化されたデータを含めることもできるようになっています。

### Connection Migration

HTTP/2まではコネクション管理はTCPで行っていました。
TCPの接続はサーバーとクライアントそれぞれのIPアドレスとポート番号によって識別されています。
つまり、HTTP通信はIPアドレスやポート番号が変わると中断されてしまいます。

QUICは、Connection Migrationという機能を備えており、
クライアント側のIPアドレスやポート番号が変わってもHTTP通信を継続できるようになりました。

スマートフォンなどが普及し、Wi-Fiとモバイル通信を切り替えながらインターネットにアクセスすることも増えてきた昨今で役立つ機能といえるでしょう。

![QUICではIPやポート番号が変わってもHTTP通信を継続できる](//images.ctfassets.net/7q1ibtbymdj9/T5mQwABqMcksP4sezdQK7/c78217f03de35174ad963d8415d53026/connection-migration.png)

## HTTP/3 - QUICを利用した新しいバージョンのHTTP

![Google版QUICとIETF版QUICの比較](//images.ctfassets.net/7q1ibtbymdj9/4AIeWZ6Q34a9HbGRmNDavI/561c51ca5d14d7efb047734ba5c3c4c5/ietf-quic.png)

説明したとおり、QUICはGoogleが開発したもので、暗号化は独自のものでした。
QUICをインターネットの標準プロトコルとして整備するにあたって、
暗号化部分をTLSに変え、QUICの上で動作するHTTPを新しくHTTP/3として分離したものがIETF版のQUICです。

現在はこのIETF版QUICとHTTP/3を標準化するために議論が進んでいます。

## まとめ

### 変わらないHTTPのセマンティック

これまでの連載で紹介してきたとおり、HTTPは、高速化やセキュリティの向上などのために様々なバージョンアップが行われてきました。
しかし、HTTPというプロトコルがもつ基本的な考え方はHTTP/1.0のときからほとんど変わっていません。

シンプルかつ汎用性の高いセマンティックが20年前に確立されたおかげで、
HTTPはインターネットにおける通信をうまく抽象化し、Webを支える基盤となるプロトコルとなりました。

### HTTPの進化は水面下で

しかし、その20年の間に何も変化がなかったわけではなく、
低水準の実装を変えて高速化を図ったり、セキュリティを向上させたり、
新しいデバイスの普及によってかわったインターネットへの接続環境に対応したりと、
進化してきました。

HTTPはこれからも、その汎用性の高いコンセプトはそのままにアップデートが続いていくと思います。
この連載が、HTTPやその進化に興味をもつきっかけになれば幸いです。

## 参考文献

- [Hypertext Transfer Protocol Version 3 (HTTP/3)](https://tools.ietf.org/html/draft-ietf-quic-http-27)
- [QUIC: A UDP-Based Multiplexed and Secure Transport](https://tools.ietf.org/html/draft-ietf-quic-transport-27)
- 渋川よしき (2020)『Real World HTTP 第2版』オライリー・ジャパン

