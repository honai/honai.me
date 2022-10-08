---
title: WSLのsystemdサポートでDocker Engineをサービスとして利用する
description: WSLでsystemdのサポートがプレビューで利用可能になりました。この記事ではWSL2にDocker Engineを直接インストールしてsystemdのサービスとしてデーモンを自動起動できることを確かめます。
date: 2022-10-08
thumbnail_url: https://res.cloudinary.com/honai/image/upload/v1665225858/blog/wsl-systemctl-docker.png
---

## 背景
### WSLでのsystemdサポート
WSL (Windows Subsystems for Linux) でsystemdのサポートがプレビューリリースとして公開されたことがアナウンスされました。

[Systemd support is now available in WSL! - Windows Command Line](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/)

### Docker DesktopなしでのWSL
WindowsでLinux用の（Windows Containerではない）Dockerを利用するときには、
- Docker for Desktopを利用する方法
- WSL2のディストリビューションに直接インストールする方法

があると思います。
後者の、Docker DesktopなしでWSL2ディストリビューションに直接インストールして使う場合、systemdが動かない現行のWSL2では、

```bash
sudo /etc/init.d/docker start
```

のようなコマンドでデーモンを起動する必要がありました（プロファイルなどを使って自動化することはできます）。

参考: [Docker Desktopに依存しない、WindowsでのDocker環境 - Qiita](https://qiita.com/ohtsuka1317/items/617a865b8a9d4fb67989)

systemdがサポートされることで、Dockerもsystemdのサービスとして利用できるため、自動でサービスが起動され、`systemctl` 等のコマンドでデーモンを制御できるようになります。


## プレビューリリースのWSLで試してみる
### Disclaimer
WSLのsystemdサポートは執筆時点でプレビューリリースですので、試す場合は自己責任でお願いします。

### プレビューリリースのWSLの入手
[アナウンス](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/) の発表時点（2022年9月21日）では、
WindowsのInsiderビルドを利用している場合は、Microsoft Store経由でインストール（アップデート）できます。そうでない場合もGitHubからインストーラを入手できるということです。

[https://github.com/microsoft/WSL/releases](https://github.com/microsoft/WSL/releases)

最新バージョンのAssetsから `Microsoft.WSL_{version}_x64_ARM64.msixbundle` のようなファイルをダウンロードし、ダブルクリックしてインストールします。

### WSL2のディストリビューションのインストール
PowerShell等から `wsl --install` コマンドを使ってディストリビューションをインストールします。筆者はDebianを使っているので以降はDebianでの例になっています。

WSLのインストールが初回の場合はここでWindowsの再起動が必要になるかもしれません。

### WSLの設定ファイルでsystemdサポートを有効に
公式ドキュメント: https://learn.microsoft.com/en-us/windows/wsl/wsl-config#systemd-support

インストールしたWSLのディストリビューションを起動して、 `/etc/wsl.conf` を作成し、以下の内容を書き込みます。

```ini
[boot]
systemd=true
```

設定を反映するため、PowerShell等で `wsl --shutdown` でWSLを終了し、再び起動します。以下のコマンドでサービスの状態を確認できたら、正しく設定できているといえるでしょう。

```bash
sudo systemctl list-unit-files --type=service
```

![systemctl list-unit-filesの出力結果](https://res.cloudinary.com/honai/image/upload/f_auto/v1665220866/blog/wsl-systemd-list.png)

### Docker Engineのインストール
続いてDockerをインストールします。Docker Desktopは使わないので、公式ドキュメントの**Linux向けのDocker Engine**のインストール方法に従ってWSL上でインストールします。

[Install Docker Engine | Docker Documentation](https://docs.docker.com/engine/install/)

上記のページからディストリビューションごとにインストール方法のページに飛べるのでWSLのディストリビューションに合わせてインストールしてください。

### Dockerがサービスとして動作していることを確認

インストールが終わったら、Dockerのデーモンがサービスとして動作しているか確認します。

```bash
$ sudo systemctl status docker
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2022-10-08 18:19:09 JST; 11min ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 155 (dockerd)
      Tasks: 13
     Memory: 104.0M
     CGroup: /system.slice/docker.service
             └─155 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

`active (running)` になっていればOKです。 `docker run hello-world` などで動作確認もしておきましょう。

一度 `wsl --shutdown` でWSLを終了した後、再び起動したときにもデーモンが動いていることが確認できると思います。

## おまけ: VSCodeのRemote ContainersでWSL内のDockerを利用する
先ほど参照したQiitaの記事（[Docker Desktopに依存しない、WindowsでのDocker環境](https://qiita.com/ohtsuka1317/items/617a865b8a9d4fb67989)）でも言及されていますが、
Visual Studio Codeでコンテナ内に直接接続できる機能において、常にWindows上のDockerではなくWSL上のDockerを利用するオプションがあります。

`remote.containers.executeInWSL` で機能のオンオフ、 `remote.containers.executeInWSLDistro` でディストリビューションを指定できます。

![VSCodeのRemote ContainersでWSL内のDockerを使う設定](https://res.cloudinary.com/honai/image/upload/f_auto/v1665223364/blog/vscode-wsl-docker-conf.png)

参考 :https://github.com/microsoft/vscode-docs/blob/main/remote-release-notes/v1_61.md#execute-in-wsl-setting

## まとめ
WSLのsystemdサポートによって、Docker Desktopを使わないWindows上でのLinuxコンテナ用Dockerが利用しやすくなりそうです。
