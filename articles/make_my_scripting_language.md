# 自作スクリプト言語を作る #1

昨日も書きましたが、自作言語のリポジトリたちをみていると自分でも何か作ってみたくなりました。
これまでまともに言語処理系の実装をしたことがないので、いい機会かもしれないです。

簡単に自分のやりたいことをできるスクリプト言語として考えてみます。

たとえば次のように書きたいです。

```
for i in 1..100
  url = http://example.com/images/{i}.png
  download from url to ./{i}.png
```
```
if length of params < 1
  show "issue id is missing"
  exit

issue_id = {params[1]}
open http://my-issue-management.local/isuues/{issue_id}
```

さしあたっては、これをできる言語処理を作ってみようと思います。