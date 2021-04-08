---json
{
  "title": "DockerでLAMP環境構築(ローカル開発用)",
  "date": "2019-04-13",
  "description": "DockerでLAMP (ローカル開発用)  環境：Ubuntu 18.04 LTS  ローカルのLAMP環境がほしくなったので、Dockerに初挑戦しました。 他サイトから引っ張ってきた手順とハマったところだけをつらつらと書いております。 Dockerとは何か？みたいなことは書いていないのでお許しを。",
  "updated": "2019-06-14T18:30:34.633Z"
}
---

# DockerでLAMP (ローカル開発用)

環境：Ubuntu 18.04 LTS

ローカルのLAMP環境がほしくなったので、Dockerに初挑戦しました。
他サイトから引っ張ってきた手順とハマったところだけをつらつらと書いております。
Dockerとは何か？みたいなことは書いていないのでお許しを。

なぜ今さらLAMP？ そうねぇ。

## Dockerインストール
### docker-ce 
このサイトに全て書いてあります。
[Get Docker CE for Ubuntu | Docker Documentation](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

```
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

fingerprintの確認

```
$ sudo apt-key fingerprint 0EBFCD88
    
pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```

stableビルドをインストール
公式ドキュメントでは `docker-ce-cli` と `containerd.io` もインストールしているようだが、今回は `docker-compose` のために入れるだけなので省略できるみたい。

```
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt update
$ sudo apt install docker-ce
$ docker --version
```

参考にした公式サイトの下の方に記述があるが、一般ユーザー( `sudo` なし) でdockerを扱えたほうが便利なので、その設定をする。dockerというグループにUbuntuユーザーが属するようにすればいい。

```
$ sudo usermod -aG docker <your-username>
```

### docker-compose
続いて `docker-compose` をインストール。
[Install Docker Compose | Docker Documentation](https://docs.docker.com/compose/install/)

```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker-compose --version
```

## 各種ファイルを作成
[DockerでLAMP環境 - Qiita](https://qiita.com/fkymnbkz/items/bef22871a1029a427649)

↑とてもシンプルにまとまっており、そのまま使えたので解説も省きます。 [@fkymnbkz](https://qiita.com/fkymnbkz) さんに感謝。PHPやMySQLのバージョン等は適宜変更してください。

重要と思われるポイントが2点あり、データベースの永続化・pdo mysqlを有効化する `Dockerfile` の記述、に注意してください。

## PDOで No such file or directory エラー
私はMySQLデータベースのGUIでの管理に [Adminer](https://www.adminer.org/) を使いますが、普通に

項目 | 値
--- | ---
サーバ | localhost (空欄)
ユーザ名 | root
パスワード | docker-compose.yml で設定した値

でログインしようとすると、
`SQLSTATE[HY000] [2002] No such file or directory`
とのエラーが出ます (内部的にはAdminerはPDOを使っているので、PDOのインスタンスを立てるときのエラー)。

### 2019-04-13追記
以下にIPアドレスを使用した解決方法を記していますが、普通に `docker-compose.yml` で設定したMySQLのサービス名を使うとアクセスできました。
私の環境ではサービス名を `mysql` にしたので、「サーバ」欄を `localhost` ではなく `mysql` とすればログインできます。

<iframe border=0 frameborder=0 height=250 width=550
 src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2FMuskuarede%2Fstatus%2F1116923483504570378"></iframe>
 
 ありがとうございます。以下は記録のために残しておきます。

[dockerでCakePHPの環境構築をした時に、データベースに接続できない - Qiita](https://qiita.com/nagimaruxxx/items/7880e4077d24255aac5d)

このサイトを参考に解決できました。
`docker-composer up -d` でコンテナが起動した状態で、コンテナにシェルでログインします。

```
$ docker-compose exec mysql /bin/bash
# cat /etc/hosts
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.20.0.3	73b379ef7de9
```

一番下の行がDBコンテナを表しているようです (IPやIDは環境によって変わります)。このIPアドレス (上記では `172.20.0.3` ) を控え、AdminerのログインやPDOの初期化のときにhost (サーバ)としてこのIPを渡すと、接続できました。

## コンテナ内のMySQLに外部から接続する
[DockerのMySQLコンテナに外部のサーバーから接続する - Qiita](https://qiita.com/Esfahan/items/70047ea2e4fecab4e2cc)

外部と言ってもホストOSとなるUbuntuからアクセスするという意味です。
phpMyAdminやAdminerを使わず、普通にmysqlでコマンドを叩きたいときの手順になります。

```
$ sudo apt install mysql-client-core-5.7
$ mysql -u root -p -h localhost -P 3306 --protocol=tcp
```

ポートはdocker-compose.ymlで定義されたものに合わせます。パスワードを尋ねられるので入力すると、mysqlをコマンドで操作できます。

Docker初挑戦でしたが、意外と手軽にできました。いろんな環境をDockerでつくれるようになっておきたいです。

コメント・ご指摘等は [筆者のTwitterアカウント](https://twitter.com/honai_uk) にお願いします。

