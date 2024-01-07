# スマートフォンで使いやすいプログラミング言語が欲しい

通勤中などに電車の中でサッと簡単なコードを書きたくなることがあります。
ただ、この用途で使いやすいプログラミング言語がないのでいいものがないか探しています。

だいたい以下のような機能が欲しいです。

- スマホのソフトウェアキーボードで入力しやすい
  - 記号が少ない & 予測変換との相性がよい
- 狭い画面でも容易に把握しやすい

これを ChatGPT に伝えて条件を満たすコードのサンプルを書いてもらいました。

```
function fibonacci number
    if number less than 2
        return number
    else
        return fibonacci (number minus 1) plus fibonacci (number minus 2)

max number is 10
count is 0
while count less than max number
    print fibonacci count
    count is count plus 1
```

いささか冗長な気もしますが、筋はいいかもしれないです。
機会を見つけて処理系を作ってみたいです。
