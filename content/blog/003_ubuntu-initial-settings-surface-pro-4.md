---json
{
  "title": "Surface Pro 4にUbuntuを入れたときの初期設定",
  "date": "2019-04-11",
  "description": "Surface Pro 4にUbuntuを入れたときの初期設定  前提  Microsoft Surface Pro 4 にWindowsとは別にUbuntuをインストール完了した状態 (Ubuntuのインストールについては解説していません) 完全に自分のためのメモです 記事上のコマンドでは本来必要な `sudo` を省略している箇所があります",
  "updated": "2019-06-14T18:30:07.117Z"
}
---

# Surface Pro 4にUbuntuを入れたときの初期設定

## 前提

- Microsoft Surface Pro 4 にWindowsとは別にUbuntuをインストール完了した状態 (Ubuntuのインストールについては解説していません)
- 完全に自分のためのメモです
- 記事上のコマンドでは本来必要な `sudo` を省略している箇所があります

## タッチパネルとペンを使えるようにする

残念ながらSurfaceはMS独自のハードウェアなので、ペンやタッチパネルがデフォルトでは使えません。が、オープンソースでLinuxカーネルのパッチが開発されています。ありがたく使わせてもらいましょう。Surface シリーズにほとんど対応してるみたいです。コンパイルできればUbuntu以外にも使えるとか。 
(※ 2019年4月現在 カメラは使えないみたいです。)

[GitHub - jakeday/linux-surface: Linux Kernel for Surface Devices](https://github.com/jakeday/linux-surface)

このページの、Instruction のコマンドをそのまま入力するだけです。公式flavor以外のUbuntu系 (Elementary OSなど) を使うときは、ベースとなるUbuntuのバージョン判定がうまく行かないことがあるので、 `setup.sh` を適宜書き換えます。

再起動したら使えるようになってるはずです。ハードウェアやドライバー、カーネルのことは全然わかりませんが、このプロジェクトにContributeしている人たちはすごいな〜といつも思います。

### 余談
詳しくは調べていませんが、以前はUbuntuのデフォルトのドライバーではタイプカバーすら認識せず、わざわざ外付けUSBキーボート・マウスを挿してUbuntuのインストールをしていた時代があったそうです (ググるとそういう手順を解説したサイトが出てきます)。

今ではタイプカバーはもちろん、Wi-Fi/Bluetooth/ファンクションキー/音量キー などほとんどが最初から認識されるようになっていますね。ありがたいものです。

## Git を最新バージョンに

よく使うし、なんとなく最新を入れたいですよね (?)

[Download for Linux and Unix - Git](https://git-scm.com/download/linux)

```
$ add-apt-repository ppa:git-core/ppa
$ apt update
$ apt install git
```

## VS Codeを入れる

[公式サイト](https://code.visualstudio.com/) から.debをダウンロードして `apt install` 。特に何もしなくても `apt upgrade` で更新されるようになります。「Ubuntuソフトウェア」からも入れれるみたいです。

## Nodeとnpmを入れる

最近はフロントエンドの勉強をしているので必須になってきました。

- [Ubuntuに最新のNode.jsを難なくインストールする - Qiita](https://qiita.com/seibe/items/36cef7df85fe2cefa3ea)
- [n package](https://github.com/tj/n)

いつもこのサイトを見てやっています。

ただ `n stable` だとLTSじゃなく最新版が入るので、自分は [NodeJS公式サイト](https://nodejs.org/ja/)でLTSバージョンを確認して、それを指定して入れます。

```
$ apt install nodejs npm
$ npm install --global n
$ n <LTS Version>
$ node --version
```

いったん n package をインストールしたら元のnodeとnpmのパッケージは必要なくなるので消します (なんだか不思議な感じ)。

```
$ apt purge nodejs npm
```

npmも最新版にしておきましょう。

```
$ npm install --global npm@latest
$ npm --version
```

## [おまけ] Spotifyの高解像度対応

Premium会員なのでUbuntuでもしっかり聴きたいのです。

Sootifyは「Ubuntuソフトウェア」からインストールできるのですが、起動すると、拡大率が1のままで表示が小さすぎることがわかると思います。起動コマンドに `--force-device-scale-factor=2` を追加すると見やすくなります。アプリランチャーからSpotifyを起動したときにこのオプションが適用されるようにする方法を解説します。

SpotifyはSnapでインストールされるので、アプリランチャーのショートカットの実体は `/var/lib/snapd/desktop/applications/` にあります。自分の環境では `spotify_spotify.desktop` というファイル名でした。これをroot権限で編集します。

```
[Desktop Entry]
X-SnapInstanceName=spotify
(...略)
Exec=sotify --force-device-scale-factor=2
(...略)
```

こんな感じです。

**注意 (私も勘違いしていました)** `--force-device-scale-factor=2` はSpotify独自の起動オプションなので、他のアプリでも使えるわけではありません……。Linux向けではまだまだHiDPIに対応できていないアプリも多いようですね。

## まとめ

Windows で cmd や powershell、サードパーティのターミナルなどで頑張ることはできますが、やっぱりbashでやるのがいろいろとやりやすいですよね。WSLという手もありますが、aptやnpmでの操作など、やはり目に見えて遅いです。

SurfaceにはWindowsしか入れちゃダメなんて決まりはないですものね。Surface + Ubuntu で快適な開発者ライフを送りたいものです。
