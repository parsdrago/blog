# gzip と kNN によるテキスト分類

gzip と kNN によってテキスト分類が高い精度でできるという論文を見つけました。
[“Low-Resource” Text Classification: A Parameter-Free Classification Method with Compressors
](https://aclanthology.org/2023.findings-acl.426/https://aclanthology.org/2023.findings-acl.426/)

テキスト a とテキスト b の gzip での圧縮率を$C(a)$ $C(b)$ としたときに、a と b の距離を

$
E(a, b) = \frac{C(ab) - min(C(a), C(b))}{max(C(a), C(b))}
$

で定義し、kNNにより分類するとよいようです。

ただ、論文中の精度検証は間違っているという指摘もあり、実際の精度はそこまで高くないようです。
["Gzip beats BERT?" Part 2: dataset issues, improved speed, and results
](https://kenschutte.com/gzip-knn-paper2/)

いずれにしても、gzip の圧縮率だけからそこそこの精度で分類できるというアイデアはとてもよいと思いました。