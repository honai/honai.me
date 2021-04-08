---json
{
  "title": "GitHub Actions を使って AWS S3 に自動デプロイする",
  "date": "2019-10-29",
  "description": "パブリックベータになった GitHub Actions を使ってみたので、そのメモ。かなり雑なのはお許しください。  前提  公開したいWebのプロジェクトがあり、`yarn build` とかで静的に書き出せる状態。 そもそもビルドする必要もない(HTMLファイルとCSSファイルだけ、など)プロジェクトにももちろん使えます。",
  "updated": "2020-05-14T23:48:51.455Z"
}
---

パブリックベータになった GitHub Actions を使ってみたので、そのメモ。かなり雑なのはお許しください。

## 前提

公開したいWebのプロジェクトがあり、`yarn build` とかで静的に書き出せる状態。
そもそもビルドする必要もない(HTMLファイルとCSSファイルだけ、など)プロジェクトにももちろん使えます。

プロジェクトをGitHubで管理し、GitHubにプッシュした時に自動でビルドとS3へのデプロイ(アップロード)がされるようにします。

## S3バケット作成

[Amazon S3 での静的ウェブサイトのホスティング - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/WebsiteHosting.html)

↑ 概要説明。と各ドキュメントへのリンクが書いてあります。サーバーサイドのスクリプトは実行できない・独自ドメインを設定できる・HTTPS通信をサポートしていない、など、WebサイトをS3で公開するにあたって重要なことも書いてあります。

[例: 静的ウェブサイトをセットアップする - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html)

↑ (かなり大雑把な)チュートリアルです。

## IAM設定

GitHub Actions からS3のバケット内のファイルを読み書きするには、適切にアクセス許可をする必要があります。

今回は、CLIからAWSサービスにアクセスする「ユーザー」と、アクセス権限が記述された「ポリシー」を作成して、ユーザーにポリシーを結びつけることで、GitHub ActionsからS3の読み書きができるようにします。

### ポリシーの作成

AWSコンソールにサインインして、サービスからIdentity and Access Management (IAM)を選びます。「ポリシー」→「ポリシーの作成」。

![IAMのコンソール画面](//images.ctfassets.net/7q1ibtbymdj9/43Iz0lczGrmdVjIzsoDbit/ab17a3a061be6658c02fce0c4264d8c8/policy.png)

次の画面では、サービス名などを検索してGUIで権限を設定するか、JSONで設定を直接記述することができます。

[s3 syncに必要なアクセス権限 - Qiita](https://qiita.com/digitalpeak/items/e4c60aef167598581b00)

今回はこのサイトを参考に、Deleteの権限も追加して次のようなJSONを設定しました。

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::[バケット名]",
                "arn:aws:s3:::[バケット名]/*"
            ]
        }
    ]
}
```

[バケット名] の部分は先ほど作成したバケットの名前を入れてください。

続く確認画面で、ポリシーの名前を決めて入力し、ポリシーを作成します。

### ユーザーの作成と権限付与

同じくIAMの管理画面から「ユーザー」→「ユーザーを追加」

![IAMのコンソール画面](//images.ctfassets.net/7q1ibtbymdj9/6Noe2IX7bxvdWBaXyqGIhE/0766c5d162726efa65bebd978482aec9/iam1.png)

ユーザー名を決めて入力し、「アクセスの種類」は「プログラムによるアクセス」を選びます。続く「アクセス許可の設定」では「既存のポリシーを直接アタッチ」で、先ほど作成したポリシーの名前を検索して適用します。

タグの設定はスキップし、最後にAccess Key ID/Secret Access Keyと、それらが記述されたCSVのダウンロードボタンが表示されるので、コピーするなりダウンロードするなりして必ず控えておきましょう(Secretは2度と表示させることはできませんが、キーのペアを後から作成しなおすことはできます)。S3のバケットの読み書きができるキーペアなので、扱いは慎重に。

## GitHub Actionsの設定

[Features • GitHub Actions](https://github.com/features/actions)

Actionsはベータ機能なので、普通のGitHubアカウントでは有効化されていません。上記のページから申請してください(筆者の場合はSign-upをクリックしてすぐに使えるようになりました)。

### シークレットの作成

先ほど控えたIAMユーザーの2つのキー(Access Key ID/Secret Access Key)を、GitHub Action内で使える暗号化された変数として利用します。

[GitHub Actionsの仮想環境 - GitHub ヘルプ # シークレット(暗号化された変数)の作成と使用](https://help.github.com/ja/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables)

公開したいプロジェクトのリポジトリの「Settings」→「Secrets」から、2つのキーを登録します。名前は `AWS_ACCESS_KEY_ID` `AWS_SECRET_ACCESS_KEY` などがわかりやすいと思います。

### 設定のYAMLを書く

私はJSONに慣れてしまっているので、たまにYAMLを書くと混乱します。プッシュする前にせめて文法だけでも [YAMLlint - The YAML Validator](http://www.yamllint.com/) などでチェックしておくといいかもしれません。

GitHub Actionsの利点の1つは、デプロイなどのワークフローのすべてを1から記述しなくても、他の開発者が用意した部品(Action)に変数を流し込んで、組み合わせて使うことで、複雑な手順でも簡単に記述できることです。 [GitHub Actions](https://github.com/actions) に公式(?)のワークフローやスターター、ツールキットがまとまっており、このOrganization内のリポジトリ以外にも、一般ユーザーが作成した部品を使うこともできるようです。

今回は公式の部品から [checkout](https://github.com/actions/checkout) ・ [setup-node](https://github.com/actions/setup-node) ・ [aws/cli](https://github.com/actions/aws/tree/master/cli) の3つを利用します。

公開したいプロジェクトのルートに `.github` 、その中に `workflows` というディレクトリを作り、 `deploy-s3.yml` など拡張子がymlのファイルを作成します。

[Github Actionsのヘルプ](https://help.github.com/ja/articles/about-github-actions) や各ActionsのREADMEなどを参考に、次のようなWorkflowの設定を記述しました。

```
name: Upload to S3
on:
  push:
    branches:
      - master

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: actions/setup-node@master
        with:
          node-version: 10.x
      - run: yarn install
      - run: yarn build
      - uses: actions/aws/cli@master
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.S3_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.S3_SECRET_ACCESS_KEY }}
        with:
          args: s3 sync dist/ s3://[作成したバケット名] --delete
```

2行目の `on:` はデプロイを走らせるタイミングを記述しています。 `master` ブランチにプッシュされたときに走るようにしました。
このWorkflowは1つのジョブ deploy (Build & Deploy) から成ります。次の5つのstepを実行します。 
- masterブランチにチェックアウト
- nodeの環境をセットアップ
- yarn install
- yarn build
- `dist` ディレクトリの中身を AWS S3 にアップロード (Sync)

ビルド時のコマンドや公開するディレクトリなどは適宜読み替えてください。

AWS CLIのドキュメントのリンクを貼っておきます
[s3 — AWS CLI 1.16.263 Command Reference](https://docs.aws.amazon.com/ja_jp/cli/latest/reference/s3/)

## まとめ

何となくコピペを組み合わせて書いたYAMLなので、Jobを分割したり名前をちゃんと付けたりしたほうがいいとは思いましたが、とりあえずやりたいことはできました。他の人が作ったワークフローの部品を組み合わせて使えるというのは、GitHubらしいし便利だなと感じました。

記事を読んでくださったみなさんの参考になればうれしいです。

