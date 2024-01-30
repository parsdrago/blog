# ブログをウェブサイトにする静的サイトジェネレータ 3日目

１日時間があったので制作しました。とりあえず、変換するところはできたので、後日 GitHub actions などを設定の上、GitHub pages などにデプロイするように設定してみます。

node.js で marked.js、highlight.js によって md ファイルの中身を に変換し、ejs によって html に埋め込む cli ツールとして作成しました。

驚きや学びがあったのは、以下の点です。

1. 文字列の処理だけだと PC がめっちゃ速い
2. node.js で cli ツールを初めて作ったが、取り立て問題なくできた

## 文字列の処理だけだと PC がめっちゃ速い
普段、数学的な重めの計算をするプログラムばかり作っています。そのせいで、たまに簡単な文字列の変換やそのファイル入出力だけを行うコードを書くと、処理が一瞬で終わって、速すぎてビビります。

## node.js で cli ツールを初めて作ったが、取り立て問題なくできた
今回、試しに node.js で初めて cli ツールを作ってみました。今時、JavaScript でコードを書くなら deno や bun などがいいのかもしれないですが、npm のパッケージをいくつか使いたかったので node.js にしています。
（最近は deno も npm のパッケージが使えるようになったと聞いていますが、変なところでハマるのがいやだったので避けました）
初めてでしたが、複雑な処理を必要としないのもあり、難なく作ることができました。