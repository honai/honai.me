---json
{
  "title": "Outlook.comのスパムフィルタをPower Automateを使って無効化する",
  "date": "2020-09-04T07:44:57.328Z",
  "description": "小ネタです。突然ですが IFTTT 便利ですよね。今回はIFTTTに似た自動化サービスでWebメールで感じていた不便さを解決したというメモを投稿します。  背景: Outlook.comのスパムフィルタが不便  筆者は普段、GmailのほかにMicrosoftのOutlook.comも使っているのですが、以前から迷惑メールフィルタが強すぎるというか、特に大学や研究室のメールの転送先として使うとかなりの頻度で大事なメールが迷惑メールフォルダに入ってしまっていました。",
  "og_image_url": "https://images.ctfassets.net/7q1ibtbymdj9/35JeTmtmtV21FAo6Svop0t/9300bd90ffa9dffbdf372b9afd7fe456/automate-outlook.png",
  "large_card": true
}
---

小ネタです。突然ですが [IFTTT](https://ifttt.com/) 便利ですよね。今回はIFTTTに似た自動化サービスでWebメールで感じていた不便さを解決したというメモを投稿します。

## 背景: Outlook.comのスパムフィルタが不便

筆者は普段、GmailのほかにMicrosoftのOutlook.comも使っているのですが、以前から迷惑メールフィルタが強すぎるというか、特に大学や研究室のメールの転送先として使うとかなりの頻度で大事なメールが迷惑メールフォルダに入ってしまっていました。

Outlook.comには「ルール」という機能があり（Gmailのフィルタに相当）、条件を設定して自動処理ができるのですが、このルールが迷惑メールに分類されたメールには働かないという仕様(?)のようです。ルールで迷惑メールに分類することはできるのに、逆はできないという。また、迷惑メール機能自体を無効化することもできないようです。

![Outlook.comのルール](https://images.ctfassets.net/7q1ibtbymdj9/6j8zb4JDW7jejE2H0sNnmv/9c77025d1ee4c597b0bcceb8fe825637/outlook-com-rule.png)

また、大学メールの転送では、Toが大学のメールアドレスとなっていて、メーリングリストのような扱いで迷惑メールに入ってしまうのだろうと思い、「受信許可メーリングリスト」に大学のメールアドレスを設定しても、（少し改善したように感じましたが）やはりまだ必要なメールが迷惑メールに分類されてしまいます……。

## Power Automateで解決

前置きが長くなりましたが、以上のような経緯があり、「迷惑メールフォルダにメールが届いたらそれを受信トレイに動かすなり通知するなりできないかな」と考えて調べた結果、コードを書かなくても簡単にできるサービスを見つけたのでメモしておきます。

[Microsoft Power Automate](https://flow.microsoft.com/)（旧称 Microsoft Flow）はIFTTTのようにトリガーとアクションをGUIで設定していき、様々なサービスを接続して自動化できるサービスです。
有料ですが、Outlook.com関係のトリガーとアクションは無料で使えるようです。

![AutomateでOutlook.comのトリガーとアクションを利用する](https://images.ctfassets.net/7q1ibtbymdj9/1MWsuQYmgGynkbJj8BexeS/b0ae316340a83e4a551f3cd883bd222f/automate-outlook.png)

トリガーは「新しいメールが届いたとき」、フォルダを「迷惑メール」に設定。
筆者の場合、本当の意味での迷惑メールも普段からあまり届くことがないので、アクションは「メールを移動」とし、メッセージIDは動的コンテンツでトリガーとなったメッセージのIDを設定します。移動先フォルダは「受信トレイ」。

これで、迷惑メール機能そのものを無効化するようなFlowが完成しました 🎉（🤔🤔🤔）
（ただ、なぜか徒労感と哀愁が漂っています。）

今回使ったPower Automateですが、無料でもいろんなことができそうで、特にMSのサービスだとかなり細かいトリガーやアクションがあります（HTTPやWebhookは有料でした）。他の用途でも使えそうと感じました。

P.S. Gmailに負けないでOutlook～～