---json
{
  "title": "連載「入門 HTTP」(3) TLSとHTTP - HTTP over TLS",
  "date": "2020-05-05",
  "description": "こんにちは。ほないです。 CAMPHOR- Day 2020で発表した「入門 HTTP」を連載としてブログに投稿しています。 こちらは第3回の記事となります。  連載について  HTTP/1.xとKeep Alive TLSとHTTP - TLSの概要 TLSとHTTP - HTTP over TLS（本記事）",
  "updated": "2020-05-16T14:22:53.370Z",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/6YmU2C3MyVXeOKHQUOtkMw/7a37d67c8ecedb7357349ed8559a055b/tls-1.3-0-rtt.png",
  "large_card": true
}
---

こんにちは。ほないです。
CAMPHOR- Day 2020で発表した「入門 HTTP」を連載としてブログに投稿しています。
こちらは第3回の記事となります。

# 連載について

- [HTTP/1.xとKeep Alive](/post/how-http-works-1-http1-keep-alive)
- [TLSとHTTP - TLSの概要](/post/how-http-works-2-tls-http)
- **TLSとHTTP - HTTP over TLS**（本記事）
- HTTP/1の課題とHTTP/2
- HTTP/2からQUICへ
- QUICとHTTP/3

この連載全体については [第1回の記事](/post/how-http-works-1-http1-keep-alive#%e9%80%a3%e8%bc%89%e3%81%ae%e6%a6%82%e8%a6%81) を参照してください。

**本ブログ記事に掲載している画像の無断転載を禁じます。**

# 第3回 TLSとHTTP - HTTP over TLS

前回は、HTTPとTLSというよりもTLSそのものに重点を置いて説明しました。
今回はHTTP over TLSということで、TLSのハンドシェイクや、
通常TCP上で動作するHTTPがどのようにTLS上で動作するのか解説したいと思います。

前回の最後に少し紹介した [TLSの歴史](/post/how-http-works-2-tls-http#tls%e3%81%ae%e6%ad%b4%e5%8f%b2) で、
TLSのバージョン1.3では大きな変更が加えられたと説明しました。
この連載ではHTTPの進化に焦点を当てていますが、TLS 1.3によってHTTPのレイヤーから見ても改善点がたくさんありましたので、
TLS 1.2 (以前) と TLS 1.3 の違いに注目して紹介していきたいと思います。

といっても、TLSのバージョンアップについて全てを網羅するのは分量としても内容としても難しいので、
ハンドシェイクプロトコルの違いについて解説していきます。

## TLSプロトコルのデータ転送とTCP

TLSは、HTTP/1.xと違い、バイナリベースのプロトコルです（HTTP/1系はテキストベースでした）。
「データの何bitから何bitまでがバージョンを表す。次の n bitはenumで、1だったらこれ、2だったらこれ…」というように、フォーマットが定まっています。

また、TLSは次に紹介する「Recordプロトコル」によってデータ転送と暗号処理を行い、他の機能は「サブプロトコル」によって実現されます。
サブプロトコルでやりとりされるメッセージは（ハンドシェイクの始めなどを除き）Recordプロトコルによって自動的に保護されます。
TLSのメインの仕様では4つのサブプロトコルがあります。

- Handshakeプロトコル
- Change Cipher Specプロトコル
- Application Dataプロトコル
- Alertプロトコル

TCP, TLS Record, TLSサブプロトコル, HTTPの関係を図で整理すると次のようになります。

![tcp-tls-client-hello](//images.ctfassets.net/7q1ibtbymdj9/7l8JLwH5wFFsdBNUJWlZry/e68757bcf1793fc24cf87c2d548ed675/tcp-tls-client-hello.png)

![tcp-tls-http](//images.ctfassets.net/7q1ibtbymdj9/4rpRD5cgieIbIa2i9vgJxn/1b707eea277621d659b695000c650031/tcp-tls-http.png)

A, BともにTLSのデータ自体はRecordプロトコルによって運ばれています。
AとBでは使われているサブプロトコルが異なり、AではHandshakeプロトコルのデータとしてClient Helloを送っています。BではApplication DataプロトコルでHTTPのメッセージを送っています。

## TLS 1.2 Handshake

TLS 1.2 の基本的な（クライアントの認証を伴わない）フルハンドシェイクは次の図のようになっています。

![TLS 1.2のフルハンドシェイク](//images.ctfassets.net/7q1ibtbymdj9/3TAMSz2qw5CxyUrgmuhv8o/59b41e2359934f3b3ed76e21c29e5940/tls-1.2-full-handshake.png)

これを見ると、TLS 1.2ではTLSのハンドシェイクに2RTTかかることがわかります。

百聞（ブログなので百文？）は一見にしかずということで、WireSharkでTLSのハンドシェイクを見ていきたいと思います。

curlで以下のようなコマンドを叩くと、TLS 1.2, HTTP/1.1でHEADリクエストを送ることができます。
この通信をWireSharkでキャプチャします（TLSの暗号化された内容を読み取る設定などは今回は省略します。参考：[Wireshark で HTTP/2 over TLS の通信をダンプする方法](https://gist.github.com/summerwind/a482dd1f8e9887d26199)）。

```bash
$ curl --tls-max 1.2 --http1.1 -I -v https://example.com/
```

![WireSharkでキャプチャしたHTTP/1.1 over TLS 1.2のパケットのスクリーンショット](//images.ctfassets.net/7q1ibtbymdj9/22yDyL9FmExzVWZnQrFM8K/39c44c7f030c97e11035c2e95b4dce56/ws-h1.1-t1.2-full.png)

最初の3行はTCPの3ウェイ・ハンドシェイクです。クライアントからサーバーにSYNを送り、
サーバーからSYNに対するACKとサーバーからのSYNが返され、クライアントがACKを送ることで通信が開始されます。
クライアントはこのACKに続けてTLSなど別プロトコルのデータを送り始めることができます。

以下、各ハンドシェイクメッセージについて簡単に解説します。

- **Clinent/Server Hello**<br>
  始めにクライアントから送られるClientHelloは、自分が使える暗号化方式や（上位の）プロトコルをサーバーに伝えるのが主な役割です。
  Server HelloもClient Helloと同じ構造をしていて、選択した暗号化方式とプロトコルをクライアントに伝えます。
- **Certificate**<br>
  これには前回説明した証明書チェーンが含まれており、クライアントがサーバーを認証するために使われます。
- **Server/Client Key Exchange**<br>
  鍵交換を行います。TLSプロトコルでも最もクリティカルなメッセージの1つですが、連載の本題ではないので詳細は省きます。
- **Change Chiper Spec**<br>
  Change Chiper Specは正確にはハンドシェイクプロトコルではなく、別のサブプロトコルとして定義されています。
  暗号化のためのパラメータの同意や交換が終了し、暗号化方式が変わることを示します。
- **Finished**<br>
  続くFinishedでは、ハンドシェイクの一連のメッセージのハッシュ値やマスターシークレットの値から計算した
  `verified_data` というフィールドがあり、ハンドシェイク中にメッセージが改ざんされていないことを確認できます。

### Application Data

ここまでくれば後はHTTP over TCPの場合と同じです。
Application Dataプロトコルで、上位のプロトコルのデータをセキュアに送受信することができます。
この場合、例えば `HEAD / HTTP/1.1\r\n` というような文字列をエンコードしたバイト列が、暗号化されたうえでTLSのレコードとして運ばれていることになります。

![TLSレコード上のHTTP/1.1](//images.ctfassets.net/7q1ibtbymdj9/2Te2lyGW4LIsxouhmtFflX/732abb42754b0d422a363bcd3dca9bfb/h1.1-over-t1.2.png)
HTTPから見れば、データを運んでもらうのがTCPかTLSかという違いだけで、何もプロトコルについて変更する必要がないことがわかります。

### Session IDによる再開のハンドシェイク

TLS 1.2では、接続に対してSession IDを発行することができ、
一定時間内（RFC 5246では24時間までを推奨）に再接続する場合は以前のセッションと同じ鍵を使用して通信を再開することができます。

![TLS 1.2 セッション再開時のハンドシェイク](//images.ctfassets.net/7q1ibtbymdj9/41Ix1uaZIlFOphoDfPbgIo/29288a71506bbd45115864bcf3697b6c/tls-1.2-session-resume.png)

Client HelloでSession IDをサーバーに送り、
サーバーがそれをチェックして有効であれば、鍵交換をスキップして1RTTでアプリケーションデータを送ることができます。

## TLS 1.3 Hadshake

TLS 1.3のフルハンドシェイクでは、1RTTでアプリケーションデータを送信できるようになりました。次の図はTLS 1.3のフルハンドシェイクの一例です。

![TLS 1.3のフルハンドシェイク](//images.ctfassets.net/7q1ibtbymdj9/4veuJAx7B1aOmOv5As7KLW/7ff503b8a664524d87e9b0bd44766f18/tls-1.3-full-handshake.png)

図の青線はそのハンドシェイクメッセージが暗号化されていることを示します。
TLS 1.2ではハンドシェイクはFinishedしか暗号化されていませんでしたが、
TLS 1.3ではハンドシェイク用の鍵で暗号化されます。

### PSKとEarly Data (0-RTT Data)

TLS 1.3では、以前のハンドシェイクなどで手に入れたPSK（Pre-Shared Key: 事前共有鍵）によって、
Client Helloと同じタイミングでアプリケーションデータを送信することができるようになりました。
Nginxでもバージョン1.16からTLS 1.3 Early Dataがサポートされたようです。

![TLS 1.3 Early Data](//images.ctfassets.net/7q1ibtbymdj9/6YmU2C3MyVXeOKHQUOtkMw/7a37d67c8ecedb7357349ed8559a055b/tls-1.3-0-rtt.png)

## ALPN: Application Layer Protocol Negotiation

TLSのハンドシェイクの中でも、HTTPのレイヤーから見て非常に重要なのがALPN（[RFC 7301](https://tools.ietf.org/html/rfc7301)）です。
これはアプリケーション層のプロトコルを選択する拡張機能です。

Client Helloでは、クライアント側が利用可能な暗号化方式のリストをサーバーに提示します。
それに対してサーバーは方式を1つ選択し、Server Helloでどれを選択したか伝えます。
これと全く同じように、Client Helloで利用可能なアプリケーション層のプロトコルのリストをサーバーに送るのです。
HTTPのリクエストの場合、現在ならHTTP/1.1かHTTP/2を要求することがほとんどでしょう。

以下はcurlによるHTTPリクエスト（HTTPのバージョンを指定しない）をWireSharkでキャプチャし、
Client HelloのALPN Extensionを見たものです。

![TLS 1.2 Client Hello](//images.ctfassets.net/7q1ibtbymdj9/1ENTIXzdgB8W7GmJtKbk3I/94c60657b6b61f24174290c8b2ae37e8/t1.2-client-hello.png)

```
Extension: application_layer_protocol_negotiation (len=14)
    Type: application_layer_protocol_negotiation (16)
    Length: 14
    ALPN Extension Length: 12
    ALPN Protocol
        ALPN string length: 2
        ALPN Next Protocol: h2
        ALPN string length: 8
        ALPN Next Protocol: http/1.1
```

長さを示すバイナリとUTF-8エンコード文字列が混じっているので少し複雑ですが、要は `["h2", "http/1.1"]` という文字列の配列を表現しているようなものです。
これに対してServer Helloで例えば `"h2"` を選択したことを同じALPN拡張で示します。ALPNで利用されるプロトコル識別子の例を次の表に示します。

プロトコル | 識別子 |
-- | --
HTTP/1.0 | `http/1.0`
HTTP/1.1 | `http/1.1`
HTTP2 over TLS | `h2`
HTTP2 over TCP | `h2c`
DNS over TLS | `dot`

※ `h2c` は、TLSのハンドシェイクができている（＝クライアント/サーバーともにTLSに対応している）にもかかわらずTLSを使わずにHTTP/2で通信を行うということです。
実際にこれが使われることはまずありません。

### TLSとALPNがインターネットにもたらしたメリット

参考文献のReal World HTTPからの引用です。

> HTTP/1.0や1.1の通信では、プロキシサーバーなどによって通信を解釈しキャッシュすることで高速化を図るといった機能を提供できた反面、自分が解釈できないプロトコルを止めてしまうことがありました。
> TLSを使うと改ざんなどが行えない安定した通信路ができるため、
> HTML5で新しく導入されたWebSocketのような通信プロトコルやHTTP/2など、
> HTTP/1.1以前とは前方互換性のない数多くの新しい仕組みをスムーズに導入するインフラになりました。

インターネットに新しいプロトコルを導入するのは本当に大変で（IPv6が普及しない理由と同じです）、
IPv4とTCPを使っていても、往々にして既存のルーターが新しいプロトコルのパケットを止めたり書き換えてしまったりすることがあるようです。

TLSが普及し、ALPNによって途中のルーターに介入されずにプロトコルのネゴシエーションを行えるようになったことで、
20年近く使われたHTTP/1.xと全く互換性のないHTTP/2を（既存のルーターに邪魔されることなく）普及させることができたといえるでしょう。

## まとめ

HTTP over TLSでは、HTTP over TCPの時に比べ通信開始までのRTTが増えます。
これはTLSでセキュリティを確保するためには仕方ないことですが、
TLS 1.3へのバージョンアップによって、HTTPの通信を開始できるまでのRTT数が小さくなりました。

また、TLSを使うと中継するルーターから通信内容を隠ぺいすることになり、
ALPN拡張によって新しいプロトコルを普及しやすくするというメリットをもたらしました。

次回はHTTP/2について解説していきたいと思います。

## 参考文献

- 渋川よしき, Real World HTTP 第2版, オライリー・ジャパン, 2020
- Ristić, Ivan (2017)『プロフェッショナルSSL/TLS』(齋藤孝道 監訳) ラムダノート出版
- [RFC 5246 - The Transport Layer Security (TLS) Protocol Version 1.2](https://tools.ietf.org/html/rfc5246)
- [RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3](https://tools.ietf.org/html/rfc8446)
- [RFC 7301 - Transport Layer Security (TLS) Application-Layer Protocol Negotiation Extension](https://tools.ietf.org/html/rfc7301)
- [TLS Application-Layer Protocol Negotiation (ALPN) Protocol IDs | Transport Layer Security (TLS) Extensions](http://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids)
[Introducing NGINX 1.16 and 1.17 - NGINX](https://www.nginx.com/blog/nginx-1-16-1-17-released/)
